'use client';

import { login } from '@/api/auth/login';
import Input from '@/components/form/Input';
import { toastError, toastSuccess } from '@/utils/toasty';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';

interface FormData {
  identifier: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  const schema: ZodType<FormData> = z.object({
    identifier: z
      .string()
      .min(1, { message: 'You need to fill in the email field' })
      .email('Invalid Email form'), // Custom error message for empty email
    password: z
      .string()
      .min(1, { message: 'You need to fill in the password field' }), // Custom error message for empty password
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const submitHandler = async (data: FormData) => {
    const response = await login(data);

    if (response?.status === 200) {
      router.push(`/profile/${response.data.user.username}`);
      toastSuccess('login success!!');
    } else if (response?.status === 500) {
      toastError('internet server connection failed');
    } else {
      toastError('incorrect email or password');
    }
  };

  return (
    <div className='w-4/5 md:w-3/5 mx-auto max-w-[550px] font-mulish mt-[180px] mb-[150px]'>
      <h1>Login to TVSM</h1>
      <form
        className='flex flex-col w-full mb-[25px]'
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className='w-full mb-[10px]'>
          <Input
            type='email'
            placeholder='Enter your email'
            width='w-full'
            register={register}
            registerName='identifier'
          />
          {errors.identifier && (
            <span className='form_invalid_message'>
              {errors.identifier.message}
            </span>
          )}
        </div>
        <div className='mb-[25px]'>
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

        <div className='flex gap-[2%] text-white uppercase'>
          <input
            type='submit'
            className='bg-[#CE8C3D] px-3 py-3 md:py-4 w-full rounded-[10px] uppercase  border-primary-lightOrange hover:border-primary-orange hover:bg-primary-lightOrange hover:text-primary-orange hover:cursor-pointer
            transition-colors duration-200 ease-in-out border-2 '
            value='Login'
          />
        </div>
      </form>
      <div className='mt-[16px] max-md:text-[14px] w-full text-end block '>
        <span>Don&apos;t have an account? </span>
        <Link
          href='/signup'
          className='border-b border-primary-orange cursor-pointerfont-mulish hover:border-primary-orange hover:bg-primary-lightOrange hover:text-primary-orange'
        >
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Login;
