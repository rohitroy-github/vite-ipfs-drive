import {useState, useEffect, useContext, createContext} from "react";
import {ethers} from "ethers";
import {abi} from "../../../blockchain-hardhat/artifacts/contracts/IPFSDriveContract_Main.sol/IPFSDriveContract_Main.json";
import config from "../backend-config.json";

const SignerContext = createContext();

const useSigner = () => useContext(SignerContext);

export const SignerProvider = ({children}) => {
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    try {
      setLoading(true);
      if (window.ethereum) {
        await window.ethereum.request({method: "eth_requestAccounts"});
        const getProvider = new ethers.providers.Web3Provider(window.ethereum);
        const getSigner = await getProvider.getSigner();
        const connectedAddress = await getSigner.getAddress();
        const connectedNetwork = await getProvider.getNetwork();
        const getContractAddress =
          config[connectedNetwork.chainId].contract.address;
        const getContract = new ethers.Contract(
          getContractAddress,
          abi,
          getSigner
        );

        setProvider(getProvider);
        setSigner(getSigner);
        setAddress(connectedAddress);
        setContract(getContract);
      } else {
        console.error("Metamask is not installed or not available");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Check if MetaMask is already connected
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts && accounts.length > 0) {
          await connectWallet();
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    };

    checkConnection();

    window.ethereum.on("accountsChanged", async (newAccounts) => {
      await checkConnection();
    });

    return () => {
      window.ethereum.removeListener("accountsChanged", connectWallet);
    };
  }, []);

  const contextValue = {
    signer,
    address,
    loading,
    connectWallet,
    provider,
    contract,
  };

  return (
    <SignerContext.Provider value={contextValue}>
      {children}
    </SignerContext.Provider>
  );
};

export default useSigner;
