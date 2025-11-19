import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { useState, useMemo, useCallback, useRef, memo } from "react";
import { ProjectData } from "@/data/projects";

interface Category {
  id: string;
  name: string;
}

interface CircularProjectsProps {
  projects: ProjectData[];
  filter: string;
  categories: Category[];
  setFilter: (filter: string) => void;
}

/**
 * Generate evenly distributed points on a sphere using Fibonacci sphere algorithm
 * This provides better distribution than simple angle/elevation steps
 */
const generateSpherePositions = (count: number, radius: number) => {
  const positions: Array<{ x: number; y: number; z: number }> = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y); // radius at y
    const theta = goldenAngle * i; // golden angle increment
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    positions.push({
      x: x * radius,
      y: y * radius,
      z: z * radius,
    });
  }

  return positions;
};

/**
 * Memoized Project Card Component
 * Prevents re-renders when other projects change
 */
const ProjectCard = memo(({
  project,
  position,
  index,
  isHovered,
  onHoverStart,
  onHoverEnd,
  rotationY,
}: {
  project: ProjectData;
  position: { x: number; y: number; z: number };
  index: number;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  rotationY: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // GPU-accelerated transforms using CSS variables
  const transform = useMemo(() => {
    const translateX = position.x;
    const translateY = position.y;
    const translateZ = position.z;
    
    return `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateY(${rotationY}deg)`;
  }, [position.x, position.y, position.z, rotationY]);

  return (
    <div
      ref={cardRef}
      className="absolute left-1/2 top-1/2 will-change-transform"
      style={{
        transform,
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <motion.div
        className="group relative w-48 h-60 overflow-hidden rounded-sm bg-card shadow-elegant cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut"
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="relative h-full overflow-hidden">
          <img
            src={project.images[0]}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            style={{ willChange: 'transform' }}
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-red/90 flex items-center justify-center pointer-events-none"
          >
            <div className="text-center text-background p-4">
              <h4 className="text-lg font-serif font-bold mb-2">
                {project.title}
              </h4>
              <div className="text-xs uppercase tracking-wide mb-3">
                {project.category}
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
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

/**
 * Memoized Filter Tab Component
 * Responsive positioning using CSS transforms instead of px
 */
const FilterTab = memo(({ 
  category, 
  index, 
  total, 
  isActive, 
  onClick 
}: { 
  category: Category; 
  index: number; 
  total: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  // Calculate position using percentage-based transforms
  const angle = (index * 2 * Math.PI) / total;
  const radius = 50; // Percentage-based radius
  
  const transform = useMemo(() => {
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return `translate(${x}%, ${y}%)`;
  }, [angle, radius]);

  return (
    <motion.button
      onClick={onClick}
      className="absolute left-1/2 top-1/2 z-30"
      initial={{ 
        opacity: 0,
        scale: 0.8,
      }}
      animate={{ 
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      whileHover={{ 
        scale: 1.15,
        zIndex: 40,
      }}
      whileTap={{ scale: 0.9 }}
    >
      <div className={`relative px-5 py-3 rounded-full font-medium text-sm transition-all duration-300 shadow-lg ${
        isActive
          ? "bg-red text-background shadow-red/20"
          : "bg-card/90 backdrop-blur-sm text-foreground hover:bg-red/20 border border-border/30 hover:border-red/30"
      }`}>
        {isActive && (
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
});

FilterTab.displayName = 'FilterTab';

const CircularProjects = ({ projects, filter, categories, setFilter }: CircularProjectsProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoize filtered projects to prevent unnecessary recalculations
  const filteredProjects = useMemo(() => {
    return filter === "all" 
      ? projects 
      : projects.filter(project => project.category === filter);
  }, [projects, filter]);

  // Memoize sphere positions calculation
  const spherePositions = useMemo(() => {
    const radius = 300;
    return generateSpherePositions(filteredProjects.length, radius);
  }, [filteredProjects.length]);

  // Memoize container dimensions
  const containerSize = useMemo(() => {
    const radius = 300;
    return {
      width: radius * 2 + 400,
      height: radius * 2 + 400,
      minHeight: 600,
    };
  }, []);


  // Memoized hover handlers to prevent re-renders
  const handleProjectHover = useCallback((projectId: number) => {
    setHoveredProjectId(projectId);
  }, []);

  const handleProjectLeave = useCallback(() => {
    setHoveredProjectId(null);
  }, []);

  // Get selected project for center display
  const selectedProject = useMemo(() => {
    return hoveredProjectId 
      ? filteredProjects.find(p => p.id === hoveredProjectId) || null
      : null;
  }, [hoveredProjectId, filteredProjects]);


  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen py-20">
      {/* 3D Sphere Container */}
      <div 
        ref={containerRef}
        className="relative mx-auto flex items-center justify-center"
        style={{ 
          width: `${containerSize.width}px`, 
          height: `${containerSize.height}px`,
          minHeight: `${containerSize.minHeight}px`,
          perspective: '1200px',
          perspectiveOrigin: 'center center'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Center Information */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div
            key={selectedProject?.id || 'default'}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-card/90 backdrop-blur-md p-8 rounded-full shadow-elegant border border-border/20 text-center max-w-xs"
          >
            {selectedProject ? (
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-foreground">
                  {selectedProject.title}
                </h3>
                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-3 w-3" />
                    <span>{selectedProject.location}</span>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 bg-stone/30 rounded text-[11px] uppercase tracking-wide">
                    {selectedProject.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {selectedProject.summary}
                </p>
                <button className="btn-minimal text-sm inline-flex items-center group">
                  View Details
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
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
          </motion.div>
        </div>

        {/* Responsive Filter Tabs */}
        {categories.map((category, index) => (
          <FilterTab
            key={category.id}
            category={category}
            index={index}
            total={categories.length}
            isActive={filter === category.id}
            onClick={() => setFilter(category.id)}
          />
        ))}

        {/* 3D Rotating Projects Sphere - Only parent rotates */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            rotateY: isPaused ? 0 : 360,
          }}
          transition={{
            duration: isPaused ? 0 : 60,
            repeat: isPaused ? 0 : Infinity,
            ease: "linear",
          }}
          style={{
            width: '600px',
            height: '600px',
            transformStyle: 'preserve-3d',
            perspective: '1000px',
            willChange: 'transform',
          }}
        >
          {filteredProjects.map((project, index) => {
            const position = spherePositions[index];
            if (!position) return null;

            return (
              <ProjectCard
                key={project.id}
                project={project}
                position={position}
                index={index}
                isHovered={hoveredProjectId === project.id}
                onHoverStart={() => handleProjectHover(project.id)}
                onHoverEnd={handleProjectLeave}
                rotationY={0} // No counter-rotation needed
              />
            );
          })}
        </motion.div>

        {/* Orbit Ring */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-border/20 rounded-full pointer-events-none"
          style={{
            width: '600px',
            height: '600px'
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
