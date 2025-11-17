import { useMemo } from 'react';

/**
 * Generate evenly distributed points on a sphere using Fibonacci sphere algorithm
 * Provides better distribution than simple angle/elevation steps
 */
export const useSpherePositions = (count: number, radius: number) => {
  return useMemo(() => {
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
  }, [count, radius]);
};

