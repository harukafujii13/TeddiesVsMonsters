import { deleteCartItem } from '@/api/cart/delete-item';
import { getCartItems } from '@/api/cart/get-cart-items';
import { updateCart } from '@/api/cart/update-cart-items';
import { CartItemType } from '@/types/cartItem';
import { getProductImage } from '@/utils/get-image';
import { InputNumber } from 'antd';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import Button from '../button/Button';
import CheckoutModal from '../checkout-modal/CheckoutModal';

const CartModal = () => {
  const [isCartItemsLoading, setIsCartItemsLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isLoadSuccess, setIsLoadSuccess] = useState<boolean | null>(null);

  let totalPrice = 0;

  useEffect(() => {
    const loadCartItems = async () => {
      setIsCartItemsLoading(true);
      const userId = Cookies.get('id');

      if (userId) {
        const res = await getCartItems(userId);

        if (res.status === 200) {
          const cartData = res.data.data as CartItemType[];
          setCartItems(cartData);
          setIsLoadSuccess(true);
          setIsCartItemsLoading(false);
        } else {
          setCartItems([]);
          setIsLoadSuccess(false);
          setIsCartItemsLoading(false);
        }
      }

      setIsCartItemsLoading(false);
    };
    loadCartItems();

    return () => {
      localStorage.clear();
    };
  }, []);

  const updateCartItems = async (id: string | number, quantity: number) => {
    const newItem = await updateCart(id, quantity);

    if (!newItem) return null;

    setCartItems((prev) => {
      const newArr: CartItemType[] = [];
      for (let item of prev) {
        if (item.id === newItem.id) {
          newArr.push(newItem);
        } else {
          newArr.push(item);
        }
      }
      return newArr;
    });
  };

  const deleteItem = async (id: string | number) => {
    const newItem = await deleteCartItem(id);

    if (!newItem) return null;

    setCartItems((prev) => {
      const newArr: CartItemType[] = [];
      for (let item of prev) {
        if (item.id !== newItem.id) {
          newArr.push(item);
        }
      }
      return newArr;
    });
  };

  const parseCartItems = () => {
    if (!Cookies.get('jwt') || !isLoadSuccess)
      return <div className='font-bold'>Please Login First</div>;
    if (cartItems.length !== 0) {
      return cartItems.map((item: CartItemType) => {
        const { quantity, product, size: itemSize } = item.attributes;

        if (!product?.data?.attributes) return <li>Cart is empty</li>;
        const {
          name,
          price,
          no_image,
          size: productSize,
        } = product.data.attributes;
        totalPrice += quantity * Number(price);

        return (
          <li
            key={'itemID:' + item?.id}
            className='border-b-2 flex flex-col items-center md:flex-row border-primary-orange w-full my-5 pb-5'
          >
            <Image
              src={
                no_image ? getProductImage('NO_ITEM') : getProductImage(name)
              }
              alt='Item image'
              width={200}
              height={200}
            />
            <div className='w-1/2 flex flex-col justify-evenly'>
              <div>
                <div className='font-bold text-center'>{name}</div>
                {productSize === 'valid' && (
                  <div className='text-center'>Size: {itemSize}</div>
                )}
              </div>

              <div className='text-center md:flex md:flex-row-reverse md:justify-center mt-2 md:items-center'>
                <div className='ml-4'>${price}</div>
                <div>
                  <Image
                    id={`pulsFor${item?.id}`}
                    width={20}
                    height={20}
                    src={'/temp/+ 10.png'}
                    alt='puls'
                    className='inline'
                    onClick={async () => {
                      const inputEle: HTMLInputElement | null =
                        document.querySelector(`#inputFor${item?.id}`);

                      if (inputEle) {
                        const updateValue = Number(inputEle.value) + 1;
                        await updateCartItems(item?.id, updateValue);
                        inputEle.value = String(updateValue);
                      }
                    }}
                  />
                  &nbsp;&nbsp;
                  <InputNumber
                    id={`inputFor${item?.id}`}
                    className='w-12'
                    type='number'
                    controls={false}
                    value={quantity}
                    onChange={(value) => {
                      if (Number(value) < 0) return;
                      updateCartItems(item?.id, Number(value));
                    }}
                  />
                  &nbsp;&nbsp;
                  <Image
                    id={`minusFor${item?.id}`}
                    width={20}
                    height={20}
                    src={'/temp/- 1.png'}
                    alt='puls'
                    className='inline'
                    onClick={async () => {
                      const inputEle: HTMLInputElement | null =
                        document.querySelector(`#inputFor${item?.id}`);

                      if (inputEle) {
                        const updateValue = Number(inputEle.value) - 1;
                        if (updateValue <= 0) return;
                        await updateCartItems(item?.id, updateValue);
                        inputEle.value = String(updateValue);
                      }
                    }}
                  />
                </div>
              </div>
              <br />
              <div className='flex justify-center'>
                <Button
                  className='w-1/3 text-sm'
                  onClick={() => deleteItem(item.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          </li>
        );
      });
    } else {
      return <li>Cart is empty</li>;
    }
  };

  return (
    <>
      <div className='z-20 bg-primary-lightOrange w-[90%] max-w-[500px] h-2/3 rounded-lg fixed top-[5rem]  right-0 border-2 border-primary-orange flex flex-col items-center p-4'>
        <div className='overflow-y-auto h-5/6 w-full '>
          <ul className='flex flex-col items-center'>
            <ClipLoader
              color='#CE8C3D'
              loading={isCartItemsLoading}
              className='mt-20'
            />
            {!isCartItemsLoading && parseCartItems()}
          </ul>
        </div>

        {cartItems.length > 0 && (
          <div className='flex flex-col items-center w-11/12 mt-10'>
            <div className='grid grid-cols-2 grid-rows-2'>
              <span className='text-lg text-center'>Total</span>
              <span className='col-span-2 col-start-1 row-start-2 text-sm'>
                (shipping and Tax to be calculated)
              </span>
              <span className='text-lg col-start-2 row-start-1 text-center'>
                ${totalPrice}
              </span>
            </div>
            <CheckoutModal cartItems={cartItems} />
          </div>
        )}
      </div>
    </>
  );
};

export default CartModal;
