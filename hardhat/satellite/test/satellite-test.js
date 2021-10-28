const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Satellite', function () {
  it('Should fail if caller is not the owner', async function () {
    const Satellite = await ethers.getContractFactory('Satellite');
    const s1 = await Satellite.deploy();
    await s1.deployed();

    const Base = await ethers.getContractFactory('Base');
    const base = await Base.deploy();
    await base.deployed();

    await base.updateSatelliteAddress(s1.address);
    const value = await base.calculateVariable();
    console.log('value: %d', value);

    const s2 = await Satellite.deploy();
    await s2.deployed();

    await base.updateSatelliteAddress(s2.address);
    const value2 = await base.calculateVariable();
    console.log('value: %d', value2);
  });
});

