'use client';
import './css/style.css';

import { Inter } from 'next/font/google';

import Header from '@/components/ui/header';
import Banner from '@/components/banner';

import { WagmiConfig, createConfig, mainnet } from 'wagmi';
import { createPublicClient, http } from 'viem';

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
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
      <body
        className={`${inter.variable} font-inter antialiased bg-white text-gray-900 tracking-tight`}
      >
        <div className="Simpleflex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
          <WagmiConfig config={config}>
            <Header />
            {children}
            <Banner />
          </WagmiConfig>
        </div>
      </body>
    </html>
  );
}
