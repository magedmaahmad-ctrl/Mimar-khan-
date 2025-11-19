import { ProjectData } from "@/data/projects";
import SimpleThreeDCarousel from "./SimpleThreeDCarousel";

interface ThreeDCarouselProps {
  projects: ProjectData[];
  companyName?: string;
  onProjectClick?: (project: ProjectData) => void;
}

/**
 * Backwards-compatible wrapper that reuses the optimized carousel.
 * Kept to avoid breaking historical imports.
 */
const ThreeDCarousel = (props: ThreeDCarouselProps) => {
  return <SimpleThreeDCarousel {...props} />;
};

export default ThreeDCarousel;

