import EthereumLogo from '@/public/images/ethereum.png';
import BscLogo from '@/public/images/bsc.png';
import PolygonLogo from '@/public/images/polygon.png';
import {
  mainnet,
  goerli,
  sepolia,
  polygon,
  polygonMumbai,
  bsc,
  bscTestnet,
} from '@wagmi/core/chains';

export const blockchains = [
  {
    ...mainnet,
    name: 'Mainnet',
    logo: EthereumLogo,
  },
  {
    ...goerli,
    name: 'Goerli',
    logo: EthereumLogo,
  },
  {
    ...sepolia,
    name: 'Sepolia',
    logo: EthereumLogo,
  },
  // {
  //   ...polygon,
  //   name: 'Polygon',
  //   logo: PolygonLogo,
  // },
  {
    ...polygonMumbai,
    name: 'Mumbai',
    logo: PolygonLogo,
  },
  // {
  //   ...bsc,
  //   name: 'BSC',
  //   logo: BscLogo,
  // },
  {
    ...bscTestnet,
    name: 'Bsc Testnet',
    logo: BscLogo,
  },
];

interface ContractAddresses {
  [key: number]: string;
}
interface BlockExplorers {
  [key: number]: string;
}
export const contractAddresses721: ContractAddresses = {
  1: '0x0Cfd47C84BC6cDa59c76bE4f8B74366ABD7386ED',
  5: '0x0Cfd47C84BC6cDa59c76bE4f8B74366ABD7386ED',
  11155111: '0x0Cfd47C84BC6cDa59c76bE4f8B74366ABD7386ED',
  137: '0x0Cfd47C84BC6cDa59c76bE4f8B74366ABD7386ED',
  80001: '0x0Cfd47C84BC6cDa59c76bE4f8B74366ABD7386ED',
  56: '0x0Cfd47C84BC6cDa59c76bE4f8B74366ABD7386ED',
  97: '0x0Cfd47C84BC6cDa59c76bE4f8B74366ABD7386ED',
};

export const contractAddresses1155: ContractAddresses = {
  1: '0x4b75f6eC17A019fC61B8f442243B665fFC8bC233',
  5: '0x4b75f6eC17A019fC61B8f442243B665fFC8bC233',
  11155111: '0x4b75f6eC17A019fC61B8f442243B665fFC8bC233',
  137: '0x4b75f6eC17A019fC61B8f442243B665fFC8bC233',
  80001: '0x4b75f6eC17A019fC61B8f442243B665fFC8bC233',
  56: '0x4b75f6eC17A019fC61B8f442243B665fFC8bC233',
  97: '0x4b75f6eC17A019fC61B8f442243B665fFC8bC233',
};

export const explorers: BlockExplorers = {
  1: 'etherscan.io',
  5: 'goerli.etherscan.io',
  11155111: 'sepolia.etherscan.io',
  137: 'polygonscan.com',
  80001: 'mumbai.polygonscan.com',
  56: 'bscscan.com',
  97: 'testnet.bscscan.com',
};
