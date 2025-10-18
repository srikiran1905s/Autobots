import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface ManufacturerCardProps {
  id: string;
  name: string;
  logo: string;
  index: number;
}

const ManufacturerCard = ({ id, name, logo, index }: ManufacturerCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link to={`/vehicle/${id}`}>
        <div className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(251,146,60,0.2)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 flex items-center justify-center transform group-hover:scale-110 transition-transform bg-white rounded-lg p-2">
                <img 
                  src={logo} 
                  alt={`${name} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-rajdhani font-bold text-foreground group-hover:text-primary transition-colors">
                  {name}
                </h3>
                <p className="text-sm text-muted-foreground font-rajdhani">
                  View Models
                </p>
              </div>
            </div>
            
            <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
        </div>
      </Link>
    </motion.div>
  );
};

export default ManufacturerCard;
