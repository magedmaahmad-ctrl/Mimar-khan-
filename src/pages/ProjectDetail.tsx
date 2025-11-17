import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Share2, 
  Heart,
  Eye,
  Users,
  Square,
  Building,
  TreePine,
  Wifi,
  Car,
  Shield
} from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  image: string;
  description: string;
  features: string[];
  delay?: string;
  architect?: string;
  area?: string;
  budget?: string;
  status?: string;
  client?: string;
  detailedDescription?: string;
  gallery?: string[];
  specifications?: {
    floors?: number;
    units?: number;
    parking?: number;
    amenities?: string[];
  };
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Project data - in a real app, this would come from an API
  const projects: Project[] = [
    {
      id: 1,
      title: "Golden Residence Complex",
      category: "residential",
      location: "New Cairo, Egypt",
      year: "2025",
      image: project1,
      description: "A luxury residential complex featuring modern Egyptian architectural elements with sustainable design principles.",
      detailedDescription: "The Golden Residence Complex represents a new standard in luxury living, combining contemporary design with traditional Egyptian architectural elements. This ambitious project features 120 residential units across multiple buildings, each designed to maximize natural light and ventilation while maintaining privacy and security. The complex includes extensive green spaces, a central courtyard inspired by traditional Egyptian architecture, and state-of-the-art amenities that cater to modern lifestyle needs. The design emphasizes sustainability with solar panels, rainwater harvesting systems, and energy-efficient building materials throughout.",
      features: ["120 Units", "Sustainable Design", "Community Spaces", "Modern Amenities", "Solar Power", "Green Roof", "Swimming Pool", "Fitness Center"],
      architect: "Mimar Khan",
      area: "15,000 sqm",
      budget: "$50M",
      status: "Under Construction",
      client: "Golden Properties Development",
      gallery: [project1, project2, project3],
      specifications: {
        floors: 12,
        units: 120,
        parking: 150,
        amenities: ["Swimming Pool", "Fitness Center", "Garden", "Playground", "Security", "Concierge"]
      }
    },
    {
      id: 2,
      title: "Cairo Business Center",
      category: "commercial",
      location: "Downtown Cairo, Egypt",
      year: "2025",
      image: project2,
      description: "A state-of-the-art commercial building designed to meet the demands of modern business while respecting urban context.",
      detailedDescription: "The Cairo Business Center stands as a landmark in the heart of downtown Cairo, representing the future of commercial architecture in Egypt. This 25-story tower incorporates cutting-edge technology with traditional Egyptian design elements, creating a workspace that inspires productivity and innovation. The building features flexible office spaces, state-of-the-art conference facilities, and premium amenities including a rooftop garden, fitness center, and multiple dining options. The design prioritizes sustainability with LEED Platinum certification, featuring advanced HVAC systems, smart building technology, and extensive use of natural materials.",
      features: ["25 Floors", "LEED Certified", "Smart Building", "Mixed-Use", "Rooftop Garden", "Conference Center", "Premium Amenities", "Flexible Spaces"],
      architect: "Mimar Khan",
      area: "45,000 sqm",
      budget: "$120M",
      status: "Completed",
      client: "Cairo Development Authority",
      gallery: [project2, project1, project3],
      specifications: {
        floors: 25,
        units: 200,
        parking: 300,
        amenities: ["Rooftop Garden", "Conference Center", "Fitness Center", "Restaurant", "Banking", "Security"]
      }
    },
    {
      id: 3,
      title: "Heritage Cultural Museum",
      category: "cultural",
      location: "Alexandria, Egypt",
      year: "2025",
      image: project3,
      description: "A contemporary interpretation of traditional Egyptian architecture housing cultural artifacts and exhibitions.",
      detailedDescription: "The Heritage Cultural Museum in Alexandria represents a bridge between Egypt's rich historical past and its vibrant contemporary culture. This architectural masterpiece houses extensive collections of Egyptian artifacts, contemporary art, and interactive exhibitions that educate visitors about the country's cultural heritage. The building's design draws inspiration from ancient Egyptian architecture while incorporating modern sustainable building practices. The museum features multiple exhibition halls, a research library, educational facilities, and a beautiful public plaza that serves as a gathering space for the community. The design emphasizes natural light, creating an inspiring environment for learning and cultural appreciation.",
      features: ["Exhibition Halls", "Educational Center", "Research Library", "Public Plaza", "Interactive Displays", "Cultural Events", "Garden Spaces", "Café"],
      architect: "Mimar Khan",
      area: "12,000 sqm",
      budget: "$35M",
      status: "Planning Phase",
      client: "Alexandria Cultural Foundation",
      gallery: [project3, project1, project2],
      specifications: {
        floors: 4,
        units: 1,
        parking: 80,
        amenities: ["Exhibition Halls", "Library", "Educational Center", "Café", "Gift Shop", "Auditorium"]
      }
    },
    // Add more projects with detailed information...
    {
      id: 4,
      title: "Modern Villa Estate",
      category: "residential",
      location: "Giza, Egypt",
      year: "2025",
      image: project1,
      description: "Contemporary residential design blending modern comfort with traditional Egyptian aesthetics.",
      detailedDescription: "The Modern Villa Estate in Giza represents the perfect fusion of contemporary luxury and traditional Egyptian design principles. This exclusive development features 50 luxury villas, each designed to provide maximum privacy and comfort while maintaining a strong connection to the surrounding landscape. The villas incorporate traditional Egyptian architectural elements such as courtyards, mashrabiya screens, and natural stone finishes, while featuring modern amenities and smart home technology. The estate includes a central park, community facilities, and premium security services.",
      features: ["Private Pool", "Garden Terrace", "Smart Home", "Solar Power", "Security", "Community Park", "Luxury Finishes", "Traditional Elements"],
      architect: "Mimar Khan",
      area: "8,000 sqm",
      budget: "$25M",
      status: "Under Construction",
      client: "Giza Properties Group",
      gallery: [project1, project2, project3],
      specifications: {
        floors: 2,
        units: 50,
        parking: 60,
        amenities: ["Private Pools", "Garden", "Security", "Community Center", "Playground", "Maintenance"]
      }
    },
    {
      id: 5,
      title: "Tech Innovation Hub",
      category: "commercial",
      location: "New Administrative Capital, Egypt",
      year: "2025",
      image: project2,
      description: "A cutting-edge workspace designed for technology companies and startups.",
      detailedDescription: "The Tech Innovation Hub in the New Administrative Capital is designed to be Egypt's premier destination for technology companies and startups. This state-of-the-art facility provides flexible co-working spaces, innovation labs, and networking areas that foster collaboration and creativity. The building features advanced technology infrastructure, including high-speed internet, smart building systems, and cutting-edge presentation facilities. The design emphasizes openness and transparency, with extensive use of glass and natural light to create an inspiring work environment.",
      features: ["Co-working Spaces", "Innovation Labs", "Event Center", "Rooftop Garden", "High-Speed Internet", "Meeting Rooms", "Café", "Networking Areas"],
      architect: "Mimar Khan",
      area: "20,000 sqm",
      budget: "$60M",
      status: "Planning Phase",
      client: "New Capital Technology Authority",
      gallery: [project2, project1, project3],
      specifications: {
        floors: 15,
        units: 100,
        parking: 200,
        amenities: ["Co-working Spaces", "Innovation Labs", "Event Center", "Café", "Gym", "Meeting Rooms"]
      }
    }
  ];

  useEffect(() => {
    const projectId = parseInt(id || '0');
    const foundProject = projects.find(p => p.id === projectId);
    
    if (foundProject) {
      setProject(foundProject);
      setSelectedImage(0);
    } else {
      // Project not found, redirect to projects page
      navigate('/projects');
    }
    
    setIsLoading(false);
  }, [id, navigate]);

  const handleShare = async () => {
    if (navigator.share && project) {
      try {
        await navigator.share({
          title: project.title,
          text: project.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'residential':
        return <Building className="h-5 w-5" />;
      case 'commercial':
        return <Square className="h-5 w-5" />;
      case 'cultural':
        return <TreePine className="h-5 w-5" />;
      default:
        return <Building className="h-5 w-5" />;
    }
  };

  const getFeatureIcon = (feature: string) => {
    if (feature.toLowerCase().includes('wifi') || feature.toLowerCase().includes('smart')) {
      return <Wifi className="h-4 w-4" />;
    } else if (feature.toLowerCase().includes('parking') || feature.toLowerCase().includes('car')) {
      return <Car className="h-4 w-4" />;
    } else if (feature.toLowerCase().includes('security') || feature.toLowerCase().includes('safety')) {
      return <Shield className="h-4 w-4" />;
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Project Not Found</h2>
          <Link to="/projects" className="btn-hero">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Header Section */}
      <section className="py-12 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            {/* Back Button */}
            <button
              onClick={() => navigate('/projects')}
              className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Projects</span>
            </button>

            {/* Project Header */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  {getCategoryIcon(project.category)}
                  <span className="text-sm font-medium text-red uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                  {project.title}
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {project.description}
                </p>

                {/* Project Meta */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-red" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">{project.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-red" />
                    <div>
                      <p className="text-sm text-muted-foreground">Year</p>
                      <p className="font-medium text-foreground">{project.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-red" />
                    <div>
                      <p className="text-sm text-muted-foreground">Architect</p>
                      <p className="font-medium text-foreground">{project.architect || 'Mimar Khan'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Eye className="h-5 w-5 text-red" />
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium text-foreground">{project.status || 'Completed'}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isLiked 
                        ? 'bg-red text-background' 
                        : 'bg-card border border-border text-foreground hover:bg-stone'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{isLiked ? 'Liked' : 'Like'}</span>
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-card border border-border text-foreground rounded-lg font-medium hover:bg-stone transition-all duration-300"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Main Image */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Gallery Navigation */}
                {project.gallery && project.gallery.length > 1 && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex space-x-2 justify-center">
                      {project.gallery.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === selectedImage ? 'bg-red' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Description */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
                Project Overview
              </h2>
              
              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                <p>
                  {project.detailedDescription || project.description}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features & Specifications */}
      <section className="py-20 bg-stone">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              {/* Features */}
              <div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-8">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 bg-card rounded-lg border border-border/20"
                    >
                      {getFeatureIcon(feature)}
                      <span className="text-foreground font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-8">
                  Specifications
                </h3>
                <div className="space-y-4">
                  {project.specifications && (
                    <>
                      {project.specifications.floors && (
                        <div className="flex justify-between items-center p-4 bg-card rounded-lg border border-border/20">
                          <span className="text-muted-foreground">Floors</span>
                          <span className="font-medium text-foreground">{project.specifications.floors}</span>
                        </div>
                      )}
                      {project.specifications.units && (
                        <div className="flex justify-between items-center p-4 bg-card rounded-lg border border-border/20">
                          <span className="text-muted-foreground">Units</span>
                          <span className="font-medium text-foreground">{project.specifications.units}</span>
                        </div>
                      )}
                      {project.specifications.parking && (
                        <div className="flex justify-between items-center p-4 bg-card rounded-lg border border-border/20">
                          <span className="text-muted-foreground">Parking Spaces</span>
                          <span className="font-medium text-foreground">{project.specifications.parking}</span>
                        </div>
                      )}
                      {project.area && (
                        <div className="flex justify-between items-center p-4 bg-card rounded-lg border border-border/20">
                          <span className="text-muted-foreground">Total Area</span>
                          <span className="font-medium text-foreground">{project.area}</span>
                        </div>
                      )}
                      {project.budget && (
                        <div className="flex justify-between items-center p-4 bg-card rounded-lg border border-border/20">
                          <span className="text-muted-foreground">Budget</span>
                          <span className="font-medium text-foreground">{project.budget}</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {project.gallery && project.gallery.length > 1 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-serif font-bold text-foreground mb-8 text-center">
                  Project Gallery
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${project.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-charcoal to-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Interested in Similar Projects?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can bring your vision to life with our expertise in architectural design.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/contact"
                className="btn-hero inline-flex items-center group"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/projects"
                className="btn-outline-red inline-flex items-center"
              >
                View All Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;

