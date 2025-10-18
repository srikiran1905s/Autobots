import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import ModelCard from "@/components/ModelCard";
import FloatingChatbot from "@/components/FloatingChatbot";
import { manufacturers, models } from "@/data/manufacturers";

const ManufacturerModels = () => {
  const { make } = useParams<{ make: string }>();
  const manufacturer = manufacturers.find(m => m.id === make);
  const manufacturerModels = models[make as keyof typeof models] || [];

  if (!manufacturer) {
    return <div>Manufacturer not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground font-rajdhani">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{manufacturer.name}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-6 mb-4">
              <div className="w-24 h-24 bg-white rounded-2xl p-3 shadow-lg">
                <img 
                  src={manufacturer.logo} 
                  alt={`${manufacturer.name} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-5xl font-rajdhani font-bold text-foreground">
                Select Your <span className="text-primary">{manufacturer.name}</span> Model
              </h1>
            </div>
            <p className="text-muted-foreground text-lg font-rajdhani">
              Choose from our collection of {manufacturer.name} vehicles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {manufacturerModels.map((model, index) => (
              <ModelCard
                key={model.id}
                id={model.id}
                manufacturerId={make!}
                name={model.name}
                year={model.year}
                bodyType={model.bodyType}
                trim={model.trim}
                image={model.image}
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

export default ManufacturerModels;
