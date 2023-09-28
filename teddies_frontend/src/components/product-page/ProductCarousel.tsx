'use client';
import { ProductType } from '@/types/product';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CustomLeftArrow, CustomRightArrow } from './CustomArrows';
import ProductCard from './ProductCard';

interface ProductCarouselProps {
  products: ProductType[];
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  return (
    <>
      {products.length > 0 && (
        <div className='relative md:w-[90%] max-w-[1300px] mx-auto'>
          <Carousel
            responsive={responsive}
            infinite
            showDots={false}
            customRightArrow={<CustomRightArrow />}
            customLeftArrow={<CustomLeftArrow />}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Carousel>
        </div>
      )}

      {products.length < 1 && (
        <div className='text-center my-10 text-secondary-gray font-semibold'>
          COMING SOON!
        </div>
      )}
    </>
  );
};

export default ProductCarousel;
