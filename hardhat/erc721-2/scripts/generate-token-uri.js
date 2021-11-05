const { create } = require('ipfs-http-client');

async function main() {
  // create ipfs client
  const client = create('https://ipfs.infura.io:5001/api/v0');
  // add the token image
  const imgAdded = await client.add('../img/hedgehog.png')
  // upload the token image
  const imgUri = `https://ipfs.infura.io/ipfs/${imgAdded.path}`

  // define json for token
  const data = {
    name: 'Hedgehog Symbol',
    description: 'created by glassonion1',
    image: imgUri,
  };
  const json = JSON.stringify(data)
  
  // add json data
  const added = await client.add(json)
  const tokenUri = `https://ipfs.infura.io/ipfs/${added.path}/`
  console.log(tokenUri);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
