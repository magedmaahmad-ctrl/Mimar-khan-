import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { projectsData } from "@/data/projectsData";
import SimpleThreeDCarousel from "@/components/SimpleThreeDCarousel";
import PartnerMarquee from "@/components/PartnerMarquee";

// Hook to detect mobile viewport
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// Lightweight mobile hero slideshow (replaces Three.js on mobile)
const MobileHeroCarousel = ({ projects, onProjectClick }: {
  projects: typeof projectsData;
  onProjectClick: (project: typeof projectsData[0]) => void;
}) => {
  const [current, setCurrent] = useState(0);
  const featured = projects.slice(0, 8);

  const next = useCallback(() => setCurrent(i => (i + 1) % featured.length), [featured.length]);
  const prev = useCallback(() => setCurrent(i => (i - 1 + featured.length) % featured.length), [featured.length]);

  // Auto-advance every 4s
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const project = featured[current];

  return (
    <div className="relative w-full h-[85vh] bg-black overflow-hidden">
      {/* Background image with fade transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        </motion.div>
      </AnimatePresence>

      {/* Project info overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-6 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <span className="inline-block px-3 py-1 bg-red text-white text-xs font-medium rounded-full mb-3 capitalize">
              {project.categories[0]}
            </span>
            <h2 className="text-2xl font-serif font-bold text-white mb-2 leading-tight">
              {project.title}
            </h2>
            <p className="text-sm text-white/70 mb-4 line-clamp-2">
              {project.summary}
            </p>
            <button
              onClick={() => onProjectClick(project)}
              className="inline-flex items-center px-5 py-2.5 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20 active:scale-95 transition-transform"
            >
              View Project
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Navigation dots + arrows */}
        <div className="flex items-center justify-between mt-6">
          <button onClick={prev} className="p-2 text-white/60 active:text-white">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-1.5">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-red" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
          <button onClick={next} className="p-2 text-white/60 active:text-white">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(category || "all");
  const isMobile = useIsMobile();

  const categories = [
    { id: "all", title: "All Projects" },
    { id: "administrative", title: "Administrative" },
    { id: "commercial", title: "Commercial" },
    { id: "residential", title: "Residential" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show FAB after passing the hero section
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsFilterOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (category) {
      setActiveFilter(category);
    } else {
      setActiveFilter("all");
    }
  }, [category]);

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    if (filterId === "all") {
      navigate("/projects");
    } else {
      navigate(`/projects/${filterId}`);
    }
  };

  const filteredProjects = activeFilter === "all"
    ? projectsData
    : projectsData.filter(p => p.categories.includes(activeFilter));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section: 3D on desktop, lightweight carousel on mobile */}
      {isMobile ? (
        <MobileHeroCarousel
          projects={projectsData}
          onProjectClick={(project) => navigate(`/projects/${project.categories[0]}/${project.slug}`)}
        />
      ) : (
        <section className="relative h-screen w-full bg-white overflow-hidden">
          <SimpleThreeDCarousel
            projects={projectsData}
            onProjectClick={(project) => navigate(`/projects/${project.categories[0]}/${project.slug}`)}
          />
        </section>
      )}

      {/* Partner Marquee Section */}
      <PartnerMarquee />

      <section className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 font-serif text-5xl font-bold text-foreground md:text-6xl"
          >
            Our <span className="text-red">Projects</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-xl text-muted-foreground"
          >
            Explore our portfolio of Administrative, Commercial, and Residential designs.
          </motion.p>
        </div>
      </section>

      {/* Inline Filter Bar */}
      <section className="py-4 bg-transparent">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 items-center bg-white/80 backdrop-blur-sm p-2 rounded-full border border-gray-100 shadow-sm max-w-fit mx-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleFilterChange(cat.id)}
                className={`font-medium tracking-wide transition-all duration-300 px-5 py-2 rounded-full ${
                  activeFilter === cat.id
                    ? "bg-red text-white shadow-md shadow-red/20"
                    : "text-muted-foreground hover:bg-gray-100"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            layout
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
              No projects found in this category.
            </div>
          )}
        </div>
      </section>

      {/* Floating Action Button for Filters */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-50 flex flex-col items-end"
          >
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, originY: 1, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, originY: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, originY: 1, scale: 0.8, y: 10 }}
                  className="flex flex-col gap-3 mb-4 items-end"
                >
                  {categories.map((cat, index) => (
                    <motion.button
                      key={cat.id}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 20, opacity: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        handleFilterChange(cat.id);
                        setIsFilterOpen(false);
                      }}
                      className={`px-5 py-3 rounded-full shadow-lg font-medium transition-all ${
                        activeFilter === cat.id
                          ? "bg-red text-white"
                          : "bg-white text-foreground hover:bg-gray-50"
                      }`}
                    >
                      {cat.title}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="h-16 w-16 rounded-full bg-red text-white flex items-center justify-center shadow-xl hover:shadow-red/30 transition-all border-4 border-white/20"
            >
              {isFilterOpen ? <X size={28} /> : <Filter size={28} />}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;