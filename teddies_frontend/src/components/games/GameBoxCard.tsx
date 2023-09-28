import Image from 'next/image';
import Link from 'next/link';
import Button from '../button/Button';

const GameBoxCard = () => {
  return (
    <>
      <div className=' rounded-[15px]  bg-primary-navy m-5 flex justify-center content-center md:h-[800px]'>
        <div className='grid grid-cols-2 gap-2 p-10 w-full'>
          <div className='flex flex-col justify-around h-full'>
            <h2 className='font-LDRKaet text-sm text-primary-lightOrange md:text-[40px]'>
              What is in the box?
            </h2>
            <ul className='text-[10px] text-primary-lightOrange md:text-[30px]'>
              <li>1 Rule book;</li>
              <li>4 decks of 50 cards each (200 cards);</li>
              <li> - 2 Teddies desks;</li>
              <li> - 2 Monster desks;</li>
              <li>16 Bedroom cards.</li>
            </ul>
          </div>
          <div className='flex flex-col justify-around h-full'>
            <div className='flex justify-center '>
              <Image
                src={'/temp/Cards.png'}
                alt='card'
                width={0}
                height={0}
                sizes='100vw'
                className='w-full'
              />
            </div>
            <div className='flex justify-center items-center'>
              <Link href={'/products'}>
                <Button fourth>Buy Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default GameBoxCard;
