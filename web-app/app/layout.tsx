'use client';
import './css/style.css';

import { Inter } from 'next/font/google';

import Header from '@/components/ui/header';
import Banner from '@/components/banner';

import {
  mainnet,
  sepolia,
  goerli,
  polygon,
  polygonMumbai,
  bsc,
  bscTestnet,
} from '@wagmi/core/chains';
import Config from './Config';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Config>
        <body
          className={`${inter.variable} font-inter antialiased bg-white text-gray-900 tracking-tight`}
        >
          <div className="Simpleflex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
            <Header />
            {children}
            <Banner />
          </div>
        </body>
      </Config>
    </html>
  );
}
