const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Greeter', function () {
  let instance;
  before(async () => {
    const HelloWorld = await ethers.getContractFactory('HelloWorld');
    const hello = await HelloWorld.deploy();
    await hello.deployed();
    
    const Proxy = await ethers.getContractFactory('Proxy');
    instance = await Proxy.deploy();
    await instance.deployed();

    instance.upgrade(hello.address);
  });
  it('Should return the greeting', async function () {
    const expected = 'Hello, world!';
    expect(await instance.greet()).to.equal(expected);
  });
});
