// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IPFSDriveContract_Main {
    address public contractOwner;
    string public contractName;

    struct Access {
        address user;
        bool access;
    }

    mapping(address => string[]) mapping_userURLs;
    mapping(address => mapping(address => bool)) mapping_ownership;
    mapping(address => Access[]) accessList;
    mapping(address => mapping(address => bool)) previousData;

    constructor() {
        contractName = "IPFSDriveContract_Main";
        contractOwner = msg.sender;
    }

    modifier onlyOwnerAuthorized(address _user) {
        require(
            _user == msg.sender || mapping_ownership[_user][msg.sender],
            "Not authorized by owner drive owner !"
        );
        _;
    }

    function addURL(string calldata url) external {
        mapping_userURLs[msg.sender].push(url);
    }

    function allow(address user) external {
        mapping_ownership[msg.sender][user] = true;
        if (previousData[msg.sender][user] == true) {
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == user) {
                    accessList[msg.sender][i].access = true;
                }
            }
        } else {
            accessList[msg.sender].push(Access(user, true));
            previousData[msg.sender][user] = true;
        }
    }

    function disallow(address user) external {
        mapping_ownership[msg.sender][user] = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = true;
            }
        }
    }

    function viewStoredURLs(
        address _user
    ) external view onlyOwnerAuthorized(_user) returns (string[] memory) {
        return mapping_userURLs[_user];
    }

    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}
