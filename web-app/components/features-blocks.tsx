import Link from 'next/link';
import Image from 'next/image';
import EthereumLogo from '@/public/images/ethereum.png';
import BscLogo from '@/public/images/bsc.png';
import PolygonLogo from '@/public/images/polygon.png';

export default function FeaturesBlocks() {
  return (
    <section className="relative">
      {/* <div
        className="absolute inset-0 top-1/2 md:mt-24 lg:mt-24 bg-gray-900 pointer-events-none"
        aria-hidden="true"
      ></div> */}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">Supported Chains</h2>
            <p className="text-xl text-gray-600">
              Currently 3 EVM Compatible blockchains are supported. Ethereum,
              polygon and Binance Smart Chain. Project is opensource. We will
              keep on adding new chains. Feel Free to create PR.
            </p>
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
            {/* 1st item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <Link href="/" className="block" aria-label="Ethereum Logo">
                <Image
                  src={EthereumLogo}
                  alt="Ethereum Logo"
                  className="w-16 h-16"
                />
              </Link>

              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Ethereum
              </h4>
              <p className="text-gray-600 text-center">
                You can mint Gradient Circle on Mainnet, Sepolia and Goerli
                Chains
              </p>
            </div>

            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <Link href="/" className="block" aria-label="Polygon Logo">
                <Image
                  src={PolygonLogo}
                  alt="Polygon Logo"
                  className="w-16 h-16"
                />
              </Link>

              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Polygon
              </h4>
              <p className="text-gray-600 text-center">
                You can mint Gradient Circle on Polygon Mumbai Testnet
              </p>
            </div>

            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <Link href="/" className="block" aria-label="Binance Smart Logo">
                <Image src={BscLogo} alt="BSC Logo" className="w-16 h-16" />
              </Link>

              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Binance Smart Chain
              </h4>
              <p className="text-gray-600 text-center">
                You can mint Gradient Circle on BSC Testnet
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
