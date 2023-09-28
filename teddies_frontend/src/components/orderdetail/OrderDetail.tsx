//{
//   name: 'Neko t-shirt',
//   price: '2000',
//   size: 'valid',
//   image: 'neko',
//   createdAt: '2023-07-28T21:38:17.434Z',
//   updatedAt: '2023-07-28T22:50:23.221Z',
//   publishedAt: '2023-07-28T22:50:23.219Z'
// }

'use client';

import OrderItem from '@/components/orders/OrderItem';
import { useRouter } from 'next/navigation';

import Button from '@/components/button/Button';
import { OrderDetail } from '@/types/orderDetail';

const OrderDetail = (props: { order: OrderDetail[] }) => {
  const { order } = props;
  const router = useRouter();

  return (
    <div className='lg:w-[80%] md:w-[80%] w-full m-auto lg:pt-20 md:pt-10 py-3'>
      <p className='font-LDRKaet lg:text-5xl md:text-4xl text-3xl text-center lg:py-10 md:py-6 py-4'>
        Order Detail
      </p>

      {order.map((item: OrderDetail) => {
        return (
          <OrderItem
            key={item.id}
            productName={item.attributes.product.data.attributes.name}
            price={item.attributes.product.data.attributes.price}
            image={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1/merchandise/${item.attributes.product.data.attributes.name}`}
            number={item.attributes.quantity}
            size={item.attributes.size}
            date={item.attributes.order.data.attributes.order_date}
            shipTo={item.attributes.order.data.attributes.name}
            status={item.attributes.order.data.attributes.trackingId}
          />
        );
      })}
      <Button onClick={router.back}>Go back</Button>
    </div>
  );
};

export default OrderDetail;
