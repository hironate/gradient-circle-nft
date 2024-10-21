import { blockchains } from './constants';

export const isChainSupported = (chainId: number | undefined) => {
  return (
    !!chainId &&
    !!blockchains.find((blockchain) => blockchain.id === chainId)?.id
  );
};
