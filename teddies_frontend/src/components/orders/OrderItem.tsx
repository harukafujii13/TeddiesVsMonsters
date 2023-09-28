import Image from 'next/image';

interface OrderItemProps {
  productName: string;
  price: string;
  image: string;
  number: string;
  size: string;
  date: string;
  shipTo: string;
  status: string;
}

const OrderItem = ({
  productName,
  price,
  image,
  number,
  size,
  date,
  shipTo,
  status,
}: OrderItemProps) => {
  return (
    <>
      <div className=' flex flex-row justify-center border-b-2 border-primary-orange mb-6 pb-6'>
        <div className='w-9/12 m-auto grid grid-cols-3 gap-4'>
          <Image
            src={image}
            width={225}
            height={225}
            alt={productName}
            className=''
          />
          <div className='col-span-2'>
            <div className='w-full grid grid-cols-2 gap-4 '>
              <p className='font-sans lg:text-2xl md:text-lg text-1xl '>
                {'Title'}
              </p>
              <p className='font-sans lg:text-2xl md:text-lg text-1xl '>
                {productName}
              </p>
            </div>
            <div className='w-full grid grid-cols-2 gap-4'>
              <p className='font-sans lg:text-2xl md:text-lg text-1xl '>
                {'Cost'}
              </p>
              <p className='font-sans lg:text-2xl md:text-lg text-1xl '>
                ${price}
              </p>
            </div>
            <div className='w-full grid grid-cols-2 gap-4'>
              <p className='font-sans lg:text-2xl md:text-lg text-1xl '>
                {'Number'}
              </p>
              <p className='font-sans lg:text-2xl md:text-lg text-1xl '>
                {number}
              </p>
            </div>
            {size && (
              <div className='w-full grid grid-cols-2 gap-4'>
                <p className='font-sans lg:text-2xl md:text-lg text-1xl '>
                  {'Size'}
                </p>
                <p className='font-sans lg:text-2xl md:text-lg text-1xl '>
                  {size}
                </p>
              </div>
            )}
            <div className='w-full grid grid-cols-2 gap-4'>
              <p className='font-sans lg:text-2xl md:text-lg text-1xl '>
                {'Order date'}
              </p>
              <p className='font-sans lg:text-2xl md:text-lg text-1xl '>
                {date}
              </p>
            </div>
            <div className='w-full grid grid-cols-2 gap-4'>
              <p className='font-sans lg:text-2xl md:text-lg text-1xl '>
                {'Ship to'}
              </p>
              <p className='font-sans lg:text-2xl md:text-lg text-1xl '>
                {shipTo}
              </p>
            </div>
            <div className='w-full grid grid-cols-2 gap-4'>
              <p className='font-sans lg:text-2xl md:text-lg text-1xl '>
                {'Status'}
              </p>
              <p className='font-sans lg:text-2xl md:text-lg text-1xl '>
                {status}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderItem;
