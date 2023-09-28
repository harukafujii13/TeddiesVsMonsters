import { CartItemType } from '@/types/cartItem';
import { getCookies } from '@/utils/auth';
import { api } from '@/utils/axios';

export const deleteCartItem = async (itemId: string | number) => {
  const { jwt } = getCookies();
  const headerOpt = { headers: { Authorization: `Bearer ${jwt}` } };

  try {
    const res = await api.delete(`/api/cart-items/${itemId}`, headerOpt);

    if (res.status !== 200) throw new Error('fail to delete');

    return res.data.data as CartItemType;
  } catch (error) {
    console.log(error);
    return null;
  }
};
