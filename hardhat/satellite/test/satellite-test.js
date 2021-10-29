const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Satellite', function () {
  it('Should return same value', async function () {
    const Satellite = await ethers.getContractFactory('Satellite');
    const s1 = await Satellite.deploy();
    await s1.deployed();
    
    const Base = await ethers.getContractFactory('Base');
    const base = await Base.deploy();
    await base.deployed();
    
    await base.updateAddress(s1.address);
    const value1 = await base.calculateVariable();
    console.log('value: %d', value1);

    const s2 = await Satellite.deploy();
    await s2.deployed();

    await base.updateAddress(s2.address);
    const value2 = await base.calculateVariable();
    console.log('value: %d', value2);

    expect(value1).to.equal(value2);
  });
});
