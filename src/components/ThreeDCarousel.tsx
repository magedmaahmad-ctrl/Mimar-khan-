import React, { useRef, useEffect, useState, useCallback, useMemo, useLayoutEffect } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { OrbitControls, Text, Html, useTexture, Environment, Sky, Cloud, PerspectiveCamera, useFrustum } from '@react-three/drei';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Calendar, Loader2, Search, Filter, Compare, ChevronRight, Eye, EyeOff, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

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

// Navigation and accessibility state interface
interface NavigationState {
  currentCategory: string | null;
  searchQuery: string;
  comparisonMode: boolean;
  selectedForComparison: Project[];
  breadcrumbs: string[];
}

interface AccessibilityState {
  reducedMotion: boolean;
  highContrast: boolean;
  screenReaderMode: boolean;
  keyboardNavigation: boolean;
  soundEnabled: boolean;
}

// Performance monitoring and optimization utilities
class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = 0;
  private fps = 60;
  private isLowPerformance = false;

  update() {
    this.frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - this.lastTime >= 1000) {
      this.fps = this.frameCount;
      this.isLowPerformance = this.fps < 30;
      this.frameCount = 0;
      this.lastTime = currentTime;
    }
  }

  getFPS() {
    return this.fps;
  }

  isLowPerformanceMode() {
    return this.isLowPerformance;
  }
}

// LOD (Level of Detail) system
class LODSystem {
  private camera: THREE.Camera;
  private lodLevels = {
    high: { distance: 8, geometry: [2, 2.5], particles: 50 },
    medium: { distance: 12, geometry: [1.5, 2], particles: 30 },
    low: { distance: 16, geometry: [1, 1.5], particles: 15 }
  };

  constructor(camera: THREE.Camera) {
    this.camera = camera;
  }

  getLODLevel(position: THREE.Vector3): 'high' | 'medium' | 'low' {
    const distance = this.camera.position.distanceTo(position);
    
    if (distance < this.lodLevels.high.distance) return 'high';
    if (distance < this.lodLevels.medium.distance) return 'medium';
    return 'low';
  }

  getGeometrySize(position: THREE.Vector3): [number, number] {
    const level = this.getLODLevel(position);
    return this.lodLevels[level].geometry as [number, number];
  }

  getParticleCount(): number {
    // Use medium as default for particles
    return this.lodLevels.medium.particles;
  }
}

// Texture loading manager with progressive enhancement
class TextureManager {
  private cache = new Map<string, THREE.Texture>();
  private loadingQueue: string[] = [];
  private loadedCount = 0;
  private totalCount = 0;
  private onProgress?: (progress: number) => void;

  constructor(onProgress?: (progress: number) => void) {
    this.onProgress = onProgress;
  }

  async loadTexture(url: string, priority: 'high' | 'medium' | 'low' = 'medium'): Promise<THREE.Texture> {
    if (this.cache.has(url)) {
      return this.cache.get(url)!;
    }

    return new Promise((resolve, reject) => {
      const loader = new THREE.TextureLoader();
      
      // Add to loading queue based on priority
      if (priority === 'high') {
        this.loadingQueue.unshift(url);
      } else {
        this.loadingQueue.push(url);
      }
      this.totalCount++;

      loader.load(
        url,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          this.cache.set(url, texture);
          this.loadedCount++;
          this.updateProgress();
          resolve(texture);
        },
        undefined,
        (error) => {
          console.warn(`Failed to load texture: ${url}`, error);
          reject(error);
        }
      );
    });
  }

  private updateProgress() {
    if (this.onProgress) {
      this.onProgress(this.loadedCount / this.totalCount);
    }
  }

  getProgress(): number {
    return this.totalCount > 0 ? this.loadedCount / this.totalCount : 0;
  }

  preloadTextures(urls: string[]) {
    urls.forEach(url => this.loadTexture(url, 'low'));
  }
}

// Animation frame scheduler for efficient updates
class AnimationScheduler {
  private callbacks = new Map<string, () => void>();
  private isRunning = false;
  private frameId: number | null = null;

  add(id: string, callback: () => void) {
    this.callbacks.set(id, callback);
    if (!this.isRunning) {
      this.start();
    }
  }

  remove(id: string) {
    this.callbacks.delete(id);
    if (this.callbacks.size === 0) {
      this.stop();
    }
  }

  private start() {
    this.isRunning = true;
    const animate = () => {
      this.callbacks.forEach(callback => callback());
      this.frameId = requestAnimationFrame(animate);
    };
    this.frameId = requestAnimationFrame(animate);
  }

  private stop() {
    this.isRunning = false;
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }
}

// Sound system for audio feedback
class SoundManager {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private isEnabled = true;

  constructor() {
    this.initAudioContext();
  }

  private async initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Audio context not supported');
    }
  }

  private createTone(frequency: number, duration: number, type: OscillatorType = 'sine'): AudioBuffer | null {
    if (!this.audioContext) return null;

    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate;
      data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 2);
    }

    return buffer;
  }

  async playSound(type: 'hover' | 'click' | 'rotation' | 'ambient', volume: number = 0.3) {
    if (!this.audioContext || !this.isEnabled) return;

    try {
      await this.audioContext.resume();
      
      const frequencies = {
        hover: [800, 1000],
        click: [1200, 800],
        rotation: [400, 600],
        ambient: [200, 300]
      };

      const buffer = this.createTone(frequencies[type][0], 0.1);
      if (!buffer) return;

      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();
      
      source.buffer = buffer;
      gainNode.gain.value = volume;
      
      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      source.start();
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }
}

