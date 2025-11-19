import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  ArrowRight,
  Share2,
  Heart,
  Eye,
  Users,
  Square,
  Building,
  TreePine,
} from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import {
  projectMapBySlug,
  projects as projectData,
  ProjectData,
} from "@/data/projects";

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "residential":
      return <Building className="h-5 w-5" />;
    case "commercial":
      return <Square className="h-5 w-5" />;
    case "cultural":
      return <TreePine className="h-5 w-5" />;
    default:
      return <Building className="h-5 w-5" />;
  }
};

const FloatingPanel = ({ image }: { image: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(image);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = clock.elapsedTime * 0.25;
    meshRef.current.position.y = Math.sin(clock.elapsedTime * 1.5) * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[3.2, 2, 0.15]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

interface ProjectModelViewerProps {
  model?: string;
  fallbackImage: string;
}

const ProjectModelViewer = ({ model, fallbackImage }: ProjectModelViewerProps) => {
  return (
    <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border/20">
      {model ? (
        <>
          {/* // === REPLACE 3D MODEL FILE HERE === */}
          <iframe
            src={model}
            title="Project 3D Preview"
            className="w-full h-full"
            loading="lazy"
            allow="autoplay; fullscreen"
          />
        </>
      ) : (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 5, 2]} intensity={0.8} />
          <FloatingPanel image={fallbackImage} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1.5}
          />
        </Canvas>
      )}
    </div>
  );
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const project = slug ? projectMapBySlug.get(slug) : undefined;

  useEffect(() => {
    if (project) {
      setSelectedImage(0);
    } else {
      navigate("/projects", { replace: true });
    }
  }, [project, navigate]);

  const handleShare = async () => {
    if (!project) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.summary,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
  };

  const relatedProjects = useMemo(
    () => projectData.filter((item) => item.slug !== project?.slug).slice(0, 3),
    [project?.slug]
  );

  if (!project) {
    return null;
  }

  return (
    <div className="pt-20">
      <section className="py-12 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <button
              onClick={() => navigate("/projects")}
              className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Projects</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  {getCategoryIcon(project.category)}
                  <span className="text-sm font-medium text-red uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                  {project.title}
                </h1>

                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {project.summary}
                </p>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-red" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">{project.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-red" />
                    <div>
                      <p className="text-sm text-muted-foreground">Client</p>
                      <p className="font-medium text-foreground">{project.client}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Eye className="h-5 w-5 text-red" />
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium text-foreground">{project.status}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Building className="h-5 w-5 text-red" />
                    <div>
                      <p className="text-sm text-muted-foreground">Program</p>
                      <p className="font-medium text-foreground capitalize">
                        {project.category}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isLiked
                        ? "bg-red text-background"
                        : "bg-card border border-border text-foreground hover:bg-stone"
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                    <span>{isLiked ? "Saved" : "Save Project"}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-card border border-border text-foreground rounded-lg font-medium hover:bg-stone transition-all duration-300"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              <div className="relative">
                {/* // === REPLACE PROJECT IMAGES HERE === */}
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={project.images[selectedImage]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {project.images.length > 1 && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex space-x-2 justify-center">
                      {project.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === selectedImage ? "bg-red" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif font-bold text-foreground mb-8">
                Project Overview
              </h2>

              <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
                <p>{project.description}</p>
              </div>

              {project.highlights?.length ? (
                <div className="mt-8">
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
                    Highlights
                  </h3>
                  <ul className="grid gap-3">
                    {project.highlights.map((highlight, index) => (
                      <li
                        key={highlight}
                        className="flex items-start space-x-3 bg-stone/40 rounded-lg p-4"
                      >
                        <span className="text-red font-semibold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-serif font-bold text-foreground mb-6">
                Specifications
              </h3>

              <div className="space-y-4">
                {project.specifications?.floors && (
                  <div className="flex justify-between items-center p-4 bg-card rounded-lg border border-border/20">
                    <span className="text-muted-foreground">Floors</span>
                    <span className="font-medium text-foreground">
                      {project.specifications.floors}
                    </span>
                  </div>
                )}
                {project.specifications?.units && (
                  <div className="flex justify-between items-center p-4 bg-card rounded-lg border border-border/20">
                    <span className="text-muted-foreground">Units / Suites</span>
                    <span className="font-medium text-foreground">
                      {project.specifications.units}
                    </span>
                  </div>
                )}
                {project.specifications?.parking && (
                  <div className="flex justify-between items-center p-4 bg-card rounded-lg border border-border/20">
                    <span className="text-muted-foreground">Parking</span>
                    <span className="font-medium text-foreground">
                      {project.specifications.parking}
                    </span>
                  </div>
                )}
                {project.specifications?.area && (
                  <div className="flex justify-between items-center p-4 bg-card rounded-lg border border-border/20">
                    <span className="text-muted-foreground">Total Area</span>
                    <span className="font-medium text-foreground">
                      {project.specifications.area}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-stone">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-foreground">
                    Key Features
                  </h3>
                  <p className="text-muted-foreground">
                    Program elements that define the experience
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {project.features.length} feature{project.features.length > 1 ? "s" : ""}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature) => (
                  <div
                    key={feature}
                    className="p-4 bg-card rounded-lg border border-border/20 text-foreground font-medium"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-serif font-bold text-foreground mb-8 text-center">
                Project Gallery
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.images.map((image, index) => (
                  <div
                    key={`${project.slug}-gallery-${index}`}
                    className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col gap-6 mb-10">
                <h3 className="text-2xl font-serif font-bold text-foreground">
                  Immersive 3D Preview
                </h3>
                <p className="text-muted-foreground max-w-3xl">
                  Review the latest volumetric study or embed your own model to keep
                  collaborators aligned on form, texture, and massing.
                </p>
              </div>

              <ProjectModelViewer
                model={project.model}
                fallbackImage={project.images[0]}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {relatedProjects.length ? (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-serif font-bold text-foreground">
                  Explore More Work
                </h3>
                <Link to="/projects" className="btn-outline-red inline-flex items-center">
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/projects/${item.slug}`}
                    className="group rounded-2xl overflow-hidden border border-border/20 hover:-translate-y-1 transition-transform shadow-sm hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-red"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-red uppercase tracking-widest mb-2">
                        {item.category}
                      </p>
                      <h4 className="text-xl font-serif font-bold text-foreground mb-2">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground line-clamp-2">{item.summary}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      ) : null}

      <section className="py-20 bg-gradient-to-r from-charcoal to-primary text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Interested in Similar Projects?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how we can bring your next landmark to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contact" className="btn-hero inline-flex items-center group">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link to="/projects" className="btn-outline-red inline-flex items-center">
                View All Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;

