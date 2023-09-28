import Image from 'next/image';
import Link from 'next/link';
import Button from '../button/Button';

const GameRuleCard = () => {
  return (
    <>
      <div className='  rounded-[15px]  bg-primary-redBrown m-5 flex justify-center content-center md:h-[800px]'>
        <div className='grid grid-cols-2 gap-2 p-10 w-full'>
          <div className='flex flex-col justify-around h-full '>
            <div className='flex justify-center '>
              <Image
                src={'/temp/Box.png'}
                alt='card'
                width={0}
                height={0}
                sizes='100vw'
                className='w-8/12'
              />
            </div>
            <div className='flex justify-center items-center'>
              <Link href={'/products'}>
                <Button fourth>Buy Now</Button>
              </Link>
            </div>
          </div>
          <div className='flex flex-col justify-around h-full md:pl-10'>
            <h2 className='font-LDRKaet text-sm text-primary-lightOrange md:text-[40px]'>
              OverView
            </h2>
            <ul className='text-[10px] text-primary-lightOrange  md:text-[30px]'>
              <li>2 or 4 players;</li>
              <li>30 minutes;</li>
              <li>7+ years;</li>
              <li>Real-Time Card Game;</li>
            </ul>
            <i className='text-[8px] text-primary-lightOrange md:text-[26px]'>
              Hush little kiddos, let&apos;s have some fun -
              <br />
              Teddies will sing, and Monsters will burn!!
            </i>
          </div>
        </div>
      </div>
    </>
  );
};
export default GameRuleCard;
