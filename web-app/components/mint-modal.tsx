import { SetStateAction, useState } from 'react';
import { QuantitySelector } from './quantity-selector';
import { useAccount, useConnect } from 'wagmi';
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
import { useSigner } from './hooks/useSigner';
type MintModalProps = { isOpen: boolean; onClose: () => void };

const MintModal = ({ isOpen, onClose }: MintModalProps) => {
  const [selectedToken, setSelectedToken] = useState('ERC721');
  const [mintButtonText, setMintButtonText] = useState('Mint');
  const [amount, setAmount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [currentExplorer, setCurrentExplorer] = useState<string>('');
  const { isConnected, chain, chainId } = useAccount();
  const signer = useSigner({ chainId });

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
      const chainId = chain?.id || 11155111;
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

        setMintButtonText('Minting is Progress...');
        await txn.wait(1);
        setIsLoading(false);
        setMintButtonText('Mint');

        toast.success('ERC721 Token Successfully minted.', {
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
        setMintButtonText('Minting is Progress...');

        setAmount(1);
        await txn.wait(1);

        setIsLoading(false);
        setMintButtonText('Mint');

        toast.success('ERC1155 NFT successfully minted.', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
      setTransactionHash('');
      onClose();
    } catch (error) {
      console.log(error);
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
                    Mint Gradient Circle
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
                  <div>
                    <h3 className="mb-5 text-lg py-4 font-medium text-gray-900 text-center">
                      Select Token Type you want to mint
                    </h3>
                    <ul className="grid w-full gap-6 md:grid-cols-2">
                      <li>
                        <input
                          type="radio"
                          id="token-type-721"
                          name="token-type"
                          value="ERC721"
                          className="hidden peer"
                          required
                          checked={selectedToken === 'ERC721'}
                          onChange={handleTokenChange}
                        />
                        <label
                          htmlFor="token-type-721"
                          className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
                        >
                          <div className="block">
                            <div className="w-full text-lg font-semibold">
                              ERC721
                            </div>
                            <div className="w-full">Single Token</div>
                          </div>
                          {selectedToken === 'ERC721' ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              aria-hidden="true"
                              className="w-6 h-6 ml-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          )}
                        </label>
                      </li>
                      <li>
                        <input
                          type="radio"
                          id="token-type-1155"
                          name="hosting"
                          value="ERC1155"
                          className="hidden peer"
                          checked={selectedToken === 'ERC1155'}
                          onChange={handleTokenChange}
                        />
                        <label
                          htmlFor="token-type-1155"
                          className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
                        >
                          <div className="block">
                            <div className="w-full text-lg font-semibold">
                              ERC1155
                            </div>
                            <div className="w-full">Editions</div>
                          </div>
                          {selectedToken === 'ERC1155' ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              aria-hidden="true"
                              className="w-6 h-6 ml-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          )}
                        </label>
                      </li>
                    </ul>
                  </div>

                  <div className="flex items-center space-x-4">
                    <QuantitySelector
                      quantity={
                        selectedToken === 'ERC721' || amount === 0 ? 1 : amount
                      }
                      onQuantityChange={(value) => handleAmountChange(value)}
                      minusButtonDisabled={
                        selectedToken === 'ERC721' ||
                        (amount === 1 && selectedToken !== 'ERC721')
                      }
                      plusButtonDisabled={
                        amount === 10000 || selectedToken === 'ERC721'
                      }
                    />
                  </div>
                  {transactionHash && isLoading ? (
                    <div className="flex justify-center py-6">
                      <div className="text-gray-700">
                        <Link
                          href={`https://${currentExplorer}/tx/${transactionHash}`}
                          className="flex"
                          target="_blank"
                        >
                          <h1>View Txn On Block Explorer</h1>
                          <Image
                            src={LinkImage}
                            alt="link"
                            className="h-3 w-3 ml-2 mt-1.5"
                          />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className="flex items-center pb-6 pt-6 space-x-2 justify-center">
                  <button
                    type="button"
                    className="text-white bg-blue-700 flex hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 justify-between "
                    onClick={isConnected ? handleMint : undefined}
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
                    )}
                    {isConnected ? mintButtonText : 'Connect Wallet'}
                  </button>
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
