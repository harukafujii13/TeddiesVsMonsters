import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { getCookies } from './auth';
import { api } from './axios';
import { toastError, toastSuccess } from './toasty';

export const getEvents = async () => {
  try {
    const response = await api.get(
      '/api/events?sort[0]=end&sort[1]=date%3Aasc&sort[2]=title%3Adesc&pagination[start]=0&populate=*',
    );
    const eventsArr = response.data.data;
    console.log(eventsArr, 'arrrrrrrrr');
    return eventsArr;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      console.log(error.response.data, 'arrrrrrrrr');
      console.log(error.response.status);
      console.log(error.response.headers);
    }
    return [];
  }
};

// id, size, quantity
// /api/cart-items
export const addItemToCart = async (
  productId: string,
  selectedSize: string | null,
  quantity: string | number,
) => {
  const userId = Cookies.get('id');
  const { jwt } = getCookies();
  const headerOpt = { headers: { Authorization: `Bearer ${jwt}` } };

  try {
    const response = await api.post(
      '/api/cart-items',
      {
        data: {
          quantity: quantity,
          product: productId,
          users_permissions_user: userId,
          size: selectedSize,
        },
      },
      headerOpt,
    );
    toastSuccess('Successfully added to cart');
  } catch (error) {
    toastError('Unable to add items to cart');
  }
};
