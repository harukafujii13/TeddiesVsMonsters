'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const HoverOverImage = ({
  img,
  hoverImg,
  alt,
}: {
  img: string;
  hoverImg: string;
  alt: string;
}) => {
  const [isHoveredImg, setIsHoveredImg] = useState(false);
  return (
    <div
      className='relative'
      onMouseOver={() => setIsHoveredImg(true)}
      onMouseLeave={() => setIsHoveredImg(false)}
    >
      <Image
        src={img}
        width={0}
        height={0}
        sizes='100vw'
        alt={alt}
        style={{ width: '100%', height: 'auto' }}
      />
      <AnimatePresence initial={false}>
        {isHoveredImg && (
          <motion.div
            key='img1'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0 }}
          >
            <Image
              src={hoverImg}
              width={0}
              height={0}
              sizes='100vw'
              alt={alt}
              style={{ width: '100%', height: 'auto' }}
              className='absolute top-0'
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HoverOverImage;
