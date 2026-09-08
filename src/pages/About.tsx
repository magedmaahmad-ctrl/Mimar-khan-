import aboutImage from "@/assets/about-office.jpg";
import founderImage from "@/assets/ceo.png";

const About = () => {
  const values = [
    {
      title: "Excellence",
      description: "We strive for architectural excellence in every project, ensuring the highest standards of design and execution.",
      delay: "0.2s"
    },
    {
      title: "Innovation",
      description: "Embracing cutting-edge design technologies and sustainable practices to create future-ready architectures.",
      delay: "0.4s"
    },
    {
      title: "Vision",
      description: "Our visionary approach transforms spaces into meaningful environments that inspire and endure.",
      delay: "0.6s"
    },
    {
      title: "Passion",
      description: "Driven by our passion for architecture, we craft spaces that reflect cultural heritage and modern aesthetics.",
      delay: "0.8s"
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6 fade-in-up">
              About <span className="text-gradient-red">MK</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up" style={{ animationDelay: "0.2s" }}>
              A leading architectural firm based in Egypt, delivering innovative, functional, and visually striking designs across diverse sectors.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-in-up">
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  (MK) was established in 1992 by founder and chief designer Maged Khorshed. Our mission is simple: understand each client's vision and translate it into functional, elegant, and meaningful design.
                </p>
                <div className="py-2">
                  <p className="font-semibold text-foreground mb-2">We are a multidisciplinary firm offering:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Architecture</li>
                    <li>Urban Design</li>
                    <li>Landscape</li>
                    <li>Interior Architecture</li>
                    <li>Branding & Consultancy</li>
                  </ul>
                </div>
                <p>
                  Our portfolio spans residential, commercial, educational, cultural, hospitality, and industrial projects - both locally and internationally.
                </p>
                <p>
                  We operate with the highest standards of ethics, ensuring client privacy, precision, and excellence in every project.
                </p>
              </div>
            </div>

            <div className="fade-in-up" style={{ animationDelay: "0.3s" }}>
              <img
                src={aboutImage}
                alt="Mimar Khan office environment"
                className="w-full h-auto rounded-sm shadow-elegant"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 fade-in-up">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up" style={{ animationDelay: "0.2s" }}>
              The principles that guide every decision we make and every project we undertake.
            </p>
          </div>

          <div className="arch-grid">
            {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card p-8 rounded-sm shadow-elegant hover-lift text-center fade-in-up"
                  style={{ animationDelay: value.delay }}
                >
                  <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-stone">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 fade-in-up">
              A Message From Our Founder
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4 fade-in-up">
              <img
                src={founderImage}
                alt="Maged Khorshed"
                className="w-full h-auto rounded-sm shadow-elegant mb-6"
              />
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-serif font-bold text-foreground">Maged Khorshed</h3>
                <p className="text-red font-medium">Founder & Principal Architect</p>
              </div>
            </div>

            <div className="lg:col-span-8 fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-xl italic border-l-4 border-red pl-6 py-2 my-auto">
                <p>
                  "As the founder of MK, my journey has always been driven by a profound belief: we are, at our core, building far more than mere physical structures. We are crafting the backdrops to people's lives. True architectural design possesses the unique power to shape human experiences, elevate communities, and leave a lasting positive impact on the generations that follow.
                </p>
                <p>
                  For over three decades, our firm has operated on the principle that architecture is a profound responsibility. Whether we are envisioning a residential haven, a dynamic commercial space, or a culturally significant landmark, we approach each endeavor with the same relentless pursuit of excellence, innovation, and purpose.
                </p>
                <p>
                  Every project we take on is a deeply collaborative process—a continuous, evolving conversation between the client's unique vision and our firm's collective expertise. It is in this synergy that true magic happens. We don't just design buildings; together, we bring to life vibrant spaces that breathe, adapt, and continually inspire those who inhabit them."
                </p>
                <p className="font-semibold mt-6 text-charcoal not-italic text-lg">- Maged Khorshed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
