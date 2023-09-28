import Image from 'next/image';
import { FC } from 'react';

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
  return (
    <div className='flex flex-col items-center md:flex-row md:justify-center'>
      <Image
        src={'/temp/Dr 1.png'}
        alt='clown'
        width={0}
        height={0}
        sizes='100vw'
        priority
        className='w-[180px] md:w-[230px]'
      />
      <p className='text-xl font-bold text-secondary-gray md:text-2xl md:pl-10'>
        Loading...
      </p>
    </div>
  );
};

export default loading;
