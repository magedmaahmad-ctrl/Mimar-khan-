import { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Camera Controller Class
 * Handles smooth camera transitions and focus
 */
export class CameraController {
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

/**
 * Camera Setup Component
 * Initializes camera controller
 */
export const CameraSetup = ({ 
  onCameraReady 
}: { 
  onCameraReady: (controller: CameraController) => void;
}) => {
  const { camera } = useThree();
  
  useEffect(() => {
    const controller = new CameraController(camera);
    onCameraReady(controller);
  }, [camera, onCameraReady]);
  
  return null;
};





