import { setToken } from '@/utils/auth';
import { api } from '@/utils/axios';

export const login = async (data: { identifier: string; password: string }) => {
  try {
    const response = await api.post('/api/auth/local', data);

    setToken(response);
    return response;
  } catch (error: any) {
    console.error(error?.response?.data?.error?.message);
  }
};
