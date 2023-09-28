'use client';
import { CartItemType } from '@/types/cartItem';
import { api } from '@/utils/axios';

export const StripeCheckout = async (cartItems: CartItemType[]) => {
  const response = await api.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/checkout`,
    cartItems,
  );

  return response;
};
