import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, ShoppingCart, BarChart3, Users, Globe, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const OdooSolutions = () => {
  const features = [
    { icon: Settings, title: "Custom Implementation", description: "Tailored Odoo setup configured to match your exact business workflows and processes." },
    { icon: ShoppingCart, title: "E-commerce Integration", description: "Full e-commerce module setup with inventory, payments, and shipping automation." },
    { icon: BarChart3, title: "Accounting & Finance", description: "Automated invoicing, expense tracking, and financial reporting out of the box." },
    { icon: Users, title: "HR & Payroll", description: "Employee management, attendance tracking, leave management, and payroll processing." },
    { icon: Globe, title: "Odoo Hosting", description: "Managed Odoo hosting on optimized infrastructure for fast, reliable performance." },
    { icon: Headphones, title: "Training & Support", description: "Hands-on training for your team plus ongoing support to keep everything running smoothly." },
  ];

  return (
    <>
      <Helmet>
        <title>Odoo ERP Solutions | Custom Implementation - Infinitive Cloud</title>
        <meta name="description" content="Customized Odoo ERP solutions including implementation, e-commerce, accounting, HR, managed hosting, and training. Streamline your entire business operation." />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/odoo-solutions" />
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          <section className="section-container mb-16">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="mb-6">
                <span className="gradient-text">Odoo</span> Solutions
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Customized Odoo ERP implementations that streamline your entire business — from sales and inventory to accounting and HR. One platform, every department connected.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link to="/quote"><Button className="btn-gradient glow-effect font-bold h-14 px-8">Get a Quote</Button></Link>
                <Link to="/contact"><Button variant="outline" className="h-14 px-8 font-semibold">Talk to an Expert</Button></Link>
              </div>
            </div>
          </section>

          <section className="section-container mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <Card key={f.title} className="card-hover animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    <CardContent className="p-8">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                      <p className="text-muted-foreground">{f.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default OdooSolutions;
