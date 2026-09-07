import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { projectsData } from "@/data/projectsData";
import CinematicProjectsHero from "@/components/CinematicProjectsHero";
import PartnerMarquee from "@/components/PartnerMarquee";

const Projects = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(category || "all");

  const categories = [
    { id: "all", title: "All Projects" },
    { id: "administrative", title: "Administrative" },
    { id: "commercial", title: "Commercial" },
    { id: "cultural", title: "Cultural" },
    { id: "residential", title: "Residential" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const gowharaProject = projectsData.find((project) => project.slug === "the-gowhara");

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

  const handleExploreProjects = () => {
    document.getElementById("projects-grid")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const filteredProjects = activeFilter === "all"
    ? projectsData
    : projectsData.filter(p => p.categories.includes(activeFilter));
  const featuredProjects = gowharaProject
    ? [
        gowharaProject,
        ...projectsData
          .filter((project) => project.slug !== gowharaProject.slug)
          .slice(0, 7),
      ]
    : projectsData.slice(0, 8);

  return (
    <div className="min-h-screen bg-white">
      <CinematicProjectsHero
        projects={featuredProjects}
        onProjectClick={(project) => navigate(`/projects/${project.categories[0]}/${project.slug}`)}
        onExploreProjects={handleExploreProjects}
      />

      {/* Partner Marquee Section */}
      <PartnerMarquee />

      <section className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 font-serif text-5xl font-bold text-foreground md:text-6xl"
          >
            Our <span className="text-red">Projects</span>
          </motion.h2>
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

      <section id="projects-grid" className="py-20">
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
