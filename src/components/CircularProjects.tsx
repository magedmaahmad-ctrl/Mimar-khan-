import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  image: string;
  description: string;
  features: string[];
}

interface Category {
  id: string;
  name: string;
}

interface CircularProjectsProps {
  projects: Project[];
  filter: string;
  categories: Category[];
  setFilter: (filter: string) => void;
}

const CircularProjects = ({ projects, filter, categories, setFilter }: CircularProjectsProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  const radius = 300; // Radius of the sphere
  const angleStep = (2 * Math.PI) / filteredProjects.length;
  const elevationStep = Math.PI / Math.max(1, filteredProjects.length - 1);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen py-20">
      {/* 3D Sphere Container */}
      <div 
        className="relative mx-auto flex items-center justify-center"
        style={{ 
          width: `${radius * 2 + 400}px`, 
          height: `${radius * 2 + 400}px`,
          minHeight: '600px',
          perspective: '1200px',
          perspectiveOrigin: 'center center'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Center Information with 3D Filter Tabs */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="bg-card/90 backdrop-blur-md p-8 rounded-full shadow-elegant border border-border/20 text-center max-w-xs">
            {selectedProject ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-serif font-bold text-foreground">
                  {selectedProject.title}
                </h3>
                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{selectedProject.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{selectedProject.year}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {selectedProject.description}
                </p>
                <button className="btn-minimal text-sm inline-flex items-center group">
                  View Details
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-foreground">
                  Our Projects
                </h3>
                <p className="text-sm text-muted-foreground">
                  Hover over a project to learn more
                </p>
                <div className="text-2xl font-bold text-red">
                  {filteredProjects.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total Projects
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 3D Filter Tabs positioned around the center */}
        {categories.map((category, index) => {
          const angle = (index * 2 * Math.PI) / categories.length;
          const radius = 180; // Distance from center
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <motion.button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className="absolute z-30"
              initial={{ 
                opacity: 0,
                scale: 0.8,
                y: 50,
                rotateY: -90
              }}
              animate={{ 
                opacity: 1,
                scale: 1,
                y: 0,
                rotateY: 0
              }}
              transition={{
                duration: 1.2,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{
                left: `${radius + x - 50}px`,
                top: `${radius + y - 15}px`,
                transform: `translateZ(25px)`,
                transformStyle: 'preserve-3d'
              }}
              whileHover={{ 
                scale: 1.15,
                zIndex: 40,
                translateZ: 40,
                rotateY: 5
              }}
              whileTap={{ scale: 0.9 }}
            >
              <div className={`relative px-5 py-3 rounded-full font-medium text-sm transition-all duration-300 shadow-lg ${
                filter === category.id
                  ? "bg-red text-background shadow-red/20"
                  : "bg-card/90 backdrop-blur-sm text-foreground hover:bg-red/20 border border-border/30 hover:border-red/30"
              }`}>
                {filter === category.id && (
                  <motion.div
                    layoutId="activeFilter3D"
                    className="absolute inset-0 bg-red rounded-full shadow-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 font-semibold">{category.name}</span>
              </div>
            </motion.button>
          );
        })}

        {/* 3D Rotating Projects Sphere */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            rotateY: isPaused ? 0 : 360,
            rotateX: isPaused ? 0 : 360 
          }}
          transition={{
            duration: isPaused ? 0 : 60,
            repeat: isPaused ? 0 : Infinity,
            ease: "linear",
            times: [0, 0.25, 0.5, 0.75, 1]
          }}
          style={{
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          {filteredProjects.map((project, index) => {
            // 3D sphere positioning
            const angle = index * angleStep;
            const elevation = (index * elevationStep) - Math.PI / 2;
            const radiusAtElevation = radius * Math.cos(elevation);
            const x = Math.cos(angle) * radiusAtElevation;
            const y = Math.sin(elevation) * radius;
            const z = Math.sin(angle) * radiusAtElevation;

            return (
              <motion.div
                key={project.id}
                className="absolute"
                initial={{ 
                  opacity: 0,
                  scale: 0.8,
                  rotateY: -90,
                  y: 50
                }}
                animate={{ 
                  opacity: 1,
                  scale: 1,
                  rotateY: 0,
                  y: 0
                }}
                transition={{
                  duration: 1.5,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                style={{
                  left: `${radius + x - 100}px`,
                  top: `${radius + y - 125}px`,
                  transform: `translateZ(${z}px)`,
                  transformStyle: 'preserve-3d'
                }}
                whileHover={{ 
                  scale: 1.15,
                  zIndex: 30,
                  rotateY: 10,
                  translateZ: z + 50
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut"
                }}
                onHoverStart={() => setSelectedProject(project)}
                onHoverEnd={() => setSelectedProject(null)}
              >
                {/* Counter-rotate the content with 3D effects */}
                <motion.div
                  animate={{ 
                    rotateY: isPaused ? 0 : -360,
                    rotateX: isPaused ? 0 : -360
                  }}
                  transition={{
                    duration: isPaused ? 0 : 60,
                    repeat: isPaused ? 0 : Infinity,
                    ease: "linear"
                  }}
                  className="group relative w-48 h-60 overflow-hidden rounded-sm bg-card shadow-elegant cursor-pointer"
                  style={{
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div className="relative h-full overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-red text-background px-2 py-1 rounded-sm text-xs font-medium capitalize">
                        {project.category}
                      </span>
                    </div>

                    {/* Project Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h4 className="text-sm font-serif font-bold text-foreground mb-1 line-clamp-2">
                        {project.title}
                      </h4>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{project.location}</span>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-red/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center text-background p-4">
                        <h4 className="text-lg font-serif font-bold mb-2">
                          {project.title}
                        </h4>
                        <div className="flex items-center justify-center space-x-2 text-sm mb-3">
                          <Calendar className="h-3 w-3" />
                          <span>{project.year}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 justify-center mb-3">
                          {project.features.slice(0, 2).map((feature, idx) => (
                            <span
                              key={idx}
                              className="bg-background/20 px-2 py-1 rounded-sm text-xs"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        <button className="text-xs font-medium inline-flex items-center">
                          View Project
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Orbit Ring */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-border/20 rounded-full pointer-events-none"
          style={{
            width: `${radius * 2}px`,
            height: `${radius * 2}px`
          }}
        />
      </div>

      {/* Controls */}
      <div className="text-center mt-8 space-y-4">
        <p className="text-sm text-muted-foreground">
          {isPaused ? "Animation paused - Move away to resume" : "Hover over projects to pause animation"}
        </p>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="btn-minimal text-sm"
          >
            {isPaused ? "Resume" : "Pause"} 3D Animation
          </button>
        </div>
      </div>
    </div>
  );
};

export default CircularProjects;
