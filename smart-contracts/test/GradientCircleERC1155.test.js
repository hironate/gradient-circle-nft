const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('GradientCircleERC1155', function () {
  let GradientCircleERC1155;
  let gradientCircleERC1155;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    GradientCircleERC1155 = await ethers.getContractFactory(
      'GradientCircleERC1155',
    );
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    gradientCircleERC1155 = await GradientCircleERC1155.deploy();
  });

  describe('Deployment', function () {
    it('Should set the correct URI', async function () {
      expect(await gradientCircleERC1155.uri(1)).to.equal(
        'ipfs://bafybeiaixnmd3z54vvcovlt2yhxnvd43jhukfd2ixbqu3d4fp5awwcsqa4/{id}.json',
      );
    });

    it('Owner should have the correct address', async function () {
      expect(await gradientCircleERC1155.owner()).to.equal(owner.address);
    });
  });

  describe('Minting', function () {
    it('Should mint tokens with correct token IDs', async function () {
      const mintTx = await gradientCircleERC1155
        .connect(addr1)
        .mint(1, { value: ethers.utils.parseEther('0.000069') });
      await expect(mintTx)
        .to.emit(gradientCircleERC1155, 'TransferSingle')
        .withArgs(
          addr1.address,
          ethers.constants.AddressZero,
          addr1.address,
          1,
          1,
        );
    });

    it('Should set a new URI', async function () {
      await gradientCircleERC1155
        .connect(owner)
        .setURI(
          'ipfs://bafybeihlwybp2ku6mj37aaolcfxfdvdgw34hq52owquwu7lwqgi4yyfmpa/{id}.json',
        );
      expect(await gradientCircleERC1155.uri(1)).to.equal(
        'ipfs://bafybeihlwybp2ku6mj37aaolcfxfdvdgw34hq52owquwu7lwqgi4yyfmpa/{id}.json',
      );
    });

    it('Should set a new minting fee', async function () {
      const newMintingFee = ethers.utils.parseEther('0.01');
      await gradientCircleERC1155.connect(owner).setMintingFee(newMintingFee);
      expect(await gradientCircleERC1155.mintingFee()).to.equal(newMintingFee);
    });

    it('Non-owner should not be able to set minting fee', async function () {
      const newMintingFee = ethers.utils.parseEther('0.01');
      await expect(
        gradientCircleERC1155.connect(addr1).setMintingFee(newMintingFee),
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('Should fail if minting fee is insufficient after updating minting fee', async function () {
      const newMintingFee = ethers.utils.parseEther('0.01');
      await gradientCircleERC1155.connect(owner).setMintingFee(newMintingFee);
      await expect(
        gradientCircleERC1155
          .connect(addr1)
          .mint(1, { value: ethers.utils.parseEther('0.000068') }),
      ).to.be.revertedWith('GradientCircleERC1155: Insufficient minting fee');
    });

    it('Should mint tokens with correct token IDs after updating minting fee', async function () {
      const newMintingFee = ethers.utils.parseEther('0.01');
      await gradientCircleERC1155.connect(owner).setMintingFee(newMintingFee);
      const mintTx = await gradientCircleERC1155
        .connect(addr1)
        .mint(1, { value: ethers.utils.parseEther('0.01') });
      await expect(mintTx)
        .to.emit(gradientCircleERC1155, 'TransferSingle')
        .withArgs(
          addr1.address,
          ethers.constants.AddressZero,
          addr1.address,
          1,
          1,
        );
    });
  });
});
