import { EventType } from '@/types/event';
import { convertDateTime } from '@/utils/date-format';

import Image from 'next/image';

interface EventCardProps {
  event: EventType;
}

export const revalidate = 0;

const EventCard = ({ event }: EventCardProps) => {
  const modifiedEvents = event.attributes;
  const { date, time } = convertDateTime(event.attributes.date);

  return (
    <>
      <div className='border-2 border-primary-orange bg-primary-lightOrange rounded-2xl w-[90%] mx-auto max-w-[400px] min-w-[330px] group hover:bg-primary-orange hover:cursor-pointer'>
        <div className='font-LDRKaet text-2xl flex justify-between items-center py-3 px-4'>
          <Image src={'/temp/logo-1.png'} alt='logo' width={130} height={0} />
          <div className='group-hover:text-primary-lightOrange'>{date}</div>
        </div>

        <div className="font-LDRKaet bg-[url('/temp/Ghost%20BW%201%20(1).png')] bg-center bg-cover flex">
          <div className='pt-3 bg-white/70 h-full w-full border-y-2 border-primary-lightOrange group-hover:bg-primary-orange/80  group-hover:border-primary-lightOrange'>
            <div className='text-center max-w-[280px] ml-auto'>
              <p className='text-2xl'>{modifiedEvents.title}</p>
              <p className='block text-xl group-hover:text-primary-lightOrange'>
                {modifiedEvents.place}
                <span className='block text-base'>
                  {modifiedEvents.address}
                </span>
              </p>
              <p>
                START TIME:
                <span className='block'>{time}</span>
              </p>
            </div>
          </div>
        </div>

        <div className='min-w-[80px] p-5 text-center'>
          <p className='font-LDRKaet'>TOURNAMENT</p>
          <p className='group-hover:text-primary-lightOrange'>
            {modifiedEvents.description}
          </p>
        </div>
        <Image

          src={'/temp/image 9.png'}

          alt='event-image'
          width={0}
          height={0}
          sizes='100vw'
          className='w-full max-h-[200px] rounded-b-xl object-cover md:max-h-[250px]'
        />
      </div>
    </>
  );
};

export default EventCard;