// Skeleton loading component for project cards
function ProjectCardSkeleton({ 
  position, 
  rotation, 
  isMobile = false 
}: { 
  position: [number, number, number]; 
  rotation: [number, number, number];
  isMobile?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle pulsing animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh ref={meshRef}>
        <planeGeometry args={isMobile ? [1.2, 1.8] : [1.6, 2.2]} />
        <meshBasicMaterial 
          color="#333333" 
          transparent 
          opacity={0.6}
        />
      </mesh>
      
      {/* Skeleton lines */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={isMobile ? [1.1, 1.7] : [1.5, 2.1]} />
        <meshBasicMaterial 
          color="#555555" 
          transparent 
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

// Loading progress component
function LoadingProgress({ progress, isVisible }: { progress: number; isVisible: boolean }) {
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
}

// Fade transition wrapper
function FadeTransition({ 
  children, 
  isVisible, 
  delay = 0 
}: { 
  children: React.ReactNode; 
  isVisible: boolean; 
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.9 
      }}
      transition={{ 
        duration: 0.5, 
        delay,
        ease: "easeOut" 
      }}
    >
      {children}
    </motion.div>
  );
}

// Camera component for initialization
function CameraSetup({ onCameraReady }: { onCameraReady: (controller: CameraController) => void }) {
  const { camera } = useThree();
  
  useEffect(() => {
    const controller = new CameraController(camera);
    onCameraReady(controller);
  }, [camera, onCameraReady]);
  
  return null;
}

// LOD System setup component
function LODSetup({ onLODReady }: { onLODReady: (lodSystem: LODSystem) => void }) {
  const { camera } = useThree();
  
  useEffect(() => {
    const lodSystem = new LODSystem(camera);
    onLODReady(lodSystem);
  }, [camera, onLODReady]);
  
  return null;
}

// Performance Monitor component
function PerformanceMonitorComponent({ monitor }: { monitor: PerformanceMonitor }) {
  useFrame(() => {
    monitor.update();
  });
  
  return null;
}

// Breadcrumb navigation component
function BreadcrumbNavigation({ 
  breadcrumbs, 
  onNavigate 
}: { 
  breadcrumbs: string[]; 
  onNavigate: (index: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-4 left-4 z-20"
    >
      <nav className="flex items-center space-x-2 bg-card/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-border/20">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
            <button
              onClick={() => onNavigate(index)}
              className={`text-sm transition-colors ${
                index === breadcrumbs.length - 1
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {crumb}
            </button>
          </React.Fragment>
        ))}
      </nav>
    </motion.div>
  );
}

// Search component with 3D visual feedback
function SearchComponent({ 
  searchQuery, 
  onSearchChange, 
  filteredProjects,
  isVisible 
}: { 
  searchQuery: string; 
  onSearchChange: (query: string) => void;
  filteredProjects: Project[];
  isVisible: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
      className="absolute top-4 right-4 z-20"
    >
      <div className="relative">
        <div className="flex items-center bg-card/80 backdrop-blur-sm rounded-lg border border-border/20">
          <Search className="h-4 w-4 text-muted-foreground ml-3" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => setIsExpanded(false)}
            className="bg-transparent px-3 py-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none w-48"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="text-muted-foreground hover:text-foreground mr-2"
            >
              ✕
            </button>
          )}
        </div>
        
        {/* Search results dropdown */}
        <AnimatePresence>
          {isExpanded && searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-1 bg-card/95 backdrop-blur-sm rounded-lg border border-border/20 max-h-48 overflow-y-auto"
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="px-3 py-2 text-sm text-foreground hover:bg-stone/20 cursor-pointer border-b border-border/10 last:border-b-0"
                  >
                    <div className="font-medium">{project.title}</div>
                    <div className="text-xs text-muted-foreground">{project.category}</div>
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  No projects found
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Category filter component
function CategoryFilter({ 
  categories, 
  currentCategory, 
  onCategoryChange,
  isVisible 
}: { 
  categories: string[]; 
  currentCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  isVisible: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      className="absolute bottom-4 left-4 z-20"
    >
      <div className="flex items-center space-x-2 bg-card/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-border/20">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <button
          onClick={() => onCategoryChange(null)}
          className={`text-sm px-2 py-1 rounded transition-colors ${
            currentCategory === null
              ? 'bg-red text-background'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`text-sm px-2 py-1 rounded transition-colors capitalize ${
              currentCategory === category
                ? 'bg-red text-background'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// Project comparison mode component
function ComparisonMode({ 
  selectedProjects, 
  onRemoveProject,
  isVisible 
}: { 
  selectedProjects: Project[];
  onRemoveProject: (projectId: number) => void;
  isVisible: boolean;
}) {
  if (!isVisible || selectedProjects.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-4 right-4 z-20"
    >
      <div className="bg-card/80 backdrop-blur-sm p-4 rounded-lg border border-border/20 max-w-md">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground">Comparison Mode</h3>
          <span className="text-xs text-muted-foreground">{selectedProjects.length}/2</span>
        </div>
        
        <div className="space-y-2">
          {selectedProjects.map((project) => (
            <div key={project.id} className="flex items-center justify-between bg-stone/20 p-2 rounded">
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{project.title}</div>
                <div className="text-xs text-muted-foreground">{project.category}</div>
              </div>
              <button
                onClick={() => onRemoveProject(project.id)}
                className="text-muted-foreground hover:text-foreground ml-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        
        {selectedProjects.length === 2 && (
          <button className="w-full mt-3 bg-red text-background px-3 py-2 rounded text-sm font-medium hover:bg-red-dark transition-colors">
            Compare Projects
          </button>
        )}
      </div>
    </motion.div>
  );
}

// Camera control system
class CameraController {
  private camera: THREE.Camera;
  private targetPosition: THREE.Vector3;
  private targetLookAt: THREE.Vector3;
  private isTransitioning: boolean = false;
  private shakeIntensity: number = 0;

  constructor(camera: THREE.Camera) {
    this.camera = camera;
    this.targetPosition = camera.position.clone();
    this.targetLookAt = new THREE.Vector3(0, 0, 0);
  }

  focusOnProject(projectPosition: THREE.Vector3, duration: number = 2000) {
    this.isTransitioning = true;
    this.targetPosition = projectPosition.clone().multiplyScalar(1.5);
    this.targetLookAt = projectPosition.clone();
    
    // Add camera shake effect
    this.shakeIntensity = 0.1;
    setTimeout(() => {
      this.shakeIntensity = 0;
    }, 300);
  }

  update(deltaTime: number) {
    if (this.isTransitioning) {
      // Smooth camera transition
      this.camera.position.lerp(this.targetPosition, deltaTime * 0.002);
      
      // Look at target
      const lookAtTarget = this.targetLookAt.clone();
      this.camera.lookAt(lookAtTarget);
      
      // Add shake effect
      if (this.shakeIntensity > 0) {
        const shakeX = (Math.random() - 0.5) * this.shakeIntensity;
        const shakeY = (Math.random() - 0.5) * this.shakeIntensity;
        this.camera.position.x += shakeX;
        this.camera.position.y += shakeY;
        this.shakeIntensity *= 0.95;
      }
    }
  }

  resetToDefault() {
    this.isTransitioning = false;
    this.targetPosition = new THREE.Vector3(0, 2, 10);
    this.targetLookAt = new THREE.Vector3(0, 0, 0);
  }
}

// Enhanced particle system for floating architectural elements
function FloatingParticles({ count = 50, hoveredProject }: { count?: number; hoveredProject?: number | null }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tempObject = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = new Array(count).fill(0).map(() => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      scale: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.02 + 0.01,
      type: Math.floor(Math.random() * 3), // 0: cube, 1: sphere, 2: pyramid
      originalPosition: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ] as [number, number, number]
    }));
    return temp;
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      particles.forEach((particle, i) => {
        const time = state.clock.elapsedTime;
        
        // Enhanced floating motion with architectural blueprint-like movement
        const blueprintOffset = Math.sin(time * particle.speed * 2 + i) * 0.3;
        const verticalFloat = Math.cos(time * particle.speed * 0.7 + i) * 0.2;
        
        // Attract particles to hovered project
        let attractionX = 0, attractionZ = 0;
        if (hoveredProject !== null) {
          const angle = (hoveredProject * 2 * Math.PI) / 6; // Assuming 6 projects
          const radius = 5.5;
          const targetX = Math.cos(angle) * radius;
          const targetZ = Math.sin(angle) * radius;
          attractionX = (targetX - particle.originalPosition[0]) * 0.1;
          attractionZ = (targetZ - particle.originalPosition[2]) * 0.1;
        }
        
        tempObject.position.set(
          particle.originalPosition[0] + blueprintOffset + attractionX,
          particle.originalPosition[1] + verticalFloat,
          particle.originalPosition[2] + Math.sin(time * particle.speed * 0.5 + i) * 0.4 + attractionZ
        );
        
        // Enhanced rotation with architectural precision
        tempObject.rotation.set(
          time * particle.speed + i,
          time * particle.speed * 0.7 + i,
          time * particle.speed * 0.3 + i
        );
        
        // Scale with architectural rhythm
        const scale = particle.scale * (1 + Math.sin(time * 2 + i) * 0.15);
        tempObject.scale.setScalar(scale);
        
        tempObject.updateMatrix();
        meshRef.current.setMatrixAt(i, tempObject.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial 
        color="#ffffff" 
        transparent 
        opacity={0.4}
        emissive="#4A90E2"
        emissiveIntensity={0.3}
        metalness={0.2}
        roughness={0.8}
      />
    </instancedMesh>
  );
}

// Floating architectural blueprints
function FloatingBlueprints({ hoveredProject }: { hoveredProject?: number | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const [time, setTime] = useState(0);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      setTime(state.clock.elapsedTime);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Architectural blueprint planes */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * Math.PI) / 3;
        const radius = 12 + Math.sin(time * 0.1 + i) * 2;
        const height = Math.sin(time * 0.15 + i) * 3;
        const rotation = time * 0.02 + i;
        
        return (
          <group key={`blueprint-${i}`} position={[Math.cos(angle) * radius, height, Math.sin(angle) * radius]}>
            <mesh rotation={[0, rotation, 0]}>
              <planeGeometry args={[2, 1.5]} />
              <meshBasicMaterial 
                color="#00BFFF" 
                transparent 
                opacity={0.2}
                side={THREE.DoubleSide}
                wireframe={true}
              />
            </mesh>
            
            {/* Blueprint grid lines */}
            <mesh rotation={[0, rotation, 0]} position={[0, 0, 0.01]}>
              <planeGeometry args={[1.8, 1.3]} />
              <meshBasicMaterial 
                color="#4A90E2" 
                transparent 
                opacity={0.1}
                side={THREE.DoubleSide}
                wireframe={true}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Miniature building models that orbit the carousel
function MiniatureBuildings({ hoveredProject }: { hoveredProject?: number | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const [time, setTime] = useState(0);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      setTime(state.clock.elapsedTime);
    }
  });

  const buildingTypes = [
    { geometry: 'box', color: '#8B4513', scale: [0.3, 0.8, 0.3] },
    { geometry: 'cylinder', color: '#708090', scale: [0.2, 0.6, 0.2] },
    { geometry: 'cone', color: '#2F4F4F', scale: [0.25, 0.7, 0.25] },
    { geometry: 'box', color: '#A0522D', scale: [0.4, 0.5, 0.4] },
  ];

  return (
    <group ref={groupRef}>
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI) / 4;
        const radius = 15 + Math.sin(time * 0.08 + i) * 3;
        const height = Math.sin(time * 0.12 + i) * 2;
        const buildingType = buildingTypes[i % buildingTypes.length];
        
        return (
          <group key={`building-${i}`} position={[Math.cos(angle) * radius, height, Math.sin(angle) * radius]}>
            <mesh>
              {buildingType.geometry === 'box' && <boxGeometry args={buildingType.scale} />}
              {buildingType.geometry === 'cylinder' && <cylinderGeometry args={[0.1, 0.1, 0.6, 8]} />}
              {buildingType.geometry === 'cone' && <coneGeometry args={[0.12, 0.7, 8]} />}
              <meshStandardMaterial 
                color={buildingType.color}
                transparent 
                opacity={0.8}
                metalness={0.3}
                roughness={0.7}
              />
            </mesh>
            
            {/* Building details */}
            <mesh position={[0, 0.4, 0]}>
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Geometric wireframes representing architectural concepts
function ArchitecturalWireframes({ hoveredProject }: { hoveredProject?: number | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const [time, setTime] = useState(0);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.04;
      setTime(state.clock.elapsedTime);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Complex wireframe structures */}
      {Array.from({ length: 4 }).map((_, i) => {
        const angle = (i * Math.PI) / 2;
        const radius = 18;
        const height = Math.sin(time * 0.1 + i) * 4;
        
        return (
          <group key={`wireframe-${i}`} position={[Math.cos(angle) * radius, height, Math.sin(angle) * radius]}>
            {/* Main structure */}
            <mesh rotation={[0, angle, 0]}>
              <octahedronGeometry args={[1]} />
              <meshBasicMaterial 
                color="#00FFFF" 
                transparent 
                opacity={0.3}
                wireframe={true}
              />
            </mesh>
            
            {/* Supporting lines */}
            {Array.from({ length: 6 }).map((_, j) => (
              <mesh key={`line-${j}`} position={[0, 0, 0]} rotation={[0, (j * Math.PI) / 3, 0]}>
                <cylinderGeometry args={[0.01, 0.01, 2]} />
                <meshBasicMaterial 
                  color="#00FFFF" 
                  transparent 
                  opacity={0.2}
                />
              </mesh>
            ))}
          </group>
        );
      })}
    </group>
  );
}

// Floating information panels that follow project cards
function FloatingInfoPanels({ 
  projects, 
  hoveredProject, 
  accessibilityState 
}: { 
  projects: Project[]; 
  hoveredProject?: number | null;
  accessibilityState: AccessibilityState;
}) {
  const [time, setTime] = useState(0);
  
  useFrame((state) => {
    setTime(state.clock.elapsedTime);
  });

  return (
    <>
      {projects.map((project, index) => {
        const angle = (index * 2 * Math.PI) / projects.length;
        const radius = 5.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const isHovered = hoveredProject === project.id;
        
        if (!isHovered) return null;
        
        return (
          <Html
            key={`info-panel-${project.id}`}
            position={[x, 1, z]}
            center
            distanceFactor={8}
            occlude
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`bg-card/95 backdrop-blur-md p-4 rounded-lg shadow-lg border border-border/20 min-w-[250px] ${
                accessibilityState.highContrast ? 'border-2 border-white' : ''
              }`}
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
              <div className="mb-3">
                <span className={`px-2 py-1 rounded-sm text-xs font-medium capitalize ${
                  accessibilityState.highContrast 
                    ? 'bg-white text-black border border-black' 
                    : 'bg-red text-background'
                }`}>
                  {project.category}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {project.features.slice(0, 3).map((feature, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded-sm text-xs ${
                      accessibilityState.highContrast 
                        ? 'bg-white text-black border border-black' 
                        : 'bg-stone/20 text-foreground'
                    }`}
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <button 
                onClick={() => navigate(`/project/${project.id}`)}
                className="text-xs font-medium text-red hover:text-red-dark inline-flex items-center group"
              >
                View Project
                <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </Html>
        );
      })}
    </>
  );
}

