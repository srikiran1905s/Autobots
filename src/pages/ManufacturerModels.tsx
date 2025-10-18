import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ModelCard from "@/components/ModelCard";
import FloatingChatbot from "@/components/FloatingChatbot";
import { manufacturers } from "@/data/manufacturers";

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  year: number;
  type: string;
  image_url: string;
  engine?: string;
  horsepower?: string;
}

const ManufacturerModels = () => {
  const { make } = useParams<{ make: string }>();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  
  const manufacturer = manufacturers.find(m => m.id === make);

  useEffect(() => {
    const fetchVehicles = async () => {
      if (!make) return;
      
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/vehicles/${make}`);
        const data = await response.json();
        
        if (data.success) {
          setVehicles(data.data);
        }
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [make]);

  if (!manufacturer) {
    return <div>Manufacturer not found</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground font-rajdhani">Loading vehicles...</p>
          </div>
        </div>
      </div>
    );
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
            {vehicles.map((vehicle, index) => (
              <ModelCard
                key={vehicle._id}
                id={vehicle.model.toLowerCase().replace(/\s+/g, '-')}
                manufacturerId={make!}
                name={vehicle.model}
                year={vehicle.year.toString()}
                bodyType={vehicle.type}
                trim={vehicle.engine || "Standard"}
                image={vehicle.image_url}
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
