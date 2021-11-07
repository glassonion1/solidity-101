const hre = require('hardhat');

async function main() {
  const Storage = await hre.ethers.getContractFactory('Storage');
  const storage = await Storage.deploy();

  await storage.deployed();

  console.log("Storage deployed to:", storage.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
