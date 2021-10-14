pragma solidity >=0.4.22 <0.9.0;

contract HelloWorld {
  function greet() external pure returns(string memory) {
    return 'Hello World!';
  }
}
