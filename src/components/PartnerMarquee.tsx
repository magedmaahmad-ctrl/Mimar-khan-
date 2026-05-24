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
import rancoLogo from "@/assets/partners/ranco.jpg";
import almasLogo from "@/assets/partners/almas.jpg";
import osamaTahaLogo from "@/assets/partners/osama-taha.jpg";

const PartnerMarquee = () => {
  const clients = [
    { name: "Ranco Contracting & Engineering", src: rancoLogo, className: "max-h-10 sm:max-h-12" },
    { name: "Almas", src: almasLogo, className: "max-h-10 sm:max-h-12" },
    { name: "Osama Taha Bariatric Group", src: osamaTahaLogo, className: "max-h-10 sm:max-h-12" },
    { name: "Digital Com", src: digitalComLogo, className: "max-h-10 sm:max-h-12" },
    { name: "Landmark Developments", src: landmarkDevelopmentsLogo, className: "max-h-10 sm:max-h-12" },
    { name: "EMKS Insurance Brokerage", src: emksLogo, className: "max-h-10 sm:max-h-12" },
    { name: "Dabur", src: daburLogo, className: "max-h-10 sm:max-h-12" },
    { name: "Client 5", src: clientSevenLogo, className: "max-h-10 sm:max-h-12" },
    { name: "MTA International", src: mtaInternationalLogo, className: "max-h-10 sm:max-h-12" },
    { name: "Adam Grain", src: adamGrainLogo, className: "max-h-10 sm:max-h-12" },
    { name: "Primostone", src: primostoneLogo, className: "max-h-10 sm:max-h-12" },
    { name: "Gadalla Group & Co.", src: gadallaLogo, className: "max-h-10 sm:max-h-12" },
    { name: "AIVOC", src: aivocLogo, className: "max-h-12 sm:max-h-14" },
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
              className="flex h-20 min-w-[10.5rem] items-center justify-center rounded-[1.25rem] border border-border bg-background px-4 py-3 shadow-sm sm:h-24 sm:min-w-[13rem] sm:px-6"
            >
              <img
                src={client.src}
                alt={client.name}
                className={`w-full object-contain ${client.className}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerMarquee;
