import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Globe,
  Shield,
  Server,
  Trash2,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Lock,
} from "lucide-react";
import { useState } from "react";
import CheckoutForm from "@/components/cart/CheckoutForm";

const Cart = () => {
  const [searchParams] = useSearchParams();
  const domain = searchParams.get("domain") || "example.com";
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [items, setItems] = useState([
    { id: 1, type: "domain", name: domain, period: "1 Year", price: 799 },
  ]);

  const addons = [
    { id: "ssl", icon: Shield, name: "SSL Certificate", desc: "Secure your website with HTTPS", price: 499 },
    { id: "hosting", icon: Server, name: "Cloud Hosting - Starter", desc: "Fast SSD hosting with 99.99% uptime", price: 149, period: "/mo" },
    { id: "privacy", icon: Lock, name: "Domain Privacy Protection", desc: "Hide your personal info from WHOIS", price: 199 },
  ];

  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const addonsTotal = addons
    .filter((a) => selectedAddons.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
  const total = subtotal + addonsTotal;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{step === "checkout" ? "Checkout" : "Cart"} | Infinitive Cloud</title>
        <meta name="description" content="Review your selected domains and services before checkout." />
      </Helmet>

      <Navigation />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-primary/10">
              <ShoppingCart className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {step === "checkout" ? "Checkout" : "Your Cart"}
              </h1>
              <p className="text-muted-foreground text-sm">
                {step === "checkout"
                  ? "Enter your billing details to complete your order"
                  : "Review your selections before proceeding"}
              </p>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[
              { key: "cart", label: "Cart" },
              { key: "checkout", label: "Checkout" },
            ].map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                {i > 0 && <div className="w-8 h-px bg-border" />}
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    step === s.key
                      ? "bg-primary text-primary-foreground"
                      : s.key === "cart"
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {step === "checkout" ? (
            <CheckoutForm
              subtotal={subtotal}
              addonsTotal={addonsTotal}
              total={total}
              onBack={() => setStep("cart")}
            />
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.length === 0 ? (
                  <Card className="border-dashed">
                    <CardContent className="p-12 text-center">
                      <ShoppingCart className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h3>
                      <p className="text-muted-foreground mb-6">Search for a domain to get started</p>
                      <Link to="/solutions/domains">
                        <Button className="btn-gradient">
                          <Globe className="w-4 h-4 mr-2" />
                          Search Domains
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {items.map((item) => (
                      <Card key={item.id} className="overflow-hidden">
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="p-2.5 rounded-lg bg-primary/10">
                                <Globe className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-bold text-foreground text-lg">{item.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="secondary" className="text-xs">Domain Registration</Badge>
                                  <span className="text-xs text-muted-foreground">{item.period}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-xl font-bold text-foreground">
                                ₹{item.price.toLocaleString("en-IN")}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-destructive"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}

                    {/* Recommended Add-ons */}
                    <div className="mt-8">
                      <h2 className="text-lg font-bold text-foreground mb-4">Recommended Add-ons</h2>
                      <div className="space-y-3">
                        {addons.map((addon) => {
                          const selected = selectedAddons.includes(addon.id);
                          return (
                            <Card
                              key={addon.id}
                              className={`cursor-pointer transition-all duration-200 ${
                                selected ? "ring-2 ring-primary border-primary" : "hover:border-primary/30"
                              }`}
                              onClick={() => toggleAddon(addon.id)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${selected ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                                      <addon.icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-foreground text-sm">{addon.name}</h4>
                                      <p className="text-xs text-muted-foreground">{addon.desc}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <span className="font-bold text-foreground">
                                      ₹{addon.price.toLocaleString("en-IN")}
                                      <span className="text-xs text-muted-foreground font-normal">{addon.period || "/yr"}</span>
                                    </span>
                                    {selected && <CheckCircle2 className="w-5 h-5 text-primary" />}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Order Summary */}
              {items.length > 0 && (
                <div className="lg:col-span-1">
                  <Card className="sticky top-28">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-foreground mb-4">Order Summary</h3>
                      <div className="space-y-3 text-sm">
                        {items.map((item) => (
                          <div key={item.id} className="flex justify-between text-muted-foreground">
                            <span className="truncate mr-2">{item.name}</span>
                            <span className="font-medium text-foreground shrink-0">₹{item.price.toLocaleString("en-IN")}</span>
                          </div>
                        ))}
                        {addons
                          .filter((a) => selectedAddons.includes(a.id))
                          .map((addon) => (
                            <div key={addon.id} className="flex justify-between text-muted-foreground">
                              <span className="truncate mr-2">{addon.name}</span>
                              <span className="font-medium text-foreground shrink-0">₹{addon.price.toLocaleString("en-IN")}</span>
                            </div>
                          ))}
                      </div>
                      <div className="border-t border-border mt-4 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-foreground">Total</span>
                          <span className="text-2xl font-black text-primary">₹{total.toLocaleString("en-IN")}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-1">Inclusive of all taxes</p>
                      </div>
                      <Button
                        className="w-full btn-gradient mt-6 h-12 text-base font-bold gap-2"
                        onClick={() => setStep("checkout")}
                      >
                        <CreditCard className="w-5 h-5" />
                        Proceed to Checkout
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                        <Lock className="w-3 h-3" />
                        <span>Secure 256-bit SSL checkout</span>
                      </div>
                      <div className="mt-4 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground text-center">
                        30-Day Money-Back Guarantee
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
