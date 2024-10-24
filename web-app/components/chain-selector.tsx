declare var window: any;
import React, { useEffect, useState, useRef } from 'react';
import { useAccount, useSwitchChain } from 'wagmi';
import Image from 'next/image';
import { blockchains } from '@/utils/constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isChainSupported } from '@/utils/web3';
function ChainSelector() {
  const { isConnected, chain } = useAccount();
  const { switchChainAsync } = useSwitchChain();

  interface MyObject {
    name: string;
    logo: any;
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentChain, setCurrentChain] = useState<MyObject>({
    name: '',
    logo: '',
  });

  useEffect(() => {
    let chainId = chain?.id || 11155111;
    setChain(chainId);
  }, [isConnected, chain]);

  const setChain = (chainId: any) => {
    const tempBlockchain = blockchains.filter((blockchain) => {
      return blockchain.id == chainId;
    });
    setCurrentChain({
      name: tempBlockchain[0].name,
      logo: tempBlockchain[0].logo,
    });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const changeChain = async (chainId: any) => {
    try {
      const network = await switchChainAsync({ chainId });
      setChain(network.id);
    } catch (error) {
      notify(chainId);
      console.log('chain not found', error);
    }
  };
  const notify = (chainId: any) => {
    const tempBlockchain = blockchains.filter((blockchain) => {
      return blockchain.id == chainId;
    });
    console.log(tempBlockchain);

    toast.error(
      `${tempBlockchain[0].name} is not configured in your wallet, please add it to your metamask or any wallet you are using.`,
      {
        position: toast.POSITION.BOTTOM_LEFT,
      },
    );
  };
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, [dropdownOpen]);

  if (!isConnected) return <></>;
  return (
    <div className="relative inline-block">
      {isChainSupported(chain?.id) ? (
        <>
          <div
            ref={dropdownRef}
            className="inline-flex ml-3 w-40 items-center cursor-pointer rounded-md btn-sm text-gray-700 font-medium bg-white hover:bg-gray-50 border-gray-300 shadow-none gap-3"
            onClick={toggleDropdown}
          >
            <Image
              src={currentChain.logo}
              alt={`${currentChain.name} Logo`}
              className="w-5 h-5"
            />
            <span>{currentChain.name}</span>
          </div>
          <div className={` ${dropdownOpen ? 'h-64' : ''} max-2xl md:h-auto`}>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-full bg-white rounded-md shadow-lg shadow-gray-200 py-1">
                {blockchains.map((blockchain, index) => {
                  return (
                    <button
                      key={index}
                      onClick={async () => {
                        await changeChain(blockchain.id);
                      }}
                      className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex gap-3 "
                    >
                      <Image
                        src={blockchain.logo}
                        alt={`${blockchain.name} Logo`}
                        className="w-6 h-6 text-center"
                      />
                      {blockchain.name}
                      <ToastContainer />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </>
      ) : (
        <button
          type="button"
          className="text-white bg-blue-700 flex hover:bg-blue-800 rounded-lg px-5 py-2.5 justify-center items-center h-10 ml-3 w-40 text-center"
          onClick={() => {
            changeChain(11155111);
          }}
        >
          Switch Network
        </button>
      )}
    </div>
  );
}

export default ChainSelector;
