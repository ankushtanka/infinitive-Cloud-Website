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
  Phone,
  MapPin,
  CreditCard,
  ArrowRight,
  Download,
  Home,
  Copy,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { generateInvoicePdf } from "@/utils/generateInvoicePdf";

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id") || `IC-${Date.now().toString(36).toUpperCase()}`;
  const domain = searchParams.get("domain") || "example.com";
  const total = searchParams.get("total") || "943";
  const name = searchParams.get("name") || "Customer";
  const email = searchParams.get("email") || "";
  const payment = searchParams.get("payment") || "Razorpay";

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    toast({ title: "Copied!", description: "Order ID copied to clipboard." });
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
          {/* Success Animation */}
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

          {/* Order Details Card */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
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
                    <p className="font-mono font-bold text-foreground">{orderId}</p>
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

                {/* Items */}
                <h3 className="text-sm font-bold text-foreground mb-3">Items Ordered</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Globe className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{domain}</p>
                        <p className="text-xs text-muted-foreground">Domain Registration — 1 Year</p>
                      </div>
                    </div>
                    <span className="font-bold text-foreground">₹799</span>
                  </div>
                </div>

                <Separator className="my-5" />

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="text-foreground">₹799</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>GST @ 18%</span>
                    <span className="text-foreground">₹{Math.round(799 * 0.18).toLocaleString("en-IN")}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-foreground">Total Paid</span>
                    <span className="text-xl font-black text-primary">₹{parseInt(total).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          {email && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-sm font-bold text-foreground mb-3">Confirmation Sent To</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-foreground">{email}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* What's Next */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
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
                      title: "Domain Activation",
                      desc: "Your domain will be registered and activated. You'll receive DNS details via email.",
                    },
                    {
                      step: "3",
                      title: "Ready to Go!",
                      desc: "Manage your domain from the client area. Set up hosting, email, and more.",
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

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link to="/">
              <Button variant="outline" className="w-full sm:w-auto gap-2">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Link to="/solutions/domains">
              <Button className="w-full sm:w-auto btn-gradient gap-2">
                <Globe className="w-4 h-4" />
                Register More Domains
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Security Badge */}
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
