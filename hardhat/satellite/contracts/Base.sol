//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Satellite.sol";

contract Base is Ownable {
  address _addr;
  function calculateVariable() external view returns(uint) {
    require(_addr != address(0x0), "Satellite addredd is not set.");
    Satellite s = Satellite(_addr);
    return s.calculateVariable();
  }
  function updateAddress(address addr) public onlyOwner {
    _addr = addr;
  }
}
