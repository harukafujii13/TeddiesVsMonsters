import LandingHoverContainer from '@/components/LandingHoverOverImage/LandingHoverContainer';
import type { Metadata } from 'next';

interface ImageDetailsProp {
  imgSrc: string;
  hoverImgSrc: string;
  alt: string;
  buttonText: string;
  linkTo: string;
}

export const metadata: Metadata = {
  title: 'Home | Teddies vs Monsters',
};

const imageDetails: ImageDetailsProp[] = [
  {
    imgSrc: '/temp/Main Screen 1.png',
    hoverImgSrc: '/temp/Main Screen 1 (1).png',
    alt: 'Landing page',
    buttonText: 'SHOP NOW',
    linkTo: '/products',
  },
  {
    imgSrc: '/temp/Swamp Monster BW 1.png',
    hoverImgSrc: '/temp/Swamp Monster BW 1 (1).png',
    alt: 'Landing page',
    buttonText: 'LEARN MORE',
    linkTo: '/tvsm-universe',
  },
];

export default function Home() {
  return (
    <main>
      {imageDetails.map((detail, index) => (
        <LandingHoverContainer key={index} {...detail} />
      ))}
    </main>
  );
}
