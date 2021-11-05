const { expect } = require('chai');
const { ethers } = require('hardhat');
const { create } = require('ipfs-http-client');

describe('Greeter', function () {

  let nft;
  before(async () => {
    const name = 'Test Token';
    const symbol = 'TTNFT';
    const MyNFT = await ethers.getContractFactory('MyNFT');
    nft = await MyNFT.deploy(name, symbol);
    await nft.deployed();
  });
  
  it('Should be able to mint, transferFrom.', async function () {
    const [owner, other] = await ethers.getSigners();

    const name = 'hedgehog';
    const desc = 'created by glassonion1';
    const imgName = '0.png';
    const uri = await generateTokenMetadata(name, desc, imgName);
    const tokenId = await nft.callStatic.mintNFT(owner.address, uri);
    expect(tokenId).to.equal(0);

    const tx = await nft.mintNFT(owner.address, uri); 
    console.log(tx.hash);
    
    expect(await nft.name()).to.equal('Test Token');
    expect(await nft.symbol()).to.equal('TTNFT');

    expect(await nft.tokenURI(tokenId)).to.equal(uri);;
    expect(await nft.ownerOf(tokenId)).to.equal(owner.address);
    expect(await nft.balanceOf(owner.address)).to.equal(1);

    const transferTx = await nft.connect(owner)
                                .transferFrom(owner.address, other.address, 0);
    await transferTx.wait();
    expect((await nft.ownerOf(0))).to.equal(other.address);
    expect(await nft.balanceOf(owner.address)).to.equal(0);
    expect(await nft.balanceOf(other.address)).to.equal(1);
  });
});

async function generateTokenMetadata(name, desc, imgName) {
  // create ipfs client
  const client = create('https://ipfs.infura.io:5001/api/v0');
  // add the token image
  const imgAdded = await client.add(`../img/${imgName}`)
  // upload the token image
  const imgUri = `https://ipfs.infura.io/ipfs/${imgAdded.path}`

  // define json for token
  const data = {
    name: name,
    description: desc,
    image: imgUri,
  };
  const json = JSON.stringify(data)
  
  // add json data
  const added = await client.add(json)
  return `https://ipfs.infura.io/ipfs/${added.path}`
}
