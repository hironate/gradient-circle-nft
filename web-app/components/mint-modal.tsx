import { SetStateAction, useState } from 'react';
import { QuantitySelector } from './quantity-selector';
import { useAccount, useConnect, useSigner } from 'wagmi';
import { getNetwork } from '@wagmi/core';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { toast, ToastContainer } from 'react-toastify';
import {
  contractAddresses721,
  contractAddresses1155,
  explorers,
} from '@/utils/constants';
import ERC721Service from '../app/services/chain/ERC721Service';
import ERC1155Service from '@/app/services/chain/ERC1155Service';
import NFTFaucetERC721ABI from '../../smart-contracts/publish/abis/NFTFaucetERC721.json';
import NFTFaucetERC1155ABI from '../../smart-contracts/publish/abis/NFTFaucetERC1155.json';
import { Oval } from 'react-loader-spinner';
import Link from 'next/link';
import Image from 'next/image';
import LinkImage from '@/public/link.png';
type MintModalProps = { isOpen: boolean; onClose: () => void };

const MintModal = ({ isOpen, onClose }: MintModalProps) => {
  const [selectedToken, setSelectedToken] = useState('ERC721');
  const [amount, setAmount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [currentExplorer, setCurrentExplorer] = useState<string>('');
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
    setTransactionHash('');
    setAmount(1);
    onClose();
  };

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedToken(event.target.value);
  };

  const handleAmountChange = (amount: SetStateAction<number>) => {
    setAmount(amount);
  };

  const handleExplorerChange = (chainId: number) => {
    setCurrentExplorer(explorers[chainId]);
  };
  const handleMint = async () => {
    try {
      setIsLoading(true);
      setConnection();
      let chainId: number = getNetwork().chain?.id || 1;
      handleExplorerChange(chainId);
      if (selectedToken === 'ERC721') {
        const contractAddress: string = contractAddresses721[chainId];
        const contractInstance = new ERC721Service(
          signer,
          chainId,
          contractAddress,
          NFTFaucetERC721ABI,
        );
        const txn = await contractInstance.mint();
        setTransactionHash(txn.hash);
        await txn.wait(1);

        setIsLoading(false);
        toast.success('NFT Minted...', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        const contractAddress: string = contractAddresses1155[chainId];

        const contractInstance = new ERC1155Service(
          signer,
          chainId,
          contractAddress,
          NFTFaucetERC1155ABI,
        );

        const txn = await contractInstance.mint(amount);
        setTransactionHash(txn.hash);
        await txn.wait(1);
        toast.success('ERC1155 Tokens Minted...', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        setIsLoading(false);
      }
      setTransactionHash('');
      onClose();
    } catch (error) {
      setIsLoading(false);
    }
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
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleModal}
          ></div>
          <div className="relative w-full max-w-md ">
            <div className="relative bg-white rounded-lg shadow">
              <div>
                <div className="flex items-center justify-center p-4 ">
                  <h3 className="text-lg font-medium text-gray-900">
                    Mint ERC721 or ERC1155
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute right-[26px]"
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
                <div className="p-6 space-y-4 ">
                  <div className="flex items-center space-x-4 ">
                    <label className="font-medium text-gray-700 text-right ml-4 mr-7">
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
                    <label className="font-medium text-gray-700 text-right mr-4 ml-4">
                      Amount:
                    </label>
                    <QuantitySelector
                      quantity={
                        selectedToken === 'ERC721' || amount === 0 ? 1 : amount
                      }
                      onQuantityChange={(value) => handleAmountChange(value)}
                      minusButtonDisabled={amount === 1}
                      plusButtonDisabled={
                        amount === 10000 || selectedToken === 'ERC721'
                      }
                    />
                  </div>
                  {transactionHash && isLoading ? (
                    <div className="ml-4 text-gray-700">
                      <Link
                        href={`https://${currentExplorer}/tx/${transactionHash}`}
                        className="flex"
                        target="_blank"
                      >
                        <h1>View On Block Explorer</h1>
                        <Image
                          src={LinkImage}
                          alt="link"
                          className="h-3 w-3 ml-2 mt-1.5 "
                        />
                      </Link>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="flex items-center p-6 space-x-2 justify-center">
                  <button
                    type="button"
                    className="text-white bg-blue-700 flex hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 justify-between "
                    onClick={handleMint}
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <div className="mr-3">
                        <Oval
                          height={20}
                          width={20}
                          color="white"
                          strokeWidth={4}
                          strokeWidthSecondary={4}
                        />
                      </div>
                    )}{' '}
                    Mint
                  </button>
                  {/* <button
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                  onClick={toggleModal}
                >
                  Close
                </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default MintModal;
