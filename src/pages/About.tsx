import { Award, Target, Eye, Heart } from "lucide-react";
import aboutImage from "@/assets/about-office.jpg";
import founderImage from "@/assets/maged-khorshed.jpg";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for architectural excellence in every project, ensuring the highest standards of design and execution.",
      delay: "0.2s"
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Embracing cutting-edge design technologies and sustainable practices to create future-ready architectures.",
      delay: "0.4s"
    },
    {
      icon: Eye,
      title: "Vision",
      description: "Our visionary approach transforms spaces into meaningful environments that inspire and endure.",
      delay: "0.6s"
    },
    {
      icon: Heart,
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
              About <span className="text-gradient-red">Mimar Khan</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-up" style={{ animationDelay: "0.2s" }}>
              Rooted in the heart of Egypt, we are a forward-thinking architecture consultancy
              dedicated to creating innovative and sustainable spaces.
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
                  Mimar Khan is a multi-disciplinary and leading design studio founded by Maged Khorshed.
                </p>
                <p>
                  We provide consulting services in connection with design, remodeling of buildings, interior design,
                  urban and environmental planning, landscape architecture, construction management, value engineering
                  and real estate development.
                </p>
                <p>
                  We believe that what we do is valuable to our clients and to society.
                </p>
                <p>
                  Our mission is to utilize our expertise to create a personalized product that enhances your space
                  with passion and elegance.
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
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-card p-8 rounded-sm shadow-elegant hover-lift text-center fade-in-up"
                  style={{ animationDelay: value.delay }}
                >
                  <div className="w-16 h-16 bg-red rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-background" />
                  </div>
                  <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-stone">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 fade-in-up">
              Leadership
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
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  Simply said, I design houses because I enjoy helping other people create comfortable living environments.
                </p>
                <p>
                  I design houses because I seek beauty in these environments, for some, beauty is an archaic and meaningless,
                  for me, it expresses an objective reality … truth.
                </p>
                <p>
                  My journey in search of beauty has been a long one, but a necessary one.
                  I discovered early on that simply seeing and observing beautiful objects and buildings was not enough for me.
                  Observing; was not enough for knowing, I needed to create beauty in order to know it, feel it and live it.
                </p>
                <p>
                  Design a house and building it, is like writing a poem. For me, designing a house is that simple as writing
                  a poem to Ahmed Shawky or Abbas Elakkad.
                  All good houses are poems and all good poems convey truth is some manner.
                </p>
                <p>
                  Good houses are transcendent. They point to beauty, truth and love.
                  I needed and still need to know these things through my work.
                </p>
                <p>
                  Beauty is recognized as soon as it is seen, as it is hidden in every human as love.
                  We need to be around this beauty in order to be human at our highest level.
                </p>
                <p>
                  My journey, my path and my search for beauty has been a search for being me.
                  Every new house reveals another aspect of self. Each house becomes another mirror of reality.
                  Polishing the mirror reveals another layer of truth. Each house becomes another metaphor and another poem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;