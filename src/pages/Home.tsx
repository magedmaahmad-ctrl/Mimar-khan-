import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Users,
  Building,
  Compass,
  Layers,
  Sparkles
} from "lucide-react";
import heroImage from "@/assets/hero-architecture.jpg";
import heroImageSecondary from "@/assets/project-2.jpg";
import heroImageTertiary from "@/assets/project-3.jpg";

const Home = () => {
  const stats = [
    { icon: Building, value: 50, suffix: "+", label: "Projects Completed", delay: "0.2s" },
    { icon: Users, value: 25, suffix: "+", label: "Happy Clients", delay: "0.4s" },
    { icon: Award, value: 10, suffix: "+", label: "Awards Won", delay: "0.6s" }
  ];

  const services = [
    {
      title: "Architecture Design",
      description: "Creating innovative and functional architectural solutions that reflect modern aesthetics and cultural heritage.",
      delay: "0.2s"
    },
    {
      title: "Interior Design",
      description: "Crafting elegant interior spaces that harmonize with architectural vision and enhance user experience.",
      delay: "0.4s"
    },
    {
      title: "Urban Planning",
      description: "Developing sustainable urban solutions that promote community growth and environmental consciousness.",
      delay: "0.6s"
    },
  ];

  const heroInsights = [
    "Signature landmarks across MENA",
    "Net-zero ready, future-focused solutions",
    "Tailored experiences for cultural icons"
  ];

  const heroSlides = [
    { src: heroImage, alt: "Architecture background" },
    { src: heroImageSecondary, alt: "Contemporary architectural facade" },
    { src: heroImageTertiary, alt: "Modern interior atrium" }
  ];

  const approach = [
    {
      title: "Discovery & Vision",
      description:
        "Immersive workshops uncover project ambitions, context, and cultural narratives to anchor our creative direction.",
      icon: Compass
    },
    {
      title: "Iterative Design",
      description:
        "We translate insights into architectural typologies, refining every detail through digital twins and tangible prototypes.",
      icon: Layers
    },
    {
      title: "Delivery & Stewardship",
      description:
        "Coordinated execution with trusted partners ensures enduring impact, resilience, and operational excellence.",
      icon: Sparkles
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-section">
        <div className="absolute inset-0 hero-visual">
          <div className="hero-image-slider parallax" role="presentation">
            <div className="hero-image-track">
              {heroSlides.map((slide, index) => (
                <img
                  key={index}
                  src={slide.src}
                  alt={index === 0 ? slide.alt : ""}
                  className="hero-image"
                  aria-hidden={index === 0 ? undefined : true}
                  draggable={false}
                />
              ))}
            </div>
          </div>
          <div className="hero-floater hero-floater--left" aria-hidden="true" />
          <div className="hero-floater hero-floater--right" aria-hidden="true" />
        </div>
        <div className="relative z-20 container mx-auto px-6">
          <div className="max-w-4xl mx-auto lg:mx-0 text-center lg:text-left">
            <div className="hero-divider" />
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground mb-6 hero-headline">
              <span data-word>Designing</span>{" "}
              <span data-word>Tomorrow's</span>{" "}
              <span data-word className="text-gradient-red">Landmarks</span>
            </h1>
            <p className="text-xl md:text-2xl text-black mb-10 max-w-2xl leading-relaxed mx-auto lg:mx-0 hero-subheadline">
              Where architectural excellence meets Egyptian heritage. Creating innovative spaces that inspire and endure for generations.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start hero-actions">
              <Link
                to="/projects"
                className="btn-hero inline-flex items-center group justify-center"
              >
                View Our Projects
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/contact"
                className="btn-outline-red inline-flex items-center justify-center"
              >
                Start Your Project
              </Link>
            </div>

            <div className="hero-insights">
              {heroInsights.map((insight, index) => (
                <span key={index} className="hero-insight">
                  {insight}
                </span>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center fade-in-up"
                >
                  <div className="w-16 h-16 bg-red rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-background" />
                  </div>
                  <h3 className="text-4xl font-bold text-charcoal mb-2">
                    <span
                      className="stat-value"
                      data-counter-value={stat.value}
                      data-counter-suffix={stat.suffix ?? ""}
                    >
                      {stat.value}
                      {stat.suffix}
                    </span>
                  </h3>
                  <p className="text-muted-foreground text-lg">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 fade-in-scroll">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Our Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From conceptual design to project completion, we deliver comprehensive 
              architectural solutions tailored to your vision.
            </p>
          </div>

          <div className="arch-grid">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-sm shadow-elegant hover-lift fade-in-up"
                style={{ animationDelay: service.delay }}
              >
                <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
                <Link
                  to="/services"
                  className="btn-minimal inline-flex items-center group"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="btn-outline-red"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[0.8fr_1fr] gap-12 items-start">
            <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left fade-in-scroll">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                A Collaborative Process
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We pair local insight with global best practices to craft architecture that is culturally rooted, technologically advanced, and impeccably executed.
              </p>
            </div>

            <div className="approach-grid">
              {approach.map((step, index) => {
                const Icon = step.icon;
                return (
                  <article key={index} className="approach-card" data-step-index={index + 1}>
                    <div className="approach-card-number">{String(index + 1).padStart(2, "0")}</div>
                    <div className="approach-card-icon">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-charcoal to-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 fade-in-up">
            Ready to Build Your Vision?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto fade-in-up" style={{ animationDelay: "0.2s" }}>
            Let's discuss your project and create something extraordinary together.
          </p>
          <Link
            to="/contact"
            className="btn-hero fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;