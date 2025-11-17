import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

let previousPath = '';
let isNavigating = false;

export const useScrollRestoration = () => {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Prevent any automatic scroll behavior on first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Check if we're navigating to a different page
    if (previousPath !== location.pathname) {
      isNavigating = true;
      
      // Always scroll to top when changing pages
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        isNavigating = false;
      }, 100); // Small delay to ensure page content is rendered
    }

    previousPath = location.pathname;
  }, [location]);

  // Prevent default scroll behavior during navigation
  useEffect(() => {
    const handleScroll = (e: Event) => {
      if (isNavigating) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: false });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};
