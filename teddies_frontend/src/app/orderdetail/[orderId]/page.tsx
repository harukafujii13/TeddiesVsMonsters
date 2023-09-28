import type { Metadata } from 'next';

import { api } from '@/utils/axios';

import OrderDetail from '@/components/orderdetail/OrderDetail';
import { OrderDetail as OrderDetailType } from '@/types/orderDetail';

export const metadata: Metadata = {
  title: 'Order Datail',
};

const OrderDetailPage = async ({ params }: { params: { orderId: number } }) => {
  const id = params.orderId;

  const response = await api.get(
    `/api/orders-details?filters[order]=${id}&populate=*`,
  );
  const order: OrderDetailType[] = response.data.data;

  return <OrderDetail order={order} />;
};

export default OrderDetailPage;
