import EventCard from '@/components/events/EventCard';
import Banner from '@/components/games/Banner';
import MvpsSection from '@/components/mvps/MvpsSection';
import Title from '@/components/title/title';
import { EventType } from '@/types/event';
import { getEvents } from '@/utils/strapi';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events',
};

const EventsPage = async () => {
  let events: EventType[] = [];

  try {
    events = await getEvents();
  } catch (error) {
    console.error('Failed to fetch events:', error);
  }
  const futureEvents = events.filter((event) => !event.attributes.end);
  const previousEvents = events.filter((event) => event.attributes.end);
  const latestPreviousEvent = previousEvents[previousEvents.length - 1];

  return (
    <>
      <section className=' py-4 md:py-10'>
        <Banner />
      </section>

      <section className='pb-10'>
        <Title text='UPCOMING EVENTS' />
        <div className='flex gap-x-4 px-5 max-w-[1100px] w-[100vw] overflow-auto mx-auto pb-3 md:py-10 '>
          {futureEvents.length > 0 ? (
            futureEvents?.map((event) => {
              return (
                <div key={event.id} className='mx-auto'>
                  <EventCard event={event} />
                </div>
              );
            })
          ) : (
            <div className='flex justify-center w-full'>coming soon!</div>
          )}
        </div>
      </section>

      {latestPreviousEvent ? (
        <section>
          <h1 className='pb-4 md:pb-10'>LAST EVENT MVPS</h1>
          <MvpsSection mvps={latestPreviousEvent.attributes.mvps.data} />
        </section>
      ) : (
        ''
      )}
    </>
  );
};

export default EventsPage;
