'use client';
import { MvpType } from '@/types/event';
import Image from 'next/image';
import { useState } from 'react';
import AvatarWithMedal from './AvatarWithMedal';
import MvpModal from './MvpModal';

interface MvpsSectionProps {
  mvps: MvpType[];
}

const MvpsSection = ({ mvps }: MvpsSectionProps) => {
  const [open, setOpen] = useState(false);
  const [selectedMvp, setSelectedMvp] = useState<MvpType | null>(null);

  const firstMvp = mvps.filter((mvp) => mvp.attributes.rank === 'first');
  const secondMvp = mvps.filter((mvp) => mvp.attributes.rank === 'second');
  const thirdMvp = mvps.filter((mvp) => mvp.attributes.rank === 'third');

  const handleClick = (mvp: MvpType) => {
    setSelectedMvp(mvp);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedMvp(null);
    setOpen(false);
  };

  return (
    <>
      <div className='py-10 bg-black relative'>
        <Image
          src={'/temp/Archer_bear_1.png'}
          alt='archer-bear'
          width={0}
          height={0}
          sizes='100vw'
          className='w-full'
        />
        <div className='absolute top-[20%] left-[10%] w-[200px] sm:w-[60%] sm:max-w-[500px] lg:max-w-[800px]'>
          <div className='relative flex flex-col'>
            <AvatarWithMedal
              mvp={firstMvp[0]}
              handleClick={handleClick}
              withName
              className='self-center'
            />
            <AvatarWithMedal
              mvp={secondMvp[0]}
              handleClick={handleClick}
              withName
              className='self-start absolute top-[80%] 2xl:top-[100%]'
            />
            <AvatarWithMedal
              mvp={thirdMvp[0]}
              handleClick={handleClick}
              withName
              className='self-end absolute top-[100%] 2xl:top-[150%]'
            />
          </div>
        </div>

        {selectedMvp && open && (
          <MvpModal mvp={selectedMvp} handleClose={handleClose} />
        )}
      </div>
    </>
  );
};

export default MvpsSection;
