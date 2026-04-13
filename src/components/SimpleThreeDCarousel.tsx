import React, { useRef, useState, useCallback, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text, Html, useTexture } from "@react-three/drei";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import * as THREE from "three";
import { Project } from "@/data/projectsData";

interface SimpleThreeDCarouselProps {
  projects: Project[];
  companyName?: string;
  onProjectClick?: (project: Project) => void;
}

// Detect if device is mobile/touch
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// Single card: positioned on the ring, faces the camera automatically
function ProjectCard({
  project,
  index,
  totalProjects,
  onProjectClick,
  isHovered,
  onHover,
  radius,
  isMobile,
}: {
  project: Project;
  index: number;
  totalProjects: number;
  onProjectClick?: (project: Project) => void;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  radius: number;
  isMobile: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture(project.images[0]);

  const angle = (index * 2 * Math.PI) / totalProjects;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;

  // Card faces the camera (outward from ring center)
  const facingRotation: [number, number, number] = [0, -angle + Math.PI, 0];

  const floatOffset = useRef(Math.random() * Math.PI * 2); // random phase for organic floating

  useFrame((state) => {
    if (meshRef.current && groupRef.current) {
      const t = state.clock.elapsedTime;

      // Organic idle float (small, smooth)
      groupRef.current.position.y =
        Math.sin(t * 0.6 + floatOffset.current) * 0.12;

      // Hover scale
      const targetScale = isHovered ? (isMobile ? 1.08 : 1.15) : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  const cardW = isMobile ? 1.4 : 2.0;
  const cardH = isMobile ? 1.9 : 2.6;

  return (
    <group ref={groupRef} position={[x, 0, z]} rotation={facingRotation}>
      <mesh
        ref={meshRef}
        onClick={() => onProjectClick?.(project)}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(project.id);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(null);
        }}
      >
        <boxGeometry args={[cardW, cardH, 0.05]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.05}
          roughness={0.8}
          transparent
          opacity={isHovered ? 1 : 0.88}
        />
      </mesh>

      {/* Project Title beneath card */}
      <Text
        position={[0, -(cardH / 2 + 0.5), 0]}
        fontSize={isMobile ? 0.22 : 0.28}
        color="#1a1a1a"
        anchorX="center"
        anchorY="middle"
        maxWidth={cardW + 0.5}
        outlineWidth={0.012}
        outlineColor="#ffffff"
      >
        {project.title}
      </Text>

      {/* Hover overlay — only on non-mobile to avoid layout issues */}
      {isHovered && !isMobile && (
        <Html position={[0, cardH / 2 + 0.6, 0]} center distanceFactor={8}>
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{ pointerEvents: "none" }}
            className="bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-xl border border-gray-100 w-48"
          >
            <h3 className="text-xs font-bold text-gray-900 mb-1 leading-tight">
              {project.title}
            </h3>
            <div className="flex items-center gap-1 text-[10px] text-gray-500 mb-1">
              <MapPin className="h-2.5 w-2.5 flex-shrink-0" />
              <span className="truncate">{project.location}</span>
            </div>
            <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">
              {project.summary}
            </p>
            <div className="mt-2 flex items-center text-[10px] font-semibold text-red-600">
              View Project
              <ArrowRight className="ml-1 h-2.5 w-2.5" />
            </div>
          </motion.div>
        </Html>
      )}
    </group>
  );
}

// The rotating ring group
function Carousel({
  projects,
  onProjectClick,
  hoveredProject,
  setHoveredProject,
  radius,
  isMobile,
}: {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
  hoveredProject: string | null;
  setHoveredProject: (id: string | null) => void;
  radius: number;
  isMobile: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const isPaused = useRef(false);

  // Pause rotation while a card is hovered
  useEffect(() => {
    isPaused.current = hoveredProject !== null;
  }, [hoveredProject]);

  useFrame((_state, delta) => {
    if (groupRef.current && !isPaused.current) {
      // Slower on mobile (less CPU), faster on desktop
      groupRef.current.rotation.y += delta * (isMobile ? 0.08 : 0.12);
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
          radius={radius}
          isMobile={isMobile}
        />
      ))}
    </group>
  );
}

// Camera rig that positions the camera correctly based on viewport
function CameraRig({ isMobile }: { isMobile: boolean }) {
  const { camera } = useThree();
  useEffect(() => {
    if (isMobile) {
      camera.position.set(0, 1.5, 11);
    } else {
      camera.position.set(0, 2, 16);
    }
    camera.updateProjectionMatrix();
  }, [isMobile, camera]);
  return null;
}

// Main Component
const SimpleThreeDCarousel: React.FC<SimpleThreeDCarouselProps> = ({
  projects,
  companyName = "Mimar Khan",
  onProjectClick,
}) => {
  const isMobile = useIsMobile();

  const visibleProjects = useMemo(
    () => projects.slice(0, Math.min(projects.length, isMobile ? 8 : 12)),
    [projects, isMobile]
  );

  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Ring radius scales with number of cards and device
  const radius = useMemo(() => {
    const base = isMobile ? 4.5 : 6.5;
    return Math.max(base, visibleProjects.length * (isMobile ? 0.55 : 0.75));
  }, [visibleProjects.length, isMobile]);

  const handleProjectClick = useCallback(
    (project: Project) => {
      onProjectClick?.(project);
    },
    [onProjectClick]
  );

  const camDistance = isMobile ? 11 : 16;

  return (
    <div className="relative w-full h-screen bg-white">
      {/* Branding overlay – always readable */}
      <div
        className="absolute top-1/4 left-1/2 z-20 pointer-events-none"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div className="text-center">
          <h1
            className={`font-serif font-bold text-red mb-1 ${isMobile ? "text-3xl" : "text-5xl md:text-6xl"
              }`}
          >
            MIMAR KHAN
          </h1>
          <p
            className={`text-gray-500 font-medium uppercase tracking-widest ${isMobile ? "text-xs" : "text-base"
              }`}
          >
            CREATIONS
          </p>
        </div>
      </div>

      {/* Tap-to-click hint on mobile */}
      {isMobile && (
        <div className="absolute bottom-8 left-1/2 z-20 pointer-events-none"
          style={{ transform: "translateX(-50%)" }}>
          <p className="text-xs text-gray-400 text-center">
            Drag to rotate · Tap a card to view
          </p>
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 2, camDistance], fov: isMobile ? 55 : 50 }}
        style={{ background: "transparent", touchAction: "none" }}
        // Limit pixel ratio on mobile to save GPU
        dpr={isMobile ? [1, 1.2] : [1, 1.5]}
        // Disable unnecessary features on mobile
        gl={{
          antialias: !isMobile,
          powerPreference: isMobile ? "low-power" : "high-performance",
        }}
      >
        {/* Camera rig adjusts on resize */}
        <CameraRig isMobile={isMobile} />

        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[8, 10, 5]} intensity={0.8} castShadow={false} />
        <pointLight position={[-8, -6, -5]} intensity={0.3} />

        {/* Main Carousel */}
        <Carousel
          projects={visibleProjects}
          onProjectClick={handleProjectClick}
          hoveredProject={hoveredProject}
          setHoveredProject={setHoveredProject}
          radius={radius}
          isMobile={isMobile}
        />

        {/* Controls — allow touch drag on mobile */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          // Let user spin the ring manually
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
          minDistance={camDistance}
          maxDistance={camDistance}
          // Smooth drag feel
          enableDamping={true}
          dampingFactor={0.08}
          rotateSpeed={isMobile ? 0.5 : 0.7}
          touches={{
            ONE: 2, // ROTATE
            TWO: 0, // DOLLY_PAN — disabled
          }}
        />
      </Canvas>
    </div>
  );
};

export default SimpleThreeDCarousel;
