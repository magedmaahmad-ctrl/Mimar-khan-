import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Html, useTexture } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

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

interface SimpleThreeDCarouselProps {
  projects: Project[];
  companyName?: string;
  onProjectClick?: (project: Project) => void;
}

// Simple Project Card Component
function ProjectCard({ 
  project, 
  index, 
  totalProjects, 
  onProjectClick,
  isHovered,
  onHover
}: { 
  project: Project; 
  index: number; 
  totalProjects: number;
  onProjectClick?: (project: Project) => void;
  isHovered: boolean;
  onHover: (id: number | null) => void;
}) {
  const navigate = useNavigate();
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(project.image);
  
  const angle = (index * 2 * Math.PI) / totalProjects;
  const radius = 5;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  useFrame((state) => {
    if (meshRef.current) {
      // Remove individual rotation - projects will move as a group
      
      // Hover animation
      if (isHovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        meshRef.current.position.y = 0;
      }
    }
  });

  return (
    <group position={[x, 0, z]}>
      <mesh
        ref={meshRef}
        onClick={() => navigate(`/project/${project.id}`)}
        onPointerOver={() => onHover(project.id)}
        onPointerOut={() => onHover(null)}
      >
        <boxGeometry args={[2, 2.5, 0.05]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      
      {/* Project Title */}
      <Text
        position={[0, -2, 0]}
        fontSize={0.3}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        rotation={[0, -angle, 0]}
      >
        {project.title}
      </Text>
      
      {/* Hover Info */}
      {isHovered && (
        <Html position={[0, 1, 0]} center>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card/95 backdrop-blur-md p-3 rounded-lg shadow-lg border border-border/20 min-w-[200px]"
          >
            <h3 className="text-sm font-bold text-foreground mb-1">
              {project.title}
            </h3>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-1">
              <MapPin className="h-3 w-3" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
              <Calendar className="h-3 w-3" />
              <span>{project.year}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
              {project.description}
            </p>
            <button 
              onClick={() => navigate(`/project/${project.id}`)}
              className="text-xs font-medium text-red hover:text-red-dark inline-flex items-center group"
            >
              View Project
              <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </Html>
      )}
    </group>
  );
}

// Main Carousel Component
function Carousel({ 
  projects, 
  onProjectClick, 
  hoveredProject, 
  setHoveredProject 
}: { 
  projects: Project[]; 
  onProjectClick?: (project: Project) => void;
  hoveredProject: number | null;
  setHoveredProject: (id: number | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Synchronized group movement - all projects move together
      const time = state.clock.elapsedTime;
      
      // Gentle floating motion for the entire group
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.3;
      
      // Slow rotation of the entire group
      groupRef.current.rotation.y = time * 0.1;
      
      // Optional: Add a subtle breathing effect
      const scale = 1 + Math.sin(time * 0.3) * 0.02;
      groupRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef}>
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          totalProjects={projects.length}
          onProjectClick={onProjectClick}
          isHovered={hoveredProject === project.id}
          onHover={setHoveredProject}
        />
      ))}
    </group>
  );
}

// Main Component
const SimpleThreeDCarousel: React.FC<SimpleThreeDCarouselProps> = ({ 
  projects, 
  companyName = "Mimar Khan",
  onProjectClick 
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
    onProjectClick?.(project);
  }, [onProjectClick]);

  return (
    <div className="relative w-full h-screen bg-white">
      {/* Header */}
      <div className="absolute top-8 left-8 z-10">
        <h1 className="text-2xl font-serif font-bold text-charcoal">
          {companyName} Portfolio
        </h1>
        <p className="text-charcoal/70">
          {projects.length} Projects
        </p>
      </div>

      {/* Fixed Center Text - Always stays in place */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-red mb-2">
            MIMAR KHAN
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium">
            CREATIONS
          </p>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 2, 12], fov: 55 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />


        {/* Main Carousel */}
        <Carousel 
          projects={projects} 
          onProjectClick={handleProjectClick}
          hoveredProject={hoveredProject}
          setHoveredProject={setHoveredProject}
        />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          minDistance={12}
          maxDistance={12}
        />
      </Canvas>

      {/* Instructions - Hidden */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="text-center text-sm text-charcoal/70 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-charcoal/20 shadow-lg">
          Drag to rotate • Hover to explore • Click to select
        </div>
      </div> */}

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
            className="bg-card p-6 rounded-lg shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
              {selectedProject.title}
            </h2>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{selectedProject.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{selectedProject.year}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Category:</span> {selectedProject.category}
              </div>
            </div>

            <p className="text-muted-foreground mb-4">
              {selectedProject.description}
            </p>

            <div className="mb-4">
              <h3 className="font-semibold text-foreground mb-2">Features:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-stone/20 text-foreground rounded text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedProject(null)}
              className="w-full bg-red text-background px-4 py-2 rounded hover:bg-red-dark transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default SimpleThreeDCarousel;
