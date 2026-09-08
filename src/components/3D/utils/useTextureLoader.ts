import { useState, useEffect } from 'react';
import * as THREE from 'three';

interface TextureLoaderOptions {
  onProgress?: (progress: number) => void;
  priority?: 'high' | 'medium' | 'low';
}

/**
 * Optimized texture loader hook with caching and compression
 */
export const useTextureLoader = (imageUrl: string, options: TextureLoaderOptions = {}) => {
  const { onProgress, priority } = options;
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!imageUrl) return;

    setIsLoading(true);
    setError(null);

    const loader = new THREE.TextureLoader();
    let loadedTexture: THREE.Texture | null = null;
    
    loader.load(
      imageUrl,
      (nextTexture) => {
        loadedTexture = nextTexture;
        // Optimize texture settings
        nextTexture.colorSpace = THREE.SRGBColorSpace;
        nextTexture.generateMipmaps = true;
        nextTexture.minFilter = THREE.LinearMipmapLinearFilter;
        nextTexture.magFilter = THREE.LinearFilter;
        
        // Compress if needed (for better performance)
        if (priority === 'low') {
          nextTexture.minFilter = THREE.LinearFilter;
        }

        setTexture(nextTexture);
        setIsLoading(false);
        onProgress?.(1);
      },
      (progress) => {
        if (progress.total > 0) {
          const progressValue = progress.loaded / progress.total;
          onProgress?.(progressValue);
        }
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      }
    );

    return () => {
      // Cleanup texture on unmount
      if (loadedTexture) {
        loadedTexture.dispose();
      }
    };
  }, [imageUrl, onProgress, priority]);

  return { texture, isLoading, error };
};

/**
 * Batch texture loader for multiple images
 */
export const useTextureBatchLoader = (
  imageUrls: string[],
  options: TextureLoaderOptions = {}
) => {
  const { onProgress } = options;
  const imageUrlsKey = imageUrls.join(',');
  const [textures, setTextures] = useState<Map<string, THREE.Texture>>(new Map());
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urls = imageUrlsKey ? imageUrlsKey.split(',') : [];
    if (urls.length === 0) {
      setIsLoading(false);
      return;
    }

    const loader = new THREE.TextureLoader();
    const textureMap = new Map<string, THREE.Texture>();
    let loaded = 0;

    const loadTexture = (url: string) => {
      loader.load(
        url,
        (loadedTexture) => {
          loadedTexture.colorSpace = THREE.SRGBColorSpace;
          loadedTexture.generateMipmaps = true;
          loadedTexture.minFilter = THREE.LinearMipmapLinearFilter;
          loadedTexture.magFilter = THREE.LinearFilter;
          
          textureMap.set(url, loadedTexture);
          loaded++;
          
          const progress = loaded / urls.length;
          setLoadingProgress(progress);
          onProgress?.(progress);
          
          if (loaded === urls.length) {
            setTextures(new Map(textureMap));
            setIsLoading(false);
          }
        },
        undefined,
        (err) => {
          loaded++;
          if (loaded === urls.length) {
            setTextures(new Map(textureMap));
            setIsLoading(false);
          }
        }
      );
    };

    // Load textures with priority ordering
    urls.forEach((url, index) => {
      setTimeout(() => loadTexture(url), index * 50); // Stagger loading
    });
  }, [imageUrlsKey, onProgress]);

  return { textures, loadingProgress, isLoading };
};










