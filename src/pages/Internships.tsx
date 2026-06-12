import { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Brain,
  Cloud,
  Megaphone,
  Shield,
  Code2,
  Rocket,
  Users,
  Award,
  Building2,
  CheckCircle2,
  Upload,
  ArrowRight,
  Loader2,
  Phone,
  Mail,
  QrCode,
  Sparkles,
  ChevronRight,
} from "lucide-react";

// ─── Config ───────────────────────────────────────────────────────────────────
// NOTE: non-AJAX endpoint — FormSubmit only attaches file uploads on a real
// multipart form POST. The /ajax/ JSON endpoint silently drops attachments.
const FORMSUBMIT_URL = "https://formsubmit.co/careers@infinitivecloud.com";
const SHEETS_SCRIPT_URL = import.meta.env.VITE_INTERNSHIP_FORM_URL as string | undefined;
const PAGE_URL = "https://infinitivecloud.com/internships";
const ADMIN_EMAIL = "careers@infinitivecloud.com";

// ─── Data ─────────────────────────────────────────────────────────────────────
const PROGRAMS = [
  {
    id: "aiml",
    icon: Brain,
    label: "AI & Machine Learning",
    color: "from-violet-500 to-purple-600",
    badge: "Most Popular",
    duration: "3 – 6 months",
    description:
      "Build intelligent systems — supervised learning, deep learning, NLP, and model deployment on real cloud infrastructure.",
    skills: ["Python", "TensorFlow", "LLMs", "MLOps"],
  },
  {
    id: "cloud",
    icon: Cloud,
    label: "Cloud    & Devops",
    color: "from-sky-500 to-blue-600",
    badge: "Industry Leader",
    duration: "3 – 6 months",
    description:
      "Master AWS services, cloud architecture, auto-scaling, and infrastructure as code with hands-on live projects.",
    skills: ["AWS", "Terraform", "Docker", "Kubernetes"],
  },
  {
    id: "digital-marketing",
    icon: Megaphone,
    label: "Digital Marketing",
    color: "from-orange-500 to-amber-600",
    badge: "High Demand",
    duration: "3 – 6 months",
    description:
      "Plan and run real campaigns — SEO, paid ads, social media, email funnels, and analytics that drive measurable growth.",
    skills: ["SEO", "Google Ads", "Social Media", "Analytics"],
  },
  {
    id: "cyber",
    icon: Shield,
    label: "Cybersecurity",
    color: "from-red-500 to-rose-600",
    badge: "Future-Proof",
    duration: "3 – 6 months",
    description:
      "Ethical hacking, vulnerability assessment, SIEM tools, and network security — with real-world threat simulation.",
    skills: ["Kali Linux", "Wireshark", "OWASP", "SIEM"],
  },
  {
    id: "fullstack",
    icon: Code2,
    label: "Full Stack Development",
    color: "from-emerald-500 to-teal-600",
    badge: "All-rounder",
    duration: "3 – 6 months",
    description:
      "Modern MERN/Next.js stack development with REST APIs, databases, authentication, and cloud deployments.",
    skills: ["React", "Node.js", "MongoDB", "REST API"],
  },
];

