import React from "react";
import {Link} from "react-router-dom";
import useSigner from "../context-state/metamask-signer";

const Navbar = () => {
  const {address, connectWallet} = useSigner();
  const isMetaMaskConnected = !!address;

  return (
    <nav className="flex bg-white w-full border-b border-purple-500 md:px-10 md:py-5 justify-center items-center">
      <div className="flex justify-between items-center w-full font-montserrat">
        <div className="hover:text-gray-300 cursor-pointer text-lg text-purple-500">
          <Link to="/">IPFS Drive</Link>
        </div>
        {/* Left side with nav items */}
        <div className="flex space-x-6">
          <NavItem to="/my-files">My Images</NavItem>
          <NavItem to="/upload-file">Upload New Image</NavItem>
          <NavItem to="/access-files">Access Images</NavItem>
        </div>

        {/* Right side with MetaMask connection status */}
        <div>
          {isMetaMaskConnected ? (
            <button className="bg-purple-500 hover:bg-purple-300 text-white font-montserrat py-2 px-4 rounded-md text-sm">
              Metamask Connected
            </button>
          ) : (
            <button
              className="bg-purple-500 hover:bg-purple-300 text-white font-montserrat py-2 px-4 rounded-md text-sm"
              onClick={connectWallet}
            >
              Connect Metamask
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({to, children}) => (
  <Link to={to} className="text-sm hover:text-gray-300 cursor-pointer">
    {children}
  </Link>
);

export default Navbar;
