pragma solidity >=0.4.22 <0.9.0;

contract Greeter {
  string private _message = "Hello World!";
  function greet() external view returns(string memory) {
    return _message;
  }
  function setMessage(string calldata message) external {
    _message = message;
  }
}
