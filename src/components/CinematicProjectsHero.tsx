import { useMemo, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Project } from "@/data/projectsData";

interface CinematicProjectsHeroProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
  onExploreProjects?: () => void;
}

function pickHeroProjects(projects: Project[]) {
  const gowhara = projects.find((project) => project.slug === "the-gowhara");
  const rest = projects.filter((project) => project.slug !== gowhara?.slug);

  if (gowhara) {
    return [gowhara, ...rest].slice(0, 3);
  }

  return projects.slice(0, 3);
}

function HeroImage({
  project,
  className,
  insetClassName = "",
  emphasis = false,
  children,
}: {
  project: Project;
  className: string;
  insetClassName?: string;
  emphasis?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={className}>
      <div className="absolute inset-0 rounded-[1.75rem] bg-black/60 shadow-[0_30px_80px_-45px_rgba(0,0,0,0.85)]" />
      <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-black/10 bg-black">
        <img
          src={project.images[0]}
          alt={project.title}
          className={`h-full w-full object-cover ${emphasis ? "scale-[1.02]" : "scale-[1.01]"}`}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.28)_100%)]" />
      </div>

      <div className={`absolute ${insetClassName} rounded-[1.5rem] border border-white/10 bg-black/10`} />
      <div className="absolute inset-x-6 bottom-6 h-px bg-gradient-to-r from-transparent via-red/80 to-transparent" />
      {children}
    </div>
  );
}

const CinematicProjectsHero = ({
  projects,
  onProjectClick,
  onExploreProjects,
}: CinematicProjectsHeroProps) => {
  const heroProjects = useMemo(() => pickHeroProjects(projects), [projects]);

  if (heroProjects.length === 0) {
    return null;
  }

  const [primaryProject, secondaryProject, tertiaryProject] = heroProjects;

  const handleProjectClick = (project: Project) => {
    onProjectClick?.(project);
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#f6f4ef]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(220,38,38,0.12),transparent_26%),radial-gradient(circle_at_82%_16%,rgba(255,255,255,0.9),transparent_30%),linear-gradient(90deg,#090909_0%,#111111_38%,#f1efeb_71%,#fbfaf7_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_38%,rgba(255,255,255,0.18)_100%)]" />

      <div className="relative mx-auto grid min-h-[calc(100svh-7rem)] max-w-7xl items-center gap-10 px-6 pb-8 pt-24 md:px-8 md:py-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 max-w-xl"
        >
          <div className="mb-6 h-px w-24 bg-red" />
          <h1 className="font-serif text-[clamp(4rem,8.5vw,7.4rem)] font-semibold leading-[0.86] tracking-tight text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.36)]">
            Projects
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/90 md:text-lg">
            A cinematic architecture showcase built as a quiet, deliberate composition instead of
            a noisy animation.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => handleProjectClick(primaryProject)}
              className="inline-flex items-center gap-2 rounded-full bg-red px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(220,38,38,0.85)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Open featured project
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onExploreProjects}
              className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors duration-300 hover:border-red hover:bg-red hover:text-white"
            >
              Explore collection
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 text-xs uppercase tracking-[0.28em] text-white/45">
            <span>Architectural vision</span>
            <span>Material detail</span>
            <span>Editorial layout</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.05 }}
          className="relative"
        >
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(0,0,0,0.12))] shadow-[0_50px_130px_-55px_rgba(0,0,0,0.7)]" />

          <div className="grid gap-4 md:grid-cols-[0.7fr_1.15fr_0.7fr] md:items-center">
            <HeroImage
              project={secondaryProject ?? primaryProject}
              className="relative hidden md:block h-[30rem] w-full md:translate-y-8 md:rotate-[-2deg]"
              insetClassName="inset-3"
            />

            <HeroImage
              project={primaryProject}
              className="relative min-h-[36rem] overflow-hidden rounded-[2rem] md:min-h-[42rem]"
              insetClassName="inset-2"
              emphasis
            >
              <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white">
                <p className="text-xs uppercase tracking-[0.3em] text-white/55">Featured work</p>
                <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight md:text-[2.8rem]">
                  {primaryProject.title}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/78">
                  {primaryProject.summary}
                </p>
              </div>
            </HeroImage>

            <HeroImage
              project={tertiaryProject ?? primaryProject}
              className="relative hidden md:block h-[30rem] w-full md:-translate-y-10 md:rotate-[2deg]"
              insetClassName="inset-3"
            />
          </div>
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-8 md:px-8 lg:hidden">
        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => handleProjectClick(secondaryProject ?? primaryProject)}
            className="group overflow-hidden rounded-[1.5rem] border border-black/8 bg-white/55 p-3 text-left shadow-[0_20px_60px_-45px_rgba(0,0,0,0.5)] backdrop-blur transition-transform duration-300 hover:-translate-y-0.5"
          >
            <div className="overflow-hidden rounded-[1.1rem]">
              <img
                src={(secondaryProject ?? primaryProject).images[0]}
                alt={(secondaryProject ?? primaryProject).title}
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.26em] text-red">Secondary work</p>
            <h3 className="mt-2 font-serif text-xl font-semibold leading-tight text-foreground">
              {(secondaryProject ?? primaryProject).title}
            </h3>
          </button>

          <button
            type="button"
            onClick={() => handleProjectClick(tertiaryProject ?? primaryProject)}
            className="group overflow-hidden rounded-[1.5rem] border border-black/8 bg-white/55 p-3 text-left shadow-[0_20px_60px_-45px_rgba(0,0,0,0.5)] backdrop-blur transition-transform duration-300 hover:-translate-y-0.5"
          >
            <div className="overflow-hidden rounded-[1.1rem]">
              <img
                src={(tertiaryProject ?? primaryProject).images[0]}
                alt={(tertiaryProject ?? primaryProject).title}
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.26em] text-red">Supporting work</p>
            <h3 className="mt-2 font-serif text-xl font-semibold leading-tight text-foreground">
              {(tertiaryProject ?? primaryProject).title}
            </h3>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CinematicProjectsHero;
