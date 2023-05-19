'use client';
import './css/style.css';

import { Inter } from 'next/font/google';

import Header from '@/components/ui/header';
import Banner from '@/components/banner';

import { WagmiConfig, createClient, configureChains } from 'wagmi';

import {
  mainnet,
  sepolia,
  goerli,
  polygon,
  polygonMumbai,
  bsc,
  bscTestnet,
} from '@wagmi/core/chains';

import { publicProvider } from 'wagmi/providers/public';

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, sepolia, goerli, polygon, polygonMumbai, bsc, bscTestnet],
  [publicProvider()],
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// export const metadata = {
//   title: 'NFT Faucet on on Testnets',
//   description: 'Free NFT Mint of ERC721 and ERC1155 on EVM Compatible chains.',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <WagmiConfig client={client}>
        <body
          className={`${inter.variable} font-inter antialiased bg-white text-gray-900 tracking-tight`}
        >
          <div className="Simpleflex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            <Header />
            {children}
            <Banner />
          </div>
        </body>
      </WagmiConfig>
    </html>
  );
}
