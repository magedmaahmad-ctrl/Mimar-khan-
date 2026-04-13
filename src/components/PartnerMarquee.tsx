import React from 'react';

const PartnerMarquee = () => {
  const partners = [
    { name: "Partner 1", logo: "https://placehold.co/200x100?text=Partner+1", link: "#" },
    { name: "Partner 2", logo: "https://placehold.co/200x100?text=Partner+2", link: "#" },
    { name: "Partner 3", logo: "https://placehold.co/200x100?text=Partner+3", link: "#" },
    { name: "Partner 4", logo: "https://placehold.co/200x100?text=Partner+4", link: "#" },
    { name: "Partner 5", logo: "https://placehold.co/200x100?text=Partner+5", link: "#" },
    { name: "Partner 6", logo: "https://placehold.co/200x100?text=Partner+6", link: "#" },
  ];

  return (
    <section className="py-20 bg-background overflow-hidden border-t border-border/40">
      <div className="container mx-auto px-6 mb-12 text-center fade-in-scroll">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
          Trusted Partners
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Collaborating with industry leaders to deliver exceptional landmarks.
        </p>
      </div>
      <div className="marquee-widget">
        <div className="marquee-track">
          {/* First Set */}
          {partners.map((partner, index) => (
            <a key={`set1-${index}`} href={partner.link} className="marquee-logo-link" target="_blank" rel="noopener noreferrer">
              <img src={partner.logo} alt={partner.name} className="marquee-logo-img" />
            </a>
          ))}
          {/* Second Set (Duplicate for smooth scrolling) */}
          {partners.map((partner, index) => (
            <a key={`set2-${index}`} href={partner.link} className="marquee-logo-link" target="_blank" rel="noopener noreferrer">
              <img src={partner.logo} alt={partner.name} className="marquee-logo-img" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerMarquee;
