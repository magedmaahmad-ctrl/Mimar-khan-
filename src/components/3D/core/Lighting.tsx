import { useMemo } from 'react';
import * as THREE from 'three';

interface LightingProps {
  intensity?: number;
  devicePerformance?: 'high' | 'medium' | 'low';
}

/**
 * Optimized Environmental Lighting Component
 * Adjusts lighting based on device performance
 */
export const EnvironmentalLighting = ({ 
  intensity = 1,
  devicePerformance = 'high' 
}: LightingProps) => {
  const ambientIntensity = useMemo(() => {
    return devicePerformance === 'low' ? 0.5 : 0.4;
  }, [devicePerformance]);

  const directionalIntensity = useMemo(() => {
    return devicePerformance === 'low' ? 0.8 : 1;
  }, [devicePerformance]);

  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={directionalIntensity}
        castShadow={devicePerformance !== 'low'}
        shadow-mapSize-width={devicePerformance === 'high' ? 2048 : 1024}
        shadow-mapSize-height={devicePerformance === 'high' ? 2048 : 1024}
      />
      {devicePerformance !== 'low' && (
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
      )}
    </>
  );
};

