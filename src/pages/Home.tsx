import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Building,
  Compass,
  Layers,
  Sparkles,
  Users,
} from "lucide-react";
import heroImage from "@/assets/hero-architecture.jpg";
import heroImageSecondary from "@/assets/project (2).jpg";
import heroImageTertiary from "@/assets/project (3).jpg";
import ProjectCard from "@/components/ProjectCard";
import PartnerMarquee from "@/components/PartnerMarquee";
import { projectsData } from "@/data/projectsData";

const Home = () => {
  const heroStats = [
    { icon: Award, value: "500+", label: "Projects delivered" },
    { icon: Compass, value: "6", label: "Countries served" },
    { icon: Users, value: "30+", label: "Years of practice" },
  ];

  const services = [
    {
      title: "Architecture",
      description:
        "Clear, functional structures shaped around light, circulation, and long-term value.",
      icon: Building,
    },
    {
      title: "Urban Design",
      description:
        "Thoughtful planning that connects places, people, and the wider city fabric.",
      icon: Compass,
    },
    {
      title: "Landscape Design",
      description:
        "Outdoor environments that soften transitions, frame views, and add calm to daily use.",
      icon: Sparkles,
    },
    {
      title: "Interior Architecture",
      description:
        "Tailored interiors that balance material warmth, durability, and spatial clarity.",
      icon: Layers,
    },
  ];

  const culture = [
    {
      title: "Design for excellence",
      description:
        "We hold every decision to a high standard so the final space feels resolved and confident.",
      icon: Award,
    },
    {
      title: "Innovative force",
      description:
        "We use new ideas when they improve the experience, not just because they are new.",
      icon: Sparkles,
    },
    {
      title: "Architecture meets technology",
      description:
        "Digital tools help us test ideas faster, coordinate better, and deliver with more clarity.",
      icon: Layers,
    },
    {
      title: "Invest in people",
      description:
        "Great spaces come from a team culture that values learning, care, and shared ownership.",
      icon: Users,
    },
  ];

  const gowharaProject = projectsData.find((project) => project.slug === "the-gowhara");
  const featuredProjects = gowharaProject
    ? [
        gowharaProject,
        ...projectsData
          .filter((project) => project.slug !== gowharaProject.slug)
          .slice(0, 2),
      ]
    : projectsData.slice(0, 3);

  return (
    <div className="overflow-hidden">
      <section className="relative isolate overflow-hidden pt-32 pb-16 lg:pt-36 lg:pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,63,63,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(17,17,17,0.08),transparent_30%)]" />

        <div className="container mx-auto px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.96fr]">
            <div className="max-w-3xl">
              <div className="h-1 w-20 rounded-full bg-gradient-to-r from-red to-red-light" />
              <h1 className="mt-8 max-w-[10ch] text-[clamp(3.2rem,7vw,6.75rem)] font-serif font-semibold leading-[0.92] tracking-tight text-foreground">
                Designing Tomorrow&apos;s <span className="text-gradient-red">Landmarks</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Where architectural excellence meets Egyptian heritage. We design spaces that are
                calm to use, strong in identity, and built to endure.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-red px-6 py-3.5 text-sm font-semibold text-white shadow-red transition-transform duration-300 hover:-translate-y-0.5"
                >
                  View Our Projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-red/20 bg-background px-6 py-3.5 text-sm font-semibold text-red transition-all duration-300 hover:border-red hover:bg-red/5"
                >
                  Start Your Project
                </Link>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {heroStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="rounded-3xl border border-border bg-background/90 p-5 shadow-[0_20px_50px_-34px_rgba(0,0,0,0.35)] backdrop-blur"
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-red/10 text-red">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-2xl font-serif font-semibold leading-none text-foreground">
                            {stat.value}
                          </p>
                          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-8 hidden h-36 w-36 rounded-full bg-red/10 blur-3xl lg:block" />
              <div className="grid gap-4 sm:grid-cols-[1.12fr_0.88fr]">
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_28px_80px_-36px_rgba(0,0,0,0.45)] sm:row-span-2">
                  <img
                    src={heroImage}
                    alt="Contemporary architectural facade"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                      Featured outlook
                    </p>
                    <p className="mt-2 max-w-xs text-lg font-serif leading-tight">
                      A composed balance of structure, texture, and natural light.
                    </p>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-border bg-background/90 p-5 shadow-[0_18px_50px_-34px_rgba(0,0,0,0.35)] backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Studio focus
                  </p>
                  <div className="mt-4 space-y-4">
                    {[
                      "Architecture that feels precise without feeling rigid.",
                      "Interiors that bring warmth, clarity, and comfort together.",
                      "Delivery support that keeps decisions organized from start to finish.",
                    ].map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-red shadow-red" />
                        <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_18px_50px_-34px_rgba(0,0,0,0.35)]">
                  <img
                    src={heroImageSecondary}
                    alt="Architectural detail and exterior composition"
                    className="h-56 w-full object-cover"
                  />
                </div>

                <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_18px_50px_-34px_rgba(0,0,0,0.35)]">
                  <img
                    src={heroImageTertiary}
                    alt="Interior architecture and warm material palette"
                    className="h-56 w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PartnerMarquee />

      <section className="py-10">
        <div className="container mx-auto px-6">
          <div className="grid gap-4 rounded-[2rem] border border-border bg-background/90 p-6 shadow-[0_24px_70px_-44px_rgba(0,0,0,0.35)] lg:grid-cols-3">
            {[
              "Concept clarity",
              "Material warmth",
              "Delivery discipline",
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-muted/50 px-5 py-4 text-sm font-medium text-foreground">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground">
                Our Expertise
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                From concept to completion, we shape the full journey with practical creativity and
                careful coordination.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-red hover:text-red"
            >
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group rounded-[1.75rem] border border-border bg-card p-7 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant"
                >
                  <div className="flex items-center justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-red/10 text-red">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-red" />
                  </div>
                  <h3 className="mt-6 text-2xl font-serif font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border/50 bg-stone/35 py-24">
        <div className="container mx-auto px-6">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground">
                Featured Work
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                A small selection of projects that show how we work across scales, programs, and client goals.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 self-start rounded-full bg-charcoal px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              Browse portfolio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-serif font-semibold text-foreground">
                Our Culture
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                The values behind the work, and the habits that help every project move with confidence.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {culture.map((item, index) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="rounded-[1.75rem] border border-border bg-card p-7 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.35)]"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                        0{index + 1}
                      </span>
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-red/10 text-red">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h3 className="mt-6 text-2xl font-serif font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-20 text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] p-8 text-center shadow-[0_24px_80px_-50px_rgba(0,0,0,0.55)] md:p-12">
            <h2 className="text-4xl md:text-5xl font-serif font-semibold">
              Ready to build your vision?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/72">
              Tell us what you are planning and we will help turn the brief into a space that feels
              purposeful, practical, and distinctly yours.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-red px-6 py-3.5 text-sm font-semibold text-white shadow-red transition-transform duration-300 hover:-translate-y-0.5"
              >
                Get in touch
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-red hover:bg-red/10"
              >
                Explore more work
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
