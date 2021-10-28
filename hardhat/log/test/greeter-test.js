const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Greeter', function () {
  let instance;
  before(async () => {
    const Greeter = await ethers.getContractFactory('Greeter');
    instance = await Greeter.deploy();
    await instance.deployed();
  });
  it('Should return the greeting', async function () {
    const expected = 'Hello, world!';
    expect(await instance.greet()).to.equal(expected);
  });
  it('Should return the new greeting once it\'s changed', async function () {
    const expected = 'Hola, mundo!';
    const setGreetingTx = await instance.setMessage(expected);
    await setGreetingTx.wait();
    expect(await instance.greet()).to.equal(expected);
  });
});
