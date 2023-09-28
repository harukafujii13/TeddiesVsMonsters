import Image from 'next/image';

const Banner = () => {
  return (
    <>
      <div className='grid grid-cols-3 m-5 gap-2'>
        <div className='border-4 border-solid border-primary-orange object-cover'>
          <Image src={'/temp/Panda 1.png'} alt='card' width={547} height={0} />
        </div>
        <div className='row-span-2 flex justify-center border-4 border-solid border-primary-orange object-cover'>
          <div className='w-10/12 flex flex-col justify-center content-center'>
            <Image src={'/temp/logo-1.png'} alt='card' width={547} height={0} />
            <Image
              src={'/temp/image 1.png'}
              alt='card'
              width={547}
              height={0}
            />
          </div>
        </div>
        <div className='border-4 border-solid border-primary-orange object-cover'>
          <Image
            src={'/temp/Swamp Monster 1.png'}
            alt='card'
            width={547}
            height={0}
          />
        </div>
        <div className='border-4 border-solid border-primary-orange object-cover'>
          <Image
            src={'/temp/Archer_bear_1.png'}
            alt='c'
            width={547}
            height={0}
          />
        </div>
        <div className='border-4 border-solid border-primary-orange object-cover'>
          <Image src={'/temp/Ghost 1.png'} alt='card' width={547} height={0} />
        </div>
      </div>
    </>
  );
};
export default Banner;
