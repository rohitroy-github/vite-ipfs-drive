const {ethers} = require("hardhat");
const {assert, expect} = require("chai");

describe("IPFSDriveContract_Main", function () {
  let contract;
  let owner;
  let user1;
  let user2;
  let user3;

  beforeEach(async function () {
    [owner, user1, user2, user3] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory("IPFSDriveContract_Main");
    contract = await Contract.deploy();
    await contract.deployed();
  });

  it("Should set the contract name and owner correctly", async function () {
    const name = await contract.contractName();
    const ownerAddress = await contract.contractOwner();

    assert.equal(name, "IPFSDriveContract_Main", "Contract name is incorrect");
    assert.equal(ownerAddress, owner.address, "Contract owner is incorrect");
  });

  it("Should allow adding URLs", async function () {
    await contract.connect(user1).addURL("example.com");
    const user1URLs = await contract
      .connect(user1)
      .viewStoredURLs(user1.address);

    assert.equal(user1URLs.length, 1, "URL was not added correctly");
    assert.equal(user1URLs[0], "example.com", "URL value is incorrect");
  });

  it("Should allow granting and revoking access", async function () {
    await contract.connect(user1).allow(user1.address);
    const accessListBefore = await contract.connect(user1).shareAccess();
    assert.equal(
      accessListBefore.length,
      1,
      "Access was not granted correctly"
    );

    await contract.connect(user1).disallow(user1.address);
    const accessListAfter = await contract.shareAccess();
    assert.equal(accessListAfter.length, 0, "Access was not revoked correctly");
  });

  it("Should allow multiple users to add URLs and view them", async function () {
    await contract.connect(user1).addURL("example.com");
    await contract.connect(user2).addURL("test.com");

    const user1URLs = await contract
      .connect(user1)
      .viewStoredURLs(user1.address);
    const user2URLs = await contract
      .connect(user2)
      .viewStoredURLs(user2.address);

    assert.equal(user1URLs.length, 1, "URL was not added correctly for user1");
    assert.equal(
      user1URLs[0],
      "example.com",
      "URL value is incorrect for user1"
    );

    assert.equal(user2URLs.length, 1, "URL was not added correctly for user2");
    assert.equal(user2URLs[0], "test.com", "URL value is incorrect for user2");
  });

  it("Should handle access correctly for multiple users", async function () {
    let user2URLs;
    // User2GivingAccessToUser1
    await contract.connect(user2).allow(user1.address);

    await contract.connect(user2).addURL("test.com");
    await contract.connect(user1).addURL("test.com");

    user2URLs = await contract.connect(user1).viewStoredURLs(user2.address);

    assert.equal(user2URLs.length, 1, "Non authorized user.");
    assert.equal(user2URLs[0], "test.com", "URL value is incorrect for user1");

    await expect(
      contract.connect(user3).viewStoredURLs(user2.address)
    ).to.be.revertedWith("Non authorized user.");
  });

  it("Should handle access correctly after revoking access", async function () {
    await contract.connect(user1).allow(user2.address);
    await contract.connect(user1).addURL("test.com");

    await contract.connect(user1).disallow(user2.address);

    await expect(
      contract.connect(user2).viewStoredURLs(user1.address)
    ).to.be.revertedWith("Non authorized user.");
  });
});
