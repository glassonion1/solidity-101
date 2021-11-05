const { expect } = require('chai');
const { ethers } = require('hardhat');
const { create } = require('ipfs-http-client');

describe('Greeter', function () {

  let nft;
  before(async () => {
    const name = 'Test Token';
    const desc = 'test description';
    const baseURI = 'http://localhost/';
    
    const MyNFT = await ethers.getContractFactory('MyNFT');
    nft = await MyNFT.deploy(name, 'TTNFT', baseURI);
    await nft.deployed();
  });
  
  it('Should be able to mint, transferFrom.', async function () {
    const [owner, other] = await ethers.getSigners();
    expect(await nft.name()).to.equal('Test Token');
    expect(await nft.symbol()).to.equal('TTNFT');
    expect(await nft.totalSupply()).to.equal(0);

    const mint0Tx = await nft.connect(owner).mint(owner.address);
    await mint0Tx.wait();
    console.log(`mint 0 tx hash: ${mint0Tx.hash}`);

    expect(await nft.totalSupply()).to.equal(1);
    expect(await nft.tokenURI(0)).to.equal("http://localhost/0");
    expect(await nft.ownerOf(0)).to.equal(owner.address);
    expect(await nft.balanceOf(owner.address)).to.equal(1);

    const transferTx = await nft.connect(owner)
                                .transferFrom(owner.address, other.address, 0);
    await transferTx.wait();
    expect((await nft.ownerOf(0))).to.equal(other.address);
    expect(await nft.balanceOf(owner.address)).to.equal(0);
    expect(await nft.balanceOf(other.address)).to.equal(1);
  });
});
