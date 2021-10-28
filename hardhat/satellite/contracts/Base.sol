//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Satellite.sol";

contract Base is Ownable {
  address _addr;
  function calculateVariable() external view returns(uint) {
    Satellite s = Satellite(_addr);
    return s.calculateVariable();
  }
  function updateSatelliteAddress(address addr) public onlyOwner {
    _addr = addr;
  }
}
