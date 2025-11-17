import { Link } from "react-router-dom";
import { Building, Home, Map, Users, ArrowRight, CheckCircle } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Building,
      title: "Architecture Design",
      description: "Comprehensive architectural solutions from concept to completion, blending innovative design with functional excellence.",
      features: [
        "Conceptual Design & Master Planning",
        "Detailed Architectural Drawings",
        "3D Visualization & Modeling",
        "Sustainable Design Solutions",
        "Heritage & Cultural Architecture"
      ],
      delay: "0.2s"
    },
    {
      icon: Home,
      title: "Interior Design",
      description: "Creating elegant and functional interior spaces that reflect your vision while enhancing user experience and comfort.",
      features: [
        "Space Planning & Layout Design",
        "Material Selection & Specification",
        "Custom Furniture Design",
        "Lighting Design & Ambiance",
        "Color Schemes & Finishes"
      ],
      delay: "0.4s"
    },
    {
      icon: Map,
      title: "Urban Planning",
      description: "Strategic urban development solutions that promote sustainable growth and create vibrant, livable communities.",
      features: [
        "Master Planning & Zoning",
        "Infrastructure Development",
        "Environmental Impact Assessment",
        "Community Engagement",
        "Smart City Solutions"
      ],
      delay: "0.6s"
    },
    {
      icon: Users,
      title: "Consultancy",
      description: "Expert architectural consultation services to guide your project from initial concept through successful completion.",
      features: [
        "Project Feasibility Studies",
        "Design Review & Optimization",
        "Regulatory Compliance",
        "Construction Administration",
        "Post-Occupancy Evaluation"
      ],
      delay: "0.8s"
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Consultation",
      description: "We begin by understanding your vision, requirements, and project goals through detailed consultations and site analysis."
    },
    {
      step: "02",
      title: "Concept Development",
      description: "Our team develops initial design concepts that balance creativity, functionality, and your specific needs."
    },
    {
      step: "03",
      title: "Design Development",
      description: "We refine the chosen concept, creating detailed plans, elevations, and 3D visualizations for your review."
    },
    {
      step: "04",
      title: "Project Delivery",
      description: "From construction documentation to project completion, we ensure seamless execution of your architectural vision."
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6 fade-in-up">
              Our <span className="text-gradient-red">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up" style={{ animationDelay: "0.2s" }}>
              Comprehensive architectural solutions designed to transform your vision 
              into remarkable spaces that inspire and endure.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-card p-8 rounded-sm shadow-elegant hover-lift fade-in-up"
                  style={{ animationDelay: service.delay }}
                >
                  <div className="flex items-start space-x-6">
                    <div className="w-16 h-16 bg-red rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="h-8 w-8 text-background" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {service.description}
                      </p>
                      
                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-red flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-stone">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 fade-in-up">
              Our Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up" style={{ animationDelay: "0.2s" }}>
              A streamlined approach that ensures excellence at every stage of your project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div
                key={index}
                className="text-center fade-in-up"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="w-20 h-20 bg-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-background">{item.step}</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 fade-in-up">
              Our Specialties
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up" style={{ animationDelay: "0.2s" }}>
              Areas where we excel and have developed particular expertise over the years.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Cultural & Heritage Architecture",
                description: "Preserving and celebrating cultural heritage through sensitive architectural interventions and restorations.",
                delay: "0.2s"
              },
              {
                title: "Sustainable Design",
                description: "Implementing green building practices and sustainable technologies for environmentally responsible architecture.",
                delay: "0.4s"
              },
              {
                title: "Mixed-Use Developments",
                description: "Creating dynamic spaces that blend residential, commercial, and public functions seamlessly.",
                delay: "0.6s"
              },
            ].map((specialty, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-sm shadow-elegant hover-lift text-center fade-in-up"
                style={{ animationDelay: specialty.delay }}
              >
                <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
                  {specialty.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {specialty.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-charcoal to-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 fade-in-up">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto fade-in-up" style={{ animationDelay: "0.2s" }}>
            Let's discuss how our expertise can bring your architectural vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Link
              to="/contact"
              className="btn-hero inline-flex items-center group"
            >
              Get In Touch
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/projects"
              className="btn-outline-red inline-flex items-center"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;