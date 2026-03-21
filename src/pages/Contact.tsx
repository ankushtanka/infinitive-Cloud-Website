import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Zap, Shield, TrendingUp } from "lucide-react";
import { StructuredData, createBreadcrumbSchema } from "@/components/StructuredData";

const FORM_ENDPOINT = "https://formspree.io/f/xdalvqzp";

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Captcha State
  const [captchaNum1, setCaptchaNum1] = useState<number>(0);
  const [captchaNum2, setCaptchaNum2] = useState<number>(0);
  const [captchaAnswer, setCaptchaAnswer] = useState(""); // What user types
  const [captchaError, setCaptchaError] = useState<string | null>(null);

  // Regenerate captcha when form is reset
  const regenerateCaptcha = () => {
    setCaptchaNum1(getRandomIntInclusive(10, 99));
    setCaptchaNum2(getRandomIntInclusive(1, 9));
    setCaptchaAnswer("");
    setCaptchaError(null);
  };

  useEffect(() => {
    regenerateCaptcha();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setCaptchaError(null);

    const correct = Number(captchaAnswer.trim()) === captchaNum1 + captchaNum2;
    if (!correct) {
      setCaptchaError("Incorrect answer to the captcha. Please try again.");
      // Prevent submission
      regenerateCaptcha();
      return;
    }

    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData
      });

      const data = await response.json();
      if (response.ok) {
        setSubmitted(true);
        form.reset();
        regenerateCaptcha();
      } else {
        setError(
          (data && data.errors && data.errors[0] && data.errors[0].message) ||
          "Sorry, there was a problem submitting your request. Please try again."
        );
      }
    } catch (err) {
      setError("Sorry, there was a network error. Please try again later.");
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="py-10 text-center">
        <h2 className="text-2xl font-semibold mb-3">Thank you!</h2>
        <p className="text-lg text-muted-foreground mb-4">
          We've received your request and will get back to you within 24 hours.<br />
          If you don't get a reply, please check your Spam folder.
        </p>
        <button
          className="mt-4 px-6 py-2 rounded bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition"
          onClick={() => {
            setSubmitted(false);
            regenerateCaptcha();
          }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Full Name *</label>
          <input
            id="name"
            type="text"
            name="name"
            required
            className="w-full rounded border border-input bg-background text-foreground px-3 py-2"
            placeholder="John Doe"
            autoComplete="name"
            disabled={submitting}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email Address *</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="w-full rounded border border-input bg-background text-foreground px-3 py-2"
            placeholder="john@company.com"
            autoComplete="email"
            disabled={submitting}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium">Company Name</label>
          <input
            id="company"
            type="text"
            name="company"
            className="w-full rounded border border-input bg-background text-foreground px-3 py-2"
            placeholder="Your Company"
            autoComplete="organization"
            disabled={submitting}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">Phone Number *</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            required
            className="w-full rounded border border-input bg-background text-foreground px-3 py-2"
            placeholder="+91 8690393087"
            autoComplete="tel"
            disabled={submitting}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="website" className="text-sm font-medium">Website URL</label>
        <input
          id="website"
          type="url"
          name="website"
          className="w-full rounded border border-input bg-background text-foreground px-3 py-2"
          placeholder="https://yourwebsite.com"
          autoComplete="url"
          disabled={submitting}
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="service" className="text-sm font-medium">Service Interest *</label>
        <select
          id="service"
          name="service"
          required
          className="w-full rounded border px-3 py-2 bg-background"
          defaultValue=""
          disabled={submitting}
        >
          <option value="" disabled>Select a service</option>
          {/* Hosting */}
          <optgroup label="Hosting">
            <option value="web-hosting">Web Hosting</option>
            <option value="cloud-hosting">Cloud Hosting</option>
            <option value="reseller-hosting">Reseller Hosting</option>
            <option value="wordpress-hosting">Managed WordPress Hosting</option>
            <option value="woocommerce-hosting">Managed WooCommerce Hosting</option>
            <option value="nodejs-hosting">Node.js Web App Hosting</option>
          </optgroup>
          {/* Servers */}
          <optgroup label="Servers">
            <option value="vps-server">VPS Server</option>
            <option value="dedicated-server">Dedicated Server</option>
            <option value="gpu-server">GPU Server</option>
            <option value="server-management">Server Management</option>
          </optgroup>
          {/* Domains */}
          <optgroup label="Domains">
            <option value="domain-registration">Domain Registration</option>
            <option value="domain-search">Domain Name Search</option>
            <option value="domain-transfer">Domain Transfer</option>
          </optgroup>
          {/* Email & Security */}
          <optgroup label="Email & Security">
            <option value="zoho-email">Zoho Email Services</option>
            <option value="office365">Microsoft Office 365</option>
            <option value="google-workspace">Google Workspace</option>
            <option value="ssl-certificates">SSL Certificates</option>
          </optgroup>
          {/* Free Trial */}
          <optgroup label="Free Trial">
            <option value="free-trial-shared">Free Trial – Shared Hosting</option>
            <option value="free-trial-cloud">Free Trial – Cloud Hosting</option>
            <option value="free-trial-vps">Free Trial – VPS Server</option>
            <option value="free-trial-wordpress">Free Trial – WordPress Hosting</option>
          </optgroup>
          {/* Solutions */}
          <optgroup label="Solutions">
            <option value="cloud">Cloud Solutions</option>
            <option value="domain">Domain Services</option>
            <option value="multiple">Multiple Services</option>
            <option value="development">Development Services</option>
            <option value="ai">AI Solutions (CodinAI)</option>
          </optgroup>
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">Project Details *</label>
        <textarea
          id="message"
          name="message"
          required
          className="w-full rounded border border-input bg-background text-foreground px-3 py-2"
          placeholder="Tell us about your project requirements, expected features, and any specific needs..."
          rows={6}
          disabled={submitting}
        />
      </div>
      {/* Custom Captcha */}
      <div className="space-y-2">
        <label htmlFor="captcha" className="text-sm font-medium">
          Are you human? <span className="font-normal">What is {captchaNum1} + {captchaNum2}?</span> *
        </label>
        <input
          id="captcha"
          name="captcha"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          required
          className="w-full rounded border border-input bg-background text-foreground px-3 py-2"
          placeholder="Enter the sum"
          value={captchaAnswer}
          disabled={submitting}
          onChange={e => setCaptchaAnswer(e.target.value.replace(/[^0-9]/g, ""))}
        />
        {captchaError && <div className="text-red-600 text-sm">{captchaError}</div>}
      </div>
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      <button
        type="submit"
        className="w-full py-3 rounded bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition"
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit Contact Request"}
      </button>
    </form>
  );
};

