//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {
  string private _message = "Hello, world!";
  function greet() external view returns(string memory) {
    return _message;
  }
  function setMessage(string calldata message) external {
    console.log("Changing greeting from '%s' to '%s'", _message, message);
    _message = message;
  }
}
