import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_PRIVATE_KEY;
let stripeClient: Stripe | undefined;
if (stripeSecretKey) {
  stripeClient = new Stripe(stripeSecretKey, {
    apiVersion: '2022-11-15', // Specify the API version (optional but recommended)
  });
}
export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  console.log('body', body);
  let customer;
  try {
    customer = await stripeClient?.customers.create({
      metadata: {
        cartItems: JSON.stringify(
          body.map((item: any) => ({
            cartItemId: item.id,
            productId: item.attributes.product.data.id,
            quantity: item.attributes.quantity,
            size: item.attributes.size,
            price: item.attributes.product.data.attributes.price,
          })),
        ),
      },
    });
  } catch (error) {
    console.log(error);
  }

  try {
    const session = await stripeClient?.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      invoice_creation: {
        enabled: true,
      },
      line_items: body.map(
        (item: {
          attributes: {
            product: {
              data: {
                attributes: { name: string; image?: string; price: number };
              };
            };
            quantity: any;
          };
        }) => {
          return {
            price_data: {
              currency: 'cad',
              product_data: {
                name: item.attributes.product.data.attributes.name,
                images: [
                  `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,g_face,c_thumb,r_max/merchandise/${item.attributes.product.data.attributes.name}`,
                ],
              },
              unit_amount: item.attributes.product.data.attributes.price * 100,
            },
            quantity: item.attributes.quantity,
          };
        },
      ),
      shipping_address_collection: {
        allowed_countries: ['CA', 'US'],
      },
      custom_text: {
        shipping_address: {
          message:
            "Please note that we can't guarantee 2-day delivery for PO boxes at this time.",
        },
        submit: {
          message: "We'll email you instructions on how to get started.",
        },
      },
      phone_number_collection: {
        enabled: true,
      },
      customer: customer?.id,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment_success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment_cancel`,
    });
    return NextResponse.json({ url: session?.url });
  } catch (error) {
    if (typeof error === 'object' && error instanceof Error) {
      return NextResponse.json({ error: error.message });
    } else {
      return NextResponse.json({ error: 'An error occurred.' });
    }
  }
}

// console.log(cartItems.data.data[0]);
// const itemsArr = cartItems.data.data.map((item) => {
//   return {
//     price_data: {
//       currency: 'cad',
//       product_data: {
//         name: item.attributes.product.data.attributes.name,
//       },
//       unit_amount: item.attributes.product.data.attributes.price,
//     },
//     quantiry: item.attributes.quantity,
//   };
// });
// console.log(itemsArr);
