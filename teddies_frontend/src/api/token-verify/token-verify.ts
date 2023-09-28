import { api } from '@/utils/axios';

export const isTokenValid = async (token: string) => {
  try {
    const res = await api.get('/api/token-decrypt', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.authorization) {
      console.log(res);
      return { tokenValid: true };
    }
  } catch (error) {
    // if the token is invalid, show login modal
    console.log('token is invalid');
    return { tokenValid: false };
  }
};
