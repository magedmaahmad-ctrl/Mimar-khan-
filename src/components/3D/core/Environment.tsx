import { Environment as DreiEnvironment } from '@react-three/drei';

interface EnvironmentProps {
  preset?: 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'city';
  devicePerformance?: 'high' | 'medium' | 'low';
}

/**
 * Optimized Environment Component
 * Only loads environment for high-performance devices
 */
export const Environment = ({ 
  preset = 'city',
  devicePerformance = 'high' 
}: EnvironmentProps) => {
  // Skip environment for low-performance devices
  if (devicePerformance === 'low') {
    return null;
  }

  return <DreiEnvironment preset={preset} />;
};





