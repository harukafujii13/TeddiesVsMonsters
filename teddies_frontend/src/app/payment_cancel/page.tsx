import type { Metadata } from 'next';
import React from 'react';
import { BiErrorCircle } from 'react-icons/bi';

export const metadata: Metadata = {
  title: 'Payment cancelled!',
};

const PaymentCancelled: React.FC = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white shadow-lg rounded-lg p-8 max-w-md'>
        <h1 className='text-2xl font-semibold mb-4'>Payment cancelled!</h1>

        <div className='flex items-center justify-center text-8xl mb:text-4xl mb-4 text-primary-orange'>
          <BiErrorCircle />
        </div>

        <p className='text-gray-600 text-center mb-4'>
          We are sorry.
          <br />
          The payment for your order could not be completed.
          <br />
          Please try again.
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

export default PaymentCancelled;
