import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  CreditCard,
  Tag,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Wallet,
  Landmark,
  Smartphone,
  Globe,
  LogIn,
  UserPlus,
  Lock,
  Loader2,
  Copy,
  AlertTriangle,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { placeOrder, validateLogin, type OrderPayload } from "@/lib/whmcs";

// --- Schemas ---
const newCustomerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(15),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
  companyName: z.string().trim().max(100).optional(),
  address1: z.string().trim().min(1, "Address is required").max(200),
  address2: z.string().trim().max(200).optional(),
  city: z.string().trim().min(1, "City is required").max(100),
  state: z.string().trim().min(1, "State is required").max(100),
  postcode: z.string().trim().min(1, "Postcode is required").max(10),
  country: z.string().min(1, "Country is required"),
  gstNumber: z.string().trim().max(20).optional(),
  hostingDomain: z.string().trim().max(255).optional(),
});

const existingCustomerSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type NewCustomerData = z.infer<typeof newCustomerSchema>;
type ExistingCustomerData = z.infer<typeof existingCustomerSchema>;

interface CheckoutItem {
  id: number;
  type: string;
  name: string;
  period: string;
  price: number;
  label: string;
  annualPrice?: number;
  features?: string[];
}

interface CheckoutAddon {
  id: string;
  name: string;
  price: number;
  period?: string;
}

interface CheckoutFormProps {
  subtotal: number;
  addonsTotal: number;
  total: number;
  items: CheckoutItem[];
  selectedAddons: CheckoutAddon[];
  onBack: () => void;
  billingCycle?: "monthly" | "annually";
}

interface OrderConfirmation {
  orderId?: number;
  orderNum?: string;
  invoiceId?: number;
  clientId?: number;
  isNewClient?: boolean;
  password?: string;
  items?: any[];
  total?: string;
  paymentId?: string;
  paymentCancelled?: boolean;
}

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh",
];

const fmt = (n: number) => `₹${n.toFixed(2)}`;

type WhmcsSessionUser = {
  clientid: number;
  firstname: string;
  lastname: string;
  email: string;
};

const persistWhmcsUser = (user: WhmcsSessionUser) => {
  localStorage.setItem("whmcs_user", JSON.stringify(user));
};

