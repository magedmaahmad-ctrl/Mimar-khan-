import React, { useRef, useCallback, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
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

interface ProjectCardProps {
  project: Project;
  position: [number, number, number];
  rotation: [number, number, number];
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  isHovered: boolean;
  isMobile?: boolean;
  texture: THREE.Texture | null;
  index?: number;
}

/**
 * Optimized 3D Project Card Component
 * Memoized to prevent unnecessary re-renders
 */
export const ProjectCard3D = memo(({ 
  project, 
  position, 
  rotation, 
  onHover, 
  onLeave, 
  onClick,
  isHovered,
  isMobile = false,
  texture,
  index = 0
}: ProjectCardProps) => {
  const navigate = useNavigate();
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth hover scale transition
      const targetScale = isHovered ? (isMobile ? 1.15 : 1.3) : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      
      // Subtle floating animation when hovered
      if (isHovered) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      } else {
        meshRef.current.position.y = position[1];
      }
    }
  });

  const handleClick = useCallback(() => {
    navigate(`/project/${project.id}`);
    onClick();
  }, [navigate, project.id, onClick]);

  const handlePointerOver = useCallback(() => {
    onHover();
  }, [onHover]);

  const handlePointerOut = useCallback(() => {
    onLeave();
  }, [onLeave]);

  const material = texture 
    ? new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        opacity: isHovered ? 1 : 0.9,
        metalness: 0.2,
        roughness: 0.6,
      })
    : new THREE.MeshStandardMaterial({
        color: '#333333',
        transparent: true,
        opacity: 0.5,
      });

  return (
    <group position={position} rotation={rotation}>
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
        castShadow
        receiveShadow
      >
        <boxGeometry args={isMobile ? [1.2, 1.8, 0.05] : [1.6, 2.2, 0.05]} />
        <primitive object={material} />
      </mesh>
      
      {/* Hover Info */}
      {isHovered && (
        <Html position={[0, -2, 0]} center>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-card/95 backdrop-blur-md p-4 rounded-lg shadow-lg border border-border/20 min-w-[200px]"
          >
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">
              {project.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <MapPin className="h-3 w-3" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <Calendar className="h-3 w-3" />
              <span>{project.year}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
              {project.description}
            </p>
            <button 
              onClick={handleClick}
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
});

ProjectCard3D.displayName = 'ProjectCard3D';

