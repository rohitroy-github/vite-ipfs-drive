import React, {useEffect, useState} from "react";
import {shortenMetamaskAddress} from "../utils/index";
import useSigner from "../context-state/metamask-signer";

const FilesWithAccess = () => {
  const {contract, signer} = useSigner();
  const [fileArray, setFileArray] = useState([]);
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      const files = await contract.connect(signer).viewStoredURLs(address);
      setFileArray(files);
      setError(null); // Clear any previous errors
    } catch (error) {
      //   console.log(error.error.data.message);
      if (
        error.error.data.message ===
        "Error: VM Exception while processing transaction: reverted with reason string 'Not authorized by owner drive owner !'"
      ) {
        setError(
          "You don't have the permission to view these files. Ask the owner to grant you the access."
        );
      } else {
        setError("An error occurred while fetching files.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center font-montserrat p-8 h-[80vh]">
      {/* Input for Address */}
      <div className="flex flex-col mb-5 items-center w-full">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter wallet address here (0x...)"
          className="mb-2 p-3 rounded-md border border-gray-300 w-1/2 text-center"
        />
        <button
          onClick={fetchImages}
          className="bg-gray-200 text-black px-4 py-2 rounded-md"
        >
          Search Images
        </button>
      </div>

      {error && <div className="text-black font-montserrat mb-4">{error}</div>}

      {/* Image Gallery Grid */}
      <div className="w-fullp-5 items-center flex">
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
    </div>
  );
};

export default FilesWithAccess;
