import { motion } from "framer-motion";
import Header from "@/components/Header";
import ManufacturerCard from "@/components/ManufacturerCard";
import FloatingChatbot from "@/components/FloatingChatbot";
import { manufacturers } from "@/data/manufacturers";
import heroBanner from "@/assets/hero-banner.png";
import logo from "../../logo.png";
import { Search, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroBanner} 
            alt="AutoBots Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/70 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={logo} 
                alt="AutoBots Logo" 
                className="w-20 h-20 md:w-24 md:h-24 animate-glow-pulse"
              />
              <h1 className="text-6xl md:text-7xl font-rajdhani font-bold text-primary animate-glow-pulse">
                AutoBots
              </h1>
            </div>
            <p className="text-2xl text-muted-foreground font-rajdhani mb-8">
              Your Intelligent Repair Companion - Advanced diagnostics, expert community, and comprehensive vehicle information
            </p>
            
            <div className="flex flex-wrap gap-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center p-2">
                  <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="font-rajdhani font-semibold text-foreground">Smart Diagnostics</p>
                  <p className="text-sm text-muted-foreground">AI-powered OBD analysis</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-rajdhani font-semibold text-foreground">Expert Community</p>
                  <p className="text-sm text-muted-foreground">Share & learn together</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-rajdhani font-semibold text-foreground">Detailed Specs</p>
                  <p className="text-sm text-muted-foreground">Complete vehicle data</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl font-rajdhani font-bold text-foreground mb-4">
              Select Your <span className="text-primary">Vehicle Manufacturer</span>
            </h2>
            <p className="text-xl text-muted-foreground font-rajdhani">
              Choose from the world's leading automotive brands
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {manufacturers.map((manufacturer, index) => (
              <ManufacturerCard
                key={manufacturer.id}
                id={manufacturer.id}
                name={manufacturer.name}
                logo={manufacturer.logo}
                index={index}
              />
            ))}
          </div>
        </div>
      </main>

      <FloatingChatbot />
    </div>
  );
};

export default Index;
