import { MvpType } from '@/types/event';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import AvatarWithMedal from './AvatarWithMedal';

interface MvpModalProps {
  mvp: MvpType;
  handleClose: () => void;
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

const MvpModal = ({ mvp, handleClose }: MvpModalProps) => {
  return (
    <>
      <motion.div
        variants={variants}
        initial='hidden'
        animate='visible'
        className='fixed top-0 z-10 h-full w-full bg-black/30 flex flex-col justify-center items-center'
      >
        <div className='bg-primary-lightOrange rounded-xl p-5 w-[95%] max-sm:max-w-[400px] sm:py-6 sm:px-10 sm:max-w-[700px]'>
          <button
            className='block ml-auto bg-primary-orange rounded-lg p-1 sm:mb-5'
            onClick={handleClose}
          >
            <FontAwesomeIcon
              icon={faXmark}
              className='w-5 h-5 flex items-center text-primary-lightOrange'
            />
          </button>
          <div className='flex flex-col sm:flex-row sm:gap-x-10'>
            <div className='flex items-center pb-5 sm:flex-col'>
              <AvatarWithMedal
                mvp={mvp}
                className='py-2 w-[90px] sm:w-[180px] max-w-[200px]'
              />
              <div className='grow text-center'>
                <p className='font-LDRKaet text-xl sm:text-2xl'>
                  {mvp.attributes.name}
                </p>
                <p>
                  <span className='font-LDRKaet'>age:</span>{' '}
                  {mvp.attributes.age ?? '-'}
                </p>
              </div>
            </div>

            <div className='grow space-y-2 sm:space-y-4 sm:text-lg md:text-xl'>
              <div className='flex justify-between'>
                <p className='font-LDRKaet'>country of origin:</p>
                <p>{mvp.attributes.country ?? '-'}</p>
              </div>
              <div className='flex justify-between'>
                <p className='font-LDRKaet'>tournaments played:</p>
                <p>{mvp.attributes.time_played ?? '-'}</p>
              </div>
              <div className='flex justify-between'>
                <p className='font-LDRKaet'>favorite playground:</p>
                <p>{mvp.attributes.favorite ?? '-'}</p>
              </div>
              <div className='border border-primary-orange rounded-lg py-2 px-3'>
                <p className='font-LDRKaet'>comment:</p>
                <p>{mvp.attributes.comment ?? 'No comment yet.'}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MvpModal;
