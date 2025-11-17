import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    category: string;
    location: string;
    year: string;
    image: string;
    description: string;
    features: string[];
  };
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative min-w-[400px] w-[400px] h-[500px] mx-4 overflow-hidden rounded-sm bg-card shadow-elegant"
    >
      <div className="relative h-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Category Badge */}
        <div className="absolute top-6 left-6">
          <span className="bg-red text-background px-4 py-2 rounded-sm text-sm font-medium capitalize">
            {project.category}
          </span>
        </div>

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent"
        >
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h3 className="text-2xl font-serif font-bold text-foreground mb-3">
              {project.title}
            </h3>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{project.year}</span>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.features.slice(0, 2).map((feature, index) => (
                <span
                  key={index}
                  className="bg-stone px-3 py-1 rounded-sm text-xs text-foreground"
                >
                  {feature}
                </span>
              ))}
            </div>

            <button className="btn-minimal inline-flex items-center group/btn">
              View Details
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;