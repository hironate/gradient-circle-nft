import React, { useEffect, useState, useRef } from 'react';
import { Connector, useAccount, useConnect, useDisconnect } from 'wagmi';
import AvatarImage from '@/public/avatar.png';
import WalletImage from '@/public/wallet.png';
import Image from 'next/image';

function ConnectWalletProfile() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const shortAddress = (address: any) => {
    if (!address) return '';
    return address.slice(0, 6) + '...' + address.slice(-4);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const setConnection = (connector: Connector) => {
    try {
      connect({ connector });
      toggleDropdown();
      localStorage.setItem('isWalletConnected', 'true');
    } catch (error) {}
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

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div
        className="inline-flex items-center cursor-pointer btn-sm text-gray-700 h-10  font-medium bg-white hover:bg-gray-50 rounded-md ml-3 border-gray-300 shadow-none"
        onClick={toggleDropdown}
      >
        {isConnected ? (
          <>
            <span>{shortAddress(address)}</span>
            <Image src={AvatarImage} alt="Avatar" className=" ml-2 h-6 w-6 " />
          </>
        ) : (
          <>
            <Image
              src={WalletImage}
              alt={`Wallet `}
              className="mr-2 w-5 h-5 text-center"
            />
            <span>Connect Wallet</span>
            <svg
              className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                fillRule="nonzero"
              />
            </svg>
          </>
        )}
      </div>
      <div className={` ${dropdownOpen ? 'h-28' : ''} max-2xl md:h-auto`}>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg shadow-gray-200">
            {/* <div className="py-1">
                <Link
                  href="/my-mints"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Mints
                </Link>
              </div> */}
            <div>
              {isConnected ? (
                <div className="py-1">
                  <button
                    onClick={() => {
                      disconnect();
                      localStorage.setItem('isWalletConnected', 'false');
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <div className="py-1">
                  {connectors.map((connector) => (
                    <button
                      onClick={() => {
                        setConnection(connector);
                      }}
                      className="flex justify-start gap-4 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <img src={connector.icon} className="w-5 h-5" />
                      <span>{connector.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ConnectWalletProfile;
