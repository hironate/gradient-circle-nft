export const metadata = {
  title: 'Home - Simple',
  description: 'Page description',
};

import Hero from '@/components/hero';
import FeaturesBlocks from '@/components/features-blocks';
import FeaturedBlokchains from '@/components/featured-blockchains';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedBlokchains />
      <FeaturesBlocks />
    </>
  );
}
