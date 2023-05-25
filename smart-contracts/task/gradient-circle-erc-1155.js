const dotenv = require('dotenv');
const { task } = require('hardhat/config');
const { writeContract, readContract, writeABI } = require('../utils/io');
const { CONTRACT_NAMES } = require('../utils/constants');

dotenv.config();

const contractName = CONTRACT_NAMES.GradientCircleERC1155;
const NETWORK_MAP = {
  1337: 'hardhat',
  1: 'mainnet',
  5: 'goerli',
  137: 'polygon',
  80001: 'mumbai',
  11155111: 'sepolia',
  56: 'bsc', // BSC mainnet
  97: 'bscTestnet', // BSC testnet
};

task('deploy:contract-1155', 'Deploy contract', async () => {
  const accounts = await ethers.getSigners();
  const signer = accounts[0];

  const { chainId } = await hre.ethers.provider.getNetwork();
  const networkName = NETWORK_MAP[chainId];

  console.log('Deploying contract...');

  const Contract = await hre.ethers.getContractFactory(contractName);
  const contract = await Contract.deploy();

  await contract.deployed();

  console.info('GradientCircleERC1155 Deployed at ', contract.address);

  await writeContract(
    contractName,
    contract.address,
    signer.address,
    [],
    networkName,
  );
});

task(
  'verify:contract-1155',
  'Verify GradientCircleERC1155 contract',
  async () => {
    const { chainId } = await hre.ethers.provider.getNetwork();
    const networkName = NETWORK_MAP[chainId];

    const gradientCircleERC1155 = await readContract(contractName, networkName);
    const address = gradientCircleERC1155.address;

    if (!address) {
      throw new Error('Contract address not found');
    }

    console.log('Verifying contract...');
    try {
      await run('verify:verify', {
        address: address,
        constructorArguments: [],
      });
    } catch (e) {
      if (e.message.toLowerCase().includes('already verified')) {
        console.log('Already verified!');
      } else {
        console.log(e);
      }
    }
  },
);

task(
  'export:abi-1155',
  'Export GradientCircleERC1155 contract ABI',
  async () => {
    await writeABI(
      'GradientCircleERC1155.sol/GradientCircleERC1155.json',
      contractName,
    );
  },
);
