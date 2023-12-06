import React from "react";
import {Link} from "react-router-dom";
import useSigner from "../context-state/metamask-signer";

const Navbar = () => {
  const {address, connectWallet} = useSigner();
  const isMetaMaskConnected = !!address;

  return (
    <nav className="bg-white text-black h-[10vh] flex items-center justify-between px-6 py-3 font-montserrat border-b border-gray-200">
      {/* Left side with nav items */}
      <div className="flex space-x-6">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/my-files">My Images</NavItem>
        <NavItem to="/upload-file">Upload New Image</NavItem>
        <NavItem to="/access-files">Access Images</NavItem>
      </div>

      {/* Right side with MetaMask connection status */}
      <div>
        {isMetaMaskConnected ? (
          <button className="bg-gray-200 text-black px-4 py-2 rounded-md">
            Metamask Connected
          </button>
        ) : (
          <button
            className="bg-gray-200 text-black px-4 py-2 rounded-md"
            onClick={connectWallet}
          >
            Connect Metamask
          </button>
        )}
      </div>
    </nav>
  );
};

const NavItem = ({to, children}) => (
  <Link to={to} className="text-md hover:text-gray-300 cursor-pointer">
    {children}
  </Link>
);

export default Navbar;
