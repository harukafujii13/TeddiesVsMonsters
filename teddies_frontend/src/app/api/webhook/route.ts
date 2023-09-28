import { api } from '@/utils/axios';
import { timestampToDate } from '@/utils/date-format';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_PRIVATE_KEY;
let stripeClient: Stripe | undefined;
if (stripeSecretKey) {
  stripeClient = new Stripe(stripeSecretKey, {
    apiVersion: '2022-11-15',
  });
}

interface InvoicePaymentSucceededEventData {
  customer: string; // Change the type according to your data structure
  account_name: string; // Change the type according to your data structure
  customer_email: string; // Change the type according to your data structure
  amount_paid: number; // Change the type according to your data structure
  id: string;
  // ... other properties
} // This line specifies that cartItems is an array of CartItem objects
interface CartItem {
  cartItemId: string;
  productId: string;
  quantity: number;
  size: string;
  price: number;
  // Add any other properties your cart item objects have
}

interface Customer {
  id: string;
  metadata: {
    cartItems?: string;
    // Add any other properties you expect in the metadata
  };
  // Add any other properties you need from the Customer object
}

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(req: NextRequest, res: NextResponse) {
  if (!process.env.STRIPE_ENDPOINT_SECRET) {
    console.log('set stripe endpoint in envfile');
    return;
  }

  try {
    const rawBody = await req.text();
    const sig = req.headers.get('stripe-signature');
    if (sig) {
      const buffer = Buffer.from(rawBody);
      console.log(process.env.STRIPE_ENDPOINT_SECRET);
      const event = stripeClient?.webhooks.constructEvent(
        buffer,
        sig,
        process.env.STRIPE_ENDPOINT_SECRET,
      );

      const eventType = event?.type;
      if (eventType === 'invoice.payment_succeeded') {
        const data: InvoicePaymentSucceededEventData = event?.data
          ?.object as InvoicePaymentSucceededEventData;

        const customer = (await stripeClient?.customers.retrieve(
          data?.customer,
        )) as Customer;
        const orderDate = timestampToDate(event?.created as number);

        const payload = {
          name: data?.account_name,
          email: data?.customer_email,
          billing_amount: data?.amount_paid / 100,
          order_date: orderDate,
          trackingId: data?.id,
        };

        try {
          const response = await api.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
            {
              data: payload,
            },
          );
          let cartItems;
          if (customer?.metadata?.cartItems) {
            cartItems = JSON.parse(customer?.metadata?.cartItems);
          }

          await createOrderDetails(cartItems, response.data.data.id);
          await deleteCartItems(cartItems);
          return NextResponse.json({ received: true });
        } catch (err) {
          console.error(err);
          return NextResponse.json({ received: false });
        }
      }
    }
  } catch (error) {
    if (typeof error === 'object' && error instanceof Error) {
      return NextResponse.json({ err: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ error: 'An error occurred.' });
    }
  }

  return NextResponse.json({ received: true });
}

////
async function deleteCartItems(cartItems: CartItem[]) {
  console.log(cartItems);
  for (const cartItem of cartItems) {
    const cartItemId = cartItem.cartItemId;
    try {
      const cartItemResponse = await api.delete(
        `/api/cart-items/${cartItemId}`,
      );
      console.log(cartItemResponse);
    } catch (error) {
      if (typeof error === 'object' && error instanceof Error) {
        console.error('Error deleting cart items:', error.message);
      } else {
        return NextResponse.json({ error: 'An error occurred.' });
      }
    }
  }
}

async function createOrderDetails(cartItems: CartItem[], orderId: number) {
  console.log(orderId);
  for (const cartItem of cartItems) {
    try {
      const detailResponse = await api.post(`api/orders-details`, {
        data: {
          quantity: cartItem.quantity,
          price: cartItem.price,
          size: cartItem.size,
          product: cartItem.productId,
          order: orderId,
        },
      });
    } catch (error) {
      console.error('Error creating order details:', error);
    }
  }
}
