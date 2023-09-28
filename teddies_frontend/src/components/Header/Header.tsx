'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { RxCross1 } from 'react-icons/rx';
import { useMediaQuery } from 'react-responsive';
import CartModal from '../cart/CartModal';
import SnsIcons from '../snsIcons/snsIcons';
import UserModal from '../userModal/userModal';

const navigation = [
  { label: 'GAMES', to: '/games' },
  { label: 'TvsM UNIVERSE', to: '/tvsm-universe' },
  { label: 'EVENTS', to: '/events' },
  { label: 'SHOP', to: '/products' },
];

function Header() {
  const [navbar, setNavbar] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isTablet = useMediaQuery({ query: '(max-width: 767px)' });

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function openCart() {
    setIsModalOpen(false);
    setIsCartOpen(!isCartOpen);
  }

  function openUserModal() {
    setIsCartOpen(false);
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <div className='relative z-50'>
        <nav className='w-full flex items-center h-[5rem] bg-black fixed top-0 left-0 right-0 z-10'>
          <div
            className={`flex w-full  justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8  items-center`}
          >
            <div>
              <div className='flex items-center justify-between py-3 md:py-5 md:block'>
                {/* LOGO */}
                <Link href='/'>
                  <Image
                    src={'/temp/logo-2.png'}
                    alt='logo'
                    className=' mr-2'
                    width={120}
                    height={0}
                  />
                </Link>

                {/* HAMBURGER BUTTON FOR MOBILE */}
              </div>
            </div>
            <div className='flex   items-center'>
              <div
                className={`flex-1 justify-self-center pb-3 mt-8  md:block md:pb-0 md:mt-0 ${
                  navbar && isTablet
                    ? 'absolute w-full top-[2rem] left-0 z-99 bg-black'
                    : 'hidden'
                }`}
              >
                <ul className='h-screen md:h-auto items-center justify-start md:flex '>
                  {navigation.map((ele, index) => (
                    <li
                      key={index}
                      className='text-[20px] text-primary-lightOrange py-2 md:px-6 text-center border-b-2 md:border-b-0 hover:text-primary-orange border-none md:hover:text-primary-orange md:hover:bg-transparent'
                    >
                      <Link href={ele.to}>{ele.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className=' text-primary-lightOrange py-2  pl-6 pr-2 text-center flex h-[3rem]  border-b-2 items-center    border-none  '>
                <div onClick={openUserModal}>
                  <div className='text-3xl mb:text-4xl  ml-3 text-primary-orange'>
                    <FaUserCircle />
                  </div>
                </div>
                <div onClick={openCart}>
                  <div className='text-3xl mb:text-4xl ml-3 text-primary-orange'>
                    <FaCartShopping />
                  </div>
                </div>

                <div className='md:hidden'>
                  <div onClick={() => setNavbar(!navbar)}>
                    {navbar ? (
                      <div className='ml-3 text-3xl  text-primary-orange'>
                        <RxCross1 />
                      </div>
                    ) : (
                      <div className='ml-3 text-3xl  text-primary-orange'>
                        <FaBars />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {isCartOpen && <CartModal />}
        <div className='fixed z-10 right-1 top-[6rem]'>
          <SnsIcons />
        </div>

        <div className='absolute top-0'>
          <UserModal isOpen={isModalOpen} closeModal={closeModal} />
        </div>
      </div>
    </>
  );
}

export default Header;
