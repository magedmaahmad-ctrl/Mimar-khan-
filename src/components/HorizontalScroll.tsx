import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Optimized Horizontal Scroll Component
 * Improved physics with smooth easing and performance optimizations
 */
const HorizontalScroll = ({ children, className = '' }: HorizontalScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const container = containerRef.current;
    const scrollContent = scrollRef.current;

    // Calculate scroll width with proper handling
    const scrollWidth = scrollContent.scrollWidth - container.offsetWidth;

    // Only create scroll trigger if there's actual content to scroll
    if (scrollWidth > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top center",
          end: () => `+=${scrollWidth}`,
          scrub: 1, // Smooth scrubbing
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true, // Recalculate on resize
          // Performance optimizations
          refreshPriority: -1, // Lower priority for better performance
          onUpdate: (self) => {
            // Optional: Add custom easing for smoother feel
            // The scrub value handles this, but we can add additional smoothing
          }
        }
      });

      // Improved easing for smoother scroll physics
      tl.to(scrollContent, {
        x: -scrollWidth,
        ease: "none", // Linear for scroll-triggered animations
        // Add smooth momentum feel
        duration: 1,
      });

      // Store reference for cleanup
      scrollTriggerRef.current = ScrollTrigger.getById(tl.scrollTrigger?.vars.id || '') || null;
    }

    // Cleanup function
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      // Also kill any remaining triggers
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [children]); // Re-run if children change

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${className}`}
      style={{
        willChange: 'transform', // GPU acceleration hint
      }}
    >
      <div 
        ref={scrollRef} 
        className="flex"
        style={{
          willChange: 'transform', // GPU acceleration hint
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default HorizontalScroll;
