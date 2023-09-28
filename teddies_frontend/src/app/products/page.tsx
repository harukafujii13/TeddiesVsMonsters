import { getProductsByCategory } from '@/api/product/product-by-category';
import SectionCategory from '@/components/product-page/SectionCategory';
import Title from '@/components/title/title';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop',
};

export const revalidate = 0;


const ProductPage = async () => {
  const gamesProduct = await getProductsByCategory('games');
  const clotheProduct = await getProductsByCategory('clothe');
  const accessoryProduct = await getProductsByCategory('accessory');

  return (
    <>
      <Title text='shop' />
      <div className='space-y-10 md:space-y-20 mb-16'>
        <SectionCategory
          title='games/gaming accessories'
          products={gamesProduct}
        />
        <SectionCategory title='t-shirts' products={clotheProduct} />
        <SectionCategory title='keychains' products={accessoryProduct} />
      </div>
    </>
  );
};

export default ProductPage;
