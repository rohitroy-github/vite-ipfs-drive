import React, {useState} from "react";
import FormData from "form-data";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSigner from "../context-state/metamask-signer";

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

        const transaction = await contract.connect(signer).addURL(IMG_IPFS_URL);

        await transaction.wait();

        // resettingToInitialValues
        setFileName("");
        setSelectedFile(null);
        setImagePreview(null);

        // Customization: https://fkhadra.github.io/react-toastify/how-to-style/
        toast("File successfully uploaded to drive ✅", {
          position: "top-right",
          autoClose: 1500,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          icon: false,
          hideProgressBar: true,
          closeButton: false,
        });
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
        <div className="w-[40%] p-5 items-center flex flex-col justify-center">
          <form className="flex flex-col text-sm w-[85%] items-center">
            <label htmlFor="fileInput" className="mb-4 text-gray-600">
              Select the image you wanna upload to your drive
            </label>

            {/* customizedHTMLFileInputSystem */}
            <div className="w-full mb-4">
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="fileInput" className="flex">
                <span
                  id="file-name"
                  className="flex bg-purple-100 w-2/3 rounded-l-md text-sm text-center items-center justify-center"
                >
                  {fileName}
                </span>
                <span className="bg-purple-500 hover:bg-purple-300 text-white font-montserrat py-2 px-4 text-sm w-1/3 rounded-r-md text-center">
                  Select File
                </span>
              </label>
            </div>

            {/* Upload button */}
            <button
              type="button"
              onClick={handleUpload}
              className="bg-purple-500 hover:bg-purple-300 text-white font-montserrat py-2 px-4 rounded-md text-sm"
            >
              Upload Image
            </button>
          </form>
        </div>

        {/* Right section with image preview */}
        <div className="w-[60%] items-center justify-center flex">
          <div className="flex rounded-md items-center justify-center">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="md:w-[80%] 3xl:w-[75%] h-auto object-center p-10 bg-purple-300 rounded-md"
              />
            ) : (
              <img
                src={"/assets/dummy-image.jpg"}
                alt="Image Preview"
                className="md:w-[60%] 3xl:w-[60%] h-auto object-center p-10 bg-purple-300 rounded-md"
              />
            )}
          </div>
        </div>
      </div>

      <ToastContainer
        toastClassName={
          "font-montserrat bg-purple-500 text-white text-center flex"
        }
        bodyClassName={"text-sm p-3"}
      />
    </div>
  );
};

export default FileUploadPage;
