
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Web3State, connectWallet, checkVvipAccess, disconnectWallet } from "../services/web3Service";
import { useToast } from "../hooks/use-toast";

interface Web3ContextType extends Web3State {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  loading: boolean;
}

const Web3Context = createContext<Web3ContextType>({
  isConnected: false,
  address: null,
  hasVvipNft: false,
  connect: async () => {},
  disconnect: async () => {},
  loading: false,
});

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<Web3State>({
    isConnected: false,
    address: null,
    hasVvipNft: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  // Check if wallet was previously connected
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        try {
          const accounts = await (window as any).ethereum.request({
            method: "eth_accounts",
          });
          
          if (accounts.length > 0) {
            const address = accounts[0];
            const hasNft = await checkVvipAccess(address);
            
            setState({
              isConnected: true,
              address,
              hasVvipNft: hasNft,
            });
          }
        } catch (error) {
          console.error("Failed to check wallet connection:", error);
        }
      }
    };
    
    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const handleAccountsChanged = async (accounts: string[]) => {
        if (accounts.length > 0) {
          const address = accounts[0];
          const hasNft = await checkVvipAccess(address);
          
          setState({
            isConnected: true,
            address,
            hasVvipNft: hasNft,
          });
        } else {
          // User disconnected their wallet
          setState({
            isConnected: false,
            address: null,
            hasVvipNft: false,
          });
        }
      };

      (window as any).ethereum.on("accountsChanged", handleAccountsChanged);

      return () => {
        (window as any).ethereum.removeListener("accountsChanged", handleAccountsChanged);
      };
    }
  }, []);

  const connect = async () => {
    setLoading(true);
    try {
      const result = await connectWallet();
      setState(result);
    } catch (error) {
      console.error("Connection error:", error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to your wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const disconnect = async () => {
    setLoading(true);
    try {
      const result = await disconnectWallet();
      setState(result);
    } catch (error) {
      console.error("Disconnect error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Web3Context.Provider
      value={{
        ...state,
        connect,
        disconnect,
        loading,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};