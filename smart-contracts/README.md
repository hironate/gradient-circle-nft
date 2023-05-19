# NFTFaucetERC721

This repository contains code for an NFT Faucet ERC721 contract and scripts to deploy, verify, and export the contract ABI.

## Prerequisites

1. Install Node.js (version 14.x.x recommended).
2. Install yarn or npm.

## Setup

1. Clone the repository:

2. Change to the repository folder:

3. Install dependencies:

```
yarn install
```

or

```
npm install
```

4. Copy the `.env.example` file to `.env`:

```
cp .env.example .env
```

5. Update the `.env` file with your private key, API keys, and network endpoints.

## Tasks

### Deploy Contract

To deploy the NFTFaucetERC721 contract, run the following command:

```
npx hardhat deploy:contract-721
```

This will deploy the contract to the network specified in the `.env` file.

### Verify Contract

To verify the NFTFaucetERC721 contract on Etherscan/Polygonscan/Bscscan, run the following command:

```
npx hardhat verify:contract-721
```

This will verify the contract on the corresponding network and update the contract's source code on the respective network's explorer.

### Export ABI

To export the NFTFaucetERC721 contract ABI to a JSON file, run the following command:

```
npx hardhat export:abi-721
```

This will generate a `NFTFaucetERC721.json` file containing the contract's ABI in the specified output folder.

## License

This project is licensed under the MIT License.
