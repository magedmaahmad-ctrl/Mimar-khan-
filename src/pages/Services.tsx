import { Link } from "react-router-dom";
import { Home, Users, ArrowRight, CheckCircle, Building } from "lucide-react";

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Architects */}
            {/* Architects */}
            <div className="bg-card p-8 rounded-sm shadow-elegant hover-lift fade-in-up h-full" style={{ animationDelay: "0.2s" }}>
              <div className="flex flex-col items-start h-full">
                <div className="w-16 h-16 bg-red rounded-full flex items-center justify-center flex-shrink-0 mb-6">
                  <Building className="h-8 w-8 text-background" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                    (A)-Architectes
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Mimar Khan Design & Projects Management Studio is a multi-disciplinary practice led by Maged Khorshed,
                    offering integrated services across architecture, interior design, and project management. We specialize
                    in designing, remodeling, and transforming buildings and interior spaces while providing expert urban
                    and environmental planning, landscape architecture, value engineering, and real estate development support.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Our studio combines creative vision with technical expertise to deliver well-designed, efficiently managed,
                    and high-value projects for clients across residential, commercial, and institutional sectors.
                  </p>
                </div>
              </div>
            </div>

            {/* Interior Designers */}
            {/* Interior Designers */}
            <div className="bg-card p-8 rounded-sm shadow-elegant hover-lift fade-in-up h-full" style={{ animationDelay: "0.3s" }}>
              <div className="flex flex-col items-start h-full">
                <div className="w-16 h-16 bg-red rounded-full flex items-center justify-center flex-shrink-0 mb-6">
                  <Home className="h-8 w-8 text-background" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                    (ID)-Interior Designers
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Primarily engaging in planning, designing, and administering projects in interior spaces to meet the physical
                    need and aesthetic of people, taking into consideration building codes, health and safety, circulation and
                    floor planning, mechanical & electrical needs, and furniture.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We work in residential design, commercial and corporate design, educational design, and health care design.
                  </p>
                </div>
              </div>
            </div>

            {/* Project Managers */}
            {/* Project Managers */}
            <div className="bg-card p-8 rounded-sm shadow-elegant hover-lift fade-in-up h-full" style={{ animationDelay: "0.4s" }}>
              <div className="flex flex-col items-start h-full">
                <div className="w-16 h-16 bg-red rounded-full flex items-center justify-center flex-shrink-0 mb-6">
                  <Users className="h-8 w-8 text-background" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                    (PM) Project Managers
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Efficient and responsible project management is the key to successful enterprise delivery.
                    No matter how carefully planned a scheme is, without the competent supervision and coordination at all phases
                    of implementation, any project is likely to become an indescribable headache.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    We offer professional construction management services especially tailored to the size of the project with
                    solid commitment to total quality management.
                  </p>

                  <h4 className="text-lg font-semibold text-foreground mb-3">Our Project management services include:</h4>
                  <ul className="space-y-2">
                    {[
                      "Schedule and budget evaluations",
                      "Value engineering",
                      "Constructibility reviews",
                      "Accuracy checks on cost estimates",
                      "Weighing project alternatives",
                      "Structuring bid packages for lowest cost construction",
                      "Monitoring and coordinating daily construction activities"
                    ].map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-red flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
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