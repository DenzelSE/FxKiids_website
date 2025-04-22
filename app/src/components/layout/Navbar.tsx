
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useToast } from "../../hooks/use-toast";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { Crown } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClasses = cn(
    "fixed w-full top-0 z-50 transition-all duration-300",
    isScrolled ? "bg-black/90 shadow-lg" : "bg-black"
  );

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between py-4">
        <Link to="/" className="text-white text-2xl font-bold">
          <span className="text-white">FX</span>
          <span className="text-red-500">KIIDS</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/" currentPath={location.pathname}>
            Home
          </NavLink>
          <NavLink to="/courses" currentPath={location.pathname}>
            Courses
          </NavLink>
          <NavLink to="/socials" currentPath={location.pathname}>
            Socials
          </NavLink>
          <NavLink to="/vvip" currentPath={location.pathname} isVvip={true}>
            <Crown className="mr-1 h-4 w-4" /> VVIP Access
          </NavLink>
          <Link to="/contact">
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              Contact Us
            </Button>
          </Link>
        </div>

        <div className="md:hidden">
          {/* Mobile menu can be implemented here */}
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  currentPath: string;
  children: React.ReactNode;
  isVvip?: boolean;
}

const NavLink = ({ to, currentPath, children, isVvip }: NavLinkProps) => {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      className={cn(
        "text-white hover:text-red-400 transition-colors flex items-center",
        isActive && "font-semibold",
        isVvip && "flex items-center"
      )}
    >
      {children}
    </Link>
  );
};

export default Navbar;