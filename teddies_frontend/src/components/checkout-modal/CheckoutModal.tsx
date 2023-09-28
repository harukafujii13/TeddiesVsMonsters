'use client';

import { isTokenValid } from '@/api/token-verify/token-verify';
import { CheckoutModalProps } from '@/types/cartItem';
import { getCookies } from '@/utils/auth';
import { StripeCheckout } from '@/utils/stripe';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../button/Button';
import LogInModal from '../loginModal/loginModal';

const CheckoutModal = ({ cartItems }: CheckoutModalProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  console.log(cartItems);
  const isLoggedIn = async () => {
    const { jwt } = getCookies();
    if (!jwt) return setOpen(true);

    // check if the token is valid
    const result = await isTokenValid(jwt);

    if (result?.tokenValid) {
      // TODO: navigate to stripe
      const response = await StripeCheckout(cartItems);
      console.log('token valid', result, cartItems);
      router.push(response.data.url);
      return;
    }

    return setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={isLoggedIn}>CHECK OUT</Button>

      {open && (
        <LogInModal closeModal={closeModal} message={'proceed to checkout'} />
      )}
    </>
  );
};

export default CheckoutModal;
