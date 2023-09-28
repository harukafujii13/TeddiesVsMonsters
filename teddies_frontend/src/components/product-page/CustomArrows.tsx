import { ArrowProps } from 'react-multi-carousel/lib/types';

export const CustomRightArrow = ({ onClick }: ArrowProps) => {
  if (!onClick) return;

  return (
    <button
      onClick={() => onClick()}
      className='absolute bg-primary-orange text-white font-bold hover:brightness-90 p-3 text-xl rounded-md  right-3'
    >
      {'>'}
    </button>
  );
};

export const CustomLeftArrow = ({ onClick }: ArrowProps) => {
  if (!onClick) return;

  return (
    <button
      onClick={() => onClick()}
      className='absolute bg-primary-orange text-white font-bold hover:brightness-90 p-3 text-xl rounded-md  left-3'
    >
      {'<'}
    </button>
  );
};
