import { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * Custom animation loop hook for optimized frame updates
 * Prevents unnecessary re-renders by using refs
 */
export const useAnimationLoop = (
  callback: (deltaTime: number, elapsedTime: number) => void,
  isActive: boolean = true
) => {
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const callbackRef = useRef(callback);

  // Update callback ref without causing re-render
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isActive) {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      return;
    }

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTimeRef.current) / 1000; // Convert to seconds
      lastTimeRef.current = currentTime;

      callbackRef.current(deltaTime, currentTime / 1000);

      frameRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [isActive]);
};

