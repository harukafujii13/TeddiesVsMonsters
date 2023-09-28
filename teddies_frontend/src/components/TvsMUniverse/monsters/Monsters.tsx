'use client';

import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/button/Button';
import HoverOverImage from '@/components/HoverOverImage/HoverOverImage';
import { useWindowSize } from '@/customHooks/useWindowSize';

const Monsters = () => {
  const windowWidth = useWindowSize();

  return (
    <div className='mb-20'>
      <div className='grid grid-cols-3 h-48'>
        <div className='grid place-content-center'>
          <Link href={'/tvsm-universe'}>
            <Button className='bg-primary-orange pointer-events-auto w-14 h-14'>
              {' < '}
            </Button>
          </Link>
        </div>
        <div className='grid place-content-center'>
          <p className='font-LDRKaet text-4xl'>Monster</p>
        </div>
      </div>
      {windowWidth >= 1024 && (
        <>
          <HoverOverImage
            img='/temp/Ghost BW 1.png'
            hoverImg='/temp/Ghost BW 1 (1).png'
            alt='ghost'
          />
          <HoverOverImage
            img='/temp/Swamp Monster BW 1.png'
            hoverImg='/temp/Swamp Monster BW 1 (1).png'
            alt='swamp'
          />
        </>
      )}
      {windowWidth < 1024 && (
        <>
          <Image
            src='/temp/Ghost BW 1 (1).png'
            width={0}
            height={0}
            sizes='100vw'
            alt='ghost'
            style={{ width: '100%', height: 'auto' }}
          />
          <Image
            src='/temp/Swamp Monster BW 1 (1).png'
            width={0}
            height={0}
            sizes='100vw'
            alt='swamp'
            style={{ width: '100%', height: 'auto' }}
          />
        </>
      )}
    </div>
  );
};

export default Monsters;
