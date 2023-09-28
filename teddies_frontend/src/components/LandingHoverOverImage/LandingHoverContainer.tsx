'use client';

import LandingHoverOverImage from '@/components/LandingHoverOverImage/LandingHoverOverImage';
import Link from 'next/link';
import { useState } from 'react';
import Button from '../button/Button';

const LandingHoverContainer = ({
  imgSrc,
  hoverImgSrc,
  alt,
  buttonText,
  linkTo,
}: {
  imgSrc: string;
  hoverImgSrc: string;
  alt: string;
  buttonText: string;
  linkTo: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  //track whether the mouse is hovering over the component

  return (
    <div
      className='relative'
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <LandingHoverOverImage
        img={imgSrc}
        hoverImg={hoverImgSrc}
        alt={alt}
        isHovered={isHovered}
      />
      <Button secondary>
        <Link href={linkTo}>{buttonText}</Link>
      </Button>
    </div>
  );
};

export default LandingHoverContainer;
