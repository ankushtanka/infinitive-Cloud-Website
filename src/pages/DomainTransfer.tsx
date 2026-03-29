import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Loader2, CheckCircle, Globe, Key, Shield, Mail } from "lucide-react";
import { useDomainTransfer } from "@/hooks/use-domain-management";
import { toast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";

const DomainTransfer = () => {
  const { transfer, loading, error, result } = useDomainTransfer();
  const [form, setForm] = useState({
    domain: "",
    eppcode: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    city: "",
    state: "",
    postcode: "",
    country: "IN",
    ns1: "",
    ns2: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.domain || !form.eppcode || !form.email || !form.firstName || !form.lastName) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    const nameservers = [form.ns1, form.ns2].filter(Boolean);
    const res = await transfer({ ...form, nameservers: nameservers.length ? nameservers : undefined });
    if (res?.success) {
      toast({ title: "Transfer Initiated!", description: `Domain ${form.domain} transfer has been submitted. You'll receive a confirmation email.` });
    } else {
      toast({ title: "Transfer Failed", description: error || "Something went wrong. Please try again.", variant: "destructive" });
    }
  };

  const steps = [
    { icon: Key, title: "Unlock Domain", desc: "Unlock your domain at your current registrar and get the EPP/auth code." },
    { icon: Globe, title: "Enter Details", desc: "Provide your domain name, EPP code, and contact information below." },
    { icon: Mail, title: "Approve Transfer", desc: "Approve the transfer via the confirmation email from your registrar." },
    { icon: Shield, title: "Transfer Complete", desc: "Your domain moves to Infinitive Cloud with a free 1-year extension!" },
  ];

  if (result?.success) {
    return (
      <>
        <Helmet><title>Transfer Initiated | Infinitive Cloud</title></Helmet>
        <div className="min-h-screen">
          <Navigation />
          <main className="pt-28 pb-20">
            <div className="section-container max-w-2xl mx-auto text-center">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold mb-4">Transfer Initiated Successfully!</h1>
              <p className="text-muted-foreground mb-2">
                Your domain <strong>{form.domain}</strong> transfer has been submitted.
              </p>
              <p className="text-muted-foreground mb-2">Order ID: <strong>{result.orderId}</strong></p>
              <p className="text-sm text-muted-foreground">
                You'll receive a confirmation email shortly. Please approve the transfer at your current registrar to complete the process.
              </p>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Transfer Domain | Move Your Domain to Infinitive Cloud</title>
        <meta name="description" content="Transfer your domain to Infinitive Cloud. Get a free 1-year extension on every transfer with free WHOIS privacy and DNS management." />
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-28 pb-20">
          <section className="section-container max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">
                Transfer Your Domain to <span className="gradient-text">Infinitive Cloud</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Move your domain in 4 simple steps. Free 1-year extension included with every transfer.
              </p>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <Card key={i} className="text-center">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <p className="text-xs text-primary font-bold mb-1">Step {i + 1}</p>
                      <h3 className="font-bold mb-1">{s.title}</h3>
                      <p className="text-xs text-muted-foreground">{s.desc}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Transfer Form */}
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle className="text-xl">Domain Transfer Request</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Domain & EPP */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="domain">Domain Name *</Label>
                      <Input id="domain" name="domain" placeholder="example.com" value={form.domain} onChange={handleChange} required />
                    </div>
                    <div>
                      <Label htmlFor="eppcode">EPP / Auth Code *</Label>
                      <Input id="eppcode" name="eppcode" placeholder="Enter EPP code" value={form.eppcode} onChange={handleChange} required />
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" name="firstName" value={form.firstName} onChange={handleChange} required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" name="lastName" value={form.lastName} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" name="phone" value={form.phone} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" name="city" value={form.city} onChange={handleChange} />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input id="state" name="state" value={form.state} onChange={handleChange} />
                    </div>
                  </div>

                  {/* Optional Nameservers */}
                  <div>
                    <Label className="text-muted-foreground text-sm">Custom Nameservers (optional)</Label>
                    <div className="grid md:grid-cols-2 gap-4 mt-2">
                      <Input name="ns1" placeholder="ns1.example.com" value={form.ns1} onChange={handleChange} />
                      <Input name="ns2" placeholder="ns2.example.com" value={form.ns2} onChange={handleChange} />
                    </div>
                  </div>

                  <Button type="submit" disabled={loading} className="btn-gradient w-full h-12 font-bold text-base">
                    {loading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <ArrowRight className="w-5 h-5 mr-2" />}
                    {loading ? "Initiating Transfer..." : "Start Domain Transfer"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DomainTransfer;
