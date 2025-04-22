
import { useState, useEffect } from "react";
import { useWeb3 } from "../context/Web3Context";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { Crown } from "lucide-react";

const VvipAccess = () => {
  const { isConnected, hasVvipNft, address, connect, loading } = useWeb3();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Add animation effect after component mounts
    setAnimateIn(true);
  }, []);

  // Function to display shortened wallet address
  const shortenAddress = (address: string | null) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // If user is not connected, show connect wallet UI
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-red-500 rounded-full mb-6">
                <Crown className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                VVIP Access Required
              </h1>
              <p className="text-gray-300 text-lg">
                Connect your wallet to verify your VVIP membership NFT
              </p>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={connect}
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 text-white text-lg py-6 px-8 rounded-lg w-full md:w-auto md:min-w-[200px] transition-all transform hover:scale-105"
              >
                {loading ? "Connecting..." : "Connect Wallet"}
              </Button>
            </div>

            <div className="mt-10 text-center">
              <p className="text-gray-400">
                Don't have a VVIP membership NFT yet?{" "}
                <a
                  href="#"
                  onClick={() => toast.info("NFT mint coming soon!")}
                  className="text-red-400 hover:text-red-300 underline"
                >
                  Learn how to get one
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user is connected but doesn't have the NFT
  if (isConnected && !hasVvipNft) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-gray-700 rounded-full mb-6">
                <Crown className="h-10 w-10 text-gray-300" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Not a VVIP Member
              </h1>
              <p className="text-gray-300 mb-2">
                Connected Wallet: {shortenAddress(address)}
              </p>
              <p className="text-red-400 text-lg mt-4">
                The connected wallet does not hold a VVIP Membership NFT
              </p>
            </div>

            <div className="mt-10 text-center">
              <p className="text-gray-300 mb-6">
                To access exclusive VVIP content, you need to own our membership NFT
              </p>
              <Button
                onClick={() => toast.info("NFT marketplace coming soon!")}
                className="bg-red-500 hover:bg-red-600 text-white text-lg py-4 px-6 rounded-lg transition-all transform hover:scale-105"
              >
                Get VVIP Membership
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If user is connected and has the NFT, show VVIP content
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-28 pb-20">
      <div
        className={`container mx-auto px-4 transition-all duration-1000 transform ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-red-500 rounded-full mb-6">
            <Crown className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            WELCOME TO VVIP ACCESS
          </h1>
          <div className="w-24 h-1 bg-red-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300">
            Exclusive premium content available only to our NFT membership holders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* VVIP Card 1 */}
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">
                Advanced Creative Direction
              </h3>
              <p className="text-gray-400 mb-6">
                Exclusive masterclass on creative direction for high-profile projects
                and brands.
              </p>
              <div className="aspect-video bg-gray-700 flex items-center justify-center mb-6">
                <svg
                  className="w-12 h-12 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <Button 
                onClick={() => toast.success("Video starting...")} 
                className="w-full bg-red-500 hover:bg-red-600 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Watch Now
              </Button>
            </div>
          </div>

          {/* VVIP Card 2 */}
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">
                Industry Connections Program
              </h3>
              <p className="text-gray-400 mb-6">
                Connect with top industry professionals through our exclusive
                networking events and mentorship.
              </p>
              <div className="aspect-video bg-gray-700 flex items-center justify-center mb-6">
                <svg
                  className="w-12 h-12 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <Button 
                onClick={() => toast.success("Video starting...")} 
                className="w-full bg-red-500 hover:bg-red-600 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Watch Now
              </Button>
            </div>
          </div>

          {/* VVIP Card 3 */}
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">
                Creative Business Accelerator
              </h3>
              <p className="text-gray-400 mb-6">
                Fast-track your creative business with personalized coaching and
                resources.
              </p>
              <div className="aspect-video bg-gray-700 flex items-center justify-center mb-6">
                <svg
                  className="w-12 h-12 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <Button 
                onClick={() => toast.success("Video starting...")} 
                className="w-full bg-red-500 hover:bg-red-600 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Watch Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VvipAccess;