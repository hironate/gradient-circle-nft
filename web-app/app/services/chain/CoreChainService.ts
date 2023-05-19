class CoreChainService {
  signer: any;
  chainId: number;

  constructor(signer: any, chainId: number) {
    this.signer = signer;
    this.chainId = chainId;
  }
}

export default CoreChainService;
