import React, { useState, useEffect } from "react";
import SimpleThreeDCarousel from "./SimpleThreeDCarousel";
import FallbackCarousel from "./FallbackCarousel";
import { ProjectData } from "@/data/projects";

interface SmartCarouselProps {
  projects: ProjectData[];
  companyName?: string;
  onProjectClick?: (project: ProjectData) => void;
}

const SmartCarousel: React.FC<SmartCarouselProps> = (props) => {
  const [use3D, setUse3D] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if WebGL is supported
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!gl;
      } catch (e) {
        return false;
      }
    };

    // Check device capabilities
    const checkDeviceCapabilities = () => {
      const isMobile = window.innerWidth < 768;
      const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
      return !isMobile && !isLowEnd;
    };

    // Simulate loading time and check capabilities
    const timer = setTimeout(() => {
      const webglSupported = checkWebGLSupport();
      const deviceCapable = checkDeviceCapabilities();
      
      // Use 3D only if WebGL is supported and device is capable
      setUse3D(webglSupported && deviceCapable);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="relative w-full h-screen bg-gradient-to-br from-stone to-charcoal flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red mx-auto mb-4"></div>
          <h2 className="text-xl font-serif font-bold text-foreground mb-2">
            Loading Portfolio...
          </h2>
          <p className="text-muted-foreground">
            {use3D ? 'Initializing 3D experience...' : 'Preparing gallery...'}
          </p>
        </div>
      </div>
    );
  }

  return use3D ? (
    <SimpleThreeDCarousel {...props} />
  ) : (
    <FallbackCarousel {...props} />
  );
};

export default SmartCarousel;

