const { expect } = require('chai');
const { ethers } = require('hardhat');

// @see: https://medium.com/@blockchain101/the-basics-of-upgradable-proxy-contracts-in-ethereum-479b5d3363d6
describe('Greeter', function () {
  it('Should return the greeting', async function () {
    
    
    const HelloWorld = await ethers.getContractFactory('HelloWorld');
    const hello = await HelloWorld.deploy();
    await hello.deployed();
    
    const Proxy = await ethers.getContractFactory('Proxy');
    const proxy = await Proxy.deploy();
    await proxy.deployed();

    Proxy.attach(proxy.address).upgrade(hello.address);
    
    
    const expected = 'Hello, world!';
    expect(await hello.attach(proxy.address).greet()).to.equal(expected);
  });
});
