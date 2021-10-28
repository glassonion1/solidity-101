const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Factory', function () {
  let factory;
  before(async () => {
    const Factory = await ethers.getContractFactory('Factory');
    factory = await Factory.deploy();
    await factory.deployed();
  });
  it('Should return new address', async function () {
    const addr = await factory.getHelloWorldAddress();
    console.log("addr: %s", addr);
    
    await factory.createHelloWorld();
    
    const addr2 = await factory.getHelloWorldAddress();
    console.log("addr: %s", addr2);

    expect(addr).to.not.equal(addr2);
  });
});

