import { useState } from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SmartCarousel from "@/components/SmartCarousel";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const Projects = () => {
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
      delay: "0.2s"
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
      delay: "0.4s"
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
      delay: "0.6s"
    },
    {
      id: 4,
      title: "Modern Villa Estate",
      category: "residential",
      location: "Giza, Egypt",
      year: "2025",
      image: project1,
      description: "Contemporary residential design blending modern comfort with traditional Egyptian aesthetics.",
      features: ["Private Pool", "Garden Terrace", "Smart Home", "Solar Power"],
      delay: "0.8s"
    },
    {
      id: 5,
      title: "Tech Innovation Hub",
      category: "commercial",
      location: "New Administrative Capital, Egypt",
      year: "2025",
      image: project2,
      description: "A cutting-edge workspace designed for technology companies and startups.",
      features: ["Co-working Spaces", "Innovation Labs", "Event Center", "Rooftop Garden"],
      delay: "1.0s"
    },
    {
      id: 6,
      title: "Sustainable Community Center",
      category: "cultural",
      location: "Luxor, Egypt",
      year: "2025",
      image: project3,
      description: "An eco-friendly community center that serves as a hub for local cultural activities.",
      features: ["Solar Powered", "Green Roof", "Multi-purpose Halls", "Art Studios"],
      delay: "1.2s"
    },
    {
      id: 7,
      title: "Luxury Office Tower",
      category: "commercial",
      location: "Zamalek, Cairo",
      year: "2024",
      image: project1,
      description: "A prestigious office tower with panoramic Nile views and premium amenities.",
      features: ["Nile Views", "Premium Amenities", "Green Building", "Smart Systems"],
      delay: "1.4s"
    },
    {
      id: 8,
      title: "Garden Residences",
      category: "residential",
      location: "Maadi, Cairo",
      year: "2024",
      image: project2,
      description: "Eco-friendly residential complex with extensive green spaces and sustainable features.",
      features: ["Green Spaces", "Solar Energy", "Water Recycling", "Natural Ventilation"],
      delay: "1.6s"
    },
    {
      id: 9,
      title: "Art Gallery Complex",
      category: "cultural",
      location: "Heliopolis, Cairo",
      year: "2024",
      image: project3,
      description: "A modern art gallery complex showcasing contemporary Egyptian and international artists.",
      features: ["Multiple Galleries", "Sculpture Garden", "Artist Studios", "Event Spaces"],
      delay: "1.8s"
    },
    {
      id: 10,
      title: "Mixed-Use Development",
      category: "commercial",
      location: "New Capital, Egypt",
      year: "2023",
      image: project1,
      description: "A comprehensive mixed-use development combining retail, office, and residential spaces.",
      features: ["Retail Spaces", "Office Complex", "Residential Units", "Public Plaza"],
      delay: "2.0s"
    },
    {
      id: 11,
      title: "Luxury Penthouse",
      category: "residential",
      location: "North Coast, Egypt",
      year: "2023",
      image: project2,
      description: "Exclusive beachfront penthouse with panoramic sea views and luxury finishes.",
      features: ["Sea Views", "Private Beach", "Luxury Finishes", "Smart Home"],
      delay: "2.2s"
    },
    {
      id: 12,
      title: "Educational Campus",
      category: "cultural",
      location: "6th October City, Egypt",
      year: "2023",
      image: project3,
      description: "A modern educational campus designed to foster learning and innovation.",
      features: ["Modern Classrooms", "Research Labs", "Library", "Sports Facilities"],
      delay: "2.4s"
    },
    {
      id: 13,
      title: "Nile View Apartments",
      category: "residential",
      location: "Garden City, Cairo",
      year: "2023",
      image: project1,
      description: "Luxury apartments with stunning Nile views and premium finishes throughout.",
      features: ["Nile Views", "Premium Finishes", "Concierge Service", "Rooftop Pool"],
      delay: "2.6s"
    },
    {
      id: 14,
      title: "Financial District Tower",
      category: "commercial",
      location: "New Administrative Capital, Egypt",
      year: "2023",
      image: project2,
      description: "A landmark office tower in the heart of Egypt's new financial district.",
      features: ["50 Floors", "LEED Platinum", "Smart Building", "Premium Amenities"],
      delay: "2.8s"
    },
    {
      id: 15,
      title: "Pharaonic Heritage Center",
      category: "cultural",
      location: "Aswan, Egypt",
      year: "2023",
      image: project3,
      description: "A cultural center celebrating ancient Egyptian heritage with modern architecture.",
      features: ["Museum", "Research Center", "Cultural Events", "Garden Spaces"],
      delay: "3.0s"
    },
    {
      id: 16,
      title: "Desert Oasis Villas",
      category: "residential",
      location: "Bahariya Oasis, Egypt",
      year: "2022",
      image: project1,
      description: "Sustainable desert villas designed to blend with the natural landscape.",
      features: ["Desert Views", "Solar Power", "Natural Cooling", "Eco-Friendly"],
      delay: "3.2s"
    },
    {
      id: 17,
      title: "Shopping Mall Complex",
      category: "commercial",
      location: "Sheikh Zayed City, Egypt",
      year: "2022",
      image: project2,
      description: "A modern shopping destination with entertainment and dining options.",
      features: ["Retail Spaces", "Cinema Complex", "Food Court", "Parking Garage"],
      delay: "3.4s"
    },
    {
      id: 18,
      title: "Islamic Art Museum",
      category: "cultural",
      location: "Islamic Cairo, Egypt",
      year: "2022",
      image: project3,
      description: "A contemporary museum showcasing Islamic art and architecture.",
      features: ["Exhibition Halls", "Conservation Lab", "Library", "Garden Courtyard"],
      delay: "3.6s"
    },
    {
      id: 19,
      title: "Luxury Condominiums",
      category: "residential",
      location: "New Cairo, Egypt",
      year: "2022",
      image: project1,
      description: "High-end condominiums with world-class amenities and services.",
      features: ["Luxury Amenities", "24/7 Security", "Fitness Center", "Spa Services"],
      delay: "3.8s"
    },
    {
      id: 20,
      title: "Technology Park",
      category: "commercial",
      location: "Smart Village, Egypt",
      year: "2022",
      image: project2,
      description: "A technology-focused business park for innovative companies.",
      features: ["Office Spaces", "Research Labs", "Conference Center", "Green Spaces"],
      delay: "4.0s"
    },
    {
      id: 21,
      title: "Contemporary Art Gallery",
      category: "cultural",
      location: "Zamalek, Cairo",
      year: "2022",
      image: project3,
      description: "A modern art gallery promoting contemporary Egyptian artists.",
      features: ["Gallery Spaces", "Artist Studios", "Event Hall", "Café"],
      delay: "4.2s"
    },
    {
      id: 22,
      title: "Gated Community",
      category: "residential",
      location: "Sharm El Sheikh, Egypt",
      year: "2021",
      image: project1,
      description: "Exclusive gated community with luxury villas and resort amenities.",
      features: ["Private Beach", "Golf Course", "Marina", "Luxury Villas"],
      delay: "4.4s"
    },
    {
      id: 23,
      title: "Medical Center",
      category: "commercial",
      location: "Nasr City, Cairo",
      year: "2021",
      image: project2,
      description: "State-of-the-art medical facility with specialized treatment centers.",
      features: ["Specialized Clinics", "Surgery Centers", "Emergency Room", "Parking"],
      delay: "4.6s"
    },
    {
      id: 24,
      title: "Cultural Heritage Site",
      category: "cultural",
      location: "Karnak, Luxor",
      year: "2021",
      image: project3,
      description: "Restoration and enhancement of ancient temple complex visitor facilities.",
      features: ["Visitor Center", "Museum", "Restoration Lab", "Garden"],
      delay: "4.8s"
    },
    {
      id: 25,
      title: "Mountain Resort",
      category: "residential",
      location: "Sinai Peninsula, Egypt",
      year: "2021",
      image: project1,
      description: "Luxury mountain resort with stunning views and natural integration.",
      features: ["Mountain Views", "Spa Resort", "Hiking Trails", "Natural Materials"],
      delay: "5.0s"
    },
    {
      id: 26,
      title: "Industrial Complex",
      category: "commercial",
      location: "10th of Ramadan City, Egypt",
      year: "2021",
      image: project2,
      description: "Modern industrial facility designed for efficiency and sustainability.",
      features: ["Manufacturing Spaces", "Office Complex", "Warehouse", "Green Energy"],
      delay: "5.2s"
    },
    {
      id: 27,
      title: "Archaeological Museum",
      category: "cultural",
      location: "Giza, Egypt",
      year: "2020",
      image: project3,
      description: "A museum dedicated to showcasing archaeological discoveries and artifacts.",
      features: ["Exhibition Halls", "Research Facilities", "Conservation Lab", "Library"],
      delay: "5.4s"
    },
    {
      id: 28,
      title: "Waterfront Residences",
      category: "residential",
      location: "Marina, Alexandria",
      year: "2020",
      image: project1,
      description: "Luxury waterfront apartments with Mediterranean Sea views.",
      features: ["Sea Views", "Marina Access", "Luxury Finishes", "Rooftop Deck"],
      delay: "5.6s"
    },
    {
      id: 29,
      title: "Convention Center",
      category: "commercial",
      location: "New Capital, Egypt",
      year: "2020",
      image: project2,
      description: "A world-class convention center for international events and conferences.",
      features: ["Conference Halls", "Exhibition Space", "Meeting Rooms", "Catering"],
      delay: "5.8s"
    },
    {
      id: 30,
      title: "Traditional Arts Center",
      category: "cultural",
      location: "Fayoum, Egypt",
      year: "2020",
      image: project3,
      description: "A center dedicated to preserving and promoting traditional Egyptian arts and crafts.",
      features: ["Workshop Spaces", "Exhibition Hall", "Artist Residency", "Garden"],
      delay: "6.0s"
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
            navigate(`/project/${project.id}`);
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
              <div
                key={project.id}
                className="group bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-border/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image */}
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
                      <Calendar className="h-4 w-4" />
                      <span>{project.year}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-3">
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
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-red text-red rounded-lg hover:bg-red hover:text-background transition-all duration-300 group"
                  >
                    <span>Explore Project</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
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