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
      className="group relative block h-[400px] w-full overflow-hidden rounded-2xl bg-gray-100"
    >
      <img
        src={project.images[0]}
        alt={project.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

      <div className="absolute bottom-0 left-0 w-full p-6 text-white transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
        <span className="mb-2 inline-block rounded-full bg-red px-3 py-1 text-xs font-medium uppercase tracking-wider text-white">
          {project.categories[0]}
        </span>

        <h3 className="mb-2 text-2xl font-serif font-bold leading-tight">
          {project.title}
        </h3>

        <div className="flex items-center space-x-2 text-sm text-gray-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100 delay-100">
          <MapPin className="h-4 w-4" />
          <span>{project.location}</span>
        </div>

        <div className="mt-4 flex items-center text-sm font-medium text-red opacity-0 transition-opacity duration-300 group-hover:opacity-100 delay-200">
          View Project <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
