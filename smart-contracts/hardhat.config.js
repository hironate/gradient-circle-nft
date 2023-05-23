require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();
require('./task/nft-faucet-erc-721');
require('./task/nft-faucet-erc-1155');

const PRIVATE_KEY = process.env.PRIVATE_KEY;
if (!PRIVATE_KEY) {
  console.error('Please add PRIVATE_KEY to .env');
  process.exit(1);
}

module.exports = {
  solidity: {
    version: '0.8.18',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      chainId: 1337,
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_ALCHEMY_API}`,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      gas: 'auto',
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.GOERLI_ALCHEMY_API}`,
      accounts: [PRIVATE_KEY],
      chainId: 5,
      gas: 'auto',
    },
    mainnet: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.MAINNET_ALCHEMY_API}`,
      accounts: [PRIVATE_KEY],
      chainId: 1,
      gas: 'auto',
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.MUMBAI_ALCHEMY_API}`,
      accounts: [PRIVATE_KEY],
      chainId: 80001,
      gas: 'auto',
    },
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.POLYGON_ALCHEMY_API}`,
      accounts: [PRIVATE_KEY],
      chainId: 137,
      gas: 'auto',
    },
    bscTestnet: {
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      accounts: [PRIVATE_KEY],
      chainId: 97,
      gas: 'auto',
    },
    bscMainnet: {
      url: `https://bsc-dataseed1.binance.org/`,
      accounts: [PRIVATE_KEY],
      chainId: 56,
      gas: 'auto',
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      mainnet: process.env.ETHERSCAN_API_KEY,
      bsc: process.env.BSCSCAN_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY,
      polygon: process.env.POLYSCAN_API_KEY,
      polygonMumbai: process.env.POLYSCAN_API_KEY,
    },
  },
};
