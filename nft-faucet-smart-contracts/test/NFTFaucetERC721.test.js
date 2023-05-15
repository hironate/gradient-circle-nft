const { expect } = require('chai');
const { ethers } = require('hardhat');

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
  });

  describe('Deployment', function () {
    it('Should set the correct name and symbol', async function () {
      expect(await nftFaucetERC721.name()).to.equal('NFTFaucet');
      expect(await nftFaucetERC721.symbol()).to.equal('FCT');
    });

    it('Owner should have the correct address', async function () {
      expect(await nftFaucetERC721.owner()).to.equal(owner.address);
    });
  });

  describe('Minting', function () {
    it('Should mint a new token with the correct URI', async function () {
      const mintingFee = ethers.utils.parseEther('0.000069');

      await nftFaucetERC721.connect(owner).setBaseURI('https://example.com/');
      await nftFaucetERC721
        .connect(addr1)
        .safeMint(addr1.address, { value: mintingFee });

      expect(await nftFaucetERC721.ownerOf(1)).to.equal(addr1.address);
      expect(await nftFaucetERC721.tokenURI(1)).to.equal(
        'https://example.com/1.json',
      );
    });

    it('Should fail if minting fee is insufficient', async function () {
      const insufficientFee = ethers.utils.parseEther('0.000009');

      await expect(
        nftFaucetERC721
          .connect(addr1)
          .safeMint(addr1.address, { value: insufficientFee }),
      ).to.be.revertedWith('NFTFaucetERC721: Insufficient minting fee');
    });
  });

  describe('Base URI', async function () {
    const mintingFee = ethers.utils.parseEther('0.000069');

    await nftFaucetERC721.connect(owner).setBaseURI('https://example.com/');
    await nftFaucetERC721
      .connect(addr1)
      .safeMint(addr1.address, { value: mintingFee });

    it('Should set the base URI correctly', async function () {
      await nftFaucetERC721.connect(owner).setBaseURI('https://example.com/');
      expect(await nftFaucetERC721.tokenURI(1)).to.equal(
        'https://example.com/1.json',
      );
    });

    it('Should fail to set base URI if not owner', async function () {
      await expect(
        nftFaucetERC721.connect(addr1).setBaseURI('https://example.com/'),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });

  describe('Withdrawal', function () {
    it('Owner should be able to withdraw funds from the contract', async function () {
      const mintingFee = ethers.utils.parseEther('0.000069');

      await nftFaucetERC721.connect(owner).setBaseURI('https://example.com/');
      await nftFaucetERC721
        .connect(addr1)
        .safeMint(addr1.address, { value: mintingFee });

      const contractBalance = await ethers.provider.getBalance(
        nftFaucetERC721.address,
      );
      expect(contractBalance).to.equal(mintingFee);

      const balanceBefore = await ethers.provider.getBalance(owner.address);
      const gasPrice = await ethers.provider.getGasPrice(); // Get gas price

      const tx = await nftFaucetERC721.connect(owner).withdraw();
      const receipt = await tx.wait(); // Wait for transaction to be mined

      const gasUsed = receipt.gasUsed.mul(gasPrice); // Calculate gas used

      const balanceAfter = await ethers.provider.getBalance(owner.address);
      expect(balanceAfter.sub(balanceBefore).add(gasUsed)).to.equal(mintingFee);
    });

    it('Non-owner should not be able to withdraw funds from the contract', async function () {
      const mintingFee = ethers.utils.parseEther('0.000069');

      await nftFaucetERC721.connect(owner).setBaseURI('https://example.com/');
      await nftFaucetERC721
        .connect(addr1)
        .safeMint(addr1.address, { value: mintingFee });

      await expect(
        nftFaucetERC721.connect(addr1).withdraw(),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });
  });
});
