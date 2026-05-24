import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { Project } from "@/data/projectsData";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link
      to={`/projects/${project.categories[0]}/${project.slug}`}
      className="group flex h-full min-h-[28rem] w-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-[0_24px_60px_-30px_rgba(0,0,0,0.28)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_32px_90px_-36px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red/70"
    >
      <div className="relative h-[18.5rem] overflow-hidden">
        <img
          src={project.images[0]}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/18 to-transparent" />

        <div className="absolute left-5 top-5">
          <span className="inline-flex items-center rounded-full bg-background/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-charcoal shadow-sm backdrop-blur">
            {project.categories[0]}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-red" />
          <span className="truncate">{project.location}</span>
        </div>

        <h3 className="mt-4 text-2xl font-serif font-semibold leading-tight text-foreground transition-colors duration-300 group-hover:text-red">
          {project.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        <div className="mt-6 border-t border-border/70 pt-5">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-red transition-transform duration-300 group-hover:translate-x-1">
            Explore project
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