// Interactive tooltips with rich media content
function InteractiveTooltips({ 
  projects, 
  hoveredProject,
  accessibilityState 
}: { 
  projects: Project[]; 
  hoveredProject?: number | null;
  accessibilityState: AccessibilityState;
}) {
  return (
    <>
      {projects.map((project, index) => {
        const angle = (index * 2 * Math.PI) / projects.length;
        const radius = 5.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const isHovered = hoveredProject === project.id;
        
        if (!isHovered) return null;
        
        return (
          <Html
            key={`tooltip-${project.id}`}
            position={[x, -1.5, z]}
            center
            distanceFactor={12}
            occlude
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`bg-card/90 backdrop-blur-sm p-3 rounded-lg shadow-md border border-border/20 max-w-[200px] ${
                accessibilityState.highContrast ? 'border-2 border-white' : ''
              }`}
            >
              <div className="text-sm font-medium text-foreground mb-1">
                {project.title}
              </div>
              <div className="text-xs text-muted-foreground mb-2">
                {project.category} • {project.year}
              </div>
              <div className="text-xs text-muted-foreground line-clamp-2">
                {project.description}
              </div>
            </motion.div>
          </Html>
        );
      })}
    </>
  );
}

// Real-time project statistics overlay
function ProjectStatisticsOverlay({ 
  projects, 
  currentCategory,
  accessibilityState 
}: { 
  projects: Project[]; 
  currentCategory: string | null;
  accessibilityState: AccessibilityState;
}) {
  const stats = useMemo(() => {
    const filteredProjects = currentCategory 
      ? projects.filter(p => p.category === currentCategory)
      : projects;
    
    const totalProjects = filteredProjects.length;
    const categories = [...new Set(filteredProjects.map(p => p.category))];
    const avgYear = Math.round(
      filteredProjects.reduce((sum, p) => sum + parseInt(p.year), 0) / totalProjects
    );
    
    return { totalProjects, categories: categories.length, avgYear };
  }, [projects, currentCategory]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20"
    >
      <div className={`bg-card/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-border/20 ${
        accessibilityState.highContrast ? 'border-2 border-white' : ''
      }`}>
        <div className="flex items-center space-x-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-foreground">{stats.totalProjects}</div>
            <div className="text-xs text-muted-foreground">Projects</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-foreground">{stats.categories}</div>
            <div className="text-xs text-muted-foreground">Categories</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-foreground">{stats.avgYear}</div>
            <div className="text-xs text-muted-foreground">Avg Year</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Floating text labels that appear on hover
function FloatingLabels({ projects, hoveredProject }: { projects: Project[]; hoveredProject?: number | null }) {
  const [time, setTime] = useState(0);
  
  useFrame((state) => {
    setTime(state.clock.elapsedTime);
  });

  return (
    <>
      {projects.map((project, index) => {
        const angle = (index * 2 * Math.PI) / projects.length;
        const radius = 5.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const isHovered = hoveredProject === project.id;
        
        if (!isHovered) return null;
        
        return (
          <Text
            key={`label-${project.id}`}
            position={[x, 2, z]}
            fontSize={0.3}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
            rotation={[0, -angle, 0]}
          >
            {project.title}
          </Text>
        );
      })}
    </>
  );
}

// Interactive geometric patterns that respond to user interaction
function InteractiveGeometricPatterns({ hoveredProject }: { hoveredProject?: number | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const [time, setTime] = useState(0);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      setTime(state.clock.elapsedTime);
      
      // Scale based on hover state
      const targetScale = hoveredProject !== null ? 1.2 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Architectural blueprint lines */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * Math.PI) / 6;
        const radius = 8 + Math.sin(time * 0.1 + i) * 0.5;
        return (
          <mesh key={`line-${i}`} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]} rotation={[0, angle, 0]}>
            <planeGeometry args={[0.02, 2]} />
            <meshBasicMaterial 
              color="#4A90E2" 
              transparent 
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
      
      {/* Floating architectural elements */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI) / 4;
        const radius = 6;
        const height = Math.sin(time * 0.2 + i) * 2;
        return (
          <mesh key={`element-${i}`} position={[Math.cos(angle) * radius, height, Math.sin(angle) * radius]}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial 
              color="#FF6B6B" 
              transparent 
              opacity={0.6}
              emissive="#FF6B6B"
              emissiveIntensity={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Morphing shapes representing different project categories
function MorphingShapes({ projects, hoveredProject }: { projects: Project[]; hoveredProject?: number | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const [time, setTime] = useState(0);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.06;
      setTime(state.clock.elapsedTime);
    }
  });

  const categoryShapes = {
    residential: 'box',
    commercial: 'cylinder',
    industrial: 'cone',
    institutional: 'octahedron',
    landscape: 'sphere',
    interior: 'torus'
  };

  return (
    <group ref={groupRef}>
      {projects.map((project, index) => {
        const angle = (index * 2 * Math.PI) / projects.length;
        const radius = 20;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const height = Math.sin(time * 0.1 + index) * 2;
        const shapeType = categoryShapes[project.category as keyof typeof categoryShapes] || 'box';
        const isHovered = hoveredProject === project.id;
        
        return (
          <group key={`morph-${project.id}`} position={[x, height, z]}>
            <mesh scale={isHovered ? 1.5 : 1}>
              {shapeType === 'box' && <boxGeometry args={[0.5, 0.5, 0.5]} />}
              {shapeType === 'cylinder' && <cylinderGeometry args={[0.3, 0.3, 0.8, 8]} />}
              {shapeType === 'cone' && <coneGeometry args={[0.3, 0.8, 8]} />}
              {shapeType === 'octahedron' && <octahedronGeometry args={[0.4]} />}
              {shapeType === 'sphere' && <sphereGeometry args={[0.3, 8, 6]} />}
              {shapeType === 'torus' && <torusGeometry args={[0.3, 0.1, 8, 16]} />}
              <meshStandardMaterial 
                color={isHovered ? "#FFD700" : "#4A90E2"}
                transparent 
                opacity={0.7}
                metalness={0.5}
                roughness={0.3}
                emissive={isHovered ? "#FFD700" : "#000000"}
                emissiveIntensity={isHovered ? 0.3 : 0}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Procedural generation of architectural elements
function ProceduralArchitecture({ hoveredProject }: { hoveredProject?: number | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const [time, setTime] = useState(0);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.07;
      setTime(state.clock.elapsedTime);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Procedural building structures */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * Math.PI) / 6;
        const radius = 25 + Math.sin(time * 0.05 + i) * 5;
        const height = Math.sin(time * 0.08 + i) * 3;
        const scale = 0.5 + Math.sin(time * 0.1 + i) * 0.3;
        
        return (
          <group key={`proc-${i}`} position={[Math.cos(angle) * radius, height, Math.sin(angle) * radius]}>
            {/* Base structure */}
            <mesh scale={[scale, scale * 2, scale]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial 
                color="#708090" 
                transparent 
                opacity={0.6}
                wireframe={true}
              />
            </mesh>
            
            {/* Procedural details */}
            {Array.from({ length: 3 }).map((_, j) => (
              <mesh key={`detail-${j}`} position={[0, j * 0.5, 0]} scale={[0.8, 0.2, 0.8]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial 
                  color="#2F4F4F" 
                  transparent 
                  opacity={0.4}
                />
              </mesh>
            ))}
          </group>
        );
      })}
    </group>
  );
}

// Tessellated surfaces for enhanced visual depth
function TessellatedSurfaces({ hoveredProject }: { hoveredProject?: number | null }) {
  const groupRef = useRef<THREE.Group>(null);
  const [time, setTime] = useState(0);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      setTime(state.clock.elapsedTime);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Tessellated ground plane */}
      <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50, 32, 32]} />
        <meshStandardMaterial 
          color="#1a1a2e" 
          transparent 
          opacity={0.3}
          wireframe={true}
        />
      </mesh>
      
      {/* Tessellated spheres */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * Math.PI) / 3;
        const radius = 30;
        const height = Math.sin(time * 0.1 + i) * 2;
        
        return (
          <mesh key={`tess-${i}`} position={[Math.cos(angle) * radius, height, Math.sin(angle) * radius]}>
            <icosahedronGeometry args={[1, 2]} />
            <meshStandardMaterial 
              color="#00BFFF" 
              transparent 
              opacity={0.2}
              wireframe={true}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Light rays emanating from center
function LightRays() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} rotation={[0, (i * Math.PI) / 4, 0]}>
          <planeGeometry args={[0.1, 8]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// Enhanced environmental lighting
function EnvironmentalLighting() {
  const { camera } = useThree();
  const [timeOfDay, setTimeOfDay] = useState(0.5); // 0 = night, 1 = day
  
  useFrame((state) => {
    // Simulate time of day based on elapsed time
    const time = (state.clock.elapsedTime * 0.1) % 1;
    setTimeOfDay(time);
  });

  const ambientIntensity = useMemo(() => {
    return 0.3 + Math.sin(timeOfDay * Math.PI) * 0.4;
  }, [timeOfDay]);

  const directionalIntensity = useMemo(() => {
    return 0.8 + Math.sin(timeOfDay * Math.PI) * 0.6;
  }, [timeOfDay]);

  const lightColor = useMemo(() => {
    const hue = 30 + Math.sin(timeOfDay * Math.PI) * 30; // Warm to cool
    return new THREE.Color().setHSL(hue / 360, 0.7, 0.8);
  }, [timeOfDay]);

  return (
    <>
      <ambientLight intensity={ambientIntensity} color={lightColor} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={directionalIntensity}
        color={lightColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color="#4A90E2" />
      <pointLight position={[0, 10, 0]} intensity={0.3} color="#FF6B6B" />
      <pointLight position={[5, 5, 5]} intensity={0.2} color="#4ECDC4" />
    </>
  );
}

// Custom architectural material shader
function ArchitecturalMaterialShader() {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  
  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  const shaderMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color('#1a1a2e') },
      color2: { value: new THREE.Color('#16213e') },
      color3: { value: new THREE.Color('#0f3460') },
      color4: { value: new THREE.Color('#4A90E2') },
      mouse: { value: new THREE.Vector2(0, 0) }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      void main() {
        vUv = uv;
        vPosition = position;
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      uniform vec3 color4;
      uniform vec2 mouse;
      varying vec2 vUv;
      varying vec3 vPosition;
      varying vec3 vNormal;
      
      // Advanced noise functions
      float noise(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      
      float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 6; i++) {
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }
      
      // Architectural pattern generation
      float architecturalPattern(vec2 uv) {
        vec2 grid = abs(fract(uv * 20.0) - 0.5);
        float gridLine = smoothstep(0.0, 0.02, min(grid.x, grid.y));
        
        float noise1 = fbm(uv * 3.0 + time * 0.1);
        float noise2 = fbm(uv * 6.0 + time * 0.05);
        float noise3 = fbm(uv * 12.0 + time * 0.02);
        
        float blueprint = step(0.7, noise1) * step(0.3, noise2);
        float elements = step(0.8, noise3) * 0.2;
        
        return gridLine + blueprint + elements;
      }
      
      void main() {
        vec2 uv = vUv;
        
        // Create architectural pattern
        float pattern = architecturalPattern(uv);
        
        // Enhanced gradient with architectural colors
        vec3 color = mix(color1, color2, uv.y + pattern * 0.2);
        color = mix(color, color3, sin(uv.x * 2.0 + time) * 0.5 + 0.5);
        color = mix(color, color4, pattern * 0.3);
        
        // Add architectural grid lines
        color = mix(color, color4, (1.0 - pattern) * 0.1);
        
        // Add subtle architectural elements
        color += pattern * color4 * 0.2;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `
  }), []);

  return shaderMaterial;
}

// Chromatic aberration effect component
function ChromaticAberrationEffect() {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  
  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  const shaderMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      intensity: { value: 0.02 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float intensity;
      varying vec2 vUv;
      
      void main() {
        vec2 offset = vec2(sin(time * 2.0), cos(time * 2.0)) * intensity;
        
        float r = texture2D(tDiffuse, vUv + offset).r;
        float g = texture2D(tDiffuse, vUv).g;
        float b = texture2D(tDiffuse, vUv - offset).b;
        
        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `
  }), []);

  return shaderMaterial;
}

// Depth of field blur shader
function DepthOfFieldShader() {
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  
  useFrame((state) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  const shaderMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      focusDistance: { value: 10.0 },
      aperture: { value: 0.1 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform float focusDistance;
      uniform float aperture;
      varying vec2 vUv;
      
      void main() {
        float depth = gl_FragCoord.z;
        float blur = abs(depth - focusDistance) * aperture;
        
        vec4 color = texture2D(tDiffuse, vUv);
        color.a *= (1.0 - blur);
        
        gl_FragColor = color;
      }
    `
  }), []);

  return shaderMaterial;
}

// Enhanced dynamic background with advanced shader effects
function DynamicBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Animate the background
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
    
    if (shaderRef.current) {
      // Update shader uniforms
      shaderRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  const shaderMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color('#1a1a2e') },
      color2: { value: new THREE.Color('#16213e') },
      color3: { value: new THREE.Color('#0f3460') },
      color4: { value: new THREE.Color('#4A90E2') },
      mouse: { value: new THREE.Vector2(0, 0) }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      uniform vec3 color4;
      uniform vec2 mouse;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      // Noise function
      float noise(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      
      // Fractal noise
      float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 0.0;
        
        for (int i = 0; i < 6; i++) {
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }
      
      void main() {
        vec2 uv = vUv;
        
        // Create architectural grid pattern
        vec2 grid = abs(fract(uv * 20.0) - 0.5);
        float gridLine = smoothstep(0.0, 0.02, min(grid.x, grid.y));
        
        // Animated noise for architectural texture
        float noise1 = fbm(uv * 3.0 + time * 0.1);
        float noise2 = fbm(uv * 6.0 + time * 0.05);
        float noise3 = fbm(uv * 12.0 + time * 0.02);
        
        // Create architectural blueprint-like pattern
        float blueprint = step(0.7, noise1) * step(0.3, noise2);
        
        // Gradient with architectural colors
        vec3 color = mix(color1, color2, uv.y + noise1 * 0.2);
        color = mix(color, color3, sin(uv.x * 2.0 + time) * 0.5 + 0.5);
        color = mix(color, color4, blueprint * 0.3);
        
        // Add architectural grid lines
        color = mix(color, color4, (1.0 - gridLine) * 0.1);
        
        // Add subtle architectural elements
        float elements = step(0.8, noise3) * 0.2;
        color += elements * color4;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `
  }), []);

  return (
    <mesh ref={meshRef} position={[0, 0, -15]} scale={[20, 20, 1]}>
      <planeGeometry args={[1, 1]} />
      <primitive ref={shaderRef} object={shaderMaterial} />
    </mesh>
  );
}

// Architectural grid lines
function ArchitecturalGrid() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Vertical lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={`v-${i}`} position={[(i - 10) * 2, 0, -10]}>
          <planeGeometry args={[0.02, 20]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
      {/* Horizontal lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh key={`h-${i}`} position={[0, (i - 10) * 2, -10]} rotation={[0, 0, Math.PI / 2]}>
          <planeGeometry args={[0.02, 20]} />
          <meshBasicMaterial 
            color="#ffffff" 
            transparent 
            opacity={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

// Individual project component with enhanced materials and effects
function ProjectCard({ 
  project, 
  position, 
  rotation, 
  onHover, 
  onLeave, 
  onClick,
  isHovered,
  isMobile = false,
  soundManager,
  index = 0,
  lodSystem,
  textureManager,
  performanceMonitor,
  isVisible = true
}: { 
  project: Project; 
  position: [number, number, number]; 
  rotation: [number, number, number];
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  isHovered: boolean;
  isMobile?: boolean;
  soundManager?: SoundManager;
  index?: number;
  lodSystem?: LODSystem;
  textureManager?: TextureManager;
  performanceMonitor?: PerformanceMonitor;
  isVisible?: boolean;
}) {
  const navigate = useNavigate();
  const meshRef = useRef<THREE.Mesh>(null);
  const shadowRef = useRef<THREE.Mesh>(null);
  const rimLightRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [normalMap, setNormalMap] = useState<THREE.Texture | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [entranceDelay, setEntranceDelay] = useState(index * 200); // Staggered entrance
  const [hasEntered, setHasEntered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lodLevel, setLodLevel] = useState<'high' | 'medium' | 'low'>('high');

  // Load textures with progressive enhancement
  useEffect(() => {
    const loadTextures = async () => {
      try {
        setIsLoading(true);
        
        // Load main texture with priority based on visibility
        const priority = isVisible ? 'high' : 'low';
        const loadedTexture = textureManager 
          ? await textureManager.loadTexture(project.image, priority)
          : await new Promise<THREE.Texture>((resolve) => {
    const loader = new THREE.TextureLoader();
              loader.load(project.image, (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                resolve(texture);
              });
            });
        
        setTexture(loadedTexture);
        
        // Create normal map only for high/medium LOD
        if (lodLevel !== 'low') {
          const canvas = document.createElement('canvas');
          canvas.width = lodLevel === 'high' ? 256 : 128;
          canvas.height = lodLevel === 'high' ? 256 : 128;
          const ctx = canvas.getContext('2d')!;
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, '#8080ff');
          gradient.addColorStop(1, '#ff8080');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          const normalTexture = new THREE.CanvasTexture(canvas);
          setNormalMap(normalTexture);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.warn(`Failed to load texture for project ${project.id}:`, error);
        setIsLoading(false);
      }
    };

    loadTextures();
  }, [project.image, textureManager, isVisible, lodLevel]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const deltaTime = state.clock.getDelta();
    
    // Update LOD level based on distance
    if (lodSystem && meshRef.current) {
      const currentLodLevel = lodSystem.getLODLevel(meshRef.current.position);
      if (currentLodLevel !== lodLevel) {
        setLodLevel(currentLodLevel);
      }
    }

    // Skip expensive animations for low LOD or low performance
    const shouldAnimate = lodLevel !== 'low' && 
      (!performanceMonitor || !performanceMonitor.isLowPerformanceMode());

    // Entrance animation with staggered timing
    if (!hasEntered && time * 1000 > entranceDelay) {
      setHasEntered(true);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }

    if (meshRef.current && isVisible) {
      // Entrance animation
      if (hasEntered && isAnimating) {
        const progress = Math.min((time * 1000 - entranceDelay) / 1000, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        meshRef.current.scale.setScalar(easeOut);
        meshRef.current.position.y = position[1] + (1 - easeOut) * 2;
      }

      // Remove individual floating animation - projects will move as a group
      const baseY = position[1];
      
      // Card flip animation on hover (only for high LOD)
      if (isHovered && lodLevel === 'high') {
        meshRef.current.rotation.x = Math.sin(time * 2) * 0.1;
        meshRef.current.rotation.z = Math.cos(time * 1.5) * 0.05;
      } else {
        meshRef.current.rotation.x = 0;
        meshRef.current.rotation.z = 0;
      }
      
      meshRef.current.position.y = baseY;
      
      // Add hover scale effect with smooth transition
      const targetScale = isHovered ? (isMobile ? 1.15 : 1.3) : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      
      // Remove individual rotation - projects will move as a group
    }

    // Update shadow position with enhanced effects (only for high/medium LOD)
    if (shadowRef.current && lodLevel !== 'low') {
      shadowRef.current.position.y = position[1] - 0.5;
      const shadowScale = isHovered ? 1.2 : 1;
      shadowRef.current.scale.lerp(new THREE.Vector3(shadowScale, shadowScale, shadowScale), 0.05);
      
      // Shadow rotation for dynamic effect
      if (shouldAnimate) {
        shadowRef.current.rotation.z = time * 0.1;
      }
    }

    // Update rim lighting with enhanced effects (only for high LOD)
    if (rimLightRef.current && lodLevel === 'high') {
      rimLightRef.current.rotation.z = time * 0.5;
      rimLightRef.current.material.opacity = isHovered ? 0.4 : 0.1;
      
      // Pulsing effect when hovered
      if (isHovered && shouldAnimate) {
        rimLightRef.current.material.opacity *= (1 + Math.sin(time * 4) * 0.2);
      }
    }
  });

  // Enhanced material with LOD-aware properties
  const material = useMemo(() => {
    if (!texture) return null;
    
    // Adjust material complexity based on LOD level
    const materialProps: any = {
      map: texture,
      transparent: true,
      opacity: isHovered ? 1 : 0.9,
    };

    // Add advanced properties only for high LOD
    if (lodLevel === 'high') {
      materialProps.normalMap = normalMap;
      materialProps.normalScale = new THREE.Vector2(0.5, 0.5);
      materialProps.metalness = 0.3;
      materialProps.roughness = 0.4;
      materialProps.envMapIntensity = 1.0;
      materialProps.emissive = isHovered ? new THREE.Color(0x444444) : new THREE.Color(0x000000);
      materialProps.emissiveIntensity = isHovered ? 0.2 : 0;
    } else if (lodLevel === 'medium') {
      materialProps.metalness = 0.2;
      materialProps.roughness = 0.6;
    }
    // Low LOD uses basic material properties only

    return new THREE.MeshStandardMaterial(materialProps);
  }, [texture, normalMap, isHovered, lodLevel]);

  // Show skeleton while loading
  if (isLoading) {
    return (
      <ProjectCardSkeleton 
        position={position} 
        rotation={rotation} 
        isMobile={isMobile} 
      />
    );
  }

  // Enhanced event handlers with sound integration
  const handlePointerOver = useCallback(() => {
    if (soundManager) {
      soundManager.playSound('hover', 0.2);
    }
    onHover();
  }, [soundManager, onHover]);

  const handlePointerOut = useCallback(() => {
    onLeave();
  }, [onLeave]);

  const handleClick = useCallback(() => {
    if (soundManager) {
      soundManager.playSound('click', 0.4);
    }
    navigate(`/project/${project.id}`);
  }, [soundManager, navigate, project.id]);

  return (
    <group position={position} rotation={rotation}>
      {/* Main project card */}
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
        scale={1}
        castShadow
        receiveShadow
      >
        <planeGeometry args={isMobile ? [1.2, 1.8] : [1.6, 2.2]} />
        {material && <primitive object={material} />}
      </mesh>

      {/* Soft shadow beneath card */}
      <mesh ref={shadowRef} position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={isMobile ? [1.4, 2.0] : [1.8, 2.4]} />
          <meshBasicMaterial 
          color="#000000" 
            transparent={true}
          opacity={0.2}
          side={THREE.DoubleSide}
          />
      </mesh>
      
      {/* Rim lighting effect */}
      <mesh ref={rimLightRef} position={[0, 0, 0.01]}>
        <planeGeometry args={isMobile ? [1.3, 1.9] : [1.7, 2.3]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent={true} 
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Enhanced glow effect with camera-following properties */}
      {isHovered && (
        <>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={isMobile ? [1.4, 2.0] : [1.8, 2.4]} />
          <meshBasicMaterial 
            color="#ff4444" 
            transparent={true} 
              opacity={0.3}
          />
        </mesh>
          {/* Particle trail effect */}
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[0.1, 0.1]} />
            <meshBasicMaterial 
              color="#ffffff" 
              transparent={true} 
              opacity={0.6}
            />
          </mesh>
        </>
      )}
      
      {/* Project info overlay */}
      {isHovered && (
        <Html
          position={[0, -2, 0]}
          center
          distanceFactor={10}
          occlude
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
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

// Category labels component
function CategoryLabels({ 
  categories, 
  radius 
}: { 
  categories: { id: string; name: string }[]; 
  radius: number; 
}) {
  return (
    <>
      {categories.map((category, index) => {
        const angle = (index * 2 * Math.PI) / categories.length;
        const x = Math.cos(angle) * (radius + 1.5);
        const z = Math.sin(angle) * (radius + 1.5);
        
        return (
          <Text
            key={category.id}
            position={[x, 0, z]}
            fontSize={0.3}
            color="#666"
            anchorX="center"
            anchorY="middle"
            rotation={[0, -angle, 0]}
          >
            {category.name}
          </Text>
        );
      })}
    </>
  );
}

// Main carousel component
function Carousel({ 
  projects, 
  onProjectClick, 
  hoveredProject, 
  setHoveredProject, 
  soundManager, 
  cameraController,
  lodSystem,
  textureManager,
  performanceMonitor,
  devicePerformance,
  accessibilityState
}: { 
  projects: Project[]; 
  onProjectClick?: (project: Project) => void;
  hoveredProject: number | null;
  setHoveredProject: (id: number | null) => void;
  soundManager?: SoundManager;
  cameraController?: CameraController;
  lodSystem?: LODSystem | null;
  textureManager?: TextureManager;
  performanceMonitor?: PerformanceMonitor;
  devicePerformance?: 'high' | 'medium' | 'low';
  accessibilityState?: AccessibilityState;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { camera, size } = useThree();

  // Check if mobile based on screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(size.width < 768);
    };
    checkMobile();
  }, [size.width]);

  // Increased radius to ensure all projects stay visible
  const radius = isMobile ? 4 : 5.5;
  const angleStep = (2 * Math.PI) / projects.length;

  // Synchronized group movement - all projects move together
  useFrame((state) => {
    const deltaTime = state.clock.getDelta();
    const time = state.clock.elapsedTime;
    
    if (groupRef.current) {
      // Synchronized group movement - all projects move together
      
      // Gentle floating motion for the entire group
      groupRef.current.position.y = Math.sin(time * 0.3) * 0.5;
      
      // Slow rotation of the entire group (much slower than before)
      const rotationSpeed = isAutoRotating ? 0.0002 : 0.0001;
      groupRef.current.rotation.y += rotationSpeed;
      
      // Optional: Add a subtle breathing/pulsing effect
      const scale = 1 + Math.sin(time * 0.2) * 0.01;
      groupRef.current.scale.setScalar(scale);
      
      // Play rotation sound periodically (less frequent)
      if (isAutoRotating && Math.random() < 0.0005 && soundManager) {
        soundManager.playSound('rotation', 0.05);
      }
    }

    // Update camera controller
    if (cameraController) {
      cameraController.update(deltaTime);
    }
  });

  // Handle project click with camera focus and sound
  const handleProjectClick = useCallback((project: Project) => {
    if (onProjectClick) {
      onProjectClick(project);
    }
    
    // Focus camera on selected project
    if (cameraController) {
      const angle = projects.findIndex(p => p.id === project.id) * angleStep;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const projectPosition = new THREE.Vector3(x, 0, z);
      cameraController.focusOnProject(projectPosition);
    }
    
    // Play click sound
    if (soundManager) {
      soundManager.playSound('click', 0.5);
    }
  }, [onProjectClick, cameraController, soundManager, projects, angleStep, radius]);

  // Handle project hover
  const handleProjectHover = useCallback((projectId: number) => {
    setHoveredProject(projectId);
    setIsAutoRotating(false);
  }, []);

  const handleProjectLeave = useCallback(() => {
    setHoveredProject(null);
    setIsAutoRotating(true);
  }, []);

  // Get unique categories
  const categories = Array.from(
    new Set(projects.map(p => p.category))
  ).map(cat => ({ id: cat, name: cat.charAt(0).toUpperCase() + cat.slice(1) }));

  return (
    <group ref={groupRef}>
      {/* Project cards */}
      {projects.map((project, index) => {
        const angle = index * angleStep;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <ProjectCard
            key={project.id}
            project={project}
            position={[x, 0, z]}
            rotation={[0, -angle, 0]}
            onHover={() => handleProjectHover(project.id)}
            onLeave={handleProjectLeave}
            onClick={() => handleProjectClick(project)}
            isHovered={hoveredProject === project.id}
            isMobile={isMobile}
            soundManager={soundManager}
            index={index}
            lodSystem={lodSystem}
            textureManager={textureManager}
            performanceMonitor={performanceMonitor}
            isVisible={true}
          />
        );
      })}

      {/* Category labels */}
      <CategoryLabels categories={categories} radius={radius} />
      
      {/* Orbit ring for visual reference */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.1, radius + 0.1, 64]} />
        <meshBasicMaterial 
          color="#666" 
          transparent={true} 
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Accessibility controls component
function AccessibilityControls({ 
  accessibilityState, 
  onAccessibilityChange 
}: { 
  accessibilityState: AccessibilityState;
  onAccessibilityChange: (key: keyof AccessibilityState, value: boolean) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="absolute top-4 right-4 z-20 space-y-2"
    >
      <div className="bg-card/80 backdrop-blur-sm p-2 rounded-lg border border-border/20">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onAccessibilityChange('reducedMotion', !accessibilityState.reducedMotion)}
            className={`p-2 rounded transition-colors ${
              accessibilityState.reducedMotion ? 'bg-red text-background' : 'text-muted-foreground hover:text-foreground'
            }`}
            title="Reduce Motion"
          >
            {accessibilityState.reducedMotion ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          
          <button
            onClick={() => onAccessibilityChange('highContrast', !accessibilityState.highContrast)}
            className={`p-2 rounded transition-colors ${
              accessibilityState.highContrast ? 'bg-red text-background' : 'text-muted-foreground hover:text-foreground'
            }`}
            title="High Contrast"
          >
            <div className="h-4 w-4 border-2 border-current" />
          </button>
          
          <button
            onClick={() => onAccessibilityChange('soundEnabled', !accessibilityState.soundEnabled)}
            className={`p-2 rounded transition-colors ${
              accessibilityState.soundEnabled ? 'bg-red text-background' : 'text-muted-foreground hover:text-foreground'
            }`}
            title="Toggle Sound"
          >
            {accessibilityState.soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Error Boundary for 3D components
class ThreeDErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ThreeD Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-96 bg-card/50 rounded-lg border border-border/20">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">3D Rendering Error</h3>
            <p className="text-muted-foreground mb-4">There was an issue loading the 3D carousel.</p>
            <button 
              onClick={() => this.setState({ hasError: false })}
              className="px-4 py-2 bg-red text-background rounded hover:bg-red-dark transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main component
const ThreeDCarousel: React.FC<ThreeDCarouselProps> = ({ 
  projects, 
  companyName = "Mimar Khan",
  onProjectClick 
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [soundManager] = useState(() => new SoundManager());
  const [cameraController, setCameraController] = useState<CameraController | null>(null);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [performanceMonitor] = useState(() => new PerformanceMonitor());
  const [textureManager] = useState(() => new TextureManager(setLoadingProgress));
  const [lodSystem, setLodSystem] = useState<LODSystem | null>(null);
  const [animationScheduler] = useState(() => new AnimationScheduler());
  const [devicePerformance, setDevicePerformance] = useState<'high' | 'medium' | 'low'>('high');
  
  // Navigation state
  const [navigationState, setNavigationState] = useState<NavigationState>({
    currentCategory: null,
    searchQuery: '',
    comparisonMode: false,
    selectedForComparison: [],
    breadcrumbs: ['Home', 'Portfolio']
  });
  
  // Accessibility state
  const [accessibilityState, setAccessibilityState] = useState<AccessibilityState>({
    reducedMotion: false,
    highContrast: false,
    screenReaderMode: false,
    keyboardNavigation: true,
    soundEnabled: true
  });

  // Check if mobile and device performance
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const detectPerformance = () => {
      // Simple performance detection based on hardware concurrency and memory
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
    };
    
    checkMobile();
    detectPerformance();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload textures
  useEffect(() => {
    const preloadTextures = async () => {
      setIsLoading(true);
      const imageUrls = projects.map(p => p.image);
      textureManager.preloadTextures(imageUrls);
      
      // Simulate loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
    
    preloadTextures();
  }, [projects, textureManager]);

  // Filter projects based on search and category
  const filteredProjects = useMemo(() => {
    let filtered = projects;
    
    // Filter by category
    if (navigationState.currentCategory) {
      filtered = filtered.filter(p => p.category === navigationState.currentCategory);
    }
    
    // Filter by search query
    if (navigationState.searchQuery) {
      const query = navigationState.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [projects, navigationState.currentCategory, navigationState.searchQuery]);

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(projects.map(p => p.category))];
  }, [projects]);

  // Navigation handlers
  const handleCategoryChange = useCallback((category: string | null) => {
    setNavigationState(prev => ({
      ...prev,
      currentCategory: category,
      breadcrumbs: category ? ['Home', 'Portfolio', category] : ['Home', 'Portfolio']
    }));
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setNavigationState(prev => ({
      ...prev,
      searchQuery: query
    }));
  }, []);

  const handleBreadcrumbNavigate = useCallback((index: number) => {
    const breadcrumbs = ['Home', 'Portfolio'];
    if (index === 0) {
      setNavigationState(prev => ({
        ...prev,
        currentCategory: null,
        searchQuery: '',
        breadcrumbs: breadcrumbs
      }));
    } else if (index === 1) {
      setNavigationState(prev => ({
        ...prev,
        currentCategory: null,
        breadcrumbs: breadcrumbs
      }));
    }
  }, []);

  const handleAccessibilityChange = useCallback((key: keyof AccessibilityState, value: boolean) => {
    setAccessibilityState(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Apply sound changes
    if (key === 'soundEnabled') {
      soundManager.setEnabled(value);
    }
  }, [soundManager]);

  const handleComparisonToggle = useCallback((project: Project) => {
    setNavigationState(prev => {
      const isSelected = prev.selectedForComparison.some(p => p.id === project.id);
      let newSelection;
      
      if (isSelected) {
        newSelection = prev.selectedForComparison.filter(p => p.id !== project.id);
      } else if (prev.selectedForComparison.length < 2) {
        newSelection = [...prev.selectedForComparison, project];
      } else {
        newSelection = prev.selectedForComparison;
      }
      
      return {
        ...prev,
        selectedForComparison: newSelection,
        comparisonMode: newSelection.length > 0
      };
    });
  }, []);

  const handleRemoveFromComparison = useCallback((projectId: number) => {
    setNavigationState(prev => ({
      ...prev,
      selectedForComparison: prev.selectedForComparison.filter(p => p.id !== projectId),
      comparisonMode: prev.selectedForComparison.length > 1
    }));
  }, []);

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!accessibilityState.keyboardNavigation) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          setCurrentProjectIndex(prev => (prev - 1 + filteredProjects.length) % filteredProjects.length);
          break;
        case 'ArrowRight':
          event.preventDefault();
          setCurrentProjectIndex(prev => (prev + 1) % filteredProjects.length);
          break;
        case 'ArrowUp':
          event.preventDefault();
          // Navigate to previous category
          const currentIndex = categories.indexOf(navigationState.currentCategory || '');
          const prevCategory = currentIndex > 0 ? categories[currentIndex - 1] : null;
          handleCategoryChange(prevCategory);
          break;
        case 'ArrowDown':
          event.preventDefault();
          // Navigate to next category
          const nextIndex = categories.indexOf(navigationState.currentCategory || '') + 1;
          const nextCategory = nextIndex < categories.length ? categories[nextIndex] : null;
          handleCategoryChange(nextCategory);
          break;
        case ' ':
          event.preventDefault();
          if (selectedProject) {
            setSelectedProject(null);
          } else if (filteredProjects[currentProjectIndex]) {
            setSelectedProject(filteredProjects[currentProjectIndex]);
          }
          break;
        case 'Enter':
          event.preventDefault();
          if (filteredProjects[currentProjectIndex]) {
            handleComparisonToggle(filteredProjects[currentProjectIndex]);
          }
          break;
        case 'Escape':
          event.preventDefault();
          setSelectedProject(null);
          setNavigationState(prev => ({
            ...prev,
            searchQuery: '',
            currentCategory: null,
            breadcrumbs: ['Home', 'Portfolio']
          }));
          if (cameraController) {
            cameraController.resetToDefault();
          }
          break;
        case 'c':
          event.preventDefault();
          // Toggle comparison mode
          setNavigationState(prev => ({
            ...prev,
            comparisonMode: !prev.comparisonMode
          }));
          break;
        case 'f':
          event.preventDefault();
          // Focus search
          const searchInput = document.querySelector('input[placeholder="Search projects..."]') as HTMLInputElement;
          searchInput?.focus();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    accessibilityState.keyboardNavigation, 
    filteredProjects, 
    currentProjectIndex, 
    selectedProject, 
    cameraController,
    categories,
    navigationState.currentCategory,
    handleCategoryChange,
    handleComparisonToggle
  ]);

  // Initialize camera controller
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      // We'll initialize this in the Canvas component
    }
  }, []);

  const handleProjectClick = useCallback((project: Project) => {
    setSelectedProject(project);
    if (onProjectClick) {
      onProjectClick(project);
    }
  }, [onProjectClick]);

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden three-d-carousel">
      {/* Loading Progress */}
      <LoadingProgress progress={loadingProgress} isVisible={isLoading} />
      
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

      {/* Center text overlay */}
      <FadeTransition isVisible={!isLoading} delay={0.5}>
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center px-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-foreground mb-4">
            We are <span className="text-red">{companyName}</span>
          </h1>
          <p className="text-sm sm:text-lg text-muted-foreground max-w-md mx-auto">
            Explore our portfolio of exceptional architectural projects
          </p>
        </motion.div>
      </div>
      </FadeTransition>

      {/* 3D Canvas with enhanced visual effects and error boundary */}
      <ThreeDErrorBoundary>
      <Canvas
        camera={{ 
          position: isMobile ? [0, 1, 10] : [0, 2, 12], 
          fov: isMobile ? 65 : 55 
        }}
        style={{ background: 'transparent' }}
          dpr={devicePerformance === 'low' ? [1, 1.5] : [1, 2]} // Adaptive pixel ratio
          shadows={devicePerformance !== 'low'} // Disable shadows for low-end devices
          gl={{ 
            antialias: devicePerformance !== 'low',
            alpha: true,
            powerPreference: devicePerformance === 'high' ? "high-performance" : "default"
          }}
        >
        {/* Enhanced Environmental Lighting */}
        <EnvironmentalLighting />
        
        {/* Dynamic Background */}
        <DynamicBackground />
        
        {/* Architectural Grid */}
        <ArchitecturalGrid />
        
        {/* Environmental Objects - Simplified for performance */}
        <FloatingLabels projects={filteredProjects} hoveredProject={selectedProject?.id || null} />
        
        {/* Particle System - Simplified for performance */}
        <FloatingParticles 
          count={devicePerformance === 'low' ? 10 : isMobile ? 20 : 30} 
          hoveredProject={selectedProject?.id || null} 
        />
        
        {/* Interactive Geometric Patterns - Simplified for performance */}
        {devicePerformance !== 'low' && (
          <InteractiveGeometricPatterns hoveredProject={selectedProject?.id || null} />
        )}
        
        {/* Light Rays */}
        <LightRays />
        
        {/* Environment for reflections */}
        <Environment preset="city" />
        
        {/* Camera Setup */}
        <CameraSetup onCameraReady={setCameraController} />
        
        {/* LOD System Setup */}
        <LODSetup onLODReady={setLodSystem} />
        
        {/* Performance Monitor */}
        <PerformanceMonitorComponent monitor={performanceMonitor} />
        

        {/* Main Carousel */}
        <Carousel 
          projects={filteredProjects} 
          onProjectClick={handleProjectClick}
          hoveredProject={selectedProject?.id || null}
          setHoveredProject={(id) => setSelectedProject(filteredProjects.find(p => p.id === id) || null)}
          soundManager={soundManager}
          cameraController={cameraController}
          lodSystem={lodSystem}
          textureManager={textureManager}
          performanceMonitor={performanceMonitor}
          devicePerformance={devicePerformance}
          accessibilityState={accessibilityState}
        />
        
        {/* Information Display Components */}
        <FloatingInfoPanels 
          projects={filteredProjects} 
          hoveredProject={selectedProject?.id || null}
          accessibilityState={accessibilityState}
        />
        <InteractiveTooltips 
          projects={filteredProjects} 
          hoveredProject={selectedProject?.id || null}
          accessibilityState={accessibilityState}
        />
        
        {/* Post-processing Effects - Simplified for compatibility */}
        {devicePerformance !== 'low' && (
          <EffectComposer>
            <Bloom 
              intensity={0.2} 
              luminanceThreshold={0.9} 
              luminanceSmoothing={0.025}
            />
          </EffectComposer>
        )}
        
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          minDistance={isMobile ? 10 : 12}
          maxDistance={isMobile ? 10 : 12}
          autoRotate={false}
          enableDamping={true}
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2.2} // Prevent looking too far up/down
          minPolarAngle={Math.PI / 3} // Prevent looking too far up/down
          touches={{
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_PAN
          }}
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN
          }}
        />
      </Canvas>
      </ThreeDErrorBoundary>

      {/* Project details modal */}
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

      {/* Navigation Components */}
      <BreadcrumbNavigation 
        breadcrumbs={navigationState.breadcrumbs}
        onNavigate={handleBreadcrumbNavigate}
      />
      
      <SearchComponent 
        searchQuery={navigationState.searchQuery}
        onSearchChange={handleSearchChange}
        filteredProjects={filteredProjects}
        isVisible={!isLoading}
      />
      
      <CategoryFilter 
        categories={categories}
        currentCategory={navigationState.currentCategory}
        onCategoryChange={handleCategoryChange}
        isVisible={!isLoading}
      />
      
      <ComparisonMode 
        selectedProjects={navigationState.selectedForComparison}
        onRemoveProject={handleRemoveFromComparison}
        isVisible={navigationState.comparisonMode}
      />
      
      {/* Information Display */}
      <ProjectStatisticsOverlay 
        projects={filteredProjects}
        currentCategory={navigationState.currentCategory}
        accessibilityState={accessibilityState}
      />
      
      {/* Accessibility Controls */}
      <AccessibilityControls 
        accessibilityState={accessibilityState}
        onAccessibilityChange={handleAccessibilityChange}
      />

      {/* Enhanced Control Instructions - Hidden */}
      {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className={`text-center text-xs sm:text-sm text-muted-foreground bg-card/80 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-border/20 ${
            accessibilityState.highContrast ? 'border-2 border-white' : ''
          }`}
        >
          {isMobile ? (
            "Touch to rotate • Tap to explore • Swipe to navigate"
          ) : (
            "Drag to rotate • Hover to explore • Arrow keys to navigate • Spacebar to select • C for comparison • F for search"
          )}
        </motion.div>
      </div> */}
    </div>
  );
};

export default ThreeDCarousel;