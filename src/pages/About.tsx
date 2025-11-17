import { Award, Target, Eye, Heart } from "lucide-react";
import aboutImage from "@/assets/about-office.jpg";

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
              Founded in 2025 in the heart of Egypt, we are a forward-thinking 
              architecture consultancy dedicated to creating innovative and sustainable spaces.
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
                  Mimar Khan was born from a vision to revolutionize architectural practice in Egypt and beyond. 
                  Founded in 2025 by a team of passionate architects and designers, we emerged with a clear 
                  mission: to bridge the gap between Egypt's rich architectural heritage and contemporary design innovation.
                </p>
                <p>
                  Our name "Mimar Khan" reflects our commitment to architectural mastery—"Mimar" meaning 
                  architect in Ottoman Turkish, paying homage to the great architectural traditions of the region, 
                  while "Khan" represents leadership and excellence in our field.
                </p>
                <p>
                  From our base in Cairo, we've quickly established ourselves as a trusted partner for clients 
                  seeking thoughtful, innovative architectural solutions. Our approach combines deep respect 
                  for cultural context with cutting-edge design methodologies and sustainable practices.
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

      {/* Mission & Vision Section */}
      <section className="py-20 bg-stone">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="fade-in-up">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To create architectural solutions that not only meet our clients' functional needs 
                but also inspire communities, respect environmental sustainability, and contribute 
                positively to the urban landscape. We believe that exceptional architecture has 
                the power to transform lives and create lasting legacies.
              </p>
            </div>
            
            <div className="fade-in-up" style={{ animationDelay: "0.3s" }}>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
                Our Vision
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To become the leading architecture consultancy in the Middle East and North Africa, 
                recognized for our innovative design solutions, cultural sensitivity, and commitment 
                to sustainability. We envision a future where our architectural landmarks define 
                skylines and inspire generations to come.
              </p>
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

      {/* Team Section */}
      <section className="py-20 bg-stone">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 fade-in-up">
              Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 fade-in-up" style={{ animationDelay: "0.2s" }}>
              A diverse group of talented architects, designers, and consultants united by our 
              passion for exceptional design and commitment to client success.
            </p>
            
            <div className="bg-card p-12 rounded-sm shadow-elegant max-w-4xl mx-auto fade-in-up" style={{ animationDelay: "0.4s" }}>
              <p className="text-lg text-muted-foreground leading-relaxed italic">
                "Our multidisciplinary team brings together decades of combined experience in 
                architecture, urban planning, interior design, and project management. We believe 
                that great architecture emerges from collaboration, cultural understanding, and 
                an unwavering commitment to design excellence."
              </p>
              <div className="mt-8">
                <p className="text-red font-semibold">Mimar Khan Leadership Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;