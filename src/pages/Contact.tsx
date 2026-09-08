import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const whatsappMessage = `New contact form submission

Name: ${formData.name}
Email: ${formData.email}
Project type: ${formData.subject}

Project details:
${formData.message}

Sent from the Mimar Khan website`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/201222175051?text=${encodedMessage}`;

      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      setFormData({ name: "", email: "", subject: "", message: "" });
      toast({
        title: "Opening WhatsApp",
        description: "Your message is ready to send in WhatsApp.",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
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
      details: ["35 Obour Buildings, Floor 16", "Office 4, Salah Salem Street", "Cairo, Egypt"],
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["+2-0220822573", "+2-01222175051", "+2-01143118052"],
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["mk@mimarkhan.com"],
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: ["Sunday - Thursday: 9:00 AM - 6:00 PM", "Friday: Off", "Saturday: 10:00 AM - 4:00 PM"],
    },
  ];

  const projectTypes = [
    "Residential project",
    "Commercial project",
    "Interior architecture",
    "Project management",
  ];

  return (
    <div className="pt-28">
      <section className="pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="h-1 w-20 rounded-full bg-gradient-to-r from-red to-red-light" />
            <h1 className="mt-8 text-[clamp(3rem,6vw,5.75rem)] font-serif font-semibold leading-[0.95] tracking-tight text-foreground">
              Contact <span className="text-gradient-red">Us</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Ready to start your architectural journey? Share your brief and we will help turn it
              into a clear, practical plan.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <div
                      key={info.title}
                      className="rounded-[1.75rem] border border-border bg-card p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.35)]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-red/10 text-red">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h2 className="text-lg font-serif font-semibold text-foreground">
                          {info.title}
                        </h2>
                      </div>
                      <div className="mt-5 space-y-2">
                        {info.details.map((detail) => (
                          <p key={detail} className="text-sm leading-relaxed text-muted-foreground">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-[2rem] border border-border bg-stone/35 p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.35)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  What happens next
                </p>
                <h2 className="mt-4 text-3xl font-serif font-semibold text-foreground">
                  We review the brief, clarify priorities, and reply with the next best step.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  For urgent inquiries, calling the studio is the fastest way to reach the team.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {["Fast response", "Clear scope", "Practical next steps"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-border bg-card p-8 shadow-[0_24px_70px_-44px_rgba(0,0,0,0.35)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      Start a conversation
                    </p>
                    <h2 className="mt-3 text-3xl font-serif font-semibold text-foreground">
                      Send Us a Message
                    </h2>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-red/10 text-red">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        autoComplete="name"
                        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-red focus:outline-none focus:ring-2 focus:ring-red/20"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        autoComplete="email"
                        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-red focus:outline-none focus:ring-2 focus:ring-red/20"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground">
                      Project Type *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground focus:border-red focus:outline-none focus:ring-2 focus:ring-red/20"
                    >
                      <option value="">Select a project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-red focus:outline-none focus:ring-2 focus:ring-red/20"
                      placeholder="Tell us about the project scope, timeline, and the kind of space you want to create."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red px-6 py-4 text-sm font-semibold text-white shadow-red transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Opening WhatsApp..." : "Send via WhatsApp"}
                    <MessageCircle className="h-5 w-5" />
                  </button>
                </form>
              </div>

              <div className="rounded-[2rem] border border-border bg-stone/35 p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.35)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      Visit the studio
                    </p>
                    <h2 className="mt-3 text-2xl font-serif font-semibold text-foreground">
                      Our office is open by appointment.
                    </h2>
                  </div>
                  <MapPin className="h-6 w-6 text-red" />
                </div>

                <div className="mt-5 rounded-3xl border border-border bg-background p-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    35 Obour Buildings, Floor 16, Office 4, Salah Salem Street, Cairo, Egypt
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    We welcome clients for consultations, project reviews, and design discussions.
                    Please call ahead to schedule a visit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
