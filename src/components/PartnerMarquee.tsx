import digitalComLogo from "@/assets/clients/digitalcom.png";
import landmarkDevelopmentsLogo from "@/assets/clients/landmark-developments.png";
import emksLogo from "@/assets/clients/emks-insurance-brokerage.png";
import daburLogo from "@/assets/clients/dabur.png";
import adamGrainLogo from "@/assets/clients/adam-grain.png";
import mtaInternationalLogo from "@/assets/clients/mta-international.jpg";
import clientSevenLogo from "@/assets/clients/client-7.jpg";
import primostoneLogo from "@/assets/clients/primostone.png";
import gadallaLogo from "@/assets/clients/gadalla-group.png";
import aivocLogo from "@/assets/clients/aivoc.png";
import solutionsConstructionLogo from "@/assets/clients/solutions-construction.png";
import rancoLogo from "@/assets/partners/ranco.jpg";
import almasLogo from "@/assets/partners/almas.jpg";
import osamaTahaLogo from "@/assets/partners/osama-taha.jpg";

const PartnerMarquee = () => {
  const clients = [
    { name: "Ranco Contracting & Engineering", src: rancoLogo, className: "max-h-16 sm:max-h-20" },
    { name: "Almas", src: almasLogo, className: "max-h-16 sm:max-h-20" },
    { name: "Osama Taha Bariatric Group", src: osamaTahaLogo, className: "max-h-16 sm:max-h-20" },
    { name: "Digital Com", src: digitalComLogo, className: "max-h-16 sm:max-h-20" },
    { name: "Landmark Developments", src: landmarkDevelopmentsLogo, className: "max-h-16 sm:max-h-20" },
    { name: "EMKS Insurance Brokerage", src: emksLogo, className: "max-h-16 sm:max-h-20" },
    { name: "Dabur", src: daburLogo, className: "max-h-16 sm:max-h-20" },
    { name: "Client 5", src: clientSevenLogo, className: "max-h-16 sm:max-h-20" },
    {
      name: "MTA International",
      src: mtaInternationalLogo,
      className: "max-h-[4.75rem] sm:max-h-[5.75rem]",
      featured: true,
    },
    {
      name: "Adam Grain",
      src: adamGrainLogo,
      className: "max-h-[4.75rem] sm:max-h-[5.75rem]",
      featured: true,
    },
    {
      name: "Primostone",
      src: primostoneLogo,
      className: "max-h-[4.75rem] sm:max-h-[5.75rem]",
      featured: true,
    },
    { name: "Gadalla Group & Co.", src: gadallaLogo, className: "max-h-16 sm:max-h-20" },
    { name: "AIVOC", src: aivocLogo, className: "max-h-[4.5rem] sm:max-h-[5.5rem]" },
    { name: "Solutions Construction", src: solutionsConstructionLogo, className: "max-h-[5rem] sm:max-h-[6rem]" },
  ];

  return (
    <section className="border-y border-border/60 bg-stone/35 py-12 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
          Our Clients
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          A calm, repeatable rhythm across the brands and organizations we collaborate with.
        </p>
      </div>
      <div className="marquee-widget">
        <div className="marquee-track">
          {[...clients, ...clients].map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex h-28 min-w-[13rem] items-center justify-center px-3 py-2 sm:h-32 sm:min-w-[15rem] sm:px-5"
            >
              <img
                src={client.src}
                alt={client.name}
                className={`w-auto max-w-[12.5rem] object-contain ${client.className} ${
                  "featured" in client && client.featured ? "drop-shadow-[0_10px_18px_rgba(0,0,0,0.16)]" : ""
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerMarquee;
