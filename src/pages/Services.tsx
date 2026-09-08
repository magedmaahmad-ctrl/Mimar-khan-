import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Services = () => {

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

  const servicesList = [
    {
      title: "Architecture",
      description: "We design structures that combine functionality and aesthetics, creating spaces that inspire and endure.",
      delay: "0.2s"
    },
    {
      title: "Urban Design",
      description: "We shape cities and communities through thoughtful, sustainable planning that enhances connection and growth.",
      delay: "0.3s"
    },
    {
      title: "Landscape Design",
      description: "We create outdoor environments that blend nature with design, delivering harmony and purpose.",
      delay: "0.4s"
    },
    {
      title: "Interior Architecture",
      description: "We craft interior spaces that balance beauty and function, turning environments into meaningful experiences.",
      delay: "0.5s"
    }
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
              Mimar Khan Design & Projects Management Studio is a multi-disciplinary practice led by Maged Khorshed,
              offering integrated services across architecture, interior design, and project management. We specialize
              in designing, remodeling, and transforming buildings and interior spaces while providing expert urban
              and environmental planning, landscape architecture, value engineering, and real estate development support.
              <br /><br />
              Our studio combines creative vision with technical expertise to deliver well-designed, efficiently managed,
              and high-value projects for clients across residential, commercial, and institutional sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {servicesList.map((service, index) => {
              return (
                <div key={index} className="bg-card p-8 rounded-sm shadow-elegant hover-lift fade-in-up h-full" style={{ animationDelay: service.delay }}>
                  <div className="flex flex-col items-start h-full">
                    <div className="flex-1">
                      <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
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
