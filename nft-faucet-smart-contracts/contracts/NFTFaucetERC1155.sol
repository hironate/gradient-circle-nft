// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTFaucetERC1155 is ERC1155, Ownable {
    uint256 private _currentTokenId = 1;
    uint256 private mintingFee = 0.000069 ether;

    constructor() ERC1155("https://example.com/api/token/{id}.json") {}

    function mint(uint256 amount) public payable {
        require(
            msg.value >= mintingFee,
            "NFTFaucetERC1155: Insufficient minting fee"
        );
        _mint(msg.sender, _currentTokenId, amount, "");
        _currentTokenId += 1;
    }

    function setURI(string memory newURI) public onlyOwner {
        _setURI(newURI);
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    function getCurrentTokenId() public view returns (uint256) {
        return _currentTokenId;
    }
}
