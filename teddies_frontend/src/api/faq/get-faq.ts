import { FAQ } from '@/types/faq';
import { api } from '@/utils/axios';
import qs from 'qs';

export const getFaqs = async () => {
  const query = qs.stringify({
    sort: ['updatedAt:desc'],
    pagination: {
      limit: 3,
    },
  });

  try {
    const res = await api.get(`/api/faqs?${query}`);

    return res.data.data as FAQ[];
  } catch (error) {
    console.log(error);
  }
};
