import React, {useEffect, useState} from "react";
import useSigner from "../context-state/metamask-signer";
import {ethers} from "ethers";
import {shortenMetamaskAddress} from "../utils/index";

const FetchUploadedFiles = () => {
  const {address, contract, signer} = useSigner();
  const [fileArray, setFileArray] = useState([]);
  const [sharedAccess, setSharedAccess] = useState("");
  const [sharedUsers, setSharedUsers] = useState([]);

  const handleShareAccess = async () => {
    try {
      // Call your contract function to share access
      const transaction = await contract.connect(signer).allow(sharedAccess);
      await transaction.wait();
      console.log("Sharing access:", sharedAccess);
    } catch (error) {
      console.error("Error sharing access:", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const files = await contract.connect(signer).display(address);
        setFileArray(files);
        // console.log(files);
      } catch (error) {
        console.error("Error fetching uploaded files:", error);
      }
    };

    // Call getData on component load
    getData();
  }, [address]);

  useEffect(() => {
    const getSharedUsers = async () => {
      try {
        // Call your contract function to get shared users
        const users = await contract.connect(signer).shareAccess();
        setSharedUsers(users);
        // console.log(users);
      } catch (error) {
        console.error("Error fetching shared users:", error);
      }
    };

    // Call getSharedUsers when sharedAccess or address changes
    getSharedUsers();
  }, [address, sharedAccess]);

  return (
    <div className="flex flex-col items-center justify-center font-montserrat p-8 h-[80vh]">
      <div className="flex w-full">
        {/* leftSection */}
        <div className="w-3/4 p-5 items-center flex">
          {/* Image Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {fileArray.map((imageUrl, index) => (
              <div key={index} className="overflow-hidden rounded-md shadow-md">
                <img
                  src={imageUrl}
                  alt={`Uploaded File ${index + 1}`}
                  className="w-full h-48 object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>

        {/* rightSection */}
        <div className="w-1/4 p-5 items-center flex flex-col border-l border-gray-300">
          <input
            type="text"
            value={sharedAccess}
            onChange={(e) => setSharedAccess(e.target.value)}
            placeholder="Enter wallet address (0x...)"
            className="mb-2 p-3 rounded-md border border-gray-300 w-full text-center"
          />
          <button
            onClick={handleShareAccess}
            className="bg-gray-200 text-black px-4 py-2 rounded-md"
          >
            Share Access
          </button>
          <div className="mt-5 text-center">
            {sharedUsers.length > 0 ? (
              <div>
                <p className="font-bold">Users with access.</p>
                <ul className="list-disc pl-5">
                  {sharedUsers.map((user, index) => (
                    <li key={index}>{shortenMetamaskAddress(user[0])}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>You haven't shared access with anyone yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetchUploadedFiles;
