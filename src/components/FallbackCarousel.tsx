import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectData } from "@/data/projects";

interface FallbackCarouselProps {
  projects: ProjectData[];
  companyName?: string;
  onProjectClick?: (project: ProjectData) => void;
}

const FallbackCarousel: React.FC<FallbackCarouselProps> = ({ 
  projects, 
  companyName = "Mimar Khan",
  onProjectClick 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    onProjectClick?.(project);
  };

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Header */}
      <div className="absolute top-8 left-8 z-10">
        <h1 className="text-2xl font-serif font-bold text-charcoal">
          {companyName} Portfolio
        </h1>
        <p className="text-charcoal/70">
          {projects.length} Projects
        </p>
      </div>

      {/* Top Text */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-center">
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-red mb-4">
            MIMAR KHAN
          </h1>
          <h2 className="text-2xl md:text-3xl font-light text-charcoal/70">
            CREATIONS
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center h-full px-8">
        <div className="max-w-4xl w-full">
          {/* Project Display */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-border/20"
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-96 md:h-full">
                <img
                  src={currentProject.images[0]}
                  alt={currentProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="px-3 py-1 bg-red text-background rounded-full text-sm font-medium">
                    {currentProject.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
                  {currentProject.title}
                </h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{currentProject.location}</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {currentProject.summary}
                </p>

                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-3">Key Features:</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-stone/20 text-foreground rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleProjectClick(currentProject)}
                  className="inline-flex items-center px-6 py-3 bg-red text-background rounded-lg hover:bg-red-dark transition-colors group"
                >
                  View Project Details
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevProject}
              className="flex items-center space-x-2 px-4 py-2 bg-card/80 backdrop-blur-sm text-foreground rounded-lg hover:bg-card/90 transition-colors border border-border/20"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-red' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextProject}
              className="flex items-center space-x-2 px-4 py-2 bg-card/80 backdrop-blur-sm text-foreground rounded-lg hover:bg-card/90 transition-colors border border-border/20"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-card p-8 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-3xl font-serif font-bold text-foreground">
                {selectedProject.title}
              </h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-muted-foreground hover:text-foreground text-2xl"
              >
                ×
              </button>
            </div>
            
              <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{selectedProject.location}</span>
              </div>
              <div className="text-muted-foreground">
                <span className="font-medium">Category:</span> {selectedProject.category}
              </div>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {selectedProject.summary}
            </p>

            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">Features:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-stone/20 text-foreground rounded-full text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedProject(null)}
                className="flex-1 bg-red text-background px-6 py-3 rounded-lg hover:bg-red-dark transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Instructions - Hidden */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-center text-sm text-charcoal/70 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-charcoal/20 shadow-lg">
          Use navigation buttons or dots to explore projects • Click to view details
        </div>
      </div> */}
    </div>
  );
};

export default FallbackCarousel;
