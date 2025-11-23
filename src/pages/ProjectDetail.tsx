import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  ArrowRight,
  Building,
  Square,
  TreePine,
  Hotel,
  Flower2,
} from "lucide-react";
import { projectsData } from "@/data/projectsData";
import ProjectGallery from "@/components/ProjectGallery";

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "residential":
      return <Building className="h-5 w-5" />;
    case "commercial":
      return <Square className="h-5 w-5" />;
    case "cultural":
      return <TreePine className="h-5 w-5" />;
    case "hospitality":
      return <Hotel className="h-5 w-5" />;
    case "landscape":
      return <Flower2 className="h-5 w-5" />;
    default:
      return <Building className="h-5 w-5" />;
  }
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projectsData.find((p) => p.slug === slug);

  useEffect(() => {
    if (!project) {
      navigate("/projects", { replace: true });
    }
    window.scrollTo(0, 0);
  }, [project, navigate]);

  if (!project) return null;

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Header */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={project.images[0]}
          alt={project.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 flex items-center space-x-2"
            >
              {project.categories.map((cat) => (
                <span key={cat} className="rounded-full bg-red px-3 py-1 text-sm font-medium uppercase tracking-wider">
                  {cat}
                </span>
              ))}
              <span className="flex items-center text-sm font-medium text-gray-200">
                <MapPin className="mr-1 h-4 w-4" /> {project.location}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-serif font-bold md:text-6xl"
            >
              {project.title}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Link
            to="/projects"
            className="mb-8 inline-flex items-center text-muted-foreground hover:text-red"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>

          <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
            {/* Main Content */}
            <div>
              <h2 className="mb-6 text-3xl font-serif font-bold">Overview</h2>
              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <h3 className="mb-4 text-2xl font-serif font-bold">Key Features</h3>
              <ul className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {project.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center rounded-lg bg-stone/30 p-4 text-foreground"
                  >
                    <span className="mr-3 h-2 w-2 rounded-full bg-red" />
                    {feature}
                  </li>
                ))}
              </ul>

              <h3 className="mb-6 text-2xl font-serif font-bold">Gallery</h3>
              <ProjectGallery images={project.images} title={project.title} />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="rounded-2xl border border-border/50 bg-stone/20 p-8">
                <h3 className="mb-6 text-xl font-serif font-bold">Project Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-border/30 pb-2">
                    <span className="text-muted-foreground">Client</span>
                    <span className="font-medium">{project.client}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/30 pb-2">
                    <span className="text-muted-foreground">Status</span>
                    <span className="font-medium">{project.status}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/30 pb-2">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium">{project.location}</span>
                  </div>
                  <div className="flex justify-between border-b border-border/30 pb-2">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium capitalize">{project.categories.join(", ")}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border/50 bg-stone/20 p-8">
                <h3 className="mb-6 text-xl font-serif font-bold">Specifications</h3>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-border/30 pb-2">
                    <span className="text-muted-foreground">Total Area</span>
                    <span className="font-medium">{project.specifications.area}</span>
                  </div>
                  {project.specifications.floors && (
                    <div className="flex justify-between border-b border-border/30 pb-2">
                      <span className="text-muted-foreground">Floors</span>
                      <span className="font-medium">{project.specifications.floors}</span>
                    </div>
                  )}
                  {project.specifications.units && (
                    <div className="flex justify-between border-b border-border/30 pb-2">
                      <span className="text-muted-foreground">Units</span>
                      <span className="font-medium">{project.specifications.units}</span>
                    </div>
                  )}
                  {project.specifications.parking && (
                    <div className="flex justify-between border-b border-border/30 pb-2">
                      <span className="text-muted-foreground">Parking</span>
                      <span className="font-medium">{project.specifications.parking}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-6 text-3xl font-serif font-bold">
            Have a project in mind?
          </h2>
          <p className="mb-8 text-gray-400">
            Let's discuss how we can bring your vision to life.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-lg bg-red px-8 py-3 font-medium text-white transition-colors hover:bg-red-dark"
          >
            Contact Us <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;


