import EthereumLogo from '@/public/images/ethereum.png';
import BscLogo from '@/public/images/bsc.png';
import PolygonLogo from '@/public/images/polygon.png';
import {mainnet,goerli,sepolia,polygon, polygonMumbai,bsc,bscTestnet } from '@wagmi/core/chains'

export const blockchains=[
    {
        ...mainnet,
        name:'Mainnet',
        logo:EthereumLogo
    },
    {
        ...goerli,
        name:'Goerli',
        logo:EthereumLogo
    },
    {
        ...sepolia,
        name:"Seploia",
        logo:EthereumLogo
    },
    {
        ...polygon,
        name:"Polygon",
        logo:PolygonLogo
    },
    {
        ...polygonMumbai,
        name:"Mumbai",
        logo:PolygonLogo
    },
    {
        ...bsc,
        name:"BSC",
        logo:BscLogo
    },
    {
        ...bscTestnet,
        name:"Bsc Testnet",
        logo:BscLogo
    }
]
