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
import heroImageSecondary from "@/assets/project (2).jpg";
import heroImageTertiary from "@/assets/project (3).jpg";
import PartnerMarquee from "../components/PartnerMarquee";

const Home = () => {
  const stats = [
    { icon: Building, value: 500, suffix: "+", label: "Projects", delay: "0.2s" },
    { icon: Compass, value: 6, suffix: "", label: "Countries", delay: "0.4s" },
    { icon: Award, value: 30, suffix: "+", label: "Years Experience", delay: "0.6s" }
  ];

  const services = [
    {
      title: "Architecture",
      description: "We design structures that combine functionality and aesthetics, creating spaces that inspire and endure.",
      delay: "0.1s"
    },
    {
      title: "Urban Design",
      description: "We shape cities and communities through thoughtful, sustainable planning that enhances connection and growth.",
      delay: "0.2s"
    },
    {
      title: "Landscape Design",
      description: "We create outdoor environments that blend nature with design, delivering harmony and purpose.",
      delay: "0.3s"
    },
    {
      title: "Interior Architecture",
      description: "We craft interior spaces that balance beauty and function, turning environments into meaningful experiences.",
      delay: "0.4s"
    }
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

  const culture = [
    {
      title: "Design for Excellence",
      description: "We create high-quality solutions that go beyond expectations, combining beauty with functionality.",
      icon: Award
    },
    {
      title: "Innovative Force",
      description: "We push boundaries with creative, forward-thinking design solutions.",
      icon: Sparkles
    },
    {
      title: "Architecture Meets Technology",
      description: "We integrate advanced technology to future-proof every project.",
      icon: Layers
    },
    {
      title: "Invest in People",
      description: "We build a strong, creative team through continuous growth and development.",
      icon: Users
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

          <div className="arch-grid grid grid-cols-1 md:grid-cols-2 gap-8">
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

      {/* Culture Section */}
      <section className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-[0.8fr_1fr] gap-12 items-start">
            <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left fade-in-scroll">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                Our Culture
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                The core principles that drive our team and inspire our work.
              </p>
            </div>

            <div className="approach-grid">
              {culture.map((step, index) => {
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

      {/* Partner Marquee Section */}
      <PartnerMarquee />

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