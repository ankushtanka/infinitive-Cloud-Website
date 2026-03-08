import { useState } from "react";
import { Calculator, ArrowRight, Globe, ShoppingCart, Code, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const websiteTypes = [
  { value: "blog", label: "Blog / Portfolio", icon: Globe },
  { value: "ecommerce", label: "E-Commerce", icon: ShoppingCart },
  { value: "application", label: "Web Application", icon: Code },
  { value: "business", label: "Business Website", icon: Briefcase },
];

const visitorRanges = [
  { value: "low", label: "Under 10,000" },
  { value: "medium", label: "10,000 – 100,000" },
  { value: "high", label: "100,000 – 500,000" },
  { value: "enterprise", label: "500,000+" },
];

const storageOptions = [
  { value: "small", label: "Under 20 GB" },
  { value: "medium", label: "20 – 100 GB" },
  { value: "large", label: "100 – 500 GB" },
  { value: "xlarge", label: "500 GB+" },
];

type Recommendation = {
  plan: string;
  desc: string;
  link: string;
};

function getRecommendation(type: string, visitors: string, storage: string): Recommendation {
  if (visitors === "enterprise" || storage === "xlarge") {
    return { plan: "Dedicated Server", desc: "Maximum power for enterprise-grade workloads with full hardware control.", link: "/solutions/dedicated-servers" };
  }
  if (visitors === "high" || type === "application" || storage === "large") {
    return { plan: "Cloud Server", desc: "Scalable cloud resources for high-traffic applications and growing businesses.", link: "/solutions/cloud-hosting" };
  }
  if (visitors === "medium" || type === "ecommerce" || storage === "medium") {
    return { plan: "VPS Server", desc: "Dedicated resources and full root access for growing websites.", link: "/solutions/vps-hosting" };
  }
  return { plan: "Shared Hosting", desc: "Reliable and affordable hosting perfect for small websites and blogs.", link: "/solutions/shared-hosting" };
}

const ServerCalculatorSection = () => {
  const [type, setType] = useState("");
  const [visitors, setVisitors] = useState("");
  const [storage, setStorage] = useState("");

  const allSelected = type && visitors && storage;
  const recommendation = allSelected ? getRecommendation(type, visitors, storage) : null;

  return (
    <section className="py-20 bg-background">
      <div className="section-container">
        <div className="text-center mb-14">
          <p className="section-label">
            <Calculator className="w-4 h-4" /> Server Calculator
          </p>
          <h2 className="font-bold mb-3">Find the Right Server for Your Website</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Answer three quick questions and we'll recommend the best hosting solution for your needs.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {/* Website Type */}
          <div>
            <label className="text-sm font-semibold font-heading mb-3 block">1. What type of website are you hosting?</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {websiteTypes.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.value}
                    onClick={() => setType(t.value)}
                    className={`p-4 rounded-xl border text-center transition-all duration-200 ${
                      type === t.value
                        ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                        : "border-border bg-card hover:border-primary/20"
                    }`}
                  >
                    <Icon className={`w-5 h-5 mx-auto mb-2 ${type === t.value ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-xs font-medium">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Visitors */}
          <div>
            <label className="text-sm font-semibold font-heading mb-3 block">2. Expected monthly visitors?</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {visitorRanges.map((v) => (
                <button
                  key={v.value}
                  onClick={() => setVisitors(v.value)}
                  className={`p-3 rounded-xl border text-center text-xs font-medium transition-all duration-200 ${
                    visitors === v.value
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20 text-primary"
                      : "border-border bg-card hover:border-primary/20 text-muted-foreground"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Storage */}
          <div>
            <label className="text-sm font-semibold font-heading mb-3 block">3. Storage requirement?</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {storageOptions.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setStorage(s.value)}
                  className={`p-3 rounded-xl border text-center text-xs font-medium transition-all duration-200 ${
                    storage === s.value
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20 text-primary"
                      : "border-border bg-card hover:border-primary/20 text-muted-foreground"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Result */}
          {recommendation && (
            <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 animate-fade-in">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Recommended Plan</p>
              <h3 className="text-xl font-bold font-heading mb-2">{recommendation.plan}</h3>
              <p className="text-sm text-muted-foreground mb-4">{recommendation.desc}</p>
              <Link
                to={recommendation.link}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors"
              >
                View Plan <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServerCalculatorSection;
