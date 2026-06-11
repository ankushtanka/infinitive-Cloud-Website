import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CMSPage, CMSSection, apiGetPageBySlug } from "@/lib/api";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// ── Section renderers ─────────────────────────────────────────────────────────

function HeroSection({ data }: { data: Record<string, unknown> }) {
  return (
    <section className="relative py-24 px-4 text-center bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-4xl mx-auto">
        {data.badge && (
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
            {String(data.badge)}
          </span>
        )}
        <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight">
          {String(data.heading || "")}
        </h1>
        {data.subtext && (
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {String(data.subtext)}
          </p>
        )}
        <div className="flex flex-wrap gap-4 justify-center">
          {data.cta_primary && (
            <Button size="lg" className="btn-gradient font-bold" asChild>
              <a href={String(data.cta_primary_url || "#")}>{String(data.cta_primary)}</a>
            </Button>
          )}
          {data.cta_secondary && (
            <Button size="lg" variant="outline" asChild>
              <a href={String(data.cta_secondary_url || "#")}>{String(data.cta_secondary)}</a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

function CtaSection({ data }: { data: Record<string, unknown> }) {
  return (
    <section className="py-16 px-4 bg-primary/5 border-y border-primary/10">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{String(data.heading || "")}</h2>
        {data.subtext && <p className="text-muted-foreground mb-8 text-lg">{String(data.subtext)}</p>}
        {data.button_text && (
          <Button size="lg" className="btn-gradient font-bold" asChild>
            <a href={String(data.button_url || "#")}>{String(data.button_text)}</a>
          </Button>
        )}
      </div>
    </section>
  );
}

function ServicesSection({ data }: { data: Record<string, unknown> }) {
  let items: { title: string; description: string; icon: string }[] = [];
  try { items = JSON.parse(String(data.items || "[]")); } catch { /* ignore */ }

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{String(data.heading || "")}</h2>
          {data.subtext && <p className="text-muted-foreground text-lg">{String(data.subtext)}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div key={i} className="p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection({ data }: { data: Record<string, unknown> }) {
  let items: { value: string; label: string }[] = [];
  try { items = JSON.parse(String(data.items || "[]")); } catch { /* ignore */ }

  return (
    <section className="py-16 px-4 bg-primary/5 border-y border-primary/10">
      <div className="max-w-5xl mx-auto">
        {data.heading && (
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-foreground">{String(data.heading)}</h2>
            {data.subtext && <p className="text-muted-foreground mt-2">{String(data.subtext)}</p>}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {items.map((item, i) => (
            <div key={i}>
              <div className="text-4xl font-black text-primary mb-1">{item.value}</div>
              <div className="text-muted-foreground text-sm">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection({ data }: { data: Record<string, unknown> }) {
  const [open, setOpen] = useState<number | null>(null);
  let items: { question: string; answer: string }[] = [];
  try { items = JSON.parse(String(data.items || "[]")); } catch { /* ignore */ }

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{String(data.heading || "")}</h2>
          {data.subtext && <p className="text-muted-foreground text-lg">{String(data.subtext)}</p>}
        </div>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-foreground hover:bg-muted/50 transition-colors"
              >
                {item.question}
                <span className="text-muted-foreground ml-4">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-muted-foreground text-sm">{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection({ data }: { data: Record<string, unknown> }) {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{String(data.heading || "")}</h2>
        {data.subtext && <p className="text-muted-foreground text-lg">{String(data.subtext)}</p>}
      </div>
    </section>
  );
}

function PricingSection({ data }: { data: Record<string, unknown> }) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">{String(data.heading || "")}</h2>
        {data.subtext && <p className="text-muted-foreground text-lg">{String(data.subtext)}</p>}
      </div>
    </section>
  );
}

function TextSection({ data }: { data: Record<string, unknown> }) {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
        {data.heading && <h2 className="text-3xl font-black text-foreground mb-6">{String(data.heading)}</h2>}
        {data.content && <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{String(data.content)}</p>}
      </div>
    </section>
  );
}

function CustomSection({ data }: { data: Record<string, unknown> }) {
  if (!data.html) return null;
  return (
    <section
      className="py-8 px-4"
      dangerouslySetInnerHTML={{ __html: String(data.html) }}
    />
  );
}

function renderSection(section: CMSSection) {
  if (!section.visible) return null;
  const d = section.data as Record<string, unknown>;

  switch (section.type) {
    case "hero":         return <HeroSection key={section.id} data={d} />;
    case "cta":          return <CtaSection key={section.id} data={d} />;
    case "services":     return <ServicesSection key={section.id} data={d} />;
    case "stats":        return <StatsSection key={section.id} data={d} />;
    case "faq":          return <FaqSection key={section.id} data={d} />;
    case "testimonials": return <TestimonialsSection key={section.id} data={d} />;
    case "pricing":      return <PricingSection key={section.id} data={d} />;
    case "text":         return <TextSection key={section.id} data={d} />;
    case "custom":       return <CustomSection key={section.id} data={d} />;
    default:             return null;
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CMSPageRenderer() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<CMSPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);
    apiGetPageBySlug(slug)
      .then(setPage)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (notFound || !page) {
    navigate("/404", { replace: true });
    return null;
  }

  const sorted = [...page.sections].sort((a, b) => a.order - b.order);

  return (
    <>
      <PageSEO
        title={page.seo.title || page.title}
        description={page.seo.description || ""}
        canonical={page.seo.canonical || `/${page.slug}`}
      />
      <Navigation />
      <main>{sorted.map(renderSection)}</main>
      <Footer />
    </>
  );
}
