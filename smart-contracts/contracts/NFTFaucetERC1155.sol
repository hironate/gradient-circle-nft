// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title NFT Faucet ERC-1155
/// @notice A simple ERC-1155 contract that allows users to mint NFTs by paying a minting fee.
contract NFTFaucetERC1155 is ERC1155, Ownable {
    uint256 private _currentTokenId = 1;
    uint256 public mintingFee = 0 ether;
    uint256 public maxSupply = 0;

    event Mint(address indexed to, uint256 indexed tokenId, uint256 amount);

    /// @notice Contract constructor that sets the initial token URI.
    constructor()
        ERC1155(
            "ipfs://bafybeiaixnmd3z54vvcovlt2yhxnvd43jhukfd2ixbqu3d4fp5awwcsqa4/{id}.json"
        )
    {
        maxSupply = 10000;
    }

    /// @notice Allows users to mint NFTs by paying the current minting fee.
    /// @param amount The number of tokens to mint.
    function mint(uint256 amount) public payable {
        require(
            msg.value >= mintingFee,
            "NFTFaucetERC1155: Insufficient minting fee"
        );
        require(
            _currentTokenId < maxSupply,
            "NFTFaucetERC1155: Max Supply Reached"
        );
        _mint(msg.sender, _currentTokenId, amount, "");
        emit Mint(msg.sender, _currentTokenId, amount);
        _currentTokenId += 1;
    }

    /// @notice Sets a new token URI for the contract.
    /// @param newURI The new URI to set.
    function setURI(string memory newURI) public onlyOwner {
        _setURI(newURI);
    }

    /// @notice Sets a new minting fee for the contract.
    /// @param newMintingFee The new minting fee to set.
    function setMintingFee(uint256 newMintingFee) external onlyOwner {
        mintingFee = newMintingFee;
    }

    /// @notice Allows the contract owner to withdraw the collected minting fees.
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    /// @notice Retrieves the current token ID.
    /// @return The current token ID.
    function getCurrentTokenId() public view returns (uint256) {
        return _currentTokenId;
    }
}
