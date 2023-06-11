const hre = require("hardhat");

async function main() {
  const PriceConsumer = await hre.ethers.getContractFactory("PriceConsumerV3");
  const priceConsumer = await PriceConsumer.deploy();

  await priceConsumer.deployed();

  console.log("Contract deployed to:", priceConsumer.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
