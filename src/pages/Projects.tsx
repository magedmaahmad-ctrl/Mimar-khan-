import { useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SmartCarousel from "@/components/SmartCarousel";
import { projects as projectData } from "@/data/projects";

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const projects = projectData;

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
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6 fade-in-up">
              Our <span className="text-gradient-red">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up" style={{ animationDelay: "0.2s" }}>
              Explore our portfolio of exceptional architectural projects that showcase 
              our commitment to innovation, sustainability, and design excellence.
            </p>
          </div>
        </div>
      </section>

      {/* 3D Interactive Carousel */}
      <section className="relative">
        <SmartCarousel
          projects={projects}
          companyName="Mimar Khan"
          onProjectClick={(project) => {
            navigate(`/projects/${project.slug}`);
          }}
        />
      </section>

      {/* Our New Projects Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 fade-in-up">
              Our <span className="text-gradient-red">New Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up" style={{ animationDelay: "0.2s" }}>
              Discover our latest architectural innovations and upcoming developments that showcase 
              the future of design excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 6).map((project, index) => (
              <Link
                key={project.id}
                to={`/projects/${project.slug}`}
                className="group bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-border/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 fade-in-up focus:outline-none focus-visible:ring-2 focus-visible:ring-red"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-red text-background rounded-full text-sm font-medium capitalize">
                      {project.category}
                    </span>
                  </div>

                  {/* Year Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-card/90 backdrop-blur-sm text-foreground rounded-full text-sm font-medium capitalize">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-6 py-3 bg-red text-background rounded-lg font-medium transition-colors transform translate-y-4 group-hover:translate-y-0">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-foreground mb-3 group-hover:text-red transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="inline-flex items-center px-2 py-1 bg-stone/30 rounded text-xs uppercase tracking-wide">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-stone/20 text-foreground rounded text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                    {project.features.length > 3 && (
                      <span className="px-2 py-1 bg-stone/20 text-foreground rounded text-xs">
                        +{project.features.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <span className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-red text-red rounded-lg transition-all duration-300 group-hover:bg-red group-hover:text-background">
                    <span>Explore Project</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              to="/all-projects"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-red text-background rounded-lg font-medium hover:bg-red-dark transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl fade-in-up group"
              style={{ animationDelay: "0.8s" }}
            >
              <span>View All Projects</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-stone">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 fade-in-up">
              Project Achievements
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up" style={{ animationDelay: "0.2s" }}>
              Our commitment to excellence is reflected in every project we complete.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Completed Projects", delay: "0.2s" },
              { number: "25+", label: "Happy Clients", delay: "0.4s" },
              { number: "10+", label: "Awards Won", delay: "0.6s" },
              { number: "5+", label: "Cities Served", delay: "0.8s" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center fade-in-up"
                style={{ animationDelay: stat.delay }}
              >
                <h3 className="text-4xl font-bold text-red mb-2">{stat.number}</h3>
                <p className="text-muted-foreground text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-charcoal to-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 fade-in-up">
            Let's Create Your Next Landmark
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto fade-in-up" style={{ animationDelay: "0.2s" }}>
            Ready to transform your vision into reality? Let's discuss your project requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Link
              to="/contact"
              className="btn-hero inline-flex items-center group"
            >
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/services"
              className="btn-outline-red inline-flex items-center"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;