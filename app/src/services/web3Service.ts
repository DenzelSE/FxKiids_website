
import { toast } from "sonner";

// Interface for NFT checking
export interface Web3State {
  isConnected: boolean;
  address: string | null;
  hasVvipNft: boolean;
}

// Mock contract address for the VIP NFT
const VVIP_NFT_CONTRACT = "0x1234567890123456789012345678901234567890";

// Initialize with default state
const initialState: Web3State = {
  isConnected: false,
  address: null,
  hasVvipNft: false,
};

// Function to simulate connecting wallet
export const connectWallet = async (): Promise<Web3State> => {
  // Check if window.ethereum exists (MetaMask is installed)
  if (typeof window !== "undefined" && (window as any).ethereum) {
    try {
      // Request account access
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      
      if (accounts.length > 0) {
        const address = accounts[0];
        
        // For demo purposes, we're going to simulate NFT check with a 50% chance
        // In production, you would query the blockchain for NFT ownership
        const hasNft = Math.random() > 0.5;
        
        toast.success("Wallet connected successfully!");
        
        return {
          isConnected: true,
          address,
          hasVvipNft: hasNft,
        };
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    }
  } else {
    toast.error("MetaMask not detected. Please install MetaMask to continue.");
  }

  return initialState;
};

// Function to check if user owns the VVIP NFT
export const checkVvipAccess = async (address: string): Promise<boolean> => {
  if (!address) return false;
  
  // In a real application, you would:
  // 1. Call the NFT contract to check if the user's address owns the required NFT
  // 2. Return true/false based on the result
  
  // For demo purposes, we're simulating the check
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo: using a deterministic way to check ownership
    // In production, replace this with actual blockchain calls
    const hasNft = address.toLowerCase().endsWith('a') || 
                  address.toLowerCase().endsWith('e');
    
    return hasNft;
  } catch (error) {
    console.error("Error checking NFT ownership:", error);
    return false;
  }
};

// Function to disconnect wallet
export const disconnectWallet = async (): Promise<Web3State> => {
  toast.info("Wallet disconnected");
  return initialState;
};