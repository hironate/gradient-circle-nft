# Gradient Circle

Gradient Circle is an exceptional NFT crafted entirely with the aid of AI technology. This project was initiated with the intention of facilitating NFT minting on testnets, serving as a valuable resource for developers looking to expedite their application development process. By eliminating the need to deploy their own testnet contracts, developers can seamlessly create NFTs at no cost on any EVM-compatible blockchain, be it a testnet or mainnet. "Gradient Circle" empowers developers to enhance their efficiency and accelerate their progress.

# Structure

This project is a monorepo that contains three sub-repositories:

- gradient-circle-image-generator
  - For generating gradient circle NFT images.
- smart-contracts
  - ERC721 and ERC1155 smart contracts.
  - Hardhat deployment tasks.
  - Test cases.
- web-app
  - Next.js app and landing page to interact with the blockchain to mint NFTs.

# How to Mint

To mint an NFT using Gradient Circle, follow these steps:

- Go to https://gradientcircle.xyz/.
- Connect your wallet.
- Choose your preferred blockchain.
- Click on the Mint button.
- Select the token type and quantity.
- Complete the on-chain transaction.

# Technology Used

The technologies used in this project are as follows:

- Next.js for the frontend.
- Solidity smart contracts deployed on EVM-compatible chains such as Ethereum, Polygon, and Binance Smart Chain, with Hardhat as the framework.
- Node.js AI-generated script to generate 10,000 unique NFTs.
- IPFS (https://nft.storage/) for storing the NFTs.

# Deployed Contracts

The following table shows the deployed contracts on different chains:

| Chain           | ERC721                                                                                                                          | ERC1155                                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Mainnet         | [0x0Cfd47C84BC6cDa59c76bE4f8B74366ABD7386ED](https://etherscan.io/address/0x0Cfd47C84BC6cDa59c76bE4f8B74366ABD7386ED)           | [0x4b75f6eC17A019fC61B8f442243B665fFC8bC233](https://etherscan.io/address/0x4b75f6eC17A019fC61B8f442243B665fFC8bC233)           |
| Goerli          | [0x0Cfd47C84BC6cDa59c76bE4f8B74366ABD7386ED](https://goerli.etherscan.io/address/0x0Cfd47C84BC6cDa59c76bE4f8B74366ABD7386ED)    | [0x4b75f6eC17A019fC61B8f442243B665fFC8bC233](https://goerli.etherscan.io/address/0x4b75f6eC17A019fC61B8f442243B665fFC8bC233)    |
| Sepolia         | [0x0Cfd47C84BC6cDa59c76bE4f8B74366ABD7386ED](https://sepolia.etherscan.io/address/0x0Cfd47C84BC6cDa59c76bE4f8B74366ABD7386ED)   | [0x4b75f6eC17A019fC61B8f442243B665fFC8bC233](https://sepolia.etherscan.io/address/0x4b75f6eC17A019fC61B8f442243B665fFC8bC233)   |
| Polygon Mainnet | [0x0Cfd47C84BC6cDa59c76bE4f8B74366ABD7386ED](https://polygonscan.com/address/0x0Cfd47C84BC6cDa59c76bE4f8B74366ABD7386ED)        | [0x4b75f6eC17A019fC61B8f442243B665fFC8bC233](https://polygonscan.com/address/0x4b75f6eC17A019fC61B8f442243B665fFC8bC233)        |
| Mumbai Testnet  | [0x0Cfd47C84BC6cDa59c76bE4f8B74366ABD7386ED](https://mumbai.polygonscan.com/address/0x0Cfd47C84BC6cDa59c76bE4f8B74366ABD7386ED) | [0x4b75f6eC17A019fC61B8f442243B665fFC8bC233](https://mumbai.polygonscan.com/address/0x4b75f6eC17A019fC61B8f442243B665fFC8bC233) |
| BSC             | [0x0Cfd47C84BC6cDa59c76bE4f8B74366ABD7386ED](https://bscscan.com/address/0x0Cfd47C84BC6cDa59c76bE4f8B74366ABD7386ED)            | [0x4b75f6eC17A019fC61B8f442243B665fFC8bC233](https://bscscan.com/address/0x4b75f6eC17A019fC61B8f442243B665fFC8bC233)            |
| BSC Testnet     | [0x0Cfd47C84BC6cDa59c76bE4f8B74366ABD7386ED](https://testnet.bscscan.com/address/0x0Cfd47C84BC6cDa59c76bE4f8B74366ABD7386ED)    | [0x4b75f6eC17A019fC61B8f442243B665fFC8bC233](https://testnet.bscscan.com/address/0x4b75f6eC17A019fC61B8f442243B665fFC8bC233)    |

# Contributing

This project was fully generated with Generative AI in a maximum of 48 hours as a weekend project. The whole source code is open source, so if you think there is room for improvement, feel free to create a pull request (PR) and contribute.

# Author

- Hiren Kavad (https://hirenkavad.com/)

# Donation

- The author is highly passionate about building dev tools and educating web3 developers.
- Feel free to donate a coffee to the Ethereum address: **hirenkavad.eth**.
- Let's keep building!

## License

This project is licensed under the MIT License. You can use it wherever you want. Attribution is highly appreciated.
