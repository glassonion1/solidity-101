const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Storage', function () {
  it('Should increase value', async function () {
    const Storage = await ethers.getContractFactory('Storage');
    const storage = await Storage.deploy();
    await storage.deployed();
    
    expect((await storage.getValues()).length).to.equal(0);

    await storage.addValue('one');

    await storage.addValue('two');

    const values = await storage.getValues();
    expect(values.length).to.equal(2);
    expect(values[0]).to.equal('one');
    expect(values[1]).to.equal('two');
  });
});

