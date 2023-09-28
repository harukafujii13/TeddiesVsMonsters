import { CategoryType, ProductType } from '@/types/product';
import { api } from '@/utils/axios';
import qs from 'qs';

export const getProductsByCategory = async (category: CategoryType) => {
  const query = qs.stringify({
    filters: {
      category: {
        $eq: category || 'games',
      },
    },
  });

  try {
    const res = await api.get(`/api/products?${query}`);

    return res.data.data as ProductType[];
  } catch (error) {
    console.log(error);
  }
};
