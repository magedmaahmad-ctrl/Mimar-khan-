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
    <footer className="bg-primary text-primary-foreground relative overflow-hidden z-10">
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-serif font-semibold text-gradient-red mb-2">
              Mimar Khan
            </h3>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed max-w-md">
              Designing Tomorrow's Landmarks. An Egyptian architecture consultancy
              dedicated to creating innovative and sustainable architectural solutions
              that blend modern design with cultural heritage.
            </p>

            {/* Contact Information */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-red" />
                <span className="text-xs">35 ObourBuildings -Floor 16 –Office 4 –Salah Salem Street –Cairo , Egypt</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-red" />
                <span className="text-xs">+2-0220822573</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-red" />
                <span className="text-xs">Info@MimarKhan.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-xs text-muted-foreground hover:text-red transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-7 h-7 bg-stone rounded-full flex items-center justify-center text-charcoal hover:bg-red hover:text-background transition-all duration-300"
                    aria-label={social.name}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-6 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} Mimar Khan Architecture Consultancy. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-3 md:mt-0">
            <a
              href="#"
              className="text-[11px] text-muted-foreground hover:text-red transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[11px] text-muted-foreground hover:text-red transition-colors duration-300"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
      <FooterWave />
    </footer >
  );
};

export default Footer;