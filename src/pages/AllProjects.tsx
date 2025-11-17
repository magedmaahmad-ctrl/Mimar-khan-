import { useState } from "react";
import { Calendar, MapPin, ArrowRight, Filter } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import project1 from "@/assets/project (1).jpeg";
import project2 from "@/assets/project (2).jpg";
import project3 from "@/assets/project (3).jpg";
import project4 from "@/assets/project (4).jpg";
import project5 from "@/assets/project (5).JPG";
import project6 from "@/assets/project (6).jpg";
import project7 from "@/assets/project (7).jpg";
import project8 from "@/assets/project (8).jpg";
import project9 from "@/assets/project (9).jpg";
import project10 from "@/assets/project (10).jpg";
import project11 from "@/assets/project (11).jpg";
import project12 from "@/assets/project (12).jpg";
import project13 from "@/assets/project (13).jpg";

const AllProjects = () => {
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

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
      location: "New Administrative Capital, Egypt",
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
    {
      id: 7,
      title: "Luxury Office Tower",
      category: "commercial",
      location: "Zamalek, Cairo",
      year: "2024",
      image: project7,
      description: "A prestigious office tower with panoramic Nile views and premium amenities.",
      features: ["Nile Views", "Premium Amenities", "Green Building", "Smart Systems"],
    },
    {
      id: 8,
      title: "Garden Residences",
      category: "residential",
      location: "Maadi, Cairo",
      year: "2024",
      image: project8,
      description: "Eco-friendly residential units surrounded by lush gardens and sustainable features.",
      features: ["Green Spaces", "Energy Efficient", "Water Conservation", "Community Garden"],
    },
    {
      id: 9,
      title: "Art Gallery Complex",
      category: "cultural",
      location: "Heliopolis, Cairo",
      year: "2024",
      image: project9,
      description: "A modern art gallery complex showcasing contemporary Egyptian and international artists.",
      features: ["Multiple Galleries", "Sculpture Garden", "Artist Studios", "Event Spaces"],
    },
    {
      id: 10,
      title: "Mixed-Use Development",
      category: "commercial",
      location: "New Capital, Egypt",
      year: "2025",
      image: project10,
      description: "A comprehensive mixed-use development combining retail, office, and residential spaces.",
      features: ["Retail Spaces", "Office Complex", "Residential Units", "Public Plaza"],
    },
    {
      id: 11,
      title: "Luxury Resort Complex",
      category: "residential",
      location: "Sharm El Sheikh, Egypt",
      year: "2025",
      image: project11,
      description: "An exclusive resort complex with luxury villas and world-class amenities.",
      features: ["Private Beach", "Spa Facilities", "Golf Course", "Fine Dining"],
    },
    {
      id: 12,
      title: "Educational Campus",
      category: "cultural",
      location: "6th October City, Egypt",
      year: "2024",
      image: project12,
      description: "A modern educational campus designed for innovative learning and research.",
      features: ["Research Labs", "Library", "Auditorium", "Student Housing"],
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
              <div
                key={project.id}
                className="group bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-border/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 fade-in-up h-full flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image - Fixed Height */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
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
                    <span className="px-3 py-1 bg-card/90 backdrop-blur-sm text-foreground rounded-full text-sm font-medium">
                      {project.year}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button 
                      onClick={() => navigate(`/project/${project.id}`)}
                      className="px-6 py-3 bg-red text-background rounded-lg font-medium hover:bg-red-dark transition-colors transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      View Details
                    </button>
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
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span>{project.year}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                    {project.description}
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
                  <button 
                    onClick={() => navigate(`/project/${project.id}`)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-red text-red rounded-lg hover:bg-red hover:text-background transition-all duration-300 group mt-auto"
                  >
                    <span>Explore Project</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
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




