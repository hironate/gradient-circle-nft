const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('NFTFaucetERC1155', function () {
  let NFTFaucetERC1155;
  let nftFaucetERC1155;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    NFTFaucetERC1155 = await ethers.getContractFactory('NFTFaucetERC1155');
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    nftFaucetERC1155 = await NFTFaucetERC1155.deploy();
  });

  describe('Deployment', function () {
    it('Should set the correct URI', async function () {
      expect(await nftFaucetERC1155.uri(1)).to.equal(
        'https://example.com/api/token/{id}.json',
      );
    });

    it('Owner should have the correct address', async function () {
      expect(await nftFaucetERC1155.owner()).to.equal(owner.address);
    });
  });

  describe('Minting', function () {
    it('Should mint tokens with correct token IDs', async function () {
      const mintTx = await nftFaucetERC1155
        .connect(addr1)
        .mint(1, { value: ethers.utils.parseEther('0.000069') });
      await expect(mintTx)
        .to.emit(nftFaucetERC1155, 'TransferSingle')
        .withArgs(
          addr1.address,
          ethers.constants.AddressZero,
          addr1.address,
          1,
          1,
        );
    });

    it('Should fail if minting fee is insufficient', async function () {
      await expect(
        nftFaucetERC1155
          .connect(addr1)
          .mint(1, { value: ethers.utils.parseEther('0.000068') }),
      ).to.be.revertedWith('NFTFaucetERC1155: Insufficient minting fee');
    });

    it('Should set a new URI', async function () {
      await nftFaucetERC1155
        .connect(owner)
        .setURI('https://newexample.com/api/token/{id}.json');
      expect(await nftFaucetERC1155.uri(1)).to.equal(
        'https://newexample.com/api/token/{id}.json',
      );
    });
  });
});
