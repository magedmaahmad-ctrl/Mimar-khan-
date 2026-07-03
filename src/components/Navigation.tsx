import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import BrandLogo from "./BrandLogo";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isProjectsRoute = location.pathname.startsWith("/projects");

  useEffect(() => {
    if (!isProjectsRoute) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isProjectsRoute]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 z-50 bg-transparent transition-all duration-500"
      >
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between px-4 py-3 transition-all duration-500 sm:px-6 ${
            isProjectsRoute && !isScrolled
                ? "border border-transparent bg-transparent shadow-none backdrop-blur-0"
                : "border border-white/[0.14] bg-white/[0.08] shadow-none backdrop-blur-2xl"
            }`}
          >
            <Link to="/" className="group inline-flex items-center" aria-label="Mimar Khan home">
              <BrandLogo className="w-[min(10rem,40vw)] sm:w-[min(12rem,30vw)] lg:w-[min(13rem,18vw)]" />
            </Link>

            <div className="hidden items-center gap-2 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 ${
                    isActive(item.path)
                      ? "bg-red/10 text-red"
                      : "text-foreground hover:bg-muted hover:text-red"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <Link
                to="/contact"
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-transform duration-300 hover:-translate-y-0.5 ${
                  isProjectsRoute && !isScrolled
                    ? "border border-black/15 bg-black/5 text-foreground hover:bg-black/10"
                    : "border border-white/[0.15] bg-white/10 text-foreground hover:bg-white/[0.18]"
                }`}
              >
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <button
              className={`inline-flex h-11 items-center gap-2 px-4 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 md:hidden ${
                isProjectsRoute && !isScrolled
                  ? "border border-black/15 bg-black/5 text-foreground backdrop-blur-0"
                  : "border border-white/[0.15] bg-white/[0.12] text-foreground backdrop-blur-xl"
              }`}
              onClick={() => setIsMobileMenuOpen((current) => !current)}
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
              <span>{isMobileMenuOpen ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-background/96 backdrop-blur-2xl md:hidden">
          <div className="flex h-full flex-col px-6 py-5">
            <div className="flex items-center justify-between">
              <Link to="/" className="inline-flex items-center" aria-label="Mimar Khan home">
                <BrandLogo className="w-[min(9rem,42vw)] sm:w-[min(11rem,32vw)]" />
              </Link>
              <button
                className={`grid h-11 w-11 place-items-center text-foreground ${
                  isProjectsRoute && !isScrolled
                    ? "border border-black/15 bg-black/5 backdrop-blur-0"
                    : "border border-white/[0.15] bg-white/10 backdrop-blur-xl"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close mobile menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-10 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-lg font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? "border-red/20 bg-red/8 text-red"
                      : "border-border bg-card text-foreground hover:border-red/20 hover:bg-muted/70 hover:text-red"
                  }`}
                >
                  <span>{item.name}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>

            <div className="mt-auto space-y-4 pb-2">
              <div className="rounded-3xl border border-border bg-card p-5 shadow-elegant">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Let us talk
                </p>
                <p className="mt-3 font-serif text-2xl leading-tight text-foreground">
                  Start your next project with a clear plan.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  We can help shape your brief, clarify priorities, and move from concept to delivery.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red px-5 py-4 text-sm font-semibold text-white shadow-red transition-transform duration-300 hover:-translate-y-0.5"
              >
                Contact the studio
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
