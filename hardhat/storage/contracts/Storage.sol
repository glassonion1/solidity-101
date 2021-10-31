//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Storage {
  string[] private values;

  function addValue(string calldata v) public {
    values.push(v);
  }
  function getValues() public view returns(string[] memory) {
    return values;
  }
}
