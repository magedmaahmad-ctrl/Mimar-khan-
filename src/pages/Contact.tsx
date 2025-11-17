import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Format the message for WhatsApp
      const whatsappMessage = `🏗️ *New Contact Form Submission*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Project Type:* ${formData.subject}

*Project Details:*
${formData.message}

---
*Sent from Mimar Khan Design Website*`;

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      
      // Create WhatsApp URL with the phone number
      const whatsappUrl = `https://wa.me/201143118052?text=${encodedMessage}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
      
      // Reset form and show success message
      setFormData({ name: "", email: "", subject: "", message: "" });
      toast({
        title: "Opening WhatsApp...",
        description: "Your message is ready to send on WhatsApp. Please complete the send process.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error preparing your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Location",
      details: ["123 Architectural Street", "New Cairo, Egypt", "Postal Code: 11835"],
      delay: "0.2s"
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["+20 (0) 12 3456 7890", "+20 (0) 10 9876 5432", "Office: +20 (0) 2 1234 5678"],
      delay: "0.4s"
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: ["info@mimarkhan.com", "projects@mimarkhan.com", "careers@mimarkhan.com"],
      delay: "0.6s"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Sunday - Thursday: 9:00 AM - 6:00 PM", "Friday: 9:00 AM - 2:00 PM", "Saturday: Closed"],
      delay: "0.8s"
    },
  ];

  const projectTypes = [
    "Residential Architecture",
    "Commercial Buildings",
    "Cultural Projects",
    "Urban Planning",
    "Interior Design",
    "Consultation Services",
    "Other"
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6 fade-in-scroll">
              Contact <span className="text-gradient-red">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-scroll">
              Ready to start your architectural journey? Get in touch with our team 
              and let's discuss how we can bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="bg-card p-8 rounded-sm shadow-elegant hover-lift text-center fade-in-scroll"
                  style={{ animationDelay: info.delay }}
                >
                  <div className="w-16 h-16 bg-red rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="h-8 w-8 text-background" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
                    {info.title}
                  </h3>
                  <div className="space-y-2">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form Section */}
      <section className="py-20 bg-gradient-to-br from-charcoal via-charcoal to-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="fade-in-scroll">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Send Us a Message
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Fill out the form below and it will open WhatsApp with your message ready to send. 
                For urgent inquiries, please call us directly.
              </p>

              <div className="bg-background/10 backdrop-blur-md p-8 rounded-sm border border-white/10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-primary-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-white/20 rounded-sm bg-white/10 text-primary-foreground placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red transition-all duration-300 backdrop-blur-sm"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-primary-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-white/20 rounded-sm bg-white/10 text-primary-foreground placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red transition-all duration-300 backdrop-blur-sm"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-primary-foreground mb-2">
                      Project Type *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-white/20 rounded-sm bg-white/10 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-red transition-all duration-300 backdrop-blur-sm"
                    >
                      <option value="" className="bg-charcoal text-primary-foreground">Select a project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-charcoal text-primary-foreground">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-primary-foreground mb-2">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-white/20 rounded-sm bg-white/10 text-primary-foreground placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red transition-all duration-300 resize-none backdrop-blur-sm"
                      placeholder="Please describe your project requirements, timeline, budget range, and any specific design preferences..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-hero w-full inline-flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin mr-2" />
                        Opening WhatsApp...
                      </>
                    ) : (
                      <>
                        Send via WhatsApp
                        <MessageCircle className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Map */}
            <div className="fade-in-scroll">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Visit Our Office
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Located in the heart of New Cairo, our office is easily accessible 
                and equipped with modern facilities for client meetings and consultations.
              </p>

              <div className="bg-background/10 backdrop-blur-md rounded-sm h-96 flex items-center justify-center border border-white/10 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red/20 to-charcoal/40" />
                <div className="text-center relative z-10">
                  <MapPin className="h-16 w-16 text-primary-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-serif font-semibold text-primary-foreground mb-2">
                    Interactive Map
                  </h3>
                  <p className="text-muted-foreground">
                    Map integration would be implemented here
                  </p>
                  <p className="text-sm text-muted-foreground mt-4">
                    123 Architectural Street<br />
                    New Cairo, Egypt 11835
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-background/10 backdrop-blur-md p-6 rounded-sm border border-white/10">
                <h4 className="text-lg font-serif font-semibold text-primary-foreground mb-4">
                  Schedule a Visit
                </h4>
                <p className="text-muted-foreground mb-4">
                  We welcome clients to visit our office for project discussions and design reviews. 
                  Please call ahead to schedule an appointment.
                </p>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-red" />
                  <span>+20 (0) 12 3456 7890</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-stone">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 fade-in-scroll">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto fade-in-scroll">
              Quick answers to common questions about our services and process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                question: "What services do you offer?",
                answer: "We provide comprehensive architectural services including design, interior design, urban planning, and consultancy services for residential, commercial, and cultural projects.",
                delay: "0.2s"
              },
              {
                question: "How long does a typical project take?",
                answer: "Project timelines vary depending on scope and complexity. Residential projects typically take 3-6 months for design phase, while larger commercial projects may take 6-12 months.",
                delay: "0.4s"
              },
              {
                question: "Do you work outside of Egypt?",
                answer: "While we're based in Egypt, we're open to taking on international projects. We have experience working with clients across the Middle East and North Africa region.",
                delay: "0.6s"
              },
              {
                question: "What's included in your consultation?",
                answer: "Our initial consultation includes project assessment, preliminary design concepts, timeline discussion, and cost estimation. This helps us understand your vision and requirements.",
                delay: "0.8s"
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-sm shadow-elegant fade-in-scroll"
                style={{ animationDelay: faq.delay }}
              >
                <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;