import { useState } from 'react';

type MintModalProps = { isOpen: boolean; onClose: () => void };

const MintModal = ({ isOpen, onClose }: MintModalProps) => {
  const chainOptions = [
    { value: 'goerli', label: 'Goerli' },
    { value: 'ethereum', label: 'Ethereum' },
    { value: 'sepolia', label: 'Sepolia' },
    { value: 'polygon', label: 'Polygon' },
    { value: 'polygonMumbai', label: 'Polygon Mumbai' },
    { value: 'bscMainnet', label: 'BSC Mainnet' },
    { value: 'bscTestnet', label: 'BSC Testnet' },
  ];

  const [selectedChain, setSelectedChain] = useState('');
  const [selectedToken, setSelectedToken] = useState('ERC721');
  const [amount, setAmount] = useState('');
  const [chainError, setChainError] = useState('');
  const [amountError, setAmountError] = useState('');

  const toggleModal = () => {
    onClose();
  };

  const handleChainChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedChain(event.target.value);
    setChainError('');
  };

  const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedToken(event.target.value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
    setAmountError('');
  };

  const handleMint = () => {
    let isValid = true;

    if (!selectedChain) {
      setChainError('Please select a chain');
      isValid = false;
    }

    if (selectedToken === 'ERC1155' && !amount) {
      setAmountError('Please enter an amount');
      isValid = false;
    }

    if (isValid) {
      console.log('Selected chain:', selectedChain);
      console.log('Selected token:', selectedToken);
      if (selectedToken === 'ERC1155') {
        console.log('Amount:', amount);
      }
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
                  <label
                    htmlFor="chain"
                    className="font-medium text-gray-700 text-right"
                  >
                    Chain:
                  </label>
                  <select
                    id="chain"
                    name="chain"
                    value={selectedChain}
                    onChange={handleChainChange}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option
                      value=""
                      className="bg-white rounded-md shadow-lg text-gray-700 text-md my-2 hover:bg-slate-100"
                    >
                      Select a chain
                    </option>
                    {chainOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                        className="bg-white rounded-md shadow-lg text-gray-700 text-md my-2 hover:bg-slate-100"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {chainError && (
                  <p className="text-red-500 text-sm">{chainError}</p>
                )}

                <div className="flex items-center space-x-4">
                  <label className="font-medium text-gray-700 text-right">
                    Token:
                  </label>
                  <div className="flex items-center space-x-4">
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

                {selectedToken === 'ERC1155' && (
                  <div className="flex items-center space-x-4">
                    <label
                      htmlFor="amount"
                      className="font-medium text-gray-700 text-right"
                    >
                      Amount:
                    </label>
                    <input
                      type="number"
                      id="amount"
                      name="amount"
                      value={amount}
                      onChange={handleAmountChange}
                      className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                )}
                {amountError && (
                  <p className="text-red-500 text-sm">{amountError}</p>
                )}
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