const Contact = () => {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://infinitivecloud.com/" },
    { name: "Contact", url: "https://infinitivecloud.com/contact" }
  ]);

  const benefits = [
    {
      icon: FileText,
      title: "Detailed Response",
      description: "Get a comprehensive response with pricing breakdown",
    },
    {
      icon: Zap,
      title: "Fast Response",
      description: "Receive your reply within 24 hours",
    },
    {
      icon: Shield,
      title: "No Commitment",
      description: "Free consultation with zero obligations",
    },
    {
      icon: TrendingUp,
      title: "Best Value",
      description: "Competitive pricing with premium features",
    },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Contact Us - Cloud, Hosting & Development Services | Infinitive Cloud</title>
        <meta name="description" content="Contact us for inquiries about cloud hosting, web development, mobile apps, or AI solutions. Free consultation, detailed responses within 24 hours, no commitment required." />
        <meta name="keywords" content="IT services contact India, cloud hosting contact, web development inquiry, mobile app contact, AI solutions contact" />
        <link rel="canonical" href="https://infinitivecloud.com/contact" />
        <meta property="og:title" content="Contact Us - Infinitive Cloud" />
        <meta property="og:description" content="Send your inquiry for cloud, hosting, development, or AI services." />
        <meta property="og:url" content="https://infinitivecloud.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://infinitivecloud.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact - Infinitive Cloud" />
        <meta name="twitter:description" content="Free consultation and response within 24 hours." />
        <meta name="twitter:image" content="https://infinitivecloud.com/og-image.png" />
      </Helmet>

      <StructuredData data={breadcrumbSchema} />

      <Navigation />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="section-container mb-20">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6">
              <span className="gradient-text">Contact Us</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Tell us about your project or inquiry and we'll provide a tailored response with transparent pricing.
            </p>
          </div>
        </section>
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Request Form */}
            <div className="lg:col-span-2">
              <Card className="animate-fade-in-up">
                <CardHeader>
                  <CardTitle className="text-2xl">Contact Our Team</CardTitle>
                  <CardDescription>
                    Fill out the details below and receive a personalized response within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
            {/* Benefits */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card
                    key={benefit.title}
                    className="card-hover animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{benefit.title}</h3>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <style>
        {`
          .custom-scroll-lock {
            overscroll-behavior: contain;
            touch-action: pan-y;
          }
        `}
      </style>
    </div>
  );
};

export default Contact;