const CheckoutForm = ({ subtotal, addonsTotal, total, items, selectedAddons, onBack, billingCycle = "monthly" }: CheckoutFormProps) => {
  const [customerType, setCustomerType] = useState<"new" | "existing">("new");
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<{ clientid?: number; email: string; firstName: string; lastName: string; phone: string; companyName: string; address1: string; address2: string; city: string; state: string; postcode: string; country: string; domains: any[] } | null>(null);
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmation | null>(null);

  const gstRate = 0.18;
  const gstAmount = Math.round(total * gstRate);
  const grandTotal = total + gstAmount;

  const newForm = useForm<NewCustomerData>({
    resolver: zodResolver(newCustomerSchema),
    defaultValues: { country: "IN" },
  });

  const loginForm = useForm<ExistingCustomerData>({
    resolver: zodResolver(existingCustomerSchema),
  });

  const whmcsRequestKeyRef = useRef<string | null>(null);
  const whmcsRequestPromiseRef = useRef<Promise<any> | null>(null);
  const whmcsOrderCacheRef = useRef<any>(null);

  const submitOrderToWhmcs = async (
    data: { clientid?: number; firstName: string; lastName: string; email: string; phone: string; companyName?: string; address1: string; address2?: string; city: string; state: string; postcode: string; country: string; hostingDomain?: string; password?: string }
  ) => {
    if (!items.length) return null;

    const domainItem = items.find((i) => i.type === "domain");
    const hostingItem = items.find((i) => i.type !== "domain");
    const orderDomain = domainItem?.name || data.hostingDomain || `${data.firstName.toLowerCase().replace(/[^a-z]/g, "")}${Date.now()}.infinitivecloud.com`;

    const payload: OrderPayload = {
      ...(data.clientid ? { clientid: data.clientid } : {}),
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email,
      password2: data.password || undefined,
      phonenumber: data.phone,
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      state: data.state,
      postcode: data.postcode,
      country: data.country,
      domain: orderDomain,
      paymentmethod: "razorpay",
    };

    if (domainItem) {
      payload.domain_action = "register";
      payload.regperiod = 1;
      payload.domainpriceoverride = domainItem.price;
    }

    if (hostingItem) {
      payload.pid = hostingItem.id;
      payload.billingcycle = billingCycle === "annually" ? "annually" : "monthly";
      payload.priceoverride = hostingItem.price;
    }

    const requestKey = JSON.stringify(payload);

    if (whmcsOrderCacheRef.current?.requestKey === requestKey) {
      return whmcsOrderCacheRef.current;
    }

    if (whmcsRequestPromiseRef.current && whmcsRequestKeyRef.current === requestKey) {
      return whmcsRequestPromiseRef.current;
    }

    whmcsRequestKeyRef.current = requestKey;
    whmcsRequestPromiseRef.current = (async () => {
      try {
        console.log("Placing order via middleware:", payload);
        const result = await placeOrder(payload);

        if (result.result !== "success") {
          throw new Error(result.message || "Failed to create order");
        }

        console.log("Order placed successfully:", result);
        const submission = {
          success: true,
          requestKey,
          orderId: result.order_id,
          orderNum: result.order_num || (result.order_id ? `#${result.order_id}` : ""),
          invoiceId: result.invoice_id,
          clientId: result.client_id,
          isNewClient: result.is_new_client,
          password: result.password,
          razorpay: result.razorpay,
          items: result.items,
          total: result.total,
        };

        whmcsOrderCacheRef.current = submission;
        return submission;
      } catch (err) {
        console.error("Failed to submit order:", err);
        return null;
      } finally {
        if (whmcsRequestKeyRef.current === requestKey) {
          whmcsRequestKeyRef.current = null;
          whmcsRequestPromiseRef.current = null;
        }
      }
    })();

    return whmcsRequestPromiseRef.current;
  };

  const processPayment = async (billingData: { clientid?: number; firstName: string; lastName: string; email: string; phone: string; companyName?: string; address1: string; address2?: string; city: string; state: string; postcode: string; country: string; hostingDomain?: string; password?: string }) => {
    if (!agreedToTerms) {
      toast({ title: "Terms Required", description: "Please agree to the Terms of Service before proceeding.", variant: "destructive" });
      return;
    }

    setIsProcessing(true);
    try {
      const whmcsResult = await submitOrderToWhmcs(billingData);

      if (!whmcsResult?.success) {
        throw new Error("Failed to create order. Please try again.");
      }

      const resolvedPassword = whmcsResult.password || billingData.password;

      if (whmcsResult.clientId) {
        const sessionUser = {
          clientid: whmcsResult.clientId,
          firstname: billingData.firstName,
          lastname: billingData.lastName,
          email: billingData.email,
        };
        persistWhmcsUser(sessionUser);
        setLoggedInUser({
          clientid: whmcsResult.clientId,
          email: billingData.email,
          firstName: billingData.firstName,
          lastName: billingData.lastName,
          phone: billingData.phone,
          companyName: billingData.companyName || "",
          address1: billingData.address1,
          address2: billingData.address2 || "",
          city: billingData.city,
          state: billingData.state,
          postcode: billingData.postcode,
          country: billingData.country,
          domains: [],
        });
      }

      // Show confirmation panel immediately
      const confirmation: OrderConfirmation = {
        orderId: whmcsResult.orderId,
        orderNum: whmcsResult.orderNum,
        invoiceId: whmcsResult.invoiceId,
        clientId: whmcsResult.clientId,
        isNewClient: whmcsResult.isNewClient,
        password: resolvedPassword,
        items: whmcsResult.items,
        total: whmcsResult.total,
      };
      setOrderConfirmation(confirmation);

      // Trigger Razorpay if available
      if (paymentMethod === "razorpay" && whmcsResult.razorpay && window.Razorpay) {
        const rzpData = whmcsResult.razorpay;
        const rzpOptions: Record<string, any> = {
          key: "rzp_test_IvJdQ7DM2voWE5",
          amount: rzpData.amount,
          currency: rzpData.currency || "INR",
          name: "Infinitive Cloud",
          description: rzpData.description || "Domain & Hosting Services",
          prefill: rzpData.prefill || {
            name: `${billingData.firstName} ${billingData.lastName}`,
            email: billingData.email,
            contact: billingData.phone,
          },
          notes: rzpData.notes || {},
          theme: { color: "#2563eb" },
          handler: (response: any) => {
            setOrderConfirmation((prev) => prev ? { ...prev, paymentId: response.razorpay_payment_id, paymentCancelled: false } : prev);
            toast({ title: "Payment Successful!", description: `Payment ID: ${response.razorpay_payment_id}` });
          },
          modal: {
            ondismiss: () => {
              setOrderConfirmation((prev) => prev ? { ...prev, paymentCancelled: true } : prev);
            },
          },
        };

        if (rzpData.order_id && String(rzpData.order_id).startsWith("order_")) {
          rzpOptions.order_id = rzpData.order_id;
        }

        const rzp = new window.Razorpay(rzpOptions);
        rzp.on("payment.failed", (response: any) => {
          setOrderConfirmation((prev) => prev ? { ...prev, paymentCancelled: true } : prev);
          toast({ title: "Payment Failed", description: response?.error?.description || "Please try again.", variant: "destructive" });
        });
        rzp.open();
      }
    } catch (err: any) {
      toast({ title: "Order Error", description: err.message || "Could not process your order. Please try again.", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  const onNewCustomerSubmit = async (data: NewCustomerData) => {
    await processPayment({
      firstName: data.firstName, lastName: data.lastName, email: data.email,
      phone: data.phone, password: data.password, companyName: data.companyName,
      address1: data.address1, address2: data.address2, city: data.city,
      state: data.state, postcode: data.postcode, country: data.country,
      hostingDomain: data.hostingDomain,
    });
  };

  const handleExistingLogin = async (data: ExistingCustomerData): Promise<void> => {
    setIsLoggingIn(true);
    try {
      const result = await validateLogin(data.email, data.password);
      if (result.result === "success" && result.userid) {
        const client = result.client || {};
        const sessionUser = {
          clientid: result.userid,
          firstname: client.firstname || data.email.split("@")[0],
          lastname: client.lastname || "",
          email: client.email || data.email,
        };

        persistWhmcsUser(sessionUser);
        setLoggedInUser({
          clientid: result.userid,
          email: sessionUser.email,
          firstName: sessionUser.firstname,
          lastName: sessionUser.lastname,
          phone: client.phonenumber || "",
          companyName: client.companyname || "",
          address1: client.address1 || "",
          address2: client.address2 || "",
          city: client.city || "",
          state: client.state || "",
          postcode: client.postcode || "",
          country: client.country || "IN",
          domains: client.domains || [],
        });
        toast({ title: "Logged In", description: `Welcome back, ${client.firstname || data.email}!` });
      } else {
        toast({ title: "Login Failed", description: result.message || "Invalid email or password.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Login Error", description: "Could not verify your account.", variant: "destructive" });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleExistingPay = async () => {
    if (!loggedInUser) return;
    await processPayment({
      clientid: loggedInUser.clientid,
      firstName: loggedInUser.firstName, lastName: loggedInUser.lastName,
      email: loggedInUser.email, phone: loggedInUser.phone || "",
      companyName: loggedInUser.companyName,
      address1: loggedInUser.address1 || "On File",
      address2: loggedInUser.address2,
      city: loggedInUser.city || "On File",
      state: loggedInUser.state || "On File",
      postcode: loggedInUser.postcode || "000000",
      country: loggedInUser.country || "IN",
    });
  };

  const applyPromo = () => {
    if (!promoCode.trim()) return;
    setPromoApplied(true);
    toast({ title: "Promo Code", description: "Invalid or expired promo code.", variant: "destructive" });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Password copied to clipboard." });
  };

  // ===== ORDER CONFIRMATION VIEW =====
  if (orderConfirmation) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Success Header */}
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Order Successful!</h2>
            <p className="text-muted-foreground">Your order has been created and is being processed.</p>

            <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
              {(orderConfirmation.orderNum || orderConfirmation.orderId) && (
                <div className="px-3 py-1.5 rounded-lg bg-muted">
                  <span className="text-muted-foreground">Order Number:</span>{" "}
                  <span className="font-bold text-foreground">{orderConfirmation.orderNum || `#${orderConfirmation.orderId}`}</span>
                </div>
              )}
              {orderConfirmation.invoiceId && (
                <div className="px-3 py-1.5 rounded-lg bg-muted">
                  <span className="text-muted-foreground">Invoice:</span>{" "}
                  <span className="font-bold text-foreground">#{orderConfirmation.invoiceId}</span>
                </div>
              )}
              {orderConfirmation.paymentId && (
                <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10">
                  <span className="text-muted-foreground">Payment ID:</span>{" "}
                  <span className="font-bold text-emerald-600">{orderConfirmation.paymentId}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payment Cancelled Warning */}
        {orderConfirmation.paymentCancelled && !orderConfirmation.paymentId && (
          <Card className="border-amber-500/30 bg-amber-500/5">
            <CardContent className="p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground text-sm">Payment cancelled</p>
                <p className="text-sm text-muted-foreground">
                  Your order is saved. Invoice ID: #{orderConfirmation.invoiceId} — you can pay later from your dashboard.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* New Client Password */}
        {orderConfirmation.isNewClient && orderConfirmation.password && (
          <Card className="border-emerald-500/30 bg-emerald-500/5">
            <CardContent className="p-4">
              <p className="font-semibold text-foreground text-sm mb-2">
                🎉 Your account has been created — save your password:
              </p>
              <p className="text-xs text-muted-foreground mb-2">Use this same password to log in to your account later.</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 rounded-lg bg-muted font-mono text-sm text-foreground">
                  {orderConfirmation.password}
                </code>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(orderConfirmation.password!)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Order Items */}
        {orderConfirmation.items && orderConfirmation.items.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Order Items</h3>
              <div className="space-y-3">
                {orderConfirmation.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <span className="text-2xl shrink-0">
                      {item.icon === "globe" || item.category === "domain" ? "🌐" : "🖥️"}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.subtitle || `${item.action} · ${item.period}`}</p>
                    </div>
                    <span className="font-bold text-foreground shrink-0">
                      {item.price_formatted || fmt(item.amount || 0)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-foreground">Total Paid</span>
                <span className="text-xl font-black text-primary">
                  ₹{Number(orderConfirmation.total || 0).toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="/dashboard">
            <Button variant="outline">Go to Dashboard</Button>
          </a>
          <a href="/">
            <Button variant="ghost">Back to Home</Button>
          </a>
        </div>
      </div>
    );
  }

  // ===== CHECKOUT FORM VIEW =====
  return (
    <div className="space-y-6">
      <Button type="button" variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground mb-2" onClick={onBack}>
        <ArrowLeft className="w-4 h-4" />
        Back to Cart
      </Button>

      {/* Customer Type Toggle */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
            <button type="button" onClick={() => { setCustomerType("new"); setLoggedInUser(null); }}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${customerType === "new" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}>
              <UserPlus className="w-4 h-4" />New Customer
            </button>
            <button type="button" onClick={() => setCustomerType("existing")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${customerType === "existing" ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-foreground"}`}>
              <LogIn className="w-4 h-4" />Existing Customer
            </button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {customerType === "existing" ? (
            loggedInUser ? (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-full bg-primary/10">
                      <CheckCircle2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-foreground">Welcome back, {loggedInUser.firstName}!</h2>
                      <p className="text-sm text-muted-foreground">{loggedInUser.email}</p>
                    </div>
                  </div>
                  {loggedInUser.address1 && loggedInUser.address1 !== "On File" && (
                    <div className="text-sm text-muted-foreground mb-3 p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium text-foreground mb-1">Billing Address</p>
                      <p>{loggedInUser.address1}{loggedInUser.address2 ? `, ${loggedInUser.address2}` : ""}</p>
                      <p>{loggedInUser.city}, {loggedInUser.state} {loggedInUser.postcode}</p>
                    </div>
                  )}
                  {loggedInUser.domains && loggedInUser.domains.length > 0 && (
                    <div className="mb-5 p-3 bg-muted/50 rounded-lg">
                      <p className="font-medium text-foreground text-sm mb-2 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-primary" />Your Domains ({loggedInUser.domains.length})
                      </p>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {loggedInUser.domains.map((d: any, i: number) => (
                          <div key={i} className="text-sm text-muted-foreground flex items-center justify-between">
                            <span>{d.domainname || d.domain || d}</span>
                            <span className="text-xs capitalize px-2 py-0.5 rounded bg-primary/10 text-primary">{d.status || "Active"}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground mb-5">Your billing details are on file. Choose your payment method and complete your order.</p>
                  <PaymentMethodSelector paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <LogIn className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-bold text-foreground">Login to Your Account</h2>
                  </div>
                  <form onSubmit={loginForm.handleSubmit(handleExistingLogin)} className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="login-email" type="email" placeholder="you@example.com" className={`pl-10 ${loginForm.formState.errors.email ? "border-destructive" : ""}`} {...loginForm.register("email")} />
                      </div>
                      {loginForm.formState.errors.email && <p className="text-xs text-destructive">{loginForm.formState.errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="login-password" type="password" placeholder="••••••••" className={`pl-10 ${loginForm.formState.errors.password ? "border-destructive" : ""}`} {...loginForm.register("password")} />
                      </div>
                      {loginForm.formState.errors.password && <p className="text-xs text-destructive">{loginForm.formState.errors.password.message}</p>}
                    </div>
                    <Button type="submit" className="w-full btn-gradient h-11 font-semibold gap-2" disabled={isLoggingIn}>
                      {isLoggingIn ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                      {isLoggingIn ? "Verifying..." : "Login & Continue"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )
          ) : (
            /* ===== NEW CUSTOMER FORM ===== */
            <form id="new-customer-form" onSubmit={newForm.handleSubmit(onNewCustomerSubmit)} className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <User className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-bold text-foreground">Your Details</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
                      <Input id="firstName" placeholder="John" {...newForm.register("firstName")} className={newForm.formState.errors.firstName ? "border-destructive" : ""} />
                      {newForm.formState.errors.firstName && <p className="text-xs text-destructive">{newForm.formState.errors.firstName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
                      <Input id="lastName" placeholder="Doe" {...newForm.register("lastName")} className={newForm.formState.errors.lastName ? "border-destructive" : ""} />
                      {newForm.formState.errors.lastName && <p className="text-xs text-destructive">{newForm.formState.errors.lastName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="email" type="email" placeholder="john@example.com" className={`pl-10 ${newForm.formState.errors.email ? "border-destructive" : ""}`} {...newForm.register("email")} />
                      </div>
                      {newForm.formState.errors.email && <p className="text-xs text-destructive">{newForm.formState.errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="phone" type="tel" placeholder="+91 9876543210" className={`pl-10 ${newForm.formState.errors.phone ? "border-destructive" : ""}`} {...newForm.register("phone")} />
                      </div>
                      {newForm.formState.errors.phone && <p className="text-xs text-destructive">{newForm.formState.errors.phone.message}</p>}
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="password">Password <span className="text-destructive">*</span></Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="password" type="password" placeholder="Min 6 characters" className={`pl-10 ${newForm.formState.errors.password ? "border-destructive" : ""}`} {...newForm.register("password")} />
                      </div>
                      {newForm.formState.errors.password && <p className="text-xs text-destructive">{newForm.formState.errors.password.message}</p>}
                      <p className="text-[11px] text-muted-foreground">This will be your account password for managing services.</p>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="companyName">Company Name <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="companyName" placeholder="Acme Inc." className="pl-10" {...newForm.register("companyName")} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-bold text-foreground">Billing Address</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address1">Address Line 1 <span className="text-destructive">*</span></Label>
                      <Input id="address1" placeholder="123, Main Street" {...newForm.register("address1")} className={newForm.formState.errors.address1 ? "border-destructive" : ""} />
                      {newForm.formState.errors.address1 && <p className="text-xs text-destructive">{newForm.formState.errors.address1.message}</p>}
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address2">Address Line 2 <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                      <Input id="address2" placeholder="Apartment, suite, etc." {...newForm.register("address2")} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City <span className="text-destructive">*</span></Label>
                      <Input id="city" placeholder="Mumbai" {...newForm.register("city")} className={newForm.formState.errors.city ? "border-destructive" : ""} />
                      {newForm.formState.errors.city && <p className="text-xs text-destructive">{newForm.formState.errors.city.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State <span className="text-destructive">*</span></Label>
                      <Select onValueChange={(val) => newForm.setValue("state", val)} defaultValue="">
                        <SelectTrigger className={newForm.formState.errors.state ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          {indianStates.map((state) => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {newForm.formState.errors.state && <p className="text-xs text-destructive">{newForm.formState.errors.state.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postcode">Postcode / ZIP <span className="text-destructive">*</span></Label>
                      <Input id="postcode" placeholder="400001" {...newForm.register("postcode")} className={newForm.formState.errors.postcode ? "border-destructive" : ""} />
                      {newForm.formState.errors.postcode && <p className="text-xs text-destructive">{newForm.formState.errors.postcode.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country <span className="text-destructive">*</span></Label>
                      <Select onValueChange={(val) => newForm.setValue("country", val)} defaultValue="IN">
                        <SelectTrigger><SelectValue placeholder="Select Country" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="IN">🇮🇳 India</SelectItem>
                          <SelectItem value="US">🇺🇸 United States</SelectItem>
                          <SelectItem value="GB">🇬🇧 United Kingdom</SelectItem>
                          <SelectItem value="AE">🇦🇪 UAE</SelectItem>
                          <SelectItem value="SG">🇸🇬 Singapore</SelectItem>
                          <SelectItem value="AU">🇦🇺 Australia</SelectItem>
                          <SelectItem value="CA">🇨🇦 Canada</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="gstNumber">GST Number <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                      <Input id="gstNumber" placeholder="22AAAAA0000A1Z5" {...newForm.register("gstNumber")} />
                    </div>
                    {items.some((i) => i.type !== "domain") && (
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="hostingDomain">Domain for Hosting <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input id="hostingDomain" placeholder="example.com" className="pl-10" {...newForm.register("hostingDomain")} />
                        </div>
                        <p className="text-[11px] text-muted-foreground">Enter the domain you want to host. Leave blank to set up later.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <PaymentMethodSelector paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
            </form>
          )}
        </div>

        {/* ===== ORDER SUMMARY SIDEBAR ===== */}
        <div className="lg:col-span-1">
          <Card className="sticky top-28">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Order Summary</h3>

              <div className="space-y-3 text-sm">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <span className="text-base shrink-0">{item.type === "domain" ? "🌐" : "🖥️"}</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.type === "domain" ? `Register · ${item.period}` : `${item.label} · ${item.period}`}
                      </p>
                    </div>
                    <span className="font-medium text-foreground shrink-0">₹{item.price.toFixed(2)}</span>
                  </div>
                ))}
                {selectedAddons.map((addon) => (
                  <div key={addon.id} className="flex justify-between text-muted-foreground">
                    <span className="truncate mr-2">{addon.name}</span>
                    <span className="font-medium text-foreground shrink-0">₹{addon.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">₹{subtotal.toFixed(2)}</span>
                </div>
                {addonsTotal > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Add-ons</span>
                    <span className="font-medium text-foreground">₹{addonsTotal.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>GST @ 18%</span>
                  <span className="font-medium text-foreground">₹{gstAmount.toFixed(2)}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-foreground">Total</span>
                <span className="text-2xl font-black text-primary">₹{grandTotal.toFixed(2)}</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">Inclusive of 18% GST</p>

              {/* Promo Code */}
              <div className="mt-4 mb-4">
                <Label className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                  <Tag className="w-3 h-3" />Promo Code
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input placeholder="Enter code" value={promoCode} onChange={(e) => { setPromoCode(e.target.value); setPromoApplied(false); }} className="h-9 text-sm" />
                  <Button type="button" variant="outline" size="sm" onClick={applyPromo} className="shrink-0">Apply</Button>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Terms */}
              <label htmlFor="terms" className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 ${agreedToTerms ? "border-border bg-transparent" : "border-border hover:border-primary/30"}`}>
                <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={(val) => setAgreedToTerms(!!val)} />
                <span className="text-xs text-muted-foreground leading-tight">
                  I agree to the{" "}
                  <a href="/terms" target="_blank" className="text-primary underline" onClick={(e) => e.stopPropagation()}>Terms of Service</a>,{" "}
                  <a href="/privacy" target="_blank" className="text-primary underline" onClick={(e) => e.stopPropagation()}>Privacy Policy</a>, and{" "}
                  <a href="/refund" target="_blank" className="text-primary underline" onClick={(e) => e.stopPropagation()}>Refund Policy</a>.
                </span>
              </label>

              {/* CTA */}
              {customerType === "new" ? (
                <Button type="submit" form="new-customer-form" className="w-full btn-gradient mt-5 h-12 text-base font-bold gap-2" disabled={newForm.formState.isSubmitting || isProcessing}>
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              ) : loggedInUser ? (
                <Button type="button" className="w-full btn-gradient mt-5 h-12 text-base font-bold gap-2" disabled={isProcessing} onClick={handleExistingPay}>
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              ) : (
                <p className="text-xs text-muted-foreground text-center mt-5">Please login to continue checkout.</p>
              )}

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                <CheckCircle2 className="w-3 h-3" />
                <span>Secure 256-bit SSL Encrypted Checkout</span>
              </div>
              <div className="mt-3 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground text-center">
                30-Day Money-Back Guarantee
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const PaymentMethodSelector = ({ paymentMethod, setPaymentMethod }: { paymentMethod: string; setPaymentMethod: (v: string) => void }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center gap-2 mb-5">
        <CreditCard className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Payment Method</h2>
      </div>
      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
        {[
          { value: "razorpay", icon: Wallet, label: "Razorpay", desc: "Credit/Debit Card, UPI, Net Banking, Wallets" },
          { value: "upi", icon: Smartphone, label: "UPI Direct", desc: "Google Pay, PhonePe, Paytm, BHIM UPI" },
          { value: "bank", icon: Landmark, label: "Bank Transfer / NEFT", desc: "Direct bank transfer (manual verification)" },
        ].map((method) => (
          <label key={method.value} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${paymentMethod === method.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
            <RadioGroupItem value={method.value} />
            <div className={`p-2 rounded-lg ${paymentMethod === method.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              <method.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{method.label}</p>
              <p className="text-xs text-muted-foreground">{method.desc}</p>
            </div>
          </label>
        ))}
      </RadioGroup>
    </CardContent>
  </Card>
);

export default CheckoutForm;
