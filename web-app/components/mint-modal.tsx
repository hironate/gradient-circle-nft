import { SetStateAction, useState } from 'react';
import { QuantitySelector } from './quantity-selector';
import { useAccount, useConnect, useSigner } from 'wagmi';
import { getNetwork } from '@wagmi/core';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { toast } from 'react-toastify';
import { contractAddresses721 } from '@/utils/constants';
import ERC721Service from '../app/services/chain/ERC721Service';
import NFTFaucetERC721ABI from '../../smart-contracts/publish/abis/NFTFaucetERC721.json';

type MintModalProps = { isOpen: boolean; onClose: () => void };

const MintModal = ({ isOpen, onClose }: MintModalProps) => {
  const [selectedToken, setSelectedToken] = useState('ERC721');
  const [amount, setAmount] = useState(1);
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const setConnection = () => {
    try {
      if (!isConnected) {
        connect();
        localStorage.setItem('isWalletConnected', 'true');
      }
    } catch (error) {}
  };

  const toggleModal = () => {
    onClose();
  };

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedToken(event.target.value);
  };

  const handleAmountChange = (amount: SetStateAction<number>) => {
    setAmount(amount);
  };

  const handleMint = async () => {
    setConnection();
    let chainId: number = getNetwork().chain?.id || 1;
    const contractAddress: string = contractAddresses721[chainId];

    console.log({ selectedToken, amount, chainId });
    console.log({ chainId });
    const contractInstance = new ERC721Service(
      signer,
      chainId,
      contractAddress,
      NFTFaucetERC721ABI,
    );

    const txn = await contractInstance.mint();
    console.log(txn);
    txn.wait(1);
    toast.success('NFT Minted...');
  };

  return (
    <>
      {isOpen && (
        <div
          id="staticModal"
          data-modal-backdrop="static"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 w-full h-full flex items-center justify-center"
        >
          <div className="fixed inset-0 bg-white opacity-75"></div>
          <div className="relative w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">
                  Mint ERC721 or ERC1155
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5"
                  onClick={toggleModal}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="font-medium text-gray-700 text-right mr-4">
                    Token:
                  </label>
                  <div className="flex items-center ml-4 space-x-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="token"
                        value="ERC721"
                        checked={selectedToken === 'ERC721'}
                        onChange={handleTokenChange}
                        className="form-radio h-5 w-5 text-green-600"
                      />
                      <span className="ml-2 text-gray-700">ERC721</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="token"
                        value="ERC1155"
                        checked={selectedToken === 'ERC1155'}
                        onChange={handleTokenChange}
                        className="form-radio h-5 w-5 text-green-600"
                      />
                      <span className="ml-2 text-gray-700">ERC1155</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <QuantitySelector
                    quantity={amount}
                    onQuantityChange={(value) => handleAmountChange(value)}
                    minusButtonDisabled={amount === 1}
                    plusButtonDisabled={
                      amount === 10000 || selectedToken === 'ERC721'
                    }
                  />
                </div>
              </div>

              <div className="flex items-center p-6 space-x-2 border-t">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={handleMint}
                >
                  Mint
                </button>
                <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MintModal;
