'use client';
import Button from '@/components/button/Button'; // Adjust the path as needed
import { SizeType } from '@/types/product';
import { api } from '@/utils/axios';
import { addItemToCart } from '@/utils/strapi';
import { toastError } from '@/utils/toasty';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import LoginModal from '../loginModal/loginModal';

type AddToCartProps = {
  sizes: SizeType[] | null;
  productId: string;
};

const AddToCart: React.FC<AddToCartProps> = ({ sizes, productId }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<string | number>('1');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const addItemFunction = () => {
    addItemToCart(productId, selectedSize, quantity);
  };

  const handleAddToCart = async () => {
    if (sizes && !selectedSize) {
      setSizeError(true);
      return;
    }
    const userJwt = Cookies.get('jwt');
    if (userJwt) {
      try {
        const response = await api.get('/api/users/me', {
          headers: {
            Authorization: `Bearer ${userJwt}`,
          },
        });
        if (response.statusText === 'OK') {
          addItemToCart(productId, selectedSize, quantity);
        } else {
          console.log('here');

          setIsModalOpen(true);
        }
      } catch (error) {
        console.error('An error occurred while adding to cart:', error);
        setIsModalOpen(true);
      }
    } else {
      // setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <LoginModal
          closeModal={closeModal}
          message={'Please Login'}
          postLoginFunction={addItemFunction}
        />
      )}
      {sizeError && toastError('Please select a size!')}
      {sizes && (
        <div className='flex flex-col mb-7 justify-strat'>
          <div className='flex flex-row justify-between mb-2'>
            <p className='font-sans text-xl font-bold'>Size</p>
          </div>
          <div>
            <ul className='flex justify-start gap-4'>
              {sizes.map((size, index) => {
                const uniqueId = `hosting-${index}`;
                return (
                  <li
                    key={index}
                    className='w-[4rem] h-[4rem] bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center'
                  >
                    <input
                      type='radio'
                      id={uniqueId}
                      name='hosting'
                      value={`hosting-${index}`}
                      className='hidden peer'
                      onChange={() => {
                        setSelectedSize(size.size);
                        setSizeError(false); // Clear the error
                      }}
                      required
                    />
                    <label
                      htmlFor={uniqueId}
                      className='flex items-center justify-center w-full p-5 text-black bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-primary-orange peer-checked:text-primary-orange hover:text-gray-600 hover:bg-gray-100'
                    >
                      <div className='block'>
                        <div className='w-full text-lg font-semibold'>
                          {size.size}
                        </div>
                      </div>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      <div className='mb-7 flex-col flex justify-end'>
        <label
          htmlFor='quantity'
          className='font-sans text-xl font-bold block mb-2'
        >
          Quantity
        </label>
        <select
          id='quantity'
          className='bg-white lg:w-[8rem] md:w-[8rem] w-[15rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-orange focus:border-primary-orange block  p-2.5'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        >
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
        </select>
      </div>

      <div className='flex justify-center mb-7'>
        <Button tertiary onClick={handleAddToCart}>
          Add Cart
        </Button>
      </div>
    </>
  );
};

export default AddToCart;
