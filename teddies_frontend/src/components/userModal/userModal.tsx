'use client';

import { User } from '@/types/user';
import { unsetToken } from '@/utils/auth';
import { api } from '@/utils/axios';
import { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

interface UserModalprops {
  isOpen: boolean;
  closeModal: () => void;
}

const UserModal: FC<UserModalprops> = ({ isOpen, closeModal }) => {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const router = useRouter();
  const token = Cookies.get('jwt');

  useEffect(() => {
    if (token) {
      setIsUserLoggedIn(true);
      api('/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res: AxiosResponse) => {
          setUserProfile(res.data);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [token]);

  const signOut = () => {
    unsetToken();
    setIsUserLoggedIn(false);
    router.push('/');
    closeModal();
  };

  return (
    <div
      className={`z-50 fixed top-0 right-0 mt-20 w-[17rem] h-auto  bg-primary-orange p-[0.5rem] rounded shadow-lg border-white border-4 border-double ${
        isOpen ? '' : 'hidden'
      }`}
    >
      {isUserLoggedIn ? (
        <div className='flex flex-col justify-center items-center gap-4 my-8 text-lg '>
          <Link href={`/profile/${userProfile?.username || ''}`}>
            <button
              className='text-white border-solid border-b-2 border-white'
              onClick={closeModal}
            >
              MANAGE ACCOUNT
            </button>
          </Link>

          {/* ページ更新/リフレッシュ */}
          <div onClick={signOut}>
            <button className='text-white border-solid border-b-2 border-white'>
              SIGN OUT
            </button>
          </div>
        </div>
      ) : (
        <div className='my-8 text-lg flex justify-center items-center flex-row '>
          <Link href='/login'>
            <button
              className='text-white border-solid border-b-2 border-white'
              onClick={closeModal}
            >
              LOG IN
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserModal;
