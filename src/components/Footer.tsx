import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import FooterWave from "./FooterWave";
import BrandLogo from "./BrandLogo";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Interior", path: "/interior" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const Footer = () => {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-border/40 bg-primary text-primary-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,0,0,0.14),transparent_24%)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-5 md:py-6">
        <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr_0.8fr]">
          <div className="max-w-xl">
            <Link to="/" className="inline-flex items-center" aria-label="Mimar Khan home">
              <BrandLogo className="w-[min(8rem,42vw)] sm:w-[min(10rem,20vw)]" />
            </Link>
            <p className="mt-2 max-w-lg text-[0.68rem] leading-relaxed text-white/72 md:text-[0.72rem]">
              Designing tomorrow's landmarks with a balance of clarity, craft, and context.
              We shape spaces that feel calm in use and confident in presence.
            </p>

            <div className="mt-3 space-y-1.5 text-[0.68rem] text-white/76 md:text-[0.72rem]">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-3 w-3 text-red" />
                <span>35 Obour Buildings, Floor 16, Office 4, Salah Salem Street, Cairo, Egypt</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-3 w-3 text-red" />
                <span>+2-0220822573</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-3 w-3 text-red" />
                <a href="mailto:mk@mimarkhan.com" className="transition-colors duration-300 hover:text-red">
                  mk@mimarkhan.com
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/60">
              Quick Links
            </h3>
            <ul className="mt-2 space-y-1.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[0.68rem] text-white/76 transition-colors duration-300 hover:text-red md:text-[0.72rem]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/60">
              Studio contact
            </h3>
            <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/60">
                Studio hours
              </p>
              <p className="mt-1.5 text-[0.68rem] leading-relaxed text-white/76 md:text-[0.72rem]">
                Sunday to Thursday, 9:00 AM to 6:00 PM.
                Friday is off.
                Saturday, 10:00 AM to 4:00 PM.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-1.5 border-t border-white/10 pt-2.5 text-[0.68rem] text-white/60 md:flex-row md:items-center md:justify-between md:text-[0.72rem]">
          <p>
            (c) {new Date().getFullYear()} Mimar Khan Architecture Consultancy. All rights reserved.
          </p>
        </div>
      </div>
      <FooterWave />
    </footer>
  );
};

export default Footer;
