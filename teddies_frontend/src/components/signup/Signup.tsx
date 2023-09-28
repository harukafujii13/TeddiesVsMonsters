'use client';

import Input from '@/components/form/Input';
import { setToken } from '@/utils/auth';

import { api } from '@/utils/axios';
import { toastError, toastSuccess } from '@/utils/toasty';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';

interface FormData {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

const Form: React.FC = () => {
  const router = useRouter();
  const schema: ZodType<FormData> = z
    .object({
      email: z.string().email(),
      confirmEmail: z.string().email(),
      password: z
        .string()
        .min(6)
        .max(20)
        .refine((value) => /^(?=.*[a-zA-Z])(?=.*\d).*$/.test(value), {
          message: 'Password must contain both letters and numbers',
        }),
      confirmPassword: z.string().min(6).max(20),
      firstName: z.string().min(1).max(30),
      lastName: z.string().min(1).max(30),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    })
    .refine((data) => data.email === data.confirmEmail, {
      message: 'Email do not match',
      path: ['confirmEmail'],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const submitHandler = async (data: FormData) => {
    const slugName = `${data.firstName.toLowerCase()}-${data.lastName.toLowerCase()}-${crypto.randomUUID()}`;

    try {
      const response = await api.post('/api/auth/local/register', {
        username: slugName,
        email: data.email,
        password: data.password,
        first_name: data.firstName,
        last_name: data.lastName,
      });
      setToken(response);
      if (response?.status === 200) {
        toastSuccess('Sign up successfuly!');
        router.push(`/profile/${slugName}`);
      }
    } catch (error: any) {
      if (
        error.response?.data?.error?.message ===
        'Email or Username are already taken'
      ) {
        toastError('An account already exists with the email you entered.');
      } else {
        toastError(error.response?.data?.error?.message);
      }
    }
  };

  return (
    <div className='w-4/5 md:w-3/5 mx-auto mt-[180px] mb-[150px]'>
      <h1>Welcome to TVSM</h1>
      <form
        className='flex flex-col  w-full mx-auto'
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className='w-full  md:mb-[15px]'>
          <Input
            type='email'
            placeholder='Enter your email'
            width='w-full'
            register={register}
            registerName='email'
          />
          {errors.email && (
            <span className='form_invalid_message'>{errors.email.message}</span>
          )}
        </div>
        <div className='mb-[15px] md:mb-[20px]'>
          <Input
            type='email'
            placeholder='Re-enter your Email'
            width='w-full'
            register={register}
            registerName='confirmEmail'
          />

          {errors.confirmEmail && (
            <span className='form_invalid_message'>
              {errors.confirmEmail.message}
            </span>
          )}
        </div>
        <div className=' max-md:flex-col md:gap-[2%] md:mb-[20px] md:flex mb-[10px]'>
          <div className='flex flex-col md:w-[49%] w-full'>
            <Input
              type='password'
              placeholder='Enter your password'
              width='w-full'
              register={register}
              registerName='password'
            />
            {errors.password && (
              <span className='form_invalid_message'>
                {errors.password.message}
              </span>
            )}
          </div>

          <div className='flex flex-col md:w-[49%] w-full'>
            <Input
              type='password'
              placeholder='Re-enter your password'
              width='w-full'
              register={register}
              registerName='confirmPassword'
            />
            {errors.confirmPassword && (
              <span className='form_invalid_message'>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
        <div className='max-md:flex-col md:flex md:gap-[2%]  mb-[20px]'>
          <div className='flex flex-col w-full md:w-[49%] md:mb-[15px]'>
            <Input
              type='text'
              placeholder='First Name'
              width='w-full'
              register={register}
              registerName='firstName'
            />
            {errors.firstName && (
              <span className='form_invalid_message'>
                {errors.firstName.message}
              </span>
            )}
          </div>
          <div className='flex flex-col  w-full md:w-[49%] '>
            <Input
              type='text'
              placeholder='Last Name'
              width='w-full'
              register={register}
              registerName='lastName'
            />
            {errors.lastName && (
              <span className='form_invalid_message'>
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>
        <div className='flex max-md:flex-col md:gap-[2%] max-md:gap-[10px] text-white uppercase'>
          <Link
            href='/'
            className='bg-[#CE8C3D] px-3 md:py-4 py-3 w-full md:w-[49%] rounded-[10px] text-center 
            border-primary-lightOrange hover:border-primary-orange hover:bg-primary-lightOrange hover:text-primary-orange
            transition-colors duration-200 ease-in-out border-2 '
          >
            Continue as guest
          </Link>
          <input
            type='submit'
            className='bg-[#CE8C3D] px-3 md:py-4 py-3 w-full md:w-[49%] rounded-[10px] 
            border-primary-lightOrange hover:border-primary-orange hover:bg-primary-lightOrange hover:text-primary-orange hover:cursor-pointer
            transition-colors duration-200 ease-in-out border-2 '
            value='SIGN UP'
          />
        </div>
      </form>
      <div className='mt-[16px] max-md:text-[14px] w-full text-end block '>
        <span>have an account? </span>
        <Link
          href='/login'
          className='border-b border-primary-orange cursor-pointer hover:text-gray-500 '
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Form;
