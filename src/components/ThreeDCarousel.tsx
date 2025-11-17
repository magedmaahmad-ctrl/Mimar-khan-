import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useIsMobile } from '@/hooks/use-mobile';

// Import modular components
import { CameraSetup, CameraController } from './3D/core/CameraControls';
import { EnvironmentalLighting } from './3D/core/Lighting';
import { Environment } from './3D/core/Environment';
import { ProjectCard3D } from './3D/cards/ProjectCard';
import { useTextureBatchLoader } from './3D/utils/useTextureLoader';

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

interface ThreeDCarouselProps {
  projects: Project[];
  companyName?: string;
  onProjectClick?: (project: Project) => void;
}

/**
 * Main Carousel Group Component
 * Handles group-wide animations - all cards move together
 */
const CarouselGroup = React.memo(({ 
  projects, 
  onProjectClick, 
  hoveredProject, 
  setHoveredProject,
  textures,
  isMobile
}: { 
  projects: Project[]; 
  onProjectClick?: (project: Project) => void;
  hoveredProject: number | null;
  setHoveredProject: (id: number | null) => void;
  textures: Map<string, THREE.Texture>;
  isMobile: boolean;
}) => {
  const groupRef = React.useRef<THREE.Group>(null);
  const navigate = useNavigate();

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      
      // Gentle floating motion for the entire group
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.3;
      
      // Slow rotation of the entire group
      groupRef.current.rotation.y = time * 0.1;
      
      // Subtle breathing effect
      const scale = 1 + Math.sin(time * 0.3) * 0.02;
      groupRef.current.scale.setScalar(scale);
    }
  });

  // Memoize positions calculation
  const radius = isMobile ? 4 : 5.5;
  const angleStep = (2 * Math.PI) / projects.length;

  const handleProjectClick = useCallback((project: Project) => {
    navigate(`/project/${project.id}`);
    onProjectClick?.(project);
  }, [navigate, onProjectClick]);

  return (
    <group ref={groupRef}>
      {projects.map((project, index) => {
        const angle = index * angleStep;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

  return (
          <ProjectCard3D
            key={project.id}
            project={project}
            position={[x, 0, z]}
            rotation={[0, -angle, 0]}
            onHover={() => setHoveredProject(project.id)}
            onLeave={() => setHoveredProject(null)}
            onClick={() => handleProjectClick(project)}
            isHovered={hoveredProject === project.id}
            isMobile={isMobile}
            texture={textures.get(project.image) || null}
            index={index}
          />
        );
      })}
    </group>
  );
});

CarouselGroup.displayName = 'CarouselGroup';

/**
 * Loading Progress Component
 */
