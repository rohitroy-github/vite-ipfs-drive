const {ethers, run, network} = require("hardhat");

async function main() {
  console.log("- - - - - - - - - - - - - - - - - - - - -");
  console.log("- - - - - - - - - - - - - - - - - - - - -");
  console.log(`Contract deployment ⌛`);
  console.log("- - - - - - - - - - - - - - - - - - - - -");

  const IPFSDriveContract = await ethers.getContractFactory(
    "IPFSDriveContract_Main"
  );
  const ipfsDriveContract = await IPFSDriveContract.deploy();
  await ipfsDriveContract.deployed();

  console.log("Contract deployed successfully \u2705");

  console.log(`Contract name: ${await ipfsDriveContract.contractName()}`);
  console.log(`Contract address : ${ipfsDriveContract.address}`);
  console.log(`Contract owner: ${await ipfsDriveContract.contractOwner()}`);
  console.log(`Deployment chainID: [ ${network.config.chainId} ]`);

  if (network.config.chainId === 11155111) {
    console.log(`Deployment network: Sepolia Testnet`);
    console.log("Confirming blocks ... \u23F3");
    await eVaultMain.deployTransaction.wait(6);
    await verify(eVaultMain.address, []);
  } else if (network.config.chainId === 31337) {
    console.log(`Deployment network: Localhost [ Hardhat ]`);
  } else if (network.config.chainId === 80002) {
    console.log(`Deployment network: Polygon Amoy Testnet`);
    console.log("Confirming blocks ... \u23F3");
    await eVaultMain.deployTransaction.wait(3);
    console.log("3 block confirmations done \u2705");
  } else if (network.config.chainId === 2710) {
    console.log(`Deployment network: Morph Testnet`);
    console.log("Confirming blocks ... \u23F3");
    await eVaultMain.deployTransaction.wait(2);
    console.log("2 block confirmations done \u2705");
    await verify(eVaultMain.address, []);
  }

  console.log("- - - - - - - - - - - - - - - - - - - - -");
  console.log("- - - - - - - - - - - - - - - - - - - - -");
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
