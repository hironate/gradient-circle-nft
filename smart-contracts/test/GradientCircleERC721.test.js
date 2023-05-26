const { expect } = require('chai');
const { ethers } = require('hardhat');
const { BigNumber } = require('ethers');

describe('GradientCircleERC721', function () {
  let GradientCircleERC721;
  let gradientCircleERC721;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    GradientCircleERC721 = await ethers.getContractFactory(
      'GradientCircleERC721',
    );
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    gradientCircleERC721 = await GradientCircleERC721.deploy();
    await gradientCircleERC721.deployed();
  });

  describe('setMintingFee', function () {
    it('Should set a new minting fee', async function () {
      const newMintingFee = ethers.utils.parseEther('0.01');
      await gradientCircleERC721.connect(owner).setMintingFee(newMintingFee);
      expect(await gradientCircleERC721.mintingFee()).to.equal(newMintingFee);
    });

    it('Should fail when a non-owner tries to set a new minting fee', async function () {
      const newMintingFee = ethers.utils.parseEther('0.01');
      await expect(
        gradientCircleERC721.connect(addr1).setMintingFee(newMintingFee),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });

  describe('Minting', function () {
    it('Should fail when minting with insufficient fee', async function () {
      const newMintingFee = ethers.utils.parseEther('0.01');
      await gradientCircleERC721.connect(owner).setMintingFee(newMintingFee);
      await expect(
        gradientCircleERC721.connect(addr1).mint({ value: 0 }),
      ).to.be.revertedWith('GradientCircleERC721: Insufficient minting fee');
    });

    it('Should mint a token successfully', async function () {
      await gradientCircleERC721.connect(addr1).mint({ value: 0 });
      expect(await gradientCircleERC721.ownerOf(1)).to.equal(addr1.address);
    });
  });

  describe('Token URI', function () {
    it('Should return the correct token URI', async function () {
      await gradientCircleERC721.connect(addr1).mint({ value: 0 });
      expect(await gradientCircleERC721.tokenURI(1)).to.equal(
        'ipfs://bafybeiaixnmd3z54vvcovlt2yhxnvd43jhukfd2ixbqu3d4fp5awwcsqa4/1.json',
      );
    });
  });

  describe('setBaseURI', function () {
    it('Should set a new base URI', async function () {
      await gradientCircleERC721
        .connect(owner)
        .setBaseURI('ipfs://newbaseuri/');
      await gradientCircleERC721.connect(addr1).mint({ value: 0 });
      expect(await gradientCircleERC721.tokenURI(1)).to.equal(
        'ipfs://newbaseuri/1.json',
      );
    });
  });

  describe('withdraw', function () {
    it('Should withdraw funds successfully', async function () {
      await gradientCircleERC721
        .connect(addr1)
        .mint({ value: ethers.utils.parseEther('1') });
      const initialBalance = await owner.getBalance();
      const contractBalance = await ethers.provider.getBalance(
        gradientCircleERC721.address,
      );
      const withdrawTx = await gradientCircleERC721.connect(owner).withdraw();
      const txReceipt = await withdrawTx.wait();
      const gasUsed = txReceipt.gasUsed.mul(withdrawTx.gasPrice);

      const finalBalance = await owner.getBalance();
      expect(finalBalance).to.equal(
        initialBalance.add(contractBalance).sub(gasUsed),
      );
    });
  });
});
