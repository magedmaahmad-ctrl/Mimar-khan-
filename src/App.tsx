import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import PageTransition from "./components/PageTransition";
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
import CustomCursor from "./components/CustomCursor";

const queryClient = new QueryClient();

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
        <AppContent />
        <CustomCursor />
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
