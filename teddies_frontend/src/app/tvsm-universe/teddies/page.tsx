import Teddies from '@/components/TvsMUniverse/teddies/Teddies';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teddies',
};

const TeddiesPage = () => {
  return <Teddies />;
};

export default TeddiesPage;
