import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

const LandingHoverOverImage = ({
  img,
  hoverImg,
  alt,
  isHovered,
}: {
  img: string;
  hoverImg: string;
  alt: string;
  isHovered: boolean; //indicating whether the user is hovering over the image or not
}) => {
  return (
    <div className='relative'>
      <Image
        src={img}
        width={0}
        height={0}
        sizes='100vw'
        alt={alt}
        style={{ width: '100%', height: 'auto' }}
      />
      <AnimatePresence initial={false}>
        {isHovered && (
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
export default LandingHoverOverImage;
