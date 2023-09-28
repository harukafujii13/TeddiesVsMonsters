'use client';
import Cookies from 'js-cookie';

import { profileCookie } from '@/components/profilePage/ProfilePage';

export const setToken = (response: any) => {
  // if (typeof window === 'undefined') {
  //   return;
  // }
  console.log(response);
  Cookies.set('id', response.data.user.id);
  Cookies.set('jwt', response.data.jwt);
};

export const unsetToken = () => {
  if (typeof window === 'undefined') {
    return;
  }
  Cookies.remove('id');
  Cookies.remove('jwt');
  Cookies.remove(profileCookie);
};

export const getCookies = () => {
  const cookies = Cookies.get();
  return cookies;
};
