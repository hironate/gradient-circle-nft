const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const getNetwork = async () => {
  const provider = ethers.getDefaultProvider();
  const chainId = await provider.getChainId();
  return chainId;
};

const writeContract = async (contractFileName, address, deployer, args) => {
  const NETWORK = await getNetwork();

  fs.writeFileSync(
    path.join(
      __dirname,
      `../publish/addresses/${NETWORK}/${contractFileName}.json`,
    ),
    JSON.stringify(
      {
        address,
        deployer,
        args,
      },
      null,
      2,
    ),
  );
};

const readContract = async (contractFileName) => {
  const NETWORK = await getNetwork();

  try {
    const rawData = fs.readFileSync(
      path.join(
        __dirname,
        `../publish/addresses/${NETWORK}/${contractFileName}.json`,
      ),
    );
    const info = JSON.parse(rawData.toString());
    return {
      address: info.address,
      args: info.args,
    };
  } catch (error) {
    return {
      address: null,
      args: [],
    };
  }
};

const writeABI = (contractPath, contractFileName) => {
  try {
    const rawData = fs.readFileSync(
      path.join(__dirname, '../artifacts/contracts', contractPath),
    );
    const info = JSON.parse(rawData.toString());

    fs.writeFileSync(
      path.join(__dirname, '../publish/abis', `${contractFileName}.json`),
      JSON.stringify(info.abi, null, 2),
    );
  } catch (error) {
    console.error('Writing ABI error: ', error);
  }
};

module.exports = { writeContract, readContract, writeABI };
