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
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CheckoutForm from "@/components/cart/CheckoutForm";
import { useWhmcsProducts } from "@/hooks/use-whmcs-products";
import { Loader2 } from "lucide-react";

type CartItem = {
  id: number;
  type: string;
  name: string;
  period: string;
  price: number;
  label: string;
  annualPrice?: number;
  features?: string[];
};

const Cart = () => {
  const [searchParams] = useSearchParams();
  const domain = searchParams.get("domain") || "";
  const domainPrice = searchParams.get("price");
  const domainRenewPrice = searchParams.get("renewPrice");
  const productId = searchParams.get("product");
  const productName = searchParams.get("name");
  const productType = searchParams.get("type");
  const productPrice = searchParams.get("price");
  const productAnnualPrice = searchParams.get("annualPrice");
  const [step, setStep] = useState<"cart" | "checkout">("cart");

  const getInitialItems = (): CartItem[] => {
    if (domain && !productId) {
      const price = domainPrice ? Math.round(parseFloat(domainPrice)) : 0;
      return [
        { id: 1, type: "domain", name: domain, period: "1 Year", price, label: "Domain Registration" },
      ];
    }
    if (productId && productType && productType !== "domain") {
      const monthly = productPrice ? parseFloat(productPrice) : 0;
      const annual = productAnnualPrice ? parseFloat(productAnnualPrice) : 0;
      return [{
        id: Number(productId),
        type: productType,
        name: productName || "Hosting Plan",
        period: "1 Month",
        price: monthly,
        annualPrice: annual,
        label: productType === "shared-hosting" ? "Shared Hosting" : "Hosting",
      }];
    }
    return [];
  };

  const [items, setItems] = useState<CartItem[]>(getInitialItems);

  const addons = [
    { id: "ssl", icon: Shield, name: "SSL Certificate", desc: "Secure your website with HTTPS", price: 499 },
    { id: "hosting", icon: Server, name: "Cloud Hosting - Starter", desc: "Fast SSD hosting with 99.99% uptime", price: 149, period: "/mo" },
    { id: "privacy", icon: Lock, name: "Domain Privacy Protection", desc: "Hide your personal info from WHOIS", price: 199 },
  ];

  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getItemPrice = (item: CartItem) => {
    if (item.type === "domain") return item.price;
    return billingCycle === "annually" && item.annualPrice ? item.annualPrice : item.price;
  };
  const subtotal = items.reduce((sum, item) => sum + getItemPrice(item), 0);
  const addonsTotal = addons
    .filter((a) => selectedAddons.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
  const total = subtotal + addonsTotal;
  const selectedAddonDetails = addons.filter((addon) => selectedAddons.includes(addon.id));

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{step === "checkout" ? "Checkout" : "Cart"} | Infinitive Cloud</title>
        <meta name="description" content="Review your selected domains and services before checkout." />
      </Helmet>

      <Navigation />

      <main className="pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="container mx-auto px-4 max-w-5xl"
        >
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

          <AnimatePresence mode="wait">
          {step === "checkout" ? (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            >
            <CheckoutForm
              subtotal={subtotal}
              addonsTotal={addonsTotal}
              total={total}
              items={items.map(item => ({
                ...item,
                price: getItemPrice(item),
                period: item.type === "domain" ? item.period : billingCycle === "annually" ? "1 Year" : "1 Month",
              }))}
              selectedAddons={selectedAddonDetails}
              onBack={() => setStep("cart")}
              billingCycle={billingCycle}
            />
            </motion.div>
          ) : (
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {/* Cart Items */}
               <div className="lg:col-span-2 space-y-4">
                {items.length === 0 ? (
                  <Card className="border-dashed">
                    <CardContent className="p-12 text-center">
                      <ShoppingCart className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">Your cart is empty</h3>
                       <p className="text-muted-foreground mb-6">Browse our hosting plans or search for a domain to get started</p>
                      <div className="flex gap-3 justify-center flex-wrap">
                        <Link to="/solutions/shared-hosting">
                          <Button className="btn-gradient">
                            <Server className="w-4 h-4 mr-2" />
                            Browse Hosting
                          </Button>
                        </Link>
                        <Link to="/solutions/domains">
                          <Button variant="outline">
                            <Globe className="w-4 h-4 mr-2" />
                            Search Domains
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {/* Billing Cycle Selector */}
                    {items.some(i => i.type !== "domain" && i.annualPrice && i.annualPrice > 0) && (
                      <Card className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-foreground text-sm">Billing Cycle</h3>
                              <p className="text-xs text-muted-foreground">Choose your preferred billing period</p>
                            </div>
                            <div className="flex items-center bg-muted rounded-lg p-1">
                              <button
                                type="button"
                                onClick={() => setBillingCycle("monthly")}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${billingCycle === "monthly" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                              >
                                Monthly
                              </button>
                              <button
                                type="button"
                                onClick={() => setBillingCycle("annually")}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${billingCycle === "annually" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                              >
                                Annually
                                <span className="ml-1 text-[10px] opacity-80">Save more</span>
                              </button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {items.map((item) => {
                      const displayPrice = getItemPrice(item);
                      const isAnnual = item.type !== "domain" && billingCycle === "annually";
                      const savingsPercent = (item.type !== "domain" && item.annualPrice && item.annualPrice > 0 && item.price > 0)
                        ? Math.round(100 - (item.annualPrice / (item.price * 12)) * 100)
                        : 0;
                      return (
                        <Card key={item.id} className="overflow-hidden">
                          <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-lg bg-primary/10">
                                  {item.type === "domain" ? (
                                    <Globe className="w-5 h-5 text-primary" />
                                  ) : (
                                    <Server className="w-5 h-5 text-primary" />
                                  )}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-bold text-foreground text-lg">{item.name}</h3>
                                    {isAnnual && savingsPercent > 0 && (
                                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-[hsl(200,80%,92%)] text-[hsl(200,80%,30%)] dark:bg-[hsl(200,60%,25%)] dark:text-[hsl(200,80%,85%)] shadow-md">
                                        Save {savingsPercent}%
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="secondary" className="text-xs">{item.label}</Badge>
                                    <span className="text-xs text-muted-foreground">{isAnnual ? "1 Year" : item.period}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <span className="text-xl font-bold text-foreground">
                                    ₹{displayPrice.toLocaleString("en-IN")}
                                    <span className="text-sm text-muted-foreground font-normal">
                                      {item.type === "domain" ? "/yr" : isAnnual ? "/yr" : "/mo"}
                                    </span>
                                  </span>
                                  {isAnnual && item.price > 0 && (
                                    <p className="text-xs text-muted-foreground line-through">₹{(item.price * 12).toLocaleString("en-IN")}/yr</p>
                                  )}
                                  {!isAnnual && item.annualPrice && item.annualPrice > 0 && (
                                    <p className="text-xs text-muted-foreground">or ₹{item.annualPrice.toLocaleString("en-IN")}/yr</p>
                                  )}
                                </div>
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
                            {item.features && item.features.length > 0 && (
                              <div className="mt-4 pt-4 border-t border-border">
                                <div className="grid grid-cols-2 gap-2">
                                  {item.features.map((f, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                                      <span>{f}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}

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
                            <span className="font-medium text-foreground shrink-0">₹{getItemPrice(item).toLocaleString("en-IN")}</span>
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
                      {billingCycle === "annually" && (() => {
                        const totalSaved = items.reduce((sum, item) => {
                          if (item.type === "domain" || !item.annualPrice || !item.price) return sum;
                          return sum + (item.price * 12 - item.annualPrice);
                        }, 0);
                        return totalSaved > 0 ? (
                          <div className="mt-3 p-2.5 rounded-lg bg-[hsl(200,80%,92%)] dark:bg-[hsl(200,60%,25%)] text-center">
                            <span className="text-xs font-bold text-[hsl(200,80%,30%)] dark:text-[hsl(200,80%,85%)]">
                              🎉 You save ₹{totalSaved.toLocaleString("en-IN")}/yr with annual billing
                            </span>
                          </div>
                        ) : null;
                      })()}
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
            </motion.div>
          )}
          </AnimatePresence>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
