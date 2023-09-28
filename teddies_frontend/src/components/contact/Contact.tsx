'use client';
import Button from '@/components/button/Button';
import Input from '@/components/form/Input';
import TextArea from '@/components/form/TextArea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';

interface FormData {
  subject: string;
  name: string;
  email: string;
  orderNumber: string;
  message: string;
}

const Contact = () => {
  const [sendMessage, setSendMessage] = useState({ success: '', error: '' });

  const schema: ZodType<FormData> = z.object({
    subject: z.string().min(1, { message: 'This field is required' }),
    name: z.string().min(1, { message: 'This field is required' }),
    email: z.string().email('Invalid email form'),
    orderNumber: z.string(),
    message: z.string().min(1, { message: 'This field is required' }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitHandler = async (data: FormData) => {
    try {
      console.log(data);
      setSendMessage({ success: 'Successfully Sended!', error: '' });
      reset();
    } catch (error) {
      setSendMessage({ success: '', error: 'Something Went Wrong' });
    }
  };

  return (
    <>
      <div className='py-5 md:py-16'>
        <h1 className='pb-3 md:pb-10'>contact us</h1>
        <form
          className='flex flex-col items-center w-[90%] max-w-[650px] mx-auto gap-y-8'
          onSubmit={handleSubmit(submitHandler)}
        >
          <Input
            label='subject'
            register={register}
            registerName='subject'
            error={errors.subject}
          />
          <Input
            label='name'
            register={register}
            registerName='name'
            error={errors.name}
          />
          <Input
            label='email'
            register={register}
            registerName='email'
            type='email'
            error={errors.email}
          />
          <Input
            label={'order number (if applicable)'}
            register={register}
            registerName='orderNumber'
            error={errors.orderNumber}
          />
          <TextArea
            label='message'
            register={register}
            registerName='message'
            error={errors.message}
            className='h-[150px]'
          />

          <Button type='submit' className='text-lg w-32'>
            SEND
          </Button>
        </form>

        {sendMessage.success && (
          <p className='w-1/3 mx-auto py-2 mt-5 text-center text-sm font-bold rounded-full bg-secondary-green'>
            {sendMessage.success}
          </p>
        )}
        {sendMessage.error && (
          <p className='inline-flex py-2 px-5 text-sm rounded-full bg-secondary-pink'>
            {sendMessage.error}
          </p>
        )}
      </div>
    </>
  );
};

export default Contact;