const BENEFITS = [
  {
    icon: Rocket,
    title: "Live Industry Projects",
    description:
      "Work on real client projects hosted on Infinitive Cloud infrastructure — not dummy exercises.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Users,
    title: "1-on-1 Mentorship",
    description:
      "Weekly sessions with industry professionals who guide your technical and career growth.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: Award,
    title: "Industry Certification",
    description:
      "Receive Infinitive Cloud training certificates recognized by hiring partners across India.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Building2,
    title: "Industry Exposure",
    description:
      "Webinars with CTOs, guest lectures, HR sessions, and priority referrals to our hiring network.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Passout / Graduate"];
const PROGRAM_LABELS = PROGRAMS.map((p) => p.label);

// ─── Thank You Screen ─────────────────────────────────────────────────────────
const ThankYou = ({ name, onReset }: { name: string; onReset: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="py-16 text-center"
  >
    <div className="mx-auto w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
      <CheckCircle2 className="w-10 h-10 text-green-500" />
    </div>
    <h2 className="text-3xl font-bold mb-3">
      You're in, <span className="gradient-text">{name}!</span>
    </h2>
    <p className="text-muted-foreground max-w-md mx-auto mb-2">
      Your application has been received. Our team will review it and reach
      out within <strong>1–2 working days</strong> on your mobile &amp; email.
    </p>
    <p className="text-sm text-muted-foreground mb-8">
      Check your inbox (and spam folder) for a confirmation from{" "}
      <span className="text-primary font-medium">{ADMIN_EMAIL}</span>
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Button className="btn-gradient" onClick={onReset}>
        Apply for Another Program
      </Button>
      <Button variant="outline" asChild>
        <a href="/">Back to Home</a>
      </Button>
    </div>
  </motion.div>
);

// ─── Application Form ─────────────────────────────────────────────────────────
const ApplicationForm = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [city, setCity] = useState("");
  const [program, setProgram] = useState("");
  const [programOther, setProgramOther] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const submittedOnce = useRef(false);

  const handleReset = () => {
    setName(""); setMobile(""); setEmail(""); setCollege("");
    setCourse(""); setYear(""); setCity(""); setProgram(""); setProgramOther("");
    setResumeFile(null); setError(null); setSubmitted(false);
    submittedOnce.current = false;
    if (fileRef.current) fileRef.current.value = "";
  };

  // The form posts natively (multipart) to FormSubmit, targeting a hidden
  // iframe — this is the only way FormSubmit attaches the uploaded resume.
  // We don't preventDefault so the real POST goes through; we just kick off
  // the Sheets log and flip into the "submitting" state.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Guard: oversized resume — block the native submit.
    if (resumeFile && resumeFile.size > 5 * 1024 * 1024) {
      e.preventDefault();
      setError("Resume file must be under 5 MB.");
      return;
    }

    setError(null);
    submittedOnce.current = true;

    // CRITICAL: defer the "submitting" state to a macrotask. Setting it now
    // would disable every field before the browser serializes the form, and
    // disabled fields (including the resume) are NOT submitted — that's what
    // made the email arrive empty. setTimeout lets the native POST capture the
    // still-enabled fields first, then we flip the UI into its loading state.
    setTimeout(() => {
      setSubmitting(true);

      // Google Sheets via Apps Script (fire-and-forget) — never blocks the UI.
      if (SHEETS_SCRIPT_URL) {
        fetch(SHEETS_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            name, mobile, email, college, course, year, city,
            program: program === "Other" ? programOther : program,
            resumeName: resumeFile?.name ?? "",
          }),
        }).catch(() => {});
      }
    }, 0);
    // native submit continues → posts to hidden iframe → handleFrameLoad()
  };

  // Fires when the hidden iframe finishes loading FormSubmit's response.
  // Initial mount load is ignored via the submittedOnce guard.
  const handleFrameLoad = () => {
    if (!submittedOnce.current) return;
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) return <ThankYou name={name} onReset={handleReset} />;

  const inputCls =
    "w-full rounded-lg border border-input bg-background text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition placeholder:text-muted-foreground/60 disabled:opacity-50";
  const labelCls = "block text-sm font-medium text-foreground mb-1";

  return (
    <form
      onSubmit={handleSubmit}
      action={FORMSUBMIT_URL}
      method="POST"
      encType="multipart/form-data"
      target="ic_formsubmit_iframe"
      className="space-y-5"
    >
      {/* Hidden iframe target — keeps the page from navigating on submit */}
      <iframe
        name="ic_formsubmit_iframe"
        title="form-target"
        className="hidden"
        onLoad={handleFrameLoad}
      />

      {/* FormSubmit control fields */}
      <input type="hidden" name="_subject" value={`New Training Application: ${name} — ${program}`} />
      <input type="hidden" name="_cc" value="ankush@infinitivecloud.com" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />

      {/* Row 1 */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Full Name *</label>
          <input name="name" className={inputCls} placeholder="Rahul Sharma" required value={name} onChange={(e) => setName(e.target.value)} disabled={submitting} />
        </div>
        <div>
          <label className={labelCls}>Mobile Number *</label>
          <input name="mobile" className={inputCls} type="tel" placeholder="+91 98765 43210" required value={mobile} onChange={(e) => setMobile(e.target.value)} disabled={submitting} pattern="[0-9+\s\-]{10,15}" />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Email Address *</label>
          <input name="email" className={inputCls} type="email" placeholder="rahul@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={submitting} />
        </div>
        <div>
          <label className={labelCls}>College / University *</label>
          <input name="college" className={inputCls} placeholder="RGPV, Bhopal" required value={college} onChange={(e) => setCollege(e.target.value)} disabled={submitting} />
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Course / Branch *</label>
          <input name="course" className={inputCls} placeholder="B.Tech CSE" required value={course} onChange={(e) => setCourse(e.target.value)} disabled={submitting} />
        </div>
        <div>
          <label className={labelCls}>Year of Study *</label>
          <select name="year" className={inputCls} required value={year} onChange={(e) => setYear(e.target.value)} disabled={submitting}>
            <option value="">Select year…</option>
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {/* Row 4 */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>City *</label>
          <input name="city" className={inputCls} placeholder="Bhopal, Indore, Mumbai…" required value={city} onChange={(e) => setCity(e.target.value)} disabled={submitting} />
        </div>
        <div>
          <label className={labelCls}>Program Interested In *</label>
          <select name="program" className={inputCls} required value={program} onChange={(e) => setProgram(e.target.value)} disabled={submitting}>
            <option value="">Select program…</option>
            {PROGRAM_LABELS.map((p) => <option key={p} value={p}>{p}</option>)}
            <option value="Other">Other</option>
          </select>
          {program === "Other" && (
            <input
              name="program_other"
              className={`${inputCls} mt-2`}
              placeholder="Which program are you interested in?"
              required
              value={programOther}
              onChange={(e) => setProgramOther(e.target.value)}
              disabled={submitting}
            />
          )}
        </div>
      </div>

      {/* Resume Upload */}
      <div>
        <label className={labelCls}>Resume / CV (PDF, DOC — max 5 MB)</label>
        <div
          className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => fileRef.current?.click()}
        >
          <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
          {resumeFile ? (
            <p className="text-sm font-medium text-foreground">{resumeFile.name}</p>
          ) : (
            <p className="text-sm text-muted-foreground">Click to upload or drag &amp; drop</p>
          )}
          <input
            ref={fileRef}
            name="attachment"
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            disabled={submitting}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f && f.size > 5 * 1024 * 1024) {
                setError("Resume file must be under 5 MB.");
              } else {
                setError(null);
                setResumeFile(f ?? null);
              }
            }}
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-2">{error}</p>
      )}

      <Button type="submit" className="w-full h-12 btn-gradient text-base font-bold" disabled={submitting}>
        {submitting ? (
          <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting…</>
        ) : (
          <><Sparkles className="w-4 h-4 mr-2" /> Submit Application <ArrowRight className="w-4 h-4 ml-2" /></>
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By submitting you agree to be contacted by Infinitive Cloud for training purposes.
      </p>
    </form>
  );
};

