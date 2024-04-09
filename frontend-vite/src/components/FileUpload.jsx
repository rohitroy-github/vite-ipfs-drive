import React, {useState} from "react";
import FormData from "form-data";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSigner from "../context-state/metamask-signer";
import {ethers} from "ethers";

const FileUploadPage = () => {
  const {address, contract, signer} = useSigner();

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file ? file.name : "");

    // Show image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
      console.log("File name:", fileName);

      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const res = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `${import.meta.env.VITE_PINATA_API_KEY}`,
            pinata_secret_api_key: `${
              import.meta.env.VITE_PINATA_API_SECRET_KEY
            }`,
            "Content-Type": "multipart/form-data",
          },
        });
        const IMG_IPFS_URL = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;

        setFileName("");
        setSelectedFile(null);
        setImagePreview(null);

        const transaction = await contract.connect(signer).addURL(IMG_IPFS_URL);

        await transaction.wait();

        toast.success("File successfully uploaded.", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        alert("Success");
      } catch (error) {
        console.log("Error during uploading file on IPFS", error);
      }
    } else {
      console.warn("No file selected for upload.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center font-montserrat p-8 h-[80vh]">
      {/* Row format: Left and Right sections */}
      <div className="flex w-full">
        {/* Left section with file upload form */}
        <div className="w-1/2 p-5 items-center flex">
          <form className="flex flex-col items-center">
            <label htmlFor="fileInput" className="mb-2 text-gray-600">
              Select an image file:
            </label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4"
            />

            {/* Upload button */}
            <button
              type="button"
              onClick={handleUpload}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Upload Image
            </button>
          </form>
        </div>

        {/* Right section with image preview */}
        <div className="w-1/2 p-5 items-center flex ">
          <div className="overflow-hidden rounded-md items-center flex w-full">
            <img
              src={imagePreview || "/assets/dummy-image.jpg"}
              alt="Image Preview"
              className="w-full h-auto object-center m-5"
            />
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default FileUploadPage;
