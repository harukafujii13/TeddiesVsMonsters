'use client';

import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/button/Button';
import HoverOverImage from '@/components/HoverOverImage/HoverOverImage';
import { useWindowSize } from '@/customHooks/useWindowSize';

const Teddies = () => {
  const windowWidth = useWindowSize();

  return (
    <div className='mb-20'>
      <div className='grid grid-cols-3 h-48'>
        <div className='grid place-content-center'>
          <Link href={'/tvsm-universe'}>
            <Button className='bg-primary-orange pointer-events-auto w-14 h-14'>
              {'<'}
            </Button>
          </Link>
        </div>
        <div className='grid place-content-center'>
          <p className='font-LDRKaet text-4xl'>Teddies</p>
        </div>
      </div>
      {windowWidth >= 1024 && (
        <>
          <HoverOverImage
            img='/temp/Archer BW 1.png'
            hoverImg='/temp/Archer BW 1 (1).png'
            alt='archer'
          />
          <HoverOverImage
            img='/temp/Panda BW 1.png'
            hoverImg='/temp/Panda BW 1 (1).png'
            alt='panda'
          />
        </>
      )}
      {windowWidth < 1024 && (
        <>
          <Image
            src='/temp/Archer BW 1 (1).png'
            width={0}
            height={0}
            sizes='100vw'
            alt='archer'
            style={{ width: '100%', height: 'auto' }}
          />
          <Image
            src='/temp/Panda BW 1 (1).png'
            width={0}
            height={0}
            sizes='100vw'
            alt='panda'
            style={{ width: '100%', height: 'auto' }}
          />
        </>
      )}
    </div>
  );
};

export default Teddies;
