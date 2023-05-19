import { Contract, Signer } from 'ethers';
import CoreChainService from './CoreChainService';

interface ApproveParams {
  operator: string;
  tokenId: string;
}

interface GetApprovedParams {
  tokenId: string;
}

interface IsApprovedForAllParams {
  owner: string;
  operator: string;
}

interface SetApprovalForAllParams {
  operator: string;
  approved: boolean;
}

interface OwnerOfParams {
  tokenId: string;
}

class ERC721Service extends CoreChainService {
  contract: Contract;

  constructor(signer: any, chainId: number, address: string, abi: any) {
    super(signer, chainId);
    this.contract = new Contract(address, abi, signer);
  }

  approve({ operator, tokenId }: ApproveParams) {
    return this.contract.approve(operator, tokenId);
  }

  mint() {
    return this.contract.mint();
  }

  getApproved({ tokenId }: GetApprovedParams) {
    return this.contract.getApproved(tokenId);
  }

  isApprovedForAll({ owner, operator }: IsApprovedForAllParams) {
    return this.contract.isApprovedForAll(owner, operator);
  }

  setApprovalForAll({ operator, approved }: SetApprovalForAllParams) {
    return this.contract.setApprovalForAll(operator, approved);
  }

  ownerOf({ tokenId }: OwnerOfParams) {
    return this.contract.ownerOf(tokenId);
  }
}

export default ERC721Service;
