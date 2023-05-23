// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/// @title NFTFaucetERC721
/// @author Hiren Kavad
/// @notice A simple NFT faucet that mints tokens with a specified minting fee
/// @custom:security-contact hello@hirenkavad.com
contract NFTFaucetERC721 is ERC721, Ownable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIdCounter;

    string private _currentBaseURI;
    uint256 public mintingFee = 0 ether;
    uint256 public maxSupply = 0;

    event Mint(address indexed to, uint256 indexed tokenId);

    /// @notice Constructor initializes the ERC721 contract with its name and symbol
    constructor() ERC721("NFTFaucet", "FCT") {
        _currentBaseURI = "ipfs://bafybeihlwybp2ku6mj37aaolcfxfdvdgw34hq52owquwu7lwqgi4yyfmpa/";
        _tokenIdCounter.increment(); // Start the token ID counter from 1
        maxSupply = 10000;
    }

    /// @notice Returns the current base URI
    /// @return The base URI
    function _baseURI() internal view override returns (string memory) {
        return _currentBaseURI;
    }

    /// @notice Sets a new base URI
    /// @param newBaseURI The new base URI to be set
    function setBaseURI(string calldata newBaseURI) external onlyOwner {
        _currentBaseURI = newBaseURI;
    }

    /// @notice Returns the token URI for the given token ID
    /// @param tokenId The token ID for which the token URI is requested
    /// @return The token URI
    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json"))
                : "";
    }

    /// @notice Mints a new token
    function mint() public payable {
        require(
            msg.value >= mintingFee,
            "NFTFaucetERC721: Insufficient minting fee"
        );

        uint256 tokenId = _tokenIdCounter.current();
        require(tokenId < maxSupply, "NFTFaucetERC721: Max Supply Reached");
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
        emit Mint(msg.sender, tokenId);
    }

    /// @notice Sets minting Fee
    /// @param newMintingFee Minting fee in wei
    function setMintingFee(uint256 newMintingFee) external onlyOwner {
        mintingFee = newMintingFee;
    }

    /// @notice Withdraws funds from the contract to the owner's address
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "NFTFaucetERC721: No funds to withdraw");
        payable(owner()).transfer(balance);
    }
}
