import { Link } from "react-router-dom";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import heroImage from "@/assets/hero-architecture.jpg";
import { projectsData } from "@/data/projectsData";

const Interior = () => {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const privateJobProjects = [
    "the-gowhara",
    "mr-tamer-apartment",
    "mr-ahmad-shawkey-bedrooms",
    "dr-aweny",
  ]
    .map((slug) => projectsData.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));

  const furnitureStories = [
    {
      title: "Living room furniture",
      description:
        "Soft seating, coffee tables, and media walls designed as a single composed system.",
      image: privateJobProjects[0]?.images[0] ?? heroImage,
      details: ["Custom layout", "Warm materials", "Balanced proportions"],
    },
    {
      title: "Bedroom furniture",
      description:
        "Wardrobes, side tables, and storage details that keep private rooms calm and practical.",
      image: privateJobProjects[2]?.images[0] ?? heroImage,
      details: ["Built-in storage", "Quiet finishes", "Soft lighting"],
    },
    {
      title: "Dining and accent pieces",
      description:
        "Tables, consoles, and finishing accents that add rhythm without crowding the room.",
      image: privateJobProjects[1]?.images[0] ?? heroImage,
      details: ["Loose furniture", "Material contrast", "Layered styling"],
    },
  ];

  return (
    <div className="overflow-hidden bg-background">
      <section className="relative isolate min-h-screen overflow-hidden bg-charcoal text-white">
        <video
          className="absolute inset-0 -z-10 h-full w-full scale-[1.08] object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroImage}
          aria-hidden="true"
        >
          <source src="/video/interior-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-[5] bg-gradient-to-r from-black/80 via-black/45 to-black/15" />
        <div className="absolute inset-0 -z-[5] bg-gradient-to-t from-black/75 via-transparent to-black/20" />

        <div className="container mx-auto flex min-h-screen flex-col justify-end px-6 pb-10 pt-32 lg:pb-14">
          <div className="max-w-3xl">
              <div className="h-1 w-20 rounded-full bg-gradient-to-r from-red to-red-light" />
              <h1 className="mt-8 max-w-[10ch] text-[clamp(3.2rem,7vw,6.75rem)] font-serif font-semibold leading-[0.92] tracking-tight text-white">
                Interior <span className="text-gradient-red">Studio</span>
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
                A focused interior destination for the work we do inside spaces, split into private
                jobs and furniture so each side of the studio stays clear and easy to explore.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => scrollToSection("private-jobs")}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-red px-6 py-3.5 text-sm font-semibold text-white shadow-red transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Explore private jobs
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("furniture")}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-red/20 bg-background px-6 py-3.5 text-sm font-semibold text-red transition-all duration-300 hover:border-red hover:bg-red/5"
                >
                  See furniture work
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-12 grid max-w-3xl gap-3 sm:grid-cols-3">
                {[
                  { value: "03", label: "Private job routes" },
                  { value: "03", label: "Furniture stories" },
                  { value: "100%", label: "Interior focus" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="border border-white/20 bg-black/20 p-5 backdrop-blur-md"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-3xl font-serif font-semibold leading-none text-white">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </section>

      <section id="private-jobs" className="border-y border-border/50 bg-stone/35 py-24">
        <div className="container mx-auto px-6">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Private jobs
              </p>
              <h2 className="mt-4 text-4xl font-serif font-semibold text-foreground md:text-5xl">
                Homes and private interiors
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                A selection of residential interiors where we handle the quiet details, from the
                room layout down to the final material finish.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 self-start rounded-full bg-charcoal px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              Browse all projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {privateJobProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section id="furniture" className="py-24">
        <div className="container mx-auto px-6">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Furniture
              </p>
              <h2 className="mt-4 text-4xl font-serif font-semibold text-foreground md:text-5xl">
                Pieces that finish the room
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Furniture is treated as part of the interior architecture, not as an afterthought,
                so the room reads as one complete composition.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground">
              <Sparkles className="h-4 w-4 text-red" />
              Custom detailing
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {furnitureStories.map((item, index) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_20px_60px_-40px_rgba(0,0,0,0.35)]"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/18 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                      Furniture route 0{index + 1}
                    </p>
                    <h3 className="mt-2 text-2xl font-serif font-semibold leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.details.map((detail) => (
                      <span
                        key={detail}
                        className="rounded-full border border-border bg-stone/40 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-20 text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] p-8 text-center shadow-[0_24px_80px_-50px_rgba(0,0,0,0.55)] md:p-12">
            <h2 className="text-4xl font-serif font-semibold md:text-5xl">
              Ready to shape an interior?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/72">
              Tell us whether you are planning a private job or a furniture package, and we will
              shape the right interior direction from there.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-red px-6 py-3.5 text-sm font-semibold text-white shadow-red transition-transform duration-300 hover:-translate-y-0.5"
              >
                Start a brief
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-red hover:bg-red/10"
              >
                See more work
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Interior;