const LoadingProgress = ({ progress, isVisible }: { progress: number; isVisible: boolean }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-red mx-auto mb-4" />
        <div className="text-lg font-semibold text-foreground mb-2">
          Loading Projects...
        </div>
        <div className="w-64 bg-stone/20 rounded-full h-2 mb-2">
          <motion.div
            className="bg-red h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {Math.round(progress * 100)}% Complete
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Mobile Fallback Component
 */
const MobileFallback = React.memo(({ 
  projects, 
  onProjectClick 
}: { 
  projects: Project[];
  onProjectClick?: (project: Project) => void;
}) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6">
      {projects.map((project) => (
    <motion.div
                    key={project.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="group relative h-64 overflow-hidden rounded-lg bg-card shadow-elegant cursor-pointer"
          onClick={() => {
            navigate(`/project/${project.id}`);
            onProjectClick?.(project);
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-serif font-bold text-foreground mb-1">
                {project.title}
              </h3>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{project.location}</span>
              </div>
              </div>
            </motion.div>
      ))}
            </div>
  );
});

MobileFallback.displayName = 'MobileFallback';

/**
 * Main ThreeDCarousel Component
 * Optimized and modular
 */
const ThreeDCarousel: React.FC<ThreeDCarouselProps> = ({ 
  projects, 
  companyName = "Mimar Khan",
  onProjectClick 
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [cameraController, setCameraController] = useState<CameraController | null>(null);
  const [devicePerformance, setDevicePerformance] = useState<'high' | 'medium' | 'low'>('high');
  const isMobile = useIsMobile();

  // Detect device performance
  useEffect(() => {
      const cores = navigator.hardwareConcurrency || 4;
      const memory = (navigator as any).deviceMemory || 4;
      const isLowEnd = cores <= 2 || memory <= 2;
      const isMediumEnd = cores <= 4 || memory <= 4;
      
      if (isLowEnd) {
        setDevicePerformance('low');
      } else if (isMediumEnd) {
        setDevicePerformance('medium');
      } else {
        setDevicePerformance('high');
      }
  }, []);

  // Preload textures
  const imageUrls = useMemo(() => projects.map(p => p.image), [projects]);
  const { textures, loadingProgress, isLoading } = useTextureBatchLoader(imageUrls);

  // Filter projects (can be extended with search/category filters)
  const filteredProjects = useMemo(() => projects, [projects]);

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
    onProjectClick?.(project);
  }, [onProjectClick]);

  // Mobile fallback
  if (isMobile) {
  return (
      <div className="relative w-full min-h-screen bg-white py-20">
        <div className="container mx-auto px-6 mb-12">
          <h1 className="text-3xl font-serif font-bold text-charcoal mb-2">
            {companyName} Portfolio
          </h1>
          <p className="text-charcoal/70">
            {projects.length} Projects
          </p>
        </div>
        <MobileFallback projects={filteredProjects} onProjectClick={handleProjectClick} />
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* Loading Progress */}
      <LoadingProgress progress={loadingProgress} isVisible={isLoading} />
      
      {/* Fixed Center Text */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-red mb-2">
            {companyName.toUpperCase()}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium">
            CREATIONS
          </p>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ 
          position: [0, 2, 12], 
          fov: 55 
        }}
        style={{ background: 'transparent' }}
        dpr={devicePerformance === 'low' ? [1, 1.5] : [1, 2]}
        shadows={devicePerformance !== 'low'}
          gl={{ 
            antialias: devicePerformance !== 'low',
            alpha: true,
            powerPreference: devicePerformance === 'high' ? "high-performance" : "default"
          }}
        >
        {/* Optimized Lighting */}
        <EnvironmentalLighting devicePerformance={devicePerformance} />
        
        {/* Environment */}
        <Environment preset="city" devicePerformance={devicePerformance} />
        
        {/* Camera Setup */}
        <CameraSetup onCameraReady={setCameraController} />

        {/* Main Carousel */}
        <CarouselGroup 
          projects={filteredProjects} 
          onProjectClick={handleProjectClick}
          hoveredProject={hoveredProject}
          setHoveredProject={setHoveredProject}
          textures={textures}
          isMobile={isMobile}
        />
        
        {/* Post-processing Effects */}
        {devicePerformance !== 'low' && (
          <EffectComposer>
            <Bloom 
              intensity={0.2} 
              luminanceThreshold={0.9} 
              luminanceSmoothing={0.025}
            />
          </EffectComposer>
        )}
        
        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          minDistance={12}
          maxDistance={12}
          enableDamping={true}
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>

      {/* Project Details Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-card p-8 rounded-lg shadow-xl border border-border/20 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-serif font-bold text-foreground">
                {selectedProject.title}
              </h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedProject.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{selectedProject.year}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-red text-background px-2 py-1 rounded-sm text-sm font-medium capitalize">
                    {selectedProject.category}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-foreground">Description</h3>
              <p className="text-muted-foreground">{selectedProject.description}</p>
              
              <h3 className="text-xl font-serif font-bold text-foreground">Features</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.features.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-stone/20 text-foreground px-3 py-1 rounded-sm text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedProject(null)}
                className="btn-hero inline-flex items-center group"
              >
                Close
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ThreeDCarousel;
