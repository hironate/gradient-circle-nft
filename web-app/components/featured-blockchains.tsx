import Link from 'next/link';
import Image from 'next/image';
import EthereumLogo from '@/public/images/ethereum.png';
import OpenseaLogo from '@/public/images/opensea.png';
import BscLogo from '@/public/images/bsc.png';
import PolygonLogo from '@/public/images/polygon.png';

export default function FeaturedBlokchains() {
  const contractsAndLinks = [
    {
      logo: EthereumLogo,
      chain: 'Mainnet',
      etherscanLink: 'https://etherscan.com',
      marketplaceLink: 'https://opensea.com',
    },
    {
      logo: EthereumLogo,
      chain: 'Sepolia',
      etherscanLink: 'https://etherscan.com',
      marketplaceLink: 'https://opensea.com',
    },
    {
      logo: EthereumLogo,
      chain: 'Goerli',
      etherscanLink: 'https://etherscan.com',
      marketplaceLink: 'https://opensea.com',
    },
    {
      logo: PolygonLogo,
      chain: 'Polygon',
      etherscanLink: 'https://etherscan.com',
      marketplaceLink: 'https://opensea.com',
    },
    {
      logo: PolygonLogo,
      chain: 'Mumbai',
      etherscanLink: 'https://etherscan.com',
      marketplaceLink: 'https://opensea.com',
    },
    {
      logo: BscLogo,
      chain: 'BSC',
      etherscanLink: 'https://etherscan.com',
      marketplaceLink: 'https://opensea.com',
    },
    {
      logo: BscLogo,
      chain: 'Bsc Testnet',
      etherscanLink: 'https://etherscan.com',
      marketplaceLink: 'https://opensea.com',
    },
    {
      logo: EthereumLogo,
      chain: 'More Coming Soon',
      etherscanLink: '#',
      marketplaceLink: '#',
    },
  ];

  return (
    <section className="relative">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Verified Contracts</h2>
            <p className="text-xl text-gray-600">
              Here are links to verified contracts on different chain and
              marketplace links
            </p>
          </div>

          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none">
            {contractsAndLinks.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-row items-center p-2 border border-gray-300 rounded-lg"
              >
                <div className="flex items-center justify-center w-12 h-12 mr-2">
                  <Link
                    href={item.etherscanLink}
                    target="_blank"
                    className="block"
                  >
                    <Image
                      src={item.logo}
                      alt={`${item.chain} Logo`}
                      className="w-6 h-6"
                    />
                  </Link>
                </div>
                <div className="flex flex-col justify-center flex-1 mr-2">
                  <Link
                    href={item.etherscanLink}
                    target="_blank"
                    className="block"
                  >
                    <h4 className="text-sm font-bold leading-snug tracking-tight">
                      {item.chain}
                    </h4>
                  </Link>
                </div>
                <div className="flex items-center justify-center w-12 h-12">
                  <Link
                    href={item.marketplaceLink}
                    target="_blank"
                    className="block"
                  >
                    <Image
                      src={OpenseaLogo}
                      alt="Opensea Logo"
                      className="w-4 h-4"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
