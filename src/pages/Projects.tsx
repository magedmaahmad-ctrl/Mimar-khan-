import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { projectsData } from "@/data/projectsData";
import SimpleThreeDCarousel from "@/components/SimpleThreeDCarousel";

const Projects = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState(category || "all");

  const categories = [
    { id: "all", title: "All Projects" },
    { id: "interior", title: "Interior" },
    { id: "commercial", title: "Commercial" },
    { id: "residential", title: "Residential" },
    { id: "exterior", title: "Exterior" },
  ];

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
      {/* 3D Carousel Header */}
      <section className="relative h-screen w-full bg-white overflow-hidden">
        <SimpleThreeDCarousel
          projects={projectsData}
          onProjectClick={(project) => navigate(`/projects/${project.categories[0]}/${project.slug}`)}
        />
      </section>

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
            Explore our portfolio of Interior, Commercial, Residential, and Exterior designs.
          </motion.p>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <section className="sticky top-20 z-30 border-b border-border/40 bg-white/80 py-4 backdrop-blur-md">
        <div className="container mx-auto overflow-x-auto px-6">
          <div className="flex min-w-max justify-center space-x-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleFilterChange(cat.id)}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${activeFilter === cat.id
                  ? "bg-red text-white shadow-md"
                  : "bg-stone/50 text-muted-foreground hover:bg-stone hover:text-foreground"
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
    </div>
  );
};

export default Projects;