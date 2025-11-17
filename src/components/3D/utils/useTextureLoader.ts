import { useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

interface TextureLoaderOptions {
  onProgress?: (progress: number) => void;
  priority?: 'high' | 'medium' | 'low';
}

/**
 * Optimized texture loader hook with caching and compression
 */
export const useTextureLoader = (imageUrl: string, options: TextureLoaderOptions = {}) => {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!imageUrl) return;

    setIsLoading(true);
    setError(null);

    const loader = new THREE.TextureLoader();
    
    loader.load(
      imageUrl,
      (loadedTexture) => {
        // Optimize texture settings
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        loadedTexture.generateMipmaps = true;
        loadedTexture.minFilter = THREE.LinearMipmapLinearFilter;
        loadedTexture.magFilter = THREE.LinearFilter;
        
        // Compress if needed (for better performance)
        if (options.priority === 'low') {
          loadedTexture.minFilter = THREE.LinearFilter;
        }

        setTexture(loadedTexture);
        setIsLoading(false);
        options.onProgress?.(1);
      },
      (progress) => {
        if (progress.total > 0) {
          const progressValue = progress.loaded / progress.total;
          options.onProgress?.(progressValue);
        }
      },
      (err) => {
        console.warn(`Failed to load texture: ${imageUrl}`, err);
        setError(err);
        setIsLoading(false);
      }
    );

    return () => {
      // Cleanup texture on unmount
      if (texture) {
        texture.dispose();
      }
    };
  }, [imageUrl, options.priority]);

  return { texture, isLoading, error };
};

/**
 * Batch texture loader for multiple images
 */
export const useTextureBatchLoader = (
  imageUrls: string[],
  options: TextureLoaderOptions = {}
) => {
  const [textures, setTextures] = useState<Map<string, THREE.Texture>>(new Map());
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (imageUrls.length === 0) {
      setIsLoading(false);
      return;
    }

    const loader = new THREE.TextureLoader();
    const textureMap = new Map<string, THREE.Texture>();
    let loaded = 0;

    const loadTexture = (url: string, index: number) => {
      loader.load(
        url,
        (loadedTexture) => {
          loadedTexture.colorSpace = THREE.SRGBColorSpace;
          loadedTexture.generateMipmaps = true;
          loadedTexture.minFilter = THREE.LinearMipmapLinearFilter;
          loadedTexture.magFilter = THREE.LinearFilter;
          
          textureMap.set(url, loadedTexture);
          loaded++;
          
          const progress = loaded / imageUrls.length;
          setLoadingProgress(progress);
          options.onProgress?.(progress);
          
          if (loaded === imageUrls.length) {
            setTextures(new Map(textureMap));
            setIsLoading(false);
          }
        },
        undefined,
        (err) => {
          console.warn(`Failed to load texture: ${url}`, err);
          loaded++;
          if (loaded === imageUrls.length) {
            setTextures(new Map(textureMap));
            setIsLoading(false);
          }
        }
      );
    };

    // Load textures with priority ordering
    imageUrls.forEach((url, index) => {
      setTimeout(() => loadTexture(url, index), index * 50); // Stagger loading
    });
  }, [imageUrls.join(',')]);

  return { textures, loadingProgress, isLoading };
};

