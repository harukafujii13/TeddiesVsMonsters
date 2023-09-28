import { getCookies } from '@/utils/auth';
import { api } from '@/utils/axios';
import qs from 'qs';

export const getCartItems = async (userId: string) => {
  const { jwt } = getCookies();
  const headerOpt = { headers: { Authorization: `Bearer ${jwt}` } };

  const query = qs.stringify(
    {
      filters: {
        users_permissions_user: {
          id: {
            $eq: userId,
          },
        },
      },
      populate: ['product'],
    },
    {
      encodeValuesOnly: true,
    },
  );

  const res = await api.get(`/api/cart-items?${query}`, headerOpt);

  return res;
};
