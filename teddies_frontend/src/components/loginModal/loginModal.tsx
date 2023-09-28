'use client';

import { login } from '@/api/auth/login';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../button/Button';
import Input from '../form/Input';
interface FormData {
  identifier: string;
  password: string;
}

interface LoginModalProps {
  closeModal: () => void;
  message: string;
  postLoginFunction?: () => void;
}

const schema = z.object({
  identifier: z.string().email('Invalid email address'),
  password: z.string().min(1, 'You need to fill in the password field'),
});

const LogInModal: FC<LoginModalProps> = ({
  closeModal,
  message,
  postLoginFunction,
}) => {
  const [authError, setAuthError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitHandler = async (data: FormData) => {
    const res = await login(data);

    if (res?.status !== 200) {
      return setAuthError('Fail to LOGIN');
    }

    // TODO: navigate to stripe
    console.log('successfully logged in', res);
    setAuthError('');
    if (postLoginFunction) {
      postLoginFunction();
    }
    closeModal();
  };

  return (
    <>
      <div className='h-screen w-screen bg-black/20 fixed top-0 left-0'></div>
      <div className='w-[90%] fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 mx-auto md:max-w-[800px] bg-primary-lightOrange px-5 rounded-2xl'>
        <button
          className='w-8 h-8 p-1 my-2 border rounded-xl border-primary-orange flex ml-auto group hover:bg-primary-orange'
          onClick={closeModal}
        >
          <FontAwesomeIcon
            icon={faXmark}
            className='flex w-full h-full items-center group-hover:text-white text-secondary-gray'
          />
        </button>
        <div className='max-w-[500px] mx-auto'>
          <h1>{message}</h1>
          <form onSubmit={handleSubmit(submitHandler)} className='space-y-5'>
            <Input
              type='email'
              placeholder='Enter your Email'
              register={register}
              registerName='identifier'
              error={errors.identifier}
            />
            <Input
              type='password'
              placeholder='Enter your Password'
              register={register}
              registerName='password'
              error={errors.password}
            />

            <div className='flex pt-3 pb-5 flex-col gap-y-3 max-w-[300px] mx-auto md:max-w-full md:flex-row md:justify-evenly md:gap-x-5'>
              <Button type='submit' className='text-lg px-3 md:w-full'>
                LOG IN
              </Button>
              <Button className='text-lg px-3 md:w-full'>
                CONTINUE AS GUEST
              </Button>
            </div>

            {authError && (
              <p className='text-danger pb-10 text-center font-bold'>
                {authError}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default LogInModal;
