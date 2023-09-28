import AddToCart from '@/components/addToCart/AddToCart';
import Title from '@/components/title/title';
import { api } from '@/utils/axios';
import type { Metadata } from 'next';
import Image from 'next/image';

type Props = {
  params: { product: string };
};

const sizes = [{ size: 'S' }, { size: 'M' }, { size: 'L' }, { size: 'XL' }];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const productId = params.product;
  const product = await api.get(`/api/products/${productId}`);
  const productName = product.data.data.attributes.name;

  return {
    title: productName,
  };
}

const ProductDetail = async ({ params }: { params: { product: string } }) => {
  const productId = params.product;
  const response = await api.get(`/api/products/${productId}`);

  const productDetail = response.data.data.attributes;

  return (
    <>
      <Title text='SHOP' />
      <div className='lg:w-[80%] md:w-[80%] w-full m-auto'>
        <div className='flex lg:flex-row md:flex-row justify-center flex-col'>
          <div className='lg:w-80 md:w-80 w-full h-full mr-10'>
            {!response.data.data.attributes.no_image && (
              <Image
                layout='responsive'
                width={100}
                height={100}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1/merchandise/${productDetail.name}`}
                alt='product image'
              />
            )}
          </div>

          <div className='mx-2 md:mx-0 lg:mx-0 lg:mt-0 md:mt-0 mt-8'>
            <div className='flex flex-row items-end w-full justify-start'>
              <p className='font-sans lg:text-4xl md:text-lg text-3xl font-semibold'>
                {productDetail.name}
              </p>
              <div className='flex flex-col items-start ml-10'>
                <p className='font-sans text-light lg:text-sm text-xs'>Price</p>
                <p className='font-sans lg:text-4xl md:text-lg text-3xl font-semibold'>
                  ${productDetail.price}
                </p>
              </div>
            </div>

            <div className='my-8 flex flex-col lg:pb-10 md:pb-6 pb-4'>
              <AddToCart
                productId={response.data.data.id}
                sizes={productDetail.size !== 'invalid' ? sizes : null}
                //it is only passed if the product size is not 'invalid', otherwise, it is passed as null.
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
