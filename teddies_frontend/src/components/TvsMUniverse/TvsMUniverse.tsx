'use client';

import Title from '@/components/title/title';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import Button from '@/components/button/Button';

const TvsMUniverse = () => {
  const [isHoveredTeddies, setIsHoveredTeddies] = useState(false);
  const [isHoveredMons, setIsHoveredMons] = useState(false);

  return (
    <>
      <Title text='CHOOSE YOUR SIDE!!!' />

      <div className='flex w-fit h-fit relative'>
        <div className='h-full w-1/2'>
          <Image
            src={'/temp/L BW 1.png'}
            width={864}
            height={1000}
            alt='Teddies side'
          />
        </div>
        <div className='h-full w-1/2'>
          <Image
            src='/temp/R BW 1.png'
            width={864}
            height={1000}
            alt='Teddies side'
          />
        </div>
        <div className='flex absolute h-full w-full'>
          <div
            className='h-full w-1/2'
            onMouseOver={() => setIsHoveredTeddies(true)}
            onMouseLeave={() => setIsHoveredTeddies(false)}
          >
            <AnimatePresence initial={false}>
              {isHoveredTeddies && (
                <motion.div
                  key='teddies'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  exit={{ opacity: 0 }}
                >
                  <Image
                    src={'/temp/L BW 1 (1).png'}
                    width={864}
                    height={1000}
                    alt='Teddies side'
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div
            className='h-full w-1/2'
            onMouseOver={() => setIsHoveredMons(true)}
            onMouseLeave={() => setIsHoveredMons(false)}
          >
            <AnimatePresence initial={false}>
              {isHoveredMons && (
                <motion.div
                  key='mons'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  exit={{ opacity: 0 }}
                >
                  <Image
                    src={'/temp/R BW 1 (1).png'}
                    width={864}
                    height={1000}
                    alt='Teddies side'
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className='z-10 absolute flex justify-around w-full top-[85%] pointer-events-none'>
          <Link href={'/tvsm-universe/teddies'}>
            <Button fifth onMouseEnter={() => setIsHoveredTeddies(true)}>
              Teddies
            </Button>
          </Link>
          <Link href={'/tvsm-universe/monster'}>
            <Button fifth onMouseEnter={() => setIsHoveredMons(true)}>
              Monster
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TvsMUniverse;
