import React, {useEffect, useState} from "react";
import useSigner from "../context-state/metamask-signer";
import {shortenMetamaskAddress} from "../utils/index";
import {Link} from "react-router-dom";

const FetchUploadedFiles = () => {
  const {address, contract, signer, loading} = useSigner();
  const [fileArray, setFileArray] = useState([]);
  const [sharedAccess, setSharedAccess] = useState("");
  const [sharedUsers, setSharedUsers] = useState([]);

  const handleShareAccess = async () => {
    try {
      const transaction = await contract.connect(signer).allow(sharedAccess);
      await transaction.wait();
      console.log("Sharing access:", sharedAccess);
    } catch (error) {
      console.error("Error sharing access:", error);
    }
  };

  const getData = async () => {
    try {
      if (loading === false && contract !== null) {
        const files = await contract.connect(signer).viewStoredURLs(address);
        setFileArray(files);
      }
    } catch (error) {
      console.error("Error fetching uploaded files:", error);
    }
  };

  const getSharedUsers = async () => {
    try {
      if (loading === false && contract !== null) {
        const users = await contract.connect(signer).shareAccess();
        setSharedUsers(users);
      }
    } catch (error) {
      console.error("Error fetching shared users:", error);
    }
  };

  useEffect(() => {
    getData();
    getSharedUsers();
  }, [address, contract, loading, signer]);

  return (
    <div className="flex flex-col items-center justify-center font-montserrat p-8 h-[80vh]">
      <div className="flex w-full h-full justify-center">
        {/* leftSection */}
        <div className="w-3/4 p-5 flex flex-wrap items-start justify-center">
          {/* Image Gallery Grid */}
          {fileArray.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {fileArray.map((imageUrl, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-md shadow-md transition-transform transform hover:scale-105"
                >
                  <img
                    src={imageUrl}
                    alt={`Uploaded File ${index + 1}`}
                    className="w-full h-48 object-cover object-center"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="pb-5">You haven't uploaded any files yet.</p>
              {/* Use Link for navigation */}
              <Link
                to="/upload-file"
                className="btn_theme px-4 py-2 rounded-md"
              >
                Upload Your First File
              </Link>
            </div>
          )}
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
            className="btn_theme px-4 py-2 rounded-md"
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
