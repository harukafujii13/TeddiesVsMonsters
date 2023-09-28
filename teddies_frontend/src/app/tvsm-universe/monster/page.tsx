import Monsters from '@/components/TvsMUniverse/monsters/Monsters';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Monster',
};

const Monster = () => {
  return <Monsters />;
};

export default Monster;