// ─── "Talk to an Expert" Popup ────────────────────────────────────────────────
const ExpertCallbackDialog = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const submittedOnce = useRef(false);

  const inputCls =
    "w-full rounded-lg border border-input bg-background text-foreground px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition placeholder:text-muted-foreground/60";
  const labelCls = "block text-sm font-medium text-foreground mb-1";

  const reset = () => {
    setName(""); setMobile(""); setEmail(""); setInterest(""); setMessage("");
    setDone(false); setSubmitting(false); submittedOnce.current = false;
  };

  // Same native multipart-to-hidden-iframe approach as the main form.
  const handleSubmit = () => {
    submittedOnce.current = true;
    setTimeout(() => setSubmitting(true), 0); // let the native POST serialize first
  };

  const handleFrameLoad = () => {
    if (!submittedOnce.current) return;
    setSubmitting(false);
    setDone(true);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset(); // clear when closed
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="border-primary/40 hover:bg-primary/5">
          Talk to an Expert <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        {done ? (
          <div className="py-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Request received!</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Thanks {name || "there"} — our team will call you back shortly to help
              you pick the right program.
            </p>
            <Button className="btn-gradient" onClick={() => setOpen(false)}>Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Talk to an Expert</DialogTitle>
              <DialogDescription>
                Share your details and what you're interested in — our team will call
                you back to recommend the best program.
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={handleSubmit}
              action={FORMSUBMIT_URL}
              method="POST"
              target="ic_expert_iframe"
              className="space-y-4 mt-2"
            >
              <iframe name="ic_expert_iframe" title="expert-target" className="hidden" onLoad={handleFrameLoad} />
              <input type="hidden" name="_subject" value={`Talk to Expert Request: ${name}`} />
              <input type="hidden" name="_cc" value="ankush@infinitivecloud.com" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />

              <div>
                <label className={labelCls}>Full Name *</label>
                <input name="name" className={inputCls} placeholder="Rahul Sharma" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelCls}>Mobile *</label>
                  <input name="mobile" type="tel" className={inputCls} placeholder="+91 98765 43210" required value={mobile} onChange={(e) => setMobile(e.target.value)} pattern="[0-9+\s\-]{10,15}" />
                </div>
                <div>
                  <label className={labelCls}>Email *</label>
                  <input name="email" type="email" className={inputCls} placeholder="rahul@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Interested In *</label>
                <select name="interest" className={inputCls} required value={interest} onChange={(e) => setInterest(e.target.value)}>
                  <option value="">Select an area…</option>
                  {PROGRAM_LABELS.map((p) => <option key={p} value={p}>{p}</option>)}
                  <option value="Not sure yet">Not sure yet</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Message <span className="text-muted-foreground font-normal">(optional)</span></label>
                <textarea name="message" rows={3} className={inputCls} placeholder="Tell us a bit about your background or goals…" value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>

              <Button type="submit" className="w-full btn-gradient font-bold" disabled={submitting}>
                {submitting ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending…</>
                ) : (
                  <>Request a Callback <ArrowRight className="w-4 h-4 ml-2" /></>
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const Internships = () => {
  const qrUrl = PAGE_URL;
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>IT Training Programs – Infinitive Cloud | AI/ML, DevOps, Cloud, Cybersecurity</title>
        <meta
          name="description"
          content="Apply for live industry training in AI/ML, Cloud & AWS, DevOps, Cybersecurity, and Full Stack Development at Infinitive Cloud. Live projects, mentorship, and certification."
        />
        <link rel="canonical" href={PAGE_URL} />
      </Helmet>

      <Navigation />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="section-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-primary">
                Training Programs 2026
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-tight tracking-tight mb-6">
              Kickstart Your IT Career
              <br />
              <span className="gradient-text italic font-extralight">
                with Infinitive Cloud
              </span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              Industry-led training programs designed for students & fresh graduates.
              Work on live cloud infrastructure, build a portfolio, and get certified.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {[
                { icon: CheckCircle2, text: "Live Projects on Real Infrastructure" },
                { icon: CheckCircle2, text: "1-on-1 Mentorship" },
                { icon: CheckCircle2, text: "Industry Certificate" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-2 text-sm font-medium text-foreground/80">
                  <Icon className="w-4 h-4 text-green-500" /> {text}
                </span>
              ))}
            </div>

            <a href="#apply">
              <Button size="lg" className="btn-gradient h-12 px-8 text-base font-bold">
                Apply Now — It's Free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Programs ─────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-4">
              Our <span className="gradient-text italic">Training Programs</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Choose from 5 cutting-edge programs — each built around industry
              tools and live cloud deployments.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((prog, i) => {
              const Icon = prog.icon;
              return (
                <motion.div
                  key={prog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="h-full border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                    <CardContent className="p-6 flex flex-col h-full">
                      {/* Icon + Badge */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${prog.color} flex items-center justify-center shadow-sm`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          {prog.badge}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                        {prog.label}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3">
                        Duration: {prog.duration}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                        {prog.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1.5">
                        {prog.skills.map((s) => (
                          <span key={s} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                            {s}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: PROGRAMS.length * 0.08 }}
              className="sm:col-span-2 lg:col-span-1"
            >
              <Card className="h-full border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
                <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center gap-4 min-h-[240px]">
                  <Sparkles className="w-10 h-10 text-primary" />
                  <div>
                    <p className="font-bold text-lg mb-1">Can't decide?</p>
                    <p className="text-sm text-muted-foreground">
                      Talk to our team — we'll recommend the best program based on your background and goals.
                    </p>
                  </div>
                  <ExpertCallbackDialog />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-muted/20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-4">
              Why Choose <span className="gradient-text italic">Infinitive Cloud</span> for Your Career Journey
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We don't just teach — we get you job-ready through real work experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="text-center border-border hover:border-primary/30 transition-all hover:shadow-md">
                    <CardContent className="p-6">
                      <div className={`w-14 h-14 rounded-2xl ${b.bg} flex items-center justify-center mx-auto mb-4`}>
                        <Icon className={`w-7 h-7 ${b.color}`} />
                      </div>
                      <h3 className="font-bold text-base mb-2">{b.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {b.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Application Form ──────────────────────────────────────────────── */}
      <section id="apply" className="py-16 md:py-24">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-4">
              Apply for a <span className="gradient-text italic">Training Program</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Fill out the form below — takes less than 2 minutes. Our team will
              reach out within 1 working day.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="border-border shadow-sm">
                <CardContent className="p-6 md:p-8">
                  <ApplicationForm />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">

              {/* QR Code */}
              <Card className="border-border text-center">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <QrCode className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-sm">Apply from Mobile</span>
                  </div>
                  <div className="inline-block p-2 bg-white rounded-xl shadow-sm mx-auto">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(qrUrl)}&bgcolor=FFFFFF&color=000000&qzone=1`}
                      alt="QR Code to apply"
                      width={160}
                      height={160}
                      className="block"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Scan with your phone to open this page
                  </p>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="border-border">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                    Questions?
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email us</p>
                      <a href={`mailto:${ADMIN_EMAIL}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                        {ADMIN_EMAIL}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">WhatsApp / Call</p>
                      <a href="https://wa.me/+91 8690393087" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                        +91 8690393087
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* What happens next */}
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="font-bold text-sm mb-4 text-primary">What happens next?</h3>
                  <ol className="space-y-3">
                    {[
                      "We review your application",
                      "Our team calls you within 24h",
                      "Counselling & program confirmation",
                      "Onboarding & kickoff session",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-sm text-foreground/80">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Internships;
