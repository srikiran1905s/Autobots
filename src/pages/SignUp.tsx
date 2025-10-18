import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "../../logo.png";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Success!",
          description: "Account created successfully. Please sign in.",
        });
        // Redirect to sign in page
        setTimeout(() => navigate('/signin'), 1500);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to create account",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: "Error",
        description: "Unable to connect to server. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo and Title Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <img 
                src={logo} 
                alt="AutoBots Logo" 
                className="w-24 h-24 animate-glow-pulse"
              />
              <div className="absolute inset-0 bg-primary/20 blur-2xl" />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-rajdhani font-bold text-primary mb-2"
          >
            Sign Up
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground font-rajdhani text-lg"
          >
            Create your AutoBots account
          </motion.p>
        </div>

        {/* Sign Up Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-2xl p-8 border-2 border-primary/20 shadow-[0_0_30px_rgba(251,146,60,0.1)]"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label 
                htmlFor="email" 
                className="text-foreground font-rajdhani font-semibold text-base flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-primary" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="h-12 bg-muted border-primary/20 focus:border-primary transition-colors font-rajdhani text-base"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label 
                htmlFor="password" 
                className="text-foreground font-rajdhani font-semibold text-base flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-primary" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                minLength={6}
                className="h-12 bg-muted border-primary/20 focus:border-primary transition-colors font-rajdhani text-base"
              />
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label 
                htmlFor="confirmPassword" 
                className="text-foreground font-rajdhani font-semibold text-base flex items-center gap-2"
              >
                <Lock className="w-4 h-4 text-primary" />
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
                minLength={6}
                className="h-12 bg-muted border-primary/20 focus:border-primary transition-colors font-rajdhani text-base"
              />
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-rajdhani font-bold text-lg shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5 mr-2" />
                  Sign Up
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-3 text-muted-foreground font-rajdhani font-semibold">
                Or
              </span>
            </div>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-muted-foreground font-rajdhani text-base">
              Already have an account?{" "}
              <Link 
                to="/signin" 
                className="text-primary hover:text-primary/80 font-bold transition-colors inline-flex items-center gap-1 group"
              >
                Sign In
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Back to Home Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6"
        >
          <Link 
            to="/" 
            className="text-muted-foreground hover:text-primary transition-colors font-rajdhani text-sm inline-flex items-center gap-2 group"
          >
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;
