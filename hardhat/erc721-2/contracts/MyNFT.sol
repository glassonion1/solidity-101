//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
    
  constructor(string memory name,
              string memory symbol)
    ERC721(name, symbol) {}

  function mintNFT(address to, string memory tokenURI) public returns (uint256) {
    uint256 tokenId = _tokenIds.current();
    
    _safeMint(to, tokenId);
    _setTokenURI(tokenId, tokenURI);
    _tokenIds.increment();

    return tokenId;
  }
}
