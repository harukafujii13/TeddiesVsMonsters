'use client';

import OrderCard from '@/components/orders/OrderCard';
import { Order } from '@/types/user';

const OrderTab = ({ orders }: { orders: Order[] }) => {
  return (
    <div>
      <div className='font-LDRKaet text-2xl my-8'>Latest Orders</div>
      <ul className='w-full grid grid-cols-5 py-2 px-2'>
        <li>Date</li>
        <li>Order Id</li>
        <li>Total</li>
        <li>Status</li>
        <li>Detail</li>
      </ul>
      {orders.map((order) => {
        return (
          <OrderCard
            key={order.id}
            date={order.order_date}
            orderId={order.id}
            total={order.billing_amount}
            status={order.trackingId}
          />
        );
      })}
    </div>
  );
};

export default OrderTab;
