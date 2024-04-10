const {ethers, run, network} = require("hardhat");

async function main() {
  const IPFSDriveContract = await ethers.getContractFactory(
    "IPFSDriveContract_Main"
  );
  const ipfsDriveContract = await IPFSDriveContract.deploy();
  await ipfsDriveContract.deployed();

  console.log("Contract deployed successfully \u2705");

  console.log(`Contract name: ${await ipfsDriveContract.contractName()}`);
  console.log(`Contract owner: ${await ipfsDriveContract.contractOwner()}`);
  console.log(`Contract address: ${ipfsDriveContract.address}`);
  console.log(`Deployment chainID: [ ${network.config.chainId} ]`);

  if (network.config.chainId === 11155111) {
    console.log(
      "Waiting for block confirmations on Sepolia testnet ... \u23F3"
    );
    // wait6BlockConfirmations
    await ipfsDriveContract.deployTransaction.wait(6);
    await verify(ipfsDriveContract.address, []);
  } else if (network.config.chainId === 31337) {
    console.log(`Deployment network: Localhost [ Hardhat ]`);
  }
}

const verify = async (contractAddress, args) => {
  console.log("Verifying contract \u23F3");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// run >>> npx hardhat run scripts/deploy[IPFSDriveContract_Main].js --network localhost
// run >>> npx hardhat run scripts/deploy[IPFSDriveContract_Main].js --network sepolia
