import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Image, Float, Stars, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { projectsData } from "@/data/projectsData";

const Monolith = ({ position, rotation, image, index }: { position: [number, number, number], rotation: [number, number, number], image: string, index: number }) => {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        // Subtle floating motion is handled by Float, but we can add slow rotation
        meshRef.current.rotation.y += 0.0005 * (index % 2 === 0 ? 1 : -1);
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={meshRef} position={position} rotation={rotation}>
                {/* Concrete Body */}
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[2.5, 6, 0.5]} />
                    <meshStandardMaterial
                        color="#444444"
                        roughness={0.8}
                        metalness={0.2}
                    />
                </mesh>

                {/* Glowing Screen */}
                <Image
                    url={image}
                    position={[0, 0, 0.26]}
                    scale={[2.2, 4]}
                    toneMapped={false}
                    transparent
                    opacity={0.9}
                />

                {/* Screen Frame/Glow */}
                <mesh position={[0, 0, 0.255]}>
                    <planeGeometry args={[2.3, 4.1]} />
                    <meshBasicMaterial color="#ffffff" toneMapped={false} transparent opacity={0.1} />
                </mesh>
            </group>
        </Float>
    );
};

const Debris = () => {
    const count = 50;
    const meshRef = useRef<THREE.InstancedMesh>(null);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!meshRef.current) return;

        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed / 2;
            const a = Math.cos(t) + Math.sin(t * 1) / 10;
            const b = Math.sin(t) + Math.cos(t * 2) / 10;
            const s = Math.cos(t);

            dummy.position.set(
                (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
                (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
                (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
            );
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial color="#888888" roughness={0.5} />
        </instancedMesh>
    );
};

const MonolithGallery = () => {
    // Get first 3 projects for the screens
    const featuredProjects = projectsData.slice(0, 3);

    return (
        <div className="h-[80vh] w-full bg-[#111111]">
            <Canvas shadows camera={{ position: [0, 0, 12], fov: 45 }}>
                <fog attach="fog" args={["#111111", 10, 30]} />

                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <group position={[0, -1, 0]}>
                    {/* Center Monolith */}
                    <Monolith
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                        image={featuredProjects[0]?.images[0] || ""}
                        index={0}
                    />

                    {/* Left Monolith */}
                    <Monolith
                        position={[-4.5, 0.5, -2]}
                        rotation={[0, 0.3, 0]}
                        image={featuredProjects[1]?.images[0] || ""}
                        index={1}
                    />

                    {/* Right Monolith */}
                    <Monolith
                        position={[4.5, -0.5, -2]}
                        rotation={[0, -0.3, 0]}
                        image={featuredProjects[2]?.images[0] || ""}
                        index={2}
                    />
                </group>

                <Debris />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Environment preset="city" />
                <ContactShadows resolution={1024} scale={100} blur={2} opacity={0.5} far={10} color="#000000" />
            </Canvas>
        </div>
    );
};

export default MonolithGallery;
