const { expect } = require('chai');
const { ethers } = require('hardhat');
const { BigNumber } = require('ethers');

describe('NFTFaucetERC721', function () {
  let NFTFaucetERC721;
  let nftFaucetERC721;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    NFTFaucetERC721 = await ethers.getContractFactory('NFTFaucetERC721');
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    nftFaucetERC721 = await NFTFaucetERC721.deploy();
    await nftFaucetERC721.deployed();
  });

  describe('setMintingFee', function () {
    it('Should set a new minting fee', async function () {
      const newMintingFee = ethers.utils.parseEther('0.01');
      await nftFaucetERC721.connect(owner).setMintingFee(newMintingFee);
      expect(await nftFaucetERC721.mintingFee()).to.equal(newMintingFee);
    });

    it('Should fail when a non-owner tries to set a new minting fee', async function () {
      const newMintingFee = ethers.utils.parseEther('0.01');
      await expect(
        nftFaucetERC721.connect(addr1).setMintingFee(newMintingFee),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });

  describe('Minting', function () {
    it('Should fail when minting with insufficient fee', async function () {
      const newMintingFee = ethers.utils.parseEther('0.01');
      await nftFaucetERC721.connect(owner).setMintingFee(newMintingFee);
      await expect(
        nftFaucetERC721.connect(addr1).mint({ value: 0 }),
      ).to.be.revertedWith('NFTFaucetERC721: Insufficient minting fee');
    });

    it('Should mint a token successfully', async function () {
      await nftFaucetERC721.connect(addr1).mint({ value: 0 });
      expect(await nftFaucetERC721.ownerOf(1)).to.equal(addr1.address);
    });
  });

  describe('Token URI', function () {
    it('Should return the correct token URI', async function () {
      await nftFaucetERC721.connect(addr1).mint({ value: 0 });
      expect(await nftFaucetERC721.tokenURI(1)).to.equal(
        'ipfs://bafybeihlwybp2ku6mj37aaolcfxfdvdgw34hq52owquwu7lwqgi4yyfmpa/1.json',
      );
    });
  });

  describe('setBaseURI', function () {
    it('Should set a new base URI', async function () {
      await nftFaucetERC721.connect(owner).setBaseURI('ipfs://newbaseuri/');
      await nftFaucetERC721.connect(addr1).mint({ value: 0 });
      expect(await nftFaucetERC721.tokenURI(1)).to.equal(
        'ipfs://newbaseuri/1.json',
      );
    });
  });

  describe('withdraw', function () {
    it('Should withdraw funds successfully', async function () {
      await nftFaucetERC721
        .connect(addr1)
        .mint({ value: ethers.utils.parseEther('1') });
      const initialBalance = await owner.getBalance();
      const contractBalance = await ethers.provider.getBalance(
        nftFaucetERC721.address,
      );
      const withdrawTx = await nftFaucetERC721.connect(owner).withdraw();
      const txReceipt = await withdrawTx.wait();
      const gasUsed = txReceipt.gasUsed.mul(withdrawTx.gasPrice);

      const finalBalance = await owner.getBalance();
      expect(finalBalance).to.equal(
        initialBalance.add(contractBalance).sub(gasUsed),
      );
    });
  });
});
