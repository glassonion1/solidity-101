//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract HelloWorld {
  function greet() external view returns(string memory) {
    console.log("call greet");
    return "Hello, world!";
  }
}
