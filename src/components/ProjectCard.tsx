import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { ProjectData } from "@/data/projects";

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative min-w-[400px] w-[400px] h-[500px] mx-4 overflow-hidden rounded-sm bg-card shadow-elegant focus-within:ring-2 focus-within:ring-red"
    >
      <Link
        to={`/projects/${project.slug}`}
        className="relative block h-full"
        aria-label={`View ${project.title}`}
      >
        <div className="relative h-full overflow-hidden">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute top-6 left-6">
            <span className="bg-red text-background px-4 py-2 rounded-sm text-sm font-medium capitalize">
              {project.category}
            </span>
          </div>

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
                <span className="inline-flex items-center px-2 py-1 bg-stone/40 rounded text-xs uppercase tracking-wide">
                  {project.category}
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                {project.summary}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.features.slice(0, 2).map((feature) => (
                  <span
                    key={feature}
                    className="bg-stone px-3 py-1 rounded-sm text-xs text-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <span className="btn-minimal inline-flex items-center group/btn">
                View Details
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </span>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.article>
  );
};

export default ProjectCard;
