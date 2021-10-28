//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract Proxy is Ownable {
  address public implementation;
  event Received(uint indexed value, address indexed sender, bytes data);
  function upgrade(address newImplementation) public onlyOwner {
    implementation = newImplementation;
  }
  fallback() external payable {
    address target = implementation;
    assembly {
      let ptr := mload(0x40)
      calldatacopy(ptr, 0, calldatasize())
      let result := delegatecall(gas(), target, ptr, calldatasize(), 0, 0)
      returndatacopy(ptr, 0, returndatasize())
      switch result
      case 0 {revert(ptr, returndatasize())}
      default {return (ptr, returndatasize())}
    }
  }
  receive() external payable {
    emit Received(msg.value, msg.sender, "");
  }
  /*
  function _delegate(address impl) internal {
    assembly {
      calldatacopy(0, 0, calldatasize())
      let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)
      returndatacopy(0, 0, returndatasize())
      switch result
      case 0 {
        revert(0, returndatasize())
      }
      default {
        return(0, returndatasize())
      }
    }
  }*/
}
