import { useState } from "react";
import { MapPin, ArrowRight, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { projects as projectData } from "@/data/projects";

const AllProjects = () => {
  const [filter, setFilter] = useState("all");
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
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 fade-in-scroll">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6">
              All <span className="text-gradient-red">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our complete portfolio of architectural projects that showcase 
              our commitment to innovation, sustainability, and design excellence.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 fade-in-scroll">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                  filter === category.id
                    ? "bg-red text-background shadow-lg"
                    : "bg-card text-foreground hover:bg-stone border border-border"
                }`}
              >
                <Filter className="h-4 w-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProjects.map((project, index) => (
              <Link
                key={project.id}
                to={`/projects/${project.slug}`}
                className="group bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-border/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 fade-in-up h-full flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-red"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image - Fixed Height */}
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

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-6 py-3 bg-red text-background rounded-lg font-medium transition-colors transform translate-y-4 group-hover:translate-y-0">
                      View Details
                    </span>
                  </div>
                </div>

                {/* Project Content - Flexible Height */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-serif font-bold text-foreground mb-3 group-hover:text-red transition-colors duration-300 line-clamp-2">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 capitalize">
                      <span className="inline-flex items-center justify-center px-2 py-1 bg-stone/30 rounded text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
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
                  <span className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-red text-red rounded-lg transition-all duration-300 group-hover:bg-red group-hover:text-background mt-auto">
                    <span>Explore Project</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center mt-12 fade-in-up">
            <p className="text-muted-foreground">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllProjects;




