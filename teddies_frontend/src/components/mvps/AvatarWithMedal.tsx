import { MvpType } from '@/types/event';
import Image from 'next/image';

interface AvatarProps {
  mvp: MvpType;
  handleClick?: (mvp: MvpType) => void;
  withName?: boolean;
  className?: string;
}

const AvatarWithMedal = ({
  mvp,
  handleClick,
  withName,
  className,
}: AvatarProps) => {
  const medalImage = () => {
    switch (mvp.attributes.rank) {
      case 'first':
        return '/temp/gold_medal.png';
      case 'second':
        return '/temp/silver_medal.png';
      case 'third':
        return '/temp/bronze_medal.png';
      default:
        return '/temp/bronze_medal.png';
    }
  };

  console.log(
    'image',
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    mvp.attributes.name,
  );

  return (
    <>
      {mvp && (
        <div
          className={`inline-block text-center cursor-pointer group w-[70px] xs:w-[100px] sm:w-[130px] lg:w-[200px] xl:w-[250px] ${
            className ? className : ''
          }`}
          onClick={() => handleClick && handleClick(mvp)}
        >
          <div className='relative inline-block w-full'>
            <Image
              src={
                `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1/event/${mvp.attributes.name}` ??
                '/temp/profile_icon_1.png'
              }
              alt='player'
              width={0}
              height={0}
              sizes='100vw'
              className='rounded-full w-full group-hover:border-4 group-hover:border-primary-orange object-cover'
            />
            <Image
              src={medalImage()}
              alt='medal'
              width={0}
              height={0}
              sizes='100vw'
              className='absolute -bottom-[10%] -right-[10%] aspect-square w-[50%] '
            />
          </div>

          {withName && (
            <p className='font-LDRKaet text-white md:text-xl lg:text-3xl'>
              {mvp.attributes.name}
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default AvatarWithMedal;
