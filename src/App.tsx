import { Component, type ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import AllProjects from "./pages/AllProjects";
import ProjectDetail from "./pages/ProjectDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useScrollAnimations } from "./hooks/useScrollAnimations";
import useScrollToTop from "./hooks/useScrollToTop";
import { useScrollRestoration } from "./hooks/useScrollRestoration";

const queryClient = new QueryClient();

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

  // useSmoothScroll(); // Temporarily disabled to test scroll issue
  useScrollAnimations(location.pathname);
  useScrollToTop(); // Scroll to top on route changes
  useScrollRestoration(); // Custom scroll restoration

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:category" element={<Projects />} />
        <Route path="/projects/:category/:slug" element={<ProjectDetail />} />
        <Route path="/all-projects" element={<AllProjects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <AppErrorBoundary>
          <AppContent />
        </AppErrorBoundary>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
