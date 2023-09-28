import Banner from '@/components/games/Banner';
import GameBoxCard from '@/components/games/GameBoxCard';
import GameRuleCard from '@/components/games/GameRuleCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Game',
};

const GamesPage = () => {
  return (
    <>
      <section className='py-4 md:py-10'>
        <Banner />
        <h1>GAMES</h1>
        <GameBoxCard />
        <GameRuleCard />
      </section>
      <section className='py-4 md:py-10'>
        <h1 className='pb-4 md:pb-10'>Learn how to play</h1>
      </section>
    </>
  );
};

export default GamesPage;
