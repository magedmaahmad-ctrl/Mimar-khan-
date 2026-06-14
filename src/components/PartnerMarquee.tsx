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

type ClientLogo = {
  name: string;
  src: string;
  className: string;
  frameClassName?: string;
  featured?: boolean;
};

const standardLogoClass = "max-h-24 sm:max-h-28";
const featuredLogoClass = "max-h-[5.25rem] sm:max-h-[6.25rem]";
const visibleFrameClass =
  "rounded-2xl border border-border/70 bg-background/95 px-5 py-4 shadow-[0_14px_34px_-24px_rgba(0,0,0,0.35)]";

const clients: ClientLogo[] = [
  {
    name: "Ranco Contracting & Engineering",
    src: rancoLogo,
    className: "!max-w-[15rem] max-h-[5.75rem] sm:!max-w-[18rem] sm:max-h-[6.75rem]",
    frameClassName: visibleFrameClass,
    featured: true,
  },
  { name: "Almas", src: almasLogo, className: standardLogoClass },
  { name: "Osama Taha Bariatric Group", src: osamaTahaLogo, className: standardLogoClass },
  { name: "Digital Com", src: digitalComLogo, className: "max-h-32 sm:max-h-40" },
  { name: "Landmark Developments", src: landmarkDevelopmentsLogo, className: standardLogoClass },
  { name: "EMKS Insurance Brokerage", src: emksLogo, className: standardLogoClass },
  {
    name: "Dabur",
    src: daburLogo,
    className: "!max-w-[16rem] max-h-[6rem] sm:!max-w-[19rem] sm:max-h-[7rem]",
    frameClassName: visibleFrameClass,
    featured: true,
  },
  { name: "Client 5", src: clientSevenLogo, className: standardLogoClass },
  {
    name: "MTA International",
    src: mtaInternationalLogo,
    className: "max-h-[5.5rem] sm:max-h-[6.5rem]",
    frameClassName: visibleFrameClass,
    featured: true,
  },
  {
    name: "Adam Grain",
    src: adamGrainLogo,
    className: "max-h-[5.5rem] sm:max-h-[6.5rem]",
    frameClassName: visibleFrameClass,
    featured: true,
  },
  {
    name: "Primostone",
    src: primostoneLogo,
    className: "!max-w-[15rem] max-h-[5.75rem] sm:!max-w-[18rem] sm:max-h-[6.75rem]",
    frameClassName: visibleFrameClass,
    featured: true,
  },
  { name: "Gadalla Group & Co.", src: gadallaLogo, className: standardLogoClass },
  { name: "AIVOC", src: aivocLogo, className: "max-h-[4.5rem] sm:max-h-[5.5rem]" },
  { name: "Solutions Construction", src: solutionsConstructionLogo, className: "max-h-[5rem] sm:max-h-[6rem]" },
];
const PartnerMarquee = () => {
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
              className="flex h-32 min-w-[13.5rem] items-center justify-center px-3 py-2 sm:h-36 sm:min-w-[15.5rem] sm:px-5"
            >
              <div className={client.frameClassName}>
                <img
                  src={client.src}
                  alt={client.name}
                  className={`w-auto max-w-[12.5rem] object-contain ${client.className} ${
                    "featured" in client && client.featured ? "drop-shadow-[0_10px_18px_rgba(0,0,0,0.16)]" : ""
                  }`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerMarquee;
