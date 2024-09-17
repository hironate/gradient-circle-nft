'use client';
import React from 'react';
import { WagmiProvider, createStorage, cookieStorage } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  sepolia,
  polygonAmoy,
  bscTestnet,
  base,
  baseSepolia,
} from 'wagmi/chains';
import { http, createConfig } from 'wagmi';

export const queryClient = new QueryClient();

export const metadata = {
  title: 'NFT Faucet on on Testnets',
  description: 'Free NFT Mint of ERC721 and ERC1155 on EVM Compatible chains.',
};

export const transports = {
  [sepolia.id]: http(`https://1rpc.io/sepolia`),
  [polygonAmoy.id]: http(`https://polygon-amoy.drpc.org`),
  [bscTestnet.id]: http('https://bsc-testnet.bnbchain.org'),
  [baseSepolia.id]: http('https://sepolia.base.org'),
};

const Config = ({ children }: { children: React.ReactNode }) => {
  const wagmiConfig = createConfig({
    chains: [sepolia, polygonAmoy, bscTestnet, baseSepolia],
    transports,
    ssr: false,
    storage: createStorage({
      storage: cookieStorage,
    }),
  });

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export default Config;
