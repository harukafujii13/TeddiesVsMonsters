import type { Metadata } from 'next';

import TvsMUniverse from '@/components/TvsMUniverse/TvsMUniverse';

export const metadata: Metadata = {
  title: 'TvsM Universe',
};

const Universe = () => {
  return <TvsMUniverse />;
};

export default Universe;
