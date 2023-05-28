import { Contract, Signer } from 'ethers';
import CoreChainService from './CoreChainService';

interface IsApprovedForAllParams {
  owner: string;
  operator: string;
}

interface SetApprovalForAllParams {
  operator: string;
  approved: boolean;
}

class ERC1155Service extends CoreChainService {
  contract: Contract;

  constructor(signer: any, chainId: number, address: string, abi: any) {
    super(signer, chainId);
    this.contract = new Contract(address, abi, signer);
  }

  isApprovedForAll({ owner, operator }: IsApprovedForAllParams) {
    return this.contract.isApprovedForAll(owner, operator);
  }

  setApprovalForAll({ operator, approved }: SetApprovalForAllParams) {
    return this.contract.setApprovalForAll(operator, approved);
  }

  mint(amount: number) {
    return this.contract.mint(amount);
  }
}

export default ERC1155Service;
