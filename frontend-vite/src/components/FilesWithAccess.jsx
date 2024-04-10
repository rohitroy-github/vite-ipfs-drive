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

      if (files) {
        setFileArray(files);
        setError(null);
      }
    } catch (error) {
      if (
        error.error.data.message ===
        "Error: VM Exception while processing transaction: reverted with reason string 'Non authorized user.'"
      ) {
        setError(
          "Sorry, you don't have the permissions to view these files. You can ask the owner to grant you the access."
        );
      } else {
        setError(
          "Some error occurred while fetching files. Please try again later."
        );
      }
    }
  };

  useEffect(() => {
    setFileArray([]);
  }, [signer]);

  return (
    <div className="flex flex-col items-center justify-center font-montserrat p-8 h-[80vh]">
      {/* Input for Address */}
      <div className="flex flex-col mb-5 items-center w-full text-sm">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter wallet address here (0x...)"
          className="mb-2 p-3 rounded-md border border-purple-500 w-1/2 text-center"
        />
        <button
          onClick={fetchImages}
          className="bg-purple-500 hover:bg-purple-300 text-white font-montserrat py-2 px-4 rounded-md text-sm"
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
