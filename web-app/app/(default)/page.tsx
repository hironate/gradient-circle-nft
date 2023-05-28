export const metadata = {
  title: 'Gradient Circle NFTs',
  description: 'Mint Free NFTs on Testnets and Mainnet, Free NFT Faucet',
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
