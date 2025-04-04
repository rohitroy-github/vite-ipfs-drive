import React, {useEffect, useState} from "react";
import useSigner from "../context-state/metamask-signer";
import {shortenMetamaskAddress} from "../utils/index";
import {Link} from "react-router-dom";

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FetchedUploadedImage from "./FetchedUploadedImage";

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
        <div className="w-3/4 p-5">
          {/* Image Gallery Grid */}
          {fileArray.length > 0 ? (
            <div className="flex items-start justify-center flex-wrap">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {fileArray.map((imageUrl, index) => (
                  <FetchedUploadedImage index={index} imageUrl={imageUrl} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="pb-5">You haven't uploaded any files yet.</p>
                {/* Use Link for navigation */}
                <Link
                  to="/upload-file"
                  className="bg-purple-500 hover:bg-purple-300 text-white font-montserrat py-2 px-4 rounded-md text-sm"
                >
                  Upload Your First File
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* rightSection */}
        <div className="w-1/4 p-5 items-center flex flex-col border-l border-purple-500">
          <input
            type="text"
            value={sharedAccess}
            onChange={(e) => setSharedAccess(e.target.value)}
            placeholder="Enter wallet address (0x...)"
            className="mb-4 p-3 rounded-md border border-purple-500 w-full text-center text-sm"
          />
          <button
            onClick={handleShareAccess}
            className="bg-purple-500 hover:bg-purple-300 text-white font-montserrat py-2 px-4 rounded-md text-xs mb-4"
          >
            Share Drive Access
          </button>
          <div className="text-center">
            {sharedUsers.length > 0 ? (
              <div>
                <p className="text-sm">Authorized wallets</p>
                <ul className="list-disc pl-5 text-xs">
                  {sharedUsers.map((user, index) => (
                    <li key={index}>{shortenMetamaskAddress(user[0])}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-xs">
                You haven't shared access with anyone yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetchUploadedFiles;
