import { Link, useLocation } from "react-router-dom";
import { LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "../../logo.png";
import { useState, useEffect } from "react";

const Header = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in by checking localStorage
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, [location.pathname]);
  
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/home";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary border-b border-primary/20 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src={logo} 
                alt="AutoBots Logo" 
                className="w-10 h-10 transition-transform group-hover:scale-110 group-hover:rotate-12"
              />
              <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/40 transition-all" />
            </div>
            <div>
              <h1 className="text-2xl font-rajdhani font-bold text-primary tracking-wider">
                AutoBots
              </h1>
              <p className="text-xs text-muted-foreground font-rajdhani">
                Your Intelligent Repair Companion
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`font-rajdhani font-semibold text-lg transition-colors relative pb-1 ${
                isActive("/") ? "text-primary brightness-125" : "text-primary/80 hover:text-primary"
              }`}
            >
              Home
              <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-all ${
                isActive("/") ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
              }`} />
            </Link>
            <Link 
              to="/obd" 
              className={`font-rajdhani font-semibold text-lg transition-colors relative pb-1 group ${
                isActive("/obd") ? "text-primary brightness-125" : "text-primary/80 hover:text-primary"
              }`}
            >
              OBD Scanner
              <span className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-all ${
                isActive("/obd") ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
              }`} />
            </Link>
            {isLoggedIn ? (
              <Link to="/profile">
                <Button 
                  variant="outline" 
                  className="font-rajdhani font-semibold text-base border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
            ) : (
              <Link to="/signin">
                <Button 
                  variant="outline" 
                  className="font-rajdhani font-semibold text-base border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
