import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Globe,
  Mail,
  CreditCard,
  ArrowRight,
  Home,
  Copy,
  ShieldCheck,
  FileText,
  Server,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generateInvoicePdf } from "@/utils/generateInvoicePdf";

type ConfirmationAddon = {
  name: string;
  price: number;
  period?: string;
};

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id") || `IC-${Date.now().toString(36).toUpperCase()}`;
  const total = parseInt(searchParams.get("total") || "943", 10);
  const name = searchParams.get("name") || "Customer";
  const email = searchParams.get("email") || "";
  const payment = searchParams.get("payment") || "Razorpay";
  const itemType = searchParams.get("itemType") || (searchParams.get("domain") ? "domain" : "shared-hosting");
  const itemName =
    searchParams.get("itemName") ||
    searchParams.get("product") ||
    searchParams.get("domain") ||
    "Starter";
  const itemLabel =
    searchParams.get("itemLabel") ||
    (itemType === "domain" ? "Domain Registration" : "Shared Hosting");
  const itemPeriod =
    searchParams.get("itemPeriod") ||
    (itemType === "domain" ? "1 Year" : "1 Month");
  const itemPrice = parseInt(searchParams.get("itemPrice") || searchParams.get("subtotal") || "799", 10);
  const subtotal = parseInt(searchParams.get("subtotal") || itemPrice.toString(), 10);
  const gst = parseInt(searchParams.get("gst") || Math.round(subtotal * 0.18).toString(), 10);

  const addons = useMemo<ConfirmationAddon[]>(() => {
    const addonsParam = searchParams.get("addons");
    if (!addonsParam) return [];

    try {
      const parsed = JSON.parse(addonsParam);
      if (!Array.isArray(parsed)) return [];

      return parsed
        .map((addon) => ({
          name: typeof addon?.name === "string" ? addon.name : "Add-on",
          price: Number(addon?.price || 0),
          period: typeof addon?.period === "string" ? addon.period : undefined,
        }))
        .filter((addon) => addon.price >= 0);
    } catch {
      return [];
    }
  }, [searchParams]);

  const addonsTotal = addons.reduce((sum, addon) => sum + addon.price, 0);
  const preTaxTotal = subtotal + addonsTotal;

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    toast({ title: "Copied!", description: "Order ID copied to clipboard." });
  };

  const handleDownloadInvoice = async () => {
    await generateInvoicePdf({
      orderId,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
      name,
      email,
      itemName,
      itemType,
      itemLabel,
      itemPeriod,
      subtotal,
      gst,
      total,
      paymentMethod: payment,
      addons,
    });

    toast({ title: "Invoice Downloaded", description: "Your invoice PDF has been saved." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Order Confirmed | Infinitive Cloud</title>
        <meta name="description" content="Your order has been placed successfully." />
      </Helmet>

      <Navigation />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className="flex flex-col items-center text-center mb-10"
          >
            <div className="relative mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center"
              >
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 0], opacity: [0, 0.3, 0] }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute inset-0 rounded-full bg-green-500/20"
              />
            </div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-foreground mb-2"
            >
              Order Placed Successfully!
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground max-w-md"
            >
              Thank you for your purchase, <span className="font-semibold text-foreground">{name}</span>. Your order is being processed.
            </motion.p>
          </motion.div>

          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-foreground">Order Details</h2>
                  <button
                    onClick={copyOrderId}
                    className="flex items-center gap-1.5 text-sm text-primary hover:underline cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy ID
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Order ID</p>
                    <p className="font-mono font-bold text-foreground break-all">{orderId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-semibold text-foreground">
                      {new Date().toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Payment Method</p>
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-primary" />
                      <p className="font-semibold text-foreground">{payment}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Status</p>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                      Processing
                    </span>
                  </div>
                </div>

                <Separator className="my-5" />

                <h3 className="text-sm font-bold text-foreground mb-3">Items Ordered</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                        {itemType === "domain" ? (
                          <Globe className="w-4 h-4 text-primary" />
                        ) : (
                          <Server className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground truncate">{itemName}</p>
                        <p className="text-xs text-muted-foreground">{itemLabel} — {itemPeriod}</p>
                      </div>
                    </div>
                    <span className="font-bold text-foreground shrink-0">₹{itemPrice.toLocaleString("en-IN")}</span>
                  </div>

                  {addons.map((addon) => (
                    <div key={`${addon.name}-${addon.price}`} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/60 gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                          <ShieldCheck className="w-4 h-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground truncate">{addon.name}</p>
                          <p className="text-xs text-muted-foreground">Add-on{addon.period ? ` — ${addon.period}` : ""}</p>
                        </div>
                      </div>
                      <span className="font-bold text-foreground shrink-0">₹{addon.price.toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>

                <Separator className="my-5" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{itemLabel}</span>
                    <span className="text-foreground">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  {addonsTotal > 0 && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Add-ons</span>
                      <span className="text-foreground">₹{addonsTotal.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>GST @ 18%</span>
                    <span className="text-foreground">₹{gst.toLocaleString("en-IN")}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-foreground">Total Paid</span>
                    <span className="text-xl font-black text-primary">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  {preTaxTotal !== total && (
                    <p className="text-xs text-muted-foreground text-right">Pre-tax total: ₹{preTaxTotal.toLocaleString("en-IN")}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {email && (
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-sm font-bold text-foreground mb-3">Confirmation Sent To</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-foreground break-all">{email}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
            <Card className="mb-8">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">What Happens Next?</h3>
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "Order Verification",
                      desc: "Our team will verify your payment and order details within a few minutes.",
                    },
                    {
                      step: "2",
                      title: itemType === "domain" ? "Domain Activation" : "Hosting Provisioning",
                      desc:
                        itemType === "domain"
                          ? "Your domain will be registered and activated. You'll receive DNS details via email."
                          : "Your hosting account will be provisioned and you'll receive access details and login credentials by email.",
                    },
                    {
                      step: "3",
                      title: "Ready to Go!",
                      desc:
                        itemType === "domain"
                          ? "Manage your domain from the client area. Set up hosting, email, and more."
                          : "Launch your website, connect domains, configure email, and start managing your hosting from the client area.",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap"
          >
            <Button variant="outline" className="w-full sm:w-auto gap-2" onClick={handleDownloadInvoice}>
              <FileText className="w-4 h-4" />
              Download Invoice
            </Button>
            <Link to="/">
              <Button variant="outline" className="w-full sm:w-auto gap-2">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Link to="/solutions/shared-hosting">
              <Button className="w-full sm:w-auto btn-gradient gap-2">
                <Server className="w-4 h-4" />
                Explore More Hosting Plans
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="flex items-center justify-center gap-2 mt-8 text-xs text-muted-foreground">
            <ShieldCheck className="w-4 h-4" />
            <span>Your transaction is secured with 256-bit SSL encryption</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;