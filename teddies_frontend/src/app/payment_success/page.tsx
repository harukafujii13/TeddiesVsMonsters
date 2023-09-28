import type { Metadata } from 'next';
import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';

export const metadata: Metadata = {
  title: 'Payment completed!',
};

const PaymentCompleted: React.FC = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg p-8 max-w-md '>
        <h1 className='text-2xl font-semibold mb-4'>Payment completed!</h1>

        <div className='flex items-center justify-center text-8xl mb:text-4xl mb-4 text-primary-orange'>
          <AiOutlineCheckCircle />
        </div>

        <p className='text-gray-600 text-center mb-4'>
          Thank you.
          <br />
          Your order has been successfully completed.
        </p>
        <div className='flex justify-center'>
          {/* replace button component later */}
          <button className='flex items-center justify-center mt-4 bg-primary-orange hover:bg-primary-lightOrange text-white px-4 py-2 rounded'>
            Back to homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCompleted;
