//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Greeter is Ownable {
  string private _message = "Hello, world!";
  function greet() external view returns(string memory) {
    return _message;
  }
  function setMessage(string calldata message) external onlyOwner {
    _message = message;
  }
}
