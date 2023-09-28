import { ProductType } from '@/types/product';
import { getProductImage } from '@/utils/get-image';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../button/Button';

interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const imageUrl = product.attributes.no_image
    ? getProductImage('NO_ITEM')
    : getProductImage(product.attributes.name);

  return (
    <>
      <div className='w-[90%] aspect-[3/2] pb-3 max-w-[330px] mx-auto bg-primary-lightOrange rounded-xl border border-primary-orange'>
        <Image
          src={imageUrl}
          alt={product.attributes.name}
          width={0}
          height={0}
          sizes='100vw'
          priority
          className='w-full rounded-t-xl max-h-[290px] object-cover mb-2'
        />
        <div className='text-center text-lg'>
          <p className='font-semibold'>{product.attributes.name}</p>
          <p>$ {product.attributes.price}</p>
          <Link href={`/product-detail/${product.id}`} className='block'>
            <Button className='text-sm'>SEE DETAIL</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
