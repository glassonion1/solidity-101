//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./HelloWorld.sol";

contract Factory {
  address private _addr;
  function createHelloWorld() external {
    HelloWorld hw = new HelloWorld();
    _addr = address(hw);
  }
  function getHelloWorldAddress() public view returns (address) {
    return _addr;
  }
}
