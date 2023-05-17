import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import Link from 'next/link';
import AvatarImage from '@/public/avatar.png';
import Image from 'next/image';

function ConnectWalletProfile() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const shortAddress = (address: any) => {
    if (!address) return '';
    return address.slice(0, 6) + '...' + address.slice(-4);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  if (isConnected) {
    return (
      <div className="relative inline-block">
        <div
          className="inline-flex items-center cursor-pointer btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
          onClick={toggleDropdown}
        >
          <span>{shortAddress(address)}</span>

          <Image src={AvatarImage} alt="Avatar" className=" ml-2 h-4 w-4 " />
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg">
            <div className="py-1">
              <Link
                href="/my-mints"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                My Mints
              </Link>
            </div>
            <div className="py-1">
              <button
                onClick={() => disconnect()}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Disconnect
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href="#"
      onClick={() => connect()}
      className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
    >
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
    </Link>
  );
}

export default ConnectWalletProfile;
