import ProductCarousel from '@/components/product-page/ProductCarousel';
import { ProductType } from '@/types/product';

interface SectionCategoryProps {
  title: string;
  products: ProductType[] | undefined;
}

const SectionCategory = ({ title, products }: SectionCategoryProps) => {
  return (
    <>
      <div>
        <h2 className='font-LDRKaet text-2xl text-center mb-5 md:text-3xl xl:text-4xl'>
          {title}
        </h2>
        {products && <ProductCarousel products={products} />}
      </div>
    </>
  );
};

export default SectionCategory;
