import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Gauge, Fuel } from "lucide-react";

interface ModelCardProps {
  id: string;
  manufacturerId: string;
  name: string;
  year: string;
  bodyType: string;
  trim: string;
  image: string;
  index: number;
}

const ModelCard = ({ id, manufacturerId, name, year, bodyType, trim, image, index }: ModelCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/vehicle/${manufacturerId}/${id}`}>
        <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(251,146,60,0.3)] hover:scale-105">
          <div className="relative h-56 overflow-hidden">
            <img 
              src={image} 
              alt={`${name} ${year}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&auto=format&fit=crop&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-2xl font-rajdhani font-bold text-primary">
                {name}
              </h3>
              <p className="text-sm text-muted-foreground font-rajdhani">
                {trim}
              </p>
            </div>
          </div>
          
          <div className="p-5 bg-card">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-roboto-mono">{year}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Gauge className="w-4 h-4 text-primary" />
                <span className="font-rajdhani">{bodyType}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ModelCard;
