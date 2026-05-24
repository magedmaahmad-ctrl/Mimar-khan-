import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Twitter, MapPin, Phone, Mail } from "lucide-react";
import FooterWave from "./FooterWave";

const Footer = () => {
  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="relative z-10 overflow-hidden border-t border-border/40 bg-primary text-primary-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,0,0,0.14),transparent_24%)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr_0.8fr]">
          <div className="max-w-xl">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-red to-red-light text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white shadow-red">
                MK
              </span>
              <span className="font-serif text-xl font-semibold tracking-tight">
                Mimar Khan
              </span>
            </Link>
            <p className="mt-4 max-w-lg text-xs leading-relaxed text-white/72 md:text-sm">
              Designing tomorrow's landmarks with a balance of clarity, craft, and context.
              We shape spaces that feel calm in use and confident in presence.
            </p>

            <div className="mt-6 space-y-2.5 text-xs text-white/76 md:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-3.5 w-3.5 text-red" />
                <span>35 Obour Buildings, Floor 16, Office 4, Salah Salem Street, Cairo, Egypt</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-3.5 w-3.5 text-red" />
                <span>+2-0220822573</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-3.5 w-3.5 text-red" />
                <span>Info@MimarKhan.com</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/60">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-xs text-white/76 transition-colors duration-300 hover:text-red md:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/60">
              Follow Us
            </h4>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-red hover:bg-red hover:text-white"
                    aria-label={social.name}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/60">
                Studio hours
              </p>
              <p className="mt-2.5 text-xs leading-relaxed text-white/76 md:text-sm">
                Sunday to Thursday, 9:00 AM to 6:00 PM.
                Friday appointments are available by request.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-4 text-xs text-white/60 md:flex-row md:items-center md:justify-between md:text-sm">
          <p>
            (c) {new Date().getFullYear()} Mimar Khan Architecture Consultancy. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="transition-colors duration-300 hover:text-red">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors duration-300 hover:text-red">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
      <FooterWave />
    </footer>
  );
};

export default Footer;
