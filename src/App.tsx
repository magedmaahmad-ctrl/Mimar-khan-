import { Component, lazy, Suspense, type ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { useScrollAnimations } from "./hooks/useScrollAnimations";
import useScrollToTop from "./hooks/useScrollToTop";
import { useScrollRestoration } from "./hooks/useScrollRestoration";

const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Interior = lazy(() => import("./pages/Interior"));
const Projects = lazy(() => import("./pages/Projects"));
const AllProjects = lazy(() => import("./pages/AllProjects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

const RouteFallback = () => (
  <div className="min-h-[60vh] bg-background" role="status" aria-label="Loading page" />
);

class AppErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Application error boundary caught an error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Something went wrong
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold text-foreground">
              The site hit a temporary issue.
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Please refresh the page and try again. If the issue keeps happening, check the latest deployment or error logs.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const AppContent = () => {
  const location = useLocation();

  useScrollAnimations(location.pathname);
  useScrollToTop(); // Scroll to top on route changes
  useScrollRestoration(); // Custom scroll restoration

  return (
    <Layout>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/interior" element={<Interior />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:category" element={<Projects />} />
          <Route path="/projects/:category/:slug" element={<ProjectDetail />} />
          <Route path="/all-projects" element={<AllProjects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

const App = () => (
  <HashRouter>
    <AppErrorBoundary>
      <Toaster />
      <AppContent />
    </AppErrorBoundary>
  </HashRouter>
);

export default App;
