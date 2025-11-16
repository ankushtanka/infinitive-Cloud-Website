import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", company: "", phone: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "contact@infinitivecloud.com",
      description: "We respond within 2-4 hours",
    },
    {
      icon: Phone,
      title: "Call Us",
      value: "+1 (555) 123-4567",
      description: "24×7 support available",
    },
    {
      icon: MapPin,
      title: "Global Presence",
      value: "Multi-Region Infrastructure",
      description: "Data centers worldwide",
    },
    {
      icon: Clock,
      title: "Business Hours",
      value: "24×7 Operations",
      description: "Always here to help",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="section-container mb-20">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6">
              Let's Build Something <span className="gradient-text">Extraordinary</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Whether you need cloud infrastructure, hosting solutions, or custom development—we're here to help.
            </p>
          </div>
        </section>

        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and our team will get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-medium">
                          Company Name
                        </label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Your Company"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">
                        How can we help? *
                      </label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your project or requirements..."
                        rows={6}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card 
                    key={info.title} 
                    className="card-hover animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{info.title}</h3>
                          <p className="text-sm font-medium text-primary mb-1">{info.value}</p>
                          <p className="text-xs text-muted-foreground">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">Prefer a Quick Chat?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Book a free 30-minute consultation with our cloud experts.
                  </p>
                  <Button variant="outline" className="w-full border-primary hover:bg-primary/5">
                    Schedule Call
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
