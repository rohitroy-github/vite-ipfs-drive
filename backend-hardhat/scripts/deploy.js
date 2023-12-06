// FILE -> Writing/DefiningDeployingScripts

const {ethers, run, network} = require("hardhat");

async function main() {
  const Upload = await ethers.getContractFactory("Upload");

  console.log("Deploying contract \u23F3");

  const upload = await Upload.deploy();
  await upload.deployed();

  console.log("Contract deployed successfully \u2705");
  console.log(`Contract address : ${upload.address}`);

  // what happens when we deploy to our hardhat network?
  if (network.config.chainId === 11155111) {
    console.log("Waiting for block confirmations \u23F3");
    // wait6BlockConfirmations
    await upload.deployTransaction.wait(6);
    await verify(upload.address, []);
  }
}

// async function verify(contractAddress, args) {
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

// ToExecute -> npx hardhat run scripts/deploy.js --network <network-name>
