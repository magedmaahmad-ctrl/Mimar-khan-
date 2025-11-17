import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import HorizontalScroll from "./HorizontalScroll";
import project1 from "@/assets/project (1).jpeg";
import project2 from "@/assets/project (2).jpg";
import project3 from "@/assets/project (3).jpg";
import project4 from "@/assets/project (4).jpg";
import project5 from "@/assets/project (5).JPG";
import project6 from "@/assets/project (6).jpg";

const EnhancedProjects = () => {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "Golden Residence Complex",
      category: "residential",
      location: "New Cairo, Egypt",
      year: "2025",
      image: project1,
      description: "A luxury residential complex featuring modern Egyptian architectural elements with sustainable design principles.",
      features: ["120 Units", "Sustainable Design", "Community Spaces", "Modern Amenities"],
    },
    {
      id: 2,
      title: "Cairo Business Center",
      category: "commercial",
      location: "Downtown Cairo, Egypt",
      year: "2025",
      image: project2,
      description: "A state-of-the-art commercial building designed to meet the demands of modern business while respecting urban context.",
      features: ["25 Floors", "LEED Certified", "Smart Building", "Mixed-Use"],
    },
    {
      id: 3,
      title: "Heritage Cultural Museum",
      category: "cultural",
      location: "Alexandria, Egypt",
      year: "2025",
      image: project3,
      description: "A contemporary interpretation of traditional Egyptian architecture housing cultural artifacts and exhibitions.",
      features: ["Exhibition Halls", "Educational Center", "Research Library", "Public Plaza"],
    },
    // Additional projects for horizontal scroll demonstration
    {
      id: 4,
      title: "Modern Villa Estate",
      category: "residential",
      location: "Giza, Egypt",
      year: "2025",
      image: project4,
      description: "Contemporary residential design blending modern comfort with traditional Egyptian aesthetics.",
      features: ["Private Pool", "Garden Terrace", "Smart Home", "Solar Power"],
    },
    {
      id: 5,
      title: "Tech Innovation Hub",
      category: "commercial",
      location: "Cairo, Egypt",
      year: "2025",
      image: project5,
      description: "A cutting-edge workspace designed for technology companies and startups.",
      features: ["Co-working Spaces", "Innovation Labs", "Event Center", "Rooftop Garden"],
    },
    {
      id: 6,
      title: "Sustainable Community Center",
      category: "cultural",
      location: "Luxor, Egypt",
      year: "2025",
      image: project6,
      description: "An eco-friendly community center that serves as a hub for local cultural activities.",
      features: ["Solar Powered", "Green Roof", "Multi-purpose Halls", "Art Studios"],
    },
  ];

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "residential", name: "Residential" },
    { id: "commercial", name: "Commercial" },
    { id: "cultural", name: "Cultural" },
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-6 mb-16">
        <div className="text-center mb-12 fade-in-scroll">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
            Featured <span className="text-gradient-red">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our portfolio of exceptional architectural projects that showcase 
            our commitment to innovation, sustainability, and design excellence.
          </p>
        </div>

        {/* Enhanced Filter Bar */}
        <div className="flex justify-center mb-12 fade-in-scroll">
          <div className="inline-flex bg-stone/50 rounded-sm p-2 backdrop-blur-sm">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`relative px-6 py-3 rounded-sm font-medium tracking-wide transition-all duration-300 ${
                  filter === category.id
                    ? "text-background"
                    : "text-foreground hover:text-red"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter === category.id && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-red rounded-sm"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Projects */}
      <HorizontalScroll className="fade-in-scroll">
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </AnimatePresence>
      </HorizontalScroll>

      {/* Portfolio Stats */}
      <div className="container mx-auto px-6 mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 fade-in-scroll">
          {[
            { number: "50+", label: "Projects", delay: "0.2s" },
            { number: "25+", label: "Clients", delay: "0.4s" },
            { number: "10+", label: "Awards", delay: "0.6s" },
            { number: "5+", label: "Cities", delay: "0.8s" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-red mb-2">{stat.number}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedProjects;