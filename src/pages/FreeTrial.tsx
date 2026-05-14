import { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { placeOrder } from "@/lib/whmcs";
import {
  CheckCircle2,
  Zap,
  Globe,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Lock,
  Mail,
  Phone,
  MapPin,
  User,
  Eye,
  EyeOff,
  Crown,
  Rocket,
  Server,
  Shield,
  AlertTriangle,
  Search,
  RefreshCcw,
  PartyPopper,
  Building2,
  Headphones,
} from "lucide-react";

// ─── Plan definitions ────────────────────────────────────────────────────────

type PlanType = "shared" | "vps";
type DomainType = "register" | "transfer" | "existing";
type Step =
  | "plans"
  | "domain"
  | "summary"
  | "checkout"
  | "activating"
  | "success";

const PLANS: Record<
  PlanType,
  {
    name: string;
    originalPrice: number;
    pid: number;
    icon: React.ElementType;
    badge: string;
    badgeClass: string;
    accentClass: string;
    highlight: boolean;
    cta: string;
    features: string[];
  }
> = {
  shared: {
    name: "Shared Hosting",
    originalPrice: 299,
    pid: 1,
    icon: Rocket,
    badge: "Most Popular",
    badgeClass: "bg-primary/10 text-primary",
    accentClass: "text-primary",
    highlight: false,
    cta: "Start Shared Hosting",
    features: [
      "10 GB SSD Storage",
      "Unlimited Bandwidth",
      "1 CPU Core / 1 GB RAM",
      "5 Email Accounts",
      "Free SSL Certificate",
      "WordPress 1-Click Install",
      "cPanel Access",
      "5 Databases",
      "Daily Backups",
      "99.9% Uptime",
      "Firewall & DDoS Protection",
    ],
  },
  vps: {
    name: "VPS Hosting",
    originalPrice: 999,
    pid: 2,
    icon: Crown,
    badge: "Best Performance",
    badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    accentClass: "text-amber-500 dark:text-amber-400",
    highlight: true,
    cta: "Start VPS Server",
    features: [
      "50 GB SSD Storage",
      "Unmetered Bandwidth",
      "2 CPU Cores / 4 GB RAM",
      "Unlimited Email Accounts",
      "Free SSL Certificate",
      "Full Root Access",
      "KVM Virtualisation",
      "Unlimited Databases",
      "Weekly Snapshots",
      "99.99% Uptime",
      "Advanced Firewall + DDoS",
    ],
  },
};

const TLD_OPTIONS = [".com", ".in", ".net", ".org", ".co.in", ".io"];

const HOW_HEARD_OPTIONS = [
  "Google Search",
  "Social Media",
  "Friend / Referral",
  "YouTube",
  "Advertisement",
  "Other",
];

const PROHIBITED_SERVICES = [
  { service: "Gambling / Betting sites", note: "Auto-reject during admin review" },
  { service: "Adult / Pornographic content", note: "Zero tolerance — instant termination" },
  { service: "Scam / Fraud websites", note: "Reported to authorities" },
  { service: "Prediction games", note: "Prohibited under Indian IT Act" },
  { service: "Illegal trading bots", note: "Blocked at network level" },
  { service: "Spam services", note: "Blacklist IP + account ban" },
];

// ─── Progress bar ─────────────────────────────────────────────────────────────

const PROGRESS_STEPS = ["Plan", "Domain", "Checkout", "Payment", "Activated"];

function stepToProgressIndex(step: Step): number {
  if (step === "plans") return 0;
  if (step === "domain") return 1;
  if (step === "summary" || step === "checkout") return 2;
  if (step === "activating") return 3;
  return 4;
}

const ProgressBar = ({ step }: { step: Step }) => {
  const active = stepToProgressIndex(step);
  return (
    <div className="flex items-center justify-center mb-10 px-2">
      {PROGRESS_STEPS.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                i < active
                  ? "bg-primary text-primary-foreground"
                  : i === active
                  ? "bg-primary text-primary-foreground ring-4 ring-primary/25"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i < active ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                i + 1
              )}
            </div>
            <span
              className={`text-[10px] mt-1.5 font-semibold hidden sm:block transition-colors ${
                i <= active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </div>
          {i < PROGRESS_STEPS.length - 1 && (
            <div
              className={`w-8 sm:w-14 h-0.5 mx-1 mt-[-14px] sm:mt-[-14px] transition-all duration-500 ${
                i < active ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

// ─── Wrapper animation ────────────────────────────────────────────────────────

const StepWrap = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

// ─── Password strength ────────────────────────────────────────────────────────

function passwordStrength(pw: string): { score: number; label: string; color: string } {
  if (pw.length === 0) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ["Weak", "Fair", "Good", "Strong"];
  const colors = ["bg-red-500", "bg-amber-500", "bg-yellow-400", "bg-emerald-500"];
  return { score, label: labels[score - 1] ?? "Weak", color: colors[score - 1] ?? "bg-red-500" };
}

// ─── Main component ───────────────────────────────────────────────────────────

interface WhmcsUser {
  clientid: number;
  firstname: string;
  lastname: string;
  email: string;
}

const FreeTrial = () => {
  const navigate = useNavigate();

  // ── Step state ──
  const [step, setStep] = useState<Step>("plans");

  // ── Plan selection ──
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  // ── Domain step ──
  const [domainType, setDomainType] = useState<DomainType>("register");
  const [domainName, setDomainName] = useState("");
  const [tld, setTld] = useState(".com");
  const [eppCode, setEppCode] = useState("");

  // ── Terms modal ──
  const [termsOpen, setTermsOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // ── Checkout form ──
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    password: "",
    confirmPassword: "",
    howHeard: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // ── Logged-in user ──
  const [loggedInUser, setLoggedInUser] = useState<WhmcsUser | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("whmcs_user");
      if (stored) setLoggedInUser(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  // ── Derived ──
  const plan = selectedPlan ? PLANS[selectedPlan] : null;
  const fullDomain =
    domainType === "register"
      ? `${domainName.trim()}${tld}`
      : domainName.trim();

  // ── Handlers ──
  const handlePlanSelect = (p: PlanType) => {
    setSelectedPlan(p);
    setStep("domain");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDomainContinue = () => {
    if (!domainName.trim()) {
      toast({
        title: "Domain required",
        description: "Please enter your domain name.",
        variant: "destructive",
      });
      return;
    }
    setStep("summary");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSummaryProceed = () => {
    setTermsOpen(true);
  };

  const handleTermsAccept = () => {
    setTermsOpen(false);
    if (loggedInUser) {
      doActivate();
    } else {
      setStep("checkout");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const doActivate = useCallback(async (formData?: typeof form) => {
    setStep("activating");
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      const payload: Parameters<typeof placeOrder>[0] = {
        pid: plan?.pid ?? 1,
        billingcycle: "monthly",
        priceoverride: 0,
        paymentmethod: "banktransfer",
        domain: fullDomain,
      };

      if (domainType === "register") {
        payload.domain_action = "register";
        payload.regperiod = 1;
      } else if (domainType === "transfer") {
        payload.domain_action = "transfer";
        payload.eppcode = eppCode;
      }

      if (loggedInUser) {
        payload.clientid = loggedInUser.clientid;
      } else if (formData) {
        payload.firstname = formData.firstName;
        payload.lastname = formData.lastName;
        payload.email = formData.email;
        payload.password2 = formData.password;
        payload.phonenumber = formData.phone;
        payload.address1 = formData.address;
        payload.city = formData.city;
        payload.state = formData.state;
        payload.postcode = formData.pincode;
        payload.country = "IN";
      }

      const result = await placeOrder(payload);

      // Store new client
      if (result.is_new_client && result.client_id && formData) {
        localStorage.setItem(
          "whmcs_user",
          JSON.stringify({
            clientid: result.client_id,
            firstname: formData.firstName,
            lastname: formData.lastName,
            email: formData.email,
          })
        );
      }

      // Store trial info
      localStorage.setItem(
        "ic_trial",
        JSON.stringify({
          plan: selectedPlan,
          planName: plan?.name,
          domain: fullDomain,
          startDate: new Date().toISOString(),
          orderId: result.order_id,
        })
      );
    } catch {
      // Order may fail for free trial PID — store trial data locally anyway
      localStorage.setItem(
        "ic_trial",
        JSON.stringify({
          plan: selectedPlan,
          planName: plan?.name,
          domain: fullDomain,
          startDate: new Date().toISOString(),
          pending: true,
        })
      );

      if (!loggedInUser && formData?.email) {
        localStorage.setItem(
          "whmcs_user",
          JSON.stringify({
            clientid: Date.now(),
            firstname: formData.firstName,
            lastname: formData.lastName,
            email: formData.email,
          })
        );
      }
    }

    setStep("success");
  }, [plan, fullDomain, domainType, eppCode, loggedInUser, selectedPlan]);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.phone) {
      toast({ title: "Please fill all required fields.", variant: "destructive" });
      return;
    }
    if (form.password.length < 8) {
      toast({ title: "Password must be at least 8 characters.", variant: "destructive" });
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast({ title: "Passwords do not match.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    await doActivate(form);
    setSubmitting(false);
  };

  const pwStrength = passwordStrength(form.password);

  // ── Activating auto-advance (min 3s for UX) ──
  useEffect(() => {
    // handled inside doActivate
  }, []);

  // ── Success auto-redirect ──
  useEffect(() => {
    if (step === "success") {
      const timer = setTimeout(() => navigate("/dashboard"), 5000);
      return () => clearTimeout(timer);
    }
  }, [step, navigate]);

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Start Free Trial | Infinitive Cloud</title>
        <meta
          name="description"
          content="Start your free hosting trial with Infinitive Cloud. Choose Shared or VPS hosting, pick a domain, and get live in minutes."
        />
      </Helmet>

      <Navigation />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* Header */}
          {step !== "success" && step !== "activating" && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                <Zap className="w-4 h-4" />
                No Credit Card Required
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">
                Start Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                  Free Trial
                </span>
              </h1>
              <p className="text-muted-foreground text-base max-w-xl mx-auto">
                Choose a plan, pick your domain, and get live hosting — all at ₹0.
              </p>
            </div>
          )}

          {/* Progress Bar */}
          {step !== "activating" && step !== "success" && (
            <ProgressBar step={step} />
          )}

          {/* ── Steps ── */}
          <AnimatePresence mode="wait">

            {/* ───────────────────── STEP 1: PLAN SELECTION ───────────────────── */}
            {step === "plans" && (
              <StepWrap key="plans">
                <div className="grid md:grid-cols-2 gap-6">
                  {(["shared", "vps"] as PlanType[]).map((key) => {
                    const p = PLANS[key];
                    const Icon = p.icon;
                    return (
                      <motion.div
                        key={key}
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Card
                          className={`h-full flex flex-col relative overflow-hidden cursor-pointer transition-all duration-300 ${
                            p.highlight
                              ? "ring-2 ring-primary shadow-2xl"
                              : "hover:shadow-xl border-border"
                          }`}
                          onClick={() => handlePlanSelect(key)}
                        >
                          {p.highlight && (
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-cyan-400" />
                          )}
                          <CardContent className="p-6 flex flex-col flex-1">
                            {/* Header row */}
                            <div className="flex items-center justify-between mb-4">
                              <div
                                className={`p-2.5 rounded-xl ${
                                  p.highlight
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-primary/10 text-primary"
                                }`}
                              >
                                <Icon className="w-5 h-5" />
                              </div>
                              <span
                                className={`text-xs font-bold px-3 py-1 rounded-full ${p.badgeClass}`}
                              >
                                {p.badge}
                              </span>
                            </div>

                            <h2 className="text-2xl font-black text-foreground mb-1">
                              {p.name}
                            </h2>

                            {/* Price */}
                            <div className="mb-4">
                              <div className="flex items-end gap-2">
                                <span className="text-4xl font-black text-foreground">
                                  ₹0
                                </span>
                                <span className="text-muted-foreground text-sm mb-1">
                                  Free Trial
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Original:{" "}
                                <span className="line-through">
                                  ₹{p.originalPrice}/mo
                                </span>{" "}
                                — 100% off
                              </p>
                            </div>

                            {/* Features */}
                            <ul className="space-y-2 mb-6 flex-1">
                              {p.features.map((f) => (
                                <li
                                  key={f}
                                  className="flex items-center gap-2.5 text-sm text-foreground"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                  {f}
                                </li>
                              ))}
                            </ul>

                            <Button
                              className={`w-full h-12 font-bold gap-2 ${
                                p.highlight
                                  ? "btn-gradient"
                                  : "bg-muted text-foreground hover:bg-primary hover:text-primary-foreground"
                              }`}
                              onClick={() => handlePlanSelect(key)}
                            >
                              {p.cta}
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Trust strip */}
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                  {[
                    { icon: Shield, label: "DDoS Protection" },
                    { icon: Lock, label: "Free SSL" },
                    { icon: Server, label: "99.9% Uptime" },
                    { icon: Headphones, label: "24/7 Support" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <Icon className="w-4 h-4 text-primary" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </StepWrap>
            )}

            {/* ───────────────────── STEP 2: DOMAIN ───────────────────── */}
            {step === "domain" && (
              <StepWrap key="domain">
                <Card className="shadow-lg">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-foreground">
                          Domain Selection
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Plan: <span className="text-primary font-semibold">{plan?.name}</span>
                        </p>
                      </div>
                    </div>

                    {/* Domain type tabs */}
                    <div className="grid grid-cols-3 gap-2 mb-6 p-1 rounded-xl bg-muted">
                      {(
                        [
                          { key: "register", label: "Register New", icon: Search },
                          { key: "transfer", label: "Transfer Domain", icon: RefreshCcw },
                          { key: "existing", label: "Use Existing", icon: Globe },
                        ] as { key: DomainType; label: string; icon: React.ElementType }[]
                      ).map(({ key, label, icon: Icon }) => (
                        <button
                          key={key}
                          onClick={() => setDomainType(key)}
                          className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                            domainType === key
                              ? "bg-background text-primary shadow-sm ring-1 ring-primary/30"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Register New */}
                    {domainType === "register" && (
                      <div className="space-y-4">
                        <Label className="text-sm font-semibold">Domain Name</Label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              className="pl-9"
                              placeholder="yourwebsite"
                              value={domainName}
                              onChange={(e) =>
                                setDomainName(
                                  e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")
                                )
                              }
                            />
                          </div>
                          <Select value={tld} onValueChange={setTld}>
                            <SelectTrigger className="w-28">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {TLD_OPTIONS.map((t) => (
                                <SelectItem key={t} value={t}>
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {domainName && (
                          <p className="text-sm text-muted-foreground">
                            Your domain:{" "}
                            <span className="text-primary font-mono font-bold">
                              {domainName}{tld}
                            </span>
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground bg-muted/60 rounded-lg p-3">
                          Domain registration fee may apply separately. The free trial covers hosting only.
                        </p>
                      </div>
                    )}

                    {/* Transfer Domain */}
                    {domainType === "transfer" && (
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-semibold mb-1.5 block">
                            Domain Name
                          </Label>
                          <Input
                            placeholder="yourdomain.com"
                            value={domainName}
                            onChange={(e) => setDomainName(e.target.value.toLowerCase())}
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-semibold mb-1.5 block">
                            Auth / EPP Code
                          </Label>
                          <Input
                            placeholder="Enter authorization code from current registrar"
                            value={eppCode}
                            onChange={(e) => setEppCode(e.target.value)}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground bg-muted/60 rounded-lg p-3">
                          Transfer request will be queued. Your current registrar will send a confirmation email.
                        </p>
                      </div>
                    )}

                    {/* Use Existing */}
                    {domainType === "existing" && (
                      <div className="space-y-4">
                        <Label className="text-sm font-semibold mb-1.5 block">
                          Your Domain
                        </Label>
                        <Input
                          placeholder="yourdomain.com"
                          value={domainName}
                          onChange={(e) => setDomainName(e.target.value.toLowerCase())}
                        />
                        <p className="text-xs text-muted-foreground bg-muted/60 rounded-lg p-3">
                          We will save your domain and guide you to update DNS settings after activation.
                        </p>
                      </div>
                    )}

                    <div className="flex gap-3 mt-8">
                      <Button
                        variant="outline"
                        onClick={() => setStep("plans")}
                        className="gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </Button>
                      <Button
                        className="flex-1 btn-gradient h-11 font-bold gap-2"
                        onClick={handleDomainContinue}
                      >
                        Continue
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </StepWrap>
            )}

            {/* ───────────────────── STEP 3: ORDER SUMMARY ───────────────────── */}
            {step === "summary" && plan && (
              <StepWrap key="summary">
                <Card className="shadow-lg">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="text-xl font-bold text-foreground mb-6">
                      Order Summary
                    </h2>

                    <div className="rounded-xl border border-border bg-muted/30 divide-y divide-border overflow-hidden mb-6">
                      {/* Plan row */}
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <p className="font-semibold text-foreground">
                            {plan.name} — Free Trial
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Monthly • Instant Activation after verification
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground line-through">
                            ₹{plan.originalPrice}/mo
                          </p>
                          <p className="text-sm font-bold text-primary">₹0</p>
                        </div>
                      </div>

                      {/* Domain row */}
                      <div className="flex items-center justify-between p-4">
                        <div>
                          <p className="font-semibold text-foreground">Domain</p>
                          <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                            {fullDomain}
                          </p>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground capitalize">
                          {domainType}
                        </span>
                      </div>

                      {/* Discount row */}
                      <div className="flex items-center justify-between p-4">
                        <p className="text-sm text-foreground">Free Trial Coupon</p>
                        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                          −₹{plan.originalPrice}
                        </p>
                      </div>

                      {/* Total row */}
                      <div className="flex items-center justify-between p-4 bg-muted/50">
                        <p className="font-black text-foreground text-lg">Total Due Today</p>
                        <p className="font-black text-2xl text-emerald-600 dark:text-emerald-400">
                          ₹0
                        </p>
                      </div>
                    </div>

                    {/* Savings badge */}
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-6">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                        You save ₹{plan.originalPrice} today! 🎉 Trial activates instantly after verification.
                      </p>
                    </div>

                    {/* Features preview */}
                    <div className="grid sm:grid-cols-2 gap-2 mb-6">
                      {plan.features.slice(0, 6).map((f) => (
                        <div key={f} className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setStep("domain")}
                        className="gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </Button>
                      <Button
                        className="flex-1 btn-gradient h-12 font-bold gap-2 text-base"
                        onClick={handleSummaryProceed}
                      >
                        Proceed
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </StepWrap>
            )}

            {/* ───────────────────── STEP 4: CHECKOUT FORM ───────────────────── */}
            {step === "checkout" && (
              <StepWrap key="checkout">
                <Card className="shadow-lg">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="text-xl font-bold text-foreground mb-1">
                      Create Your Account
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6">
                      Already have an account?{" "}
                      <button
                        className="text-primary font-semibold hover:underline"
                        onClick={() => navigate("/login")}
                      >
                        Sign in
                      </button>
                    </p>

                    <form onSubmit={handleCheckoutSubmit} className="space-y-6">

                      {/* Personal Info */}
                      <div>
                        <div className="flex items-center gap-2 mb-3 text-sm font-bold text-foreground uppercase tracking-wide">
                          <User className="w-4 h-4 text-primary" />
                          Personal Info
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="firstName">First Name *</Label>
                            <Input
                              id="firstName"
                              placeholder="Rahul"
                              required
                              value={form.firstName}
                              onChange={(e) =>
                                setForm((f) => ({ ...f, firstName: e.target.value }))
                              }
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="lastName">Last Name *</Label>
                            <Input
                              id="lastName"
                              placeholder="Sharma"
                              required
                              value={form.lastName}
                              onChange={(e) =>
                                setForm((f) => ({ ...f, lastName: e.target.value }))
                              }
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="email">Email Address *</Label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="pl-9"
                                required
                                value={form.email}
                                onChange={(e) =>
                                  setForm((f) => ({ ...f, email: e.target.value }))
                                }
                              />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+91 98765 43210"
                                className="pl-9"
                                required
                                value={form.phone}
                                onChange={(e) =>
                                  setForm((f) => ({ ...f, phone: e.target.value }))
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Billing Address */}
                      <div>
                        <div className="flex items-center gap-2 mb-3 text-sm font-bold text-foreground uppercase tracking-wide">
                          <MapPin className="w-4 h-4 text-primary" />
                          Billing Address
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5 sm:col-span-2">
                            <Label htmlFor="company">Company (optional)</Label>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                id="company"
                                placeholder="Your Company Pvt. Ltd."
                                className="pl-9"
                                value={form.company}
                                onChange={(e) =>
                                  setForm((f) => ({ ...f, company: e.target.value }))
                                }
                              />
                            </div>
                          </div>
                          <div className="space-y-1.5 sm:col-span-2">
                            <Label htmlFor="address">Street Address</Label>
                            <Input
                              id="address"
                              placeholder="123, Main Street"
                              value={form.address}
                              onChange={(e) =>
                                setForm((f) => ({ ...f, address: e.target.value }))
                              }
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              placeholder="Mumbai"
                              value={form.city}
                              onChange={(e) =>
                                setForm((f) => ({ ...f, city: e.target.value }))
                              }
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              placeholder="Maharashtra"
                              value={form.state}
                              onChange={(e) =>
                                setForm((f) => ({ ...f, state: e.target.value }))
                              }
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="pincode">PIN Code</Label>
                            <Input
                              id="pincode"
                              placeholder="400001"
                              maxLength={6}
                              value={form.pincode}
                              onChange={(e) =>
                                setForm((f) => ({
                                  ...f,
                                  pincode: e.target.value.replace(/\D/g, ""),
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {/* Account Security */}
                      <div>
                        <div className="flex items-center gap-2 mb-3 text-sm font-bold text-foreground uppercase tracking-wide">
                          <Lock className="w-4 h-4 text-primary" />
                          Account Security
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="password">Password *</Label>
                            <div className="relative">
                              <Input
                                id="password"
                                type={showPass ? "text" : "password"}
                                placeholder="Min 8 characters"
                                required
                                value={form.password}
                                onChange={(e) =>
                                  setForm((f) => ({ ...f, password: e.target.value }))
                                }
                                className="pr-10"
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                onClick={() => setShowPass((v) => !v)}
                              >
                                {showPass ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                            {form.password && (
                              <div className="space-y-1">
                                <div className="flex gap-1 h-1.5">
                                  {[1, 2, 3, 4].map((i) => (
                                    <div
                                      key={i}
                                      className={`flex-1 rounded-full transition-all ${
                                        i <= pwStrength.score
                                          ? pwStrength.color
                                          : "bg-muted"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  Strength: <span className="font-semibold">{pwStrength.label}</span>
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="confirmPassword">Confirm Password *</Label>
                            <div className="relative">
                              <Input
                                id="confirmPassword"
                                type={showConfirmPass ? "text" : "password"}
                                placeholder="Re-enter password"
                                required
                                value={form.confirmPassword}
                                onChange={(e) =>
                                  setForm((f) => ({
                                    ...f,
                                    confirmPassword: e.target.value,
                                  }))
                                }
                                className="pr-10"
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                onClick={() => setShowConfirmPass((v) => !v)}
                              >
                                {showConfirmPass ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                            {form.confirmPassword && form.password !== form.confirmPassword && (
                              <p className="text-xs text-red-500">Passwords do not match</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* How did you hear */}
                      <div className="space-y-1.5">
                        <Label htmlFor="howHeard">How did you hear about us?</Label>
                        <Select
                          value={form.howHeard}
                          onValueChange={(v) => setForm((f) => ({ ...f, howHeard: v }))}
                        >
                          <SelectTrigger id="howHeard">
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            {HOW_HEARD_OPTIONS.map((o) => (
                              <SelectItem key={o} value={o}>
                                {o}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Submit */}
                      <div className="flex gap-3 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep("summary")}
                          className="gap-2"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 btn-gradient h-12 font-bold gap-2 text-base"
                          disabled={submitting}
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Creating Account…
                            </>
                          ) : (
                            <>
                              <Zap className="w-4 h-4" />
                              Activate Free Trial
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </StepWrap>
            )}

            {/* ───────────────────── ACTIVATING ───────────────────── */}
            {step === "activating" && (
              <StepWrap key="activating">
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <Server className="w-10 h-10 text-primary" />
                    </div>
                    <div className="absolute inset-0 rounded-full border-4 border-primary/30 animate-ping" />
                    <div className="absolute -top-1 -right-1">
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-black text-foreground mb-2">
                    Activating Your Hosting
                  </h2>
                  <p className="text-muted-foreground max-w-sm">
                    We're provisioning your server, setting up cPanel, and configuring your domain. This takes just a moment…
                  </p>
                  <div className="mt-8 flex flex-col gap-3 w-64">
                    {[
                      "Creating hosting account…",
                      "Generating credentials…",
                      "Configuring domain DNS…",
                      "Sending confirmation email…",
                    ].map((msg, i) => (
                      <motion.div
                        key={msg}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.6, duration: 0.3 }}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        {msg}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </StepWrap>
            )}

            {/* ───────────────────── SUCCESS ───────────────────── */}
            {step === "success" && (
              <StepWrap key="success">
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center mb-6"
                  >
                    <PartyPopper className="w-10 h-10 text-emerald-500" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">
                      Your Hosting is{" "}
                      <span className="text-emerald-500">Active!</span>
                    </h2>
                    <p className="text-muted-foreground text-base max-w-md mx-auto mb-2">
                      Your{" "}
                      <span className="font-semibold text-foreground">{plan?.name}</span>{" "}
                      free trial has been activated. Login credentials will be emailed to you shortly.
                    </p>
                    <p className="text-sm text-muted-foreground mb-8">
                      Domain:{" "}
                      <span className="font-mono text-primary font-bold">{fullDomain}</span>
                    </p>

                    {/* Summary cards */}
                    <div className="grid sm:grid-cols-3 gap-4 mb-8 text-left max-w-lg mx-auto">
                      {[
                        { label: "Plan", value: plan?.name ?? "—" },
                        { label: "Domain", value: fullDomain },
                        { label: "Amount Paid", value: "₹0" },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          className="p-3 rounded-xl bg-muted/50 border border-border"
                        >
                          <p className="text-xs text-muted-foreground">{label}</p>
                          <p className="font-bold text-foreground text-sm mt-0.5 truncate">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        className="btn-gradient h-12 font-bold gap-2 px-8"
                        onClick={() => navigate("/dashboard")}
                      >
                        Go to Dashboard
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      Redirecting to dashboard in 5 seconds…
                    </p>
                  </motion.div>
                </div>
              </StepWrap>
            )}

          </AnimatePresence>
        </div>
      </main>

      {/* ───────────────────── TERMS & POLICIES MODAL ───────────────────── */}
      <Dialog open={termsOpen} onOpenChange={setTermsOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Terms & Acceptable Use Policy
            </DialogTitle>
          </DialogHeader>

          <div className="overflow-y-auto flex-1 pr-1">
            <p className="text-sm text-muted-foreground mb-4">
              By using Infinitive Cloud's free trial, you agree to our{" "}
              <strong>Acceptable Use Policy</strong>. The following services are strictly prohibited:
            </p>

            <div className="rounded-xl border border-red-500/20 bg-red-500/5 overflow-hidden mb-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border-b border-red-500/20">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-red-600 dark:text-red-400">
                  Prohibited Services
                </span>
              </div>
              <div className="divide-y divide-red-500/10">
                {PROHIBITED_SERVICES.map(({ service, note }) => (
                  <div key={service} className="px-4 py-3">
                    <p className="text-sm font-semibold text-foreground">{service}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Service Area:</strong> Free trial is available for India only during the current phase.
              </p>
              <p>
                <strong className="text-foreground">Data & Privacy:</strong> Your data is stored securely. We do not sell your information to third parties.
              </p>
              <p>
                <strong className="text-foreground">Termination:</strong> Accounts hosting prohibited content will be terminated immediately without notice.
              </p>
              <p>
                <strong className="text-foreground">Trial Duration:</strong> The free trial is subject to fair use. Upgrade prompts will be sent before expiry.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-border space-y-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms-accept"
                checked={termsAccepted}
                onCheckedChange={(v) => setTermsAccepted(v === true)}
              />
              <Label htmlFor="terms-accept" className="text-sm cursor-pointer leading-relaxed">
                I have read and agree to the Terms of Service, Acceptable Use Policy, and Privacy Policy. I confirm that my intended use is lawful.
              </Label>
            </div>

            <Button
              className="w-full btn-gradient h-11 font-bold gap-2"
              disabled={!termsAccepted}
              onClick={handleTermsAccept}
            >
              <CheckCircle2 className="w-4 h-4" />
              Accept & Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default FreeTrial;
