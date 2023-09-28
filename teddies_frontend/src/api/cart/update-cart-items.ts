import { CartItemType } from '@/types/cartItem';
import { getCookies } from '@/utils/auth';
import { api } from '@/utils/axios';

export const updateCart = async (id: string | number, quantity: number) => {
  const { jwt } = getCookies();
  const headerOpt = { headers: { Authorization: `Bearer ${jwt}` } };

  try {
    const res = await api.put(
      `/api/cart-items/${id}?populate=product`,
      { data: { quantity } },
      headerOpt,
    );

    if (res.status !== 200) throw new Error('fail to update');

    return res.data.data as CartItemType;
  } catch (error) {
    console.log(error);
    return null;
  }
};
