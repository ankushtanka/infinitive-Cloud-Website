import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import {
  CMSPage, CMSSection, CMSSeo,
  apiGetPage, apiCreatePage, apiUpdatePage, apiUpdatePageSections, apiSetPageStatus,
} from "@/lib/api";
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor,
  useSensor, useSensors, DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext, verticalListSortingStrategy,
  useSortable, arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft, Save, Loader2, Plus, Trash2, GripVertical,
  Eye, EyeOff, Settings, ChevronDown, ChevronUp, Globe,
} from "lucide-react";

// ── Section type config ───────────────────────────────────────────────────────
const SECTION_TYPES: { type: CMSSection["type"]; label: string; icon: string; defaultData: Record<string, string> }[] = [
  { type: "hero", label: "Hero Banner", icon: "🎯", defaultData: { heading: "Page Heading", subtext: "Page subheading goes here.", badge: "", cta_primary: "Get Started", cta_primary_url: "#", cta_secondary: "", cta_secondary_url: "" } },
  { type: "cta", label: "Call to Action", icon: "📢", defaultData: { heading: "Ready to Get Started?", subtext: "Join thousands of satisfied customers.", button_text: "Start Now", button_url: "/contact" } },
  { type: "services", label: "Services", icon: "⚙️", defaultData: { heading: "Our Services", subtext: "What we offer.", items: '[{"title":"Service 1","description":"Description","icon":"⚡"},{"title":"Service 2","description":"Description","icon":"🔒"}]' } },
  { type: "testimonials", label: "Testimonials", icon: "💬", defaultData: { heading: "What Our Clients Say", subtext: "Trusted by thousands." } },
  { type: "pricing", label: "Pricing", icon: "💰", defaultData: { heading: "Simple Pricing", subtext: "Choose the plan that works for you." } },
  { type: "faq", label: "FAQ", icon: "❓", defaultData: { heading: "Frequently Asked Questions", subtext: "Got questions? We've got answers.", items: '[{"question":"Question 1?","answer":"Answer 1."},{"question":"Question 2?","answer":"Answer 2."}]' } },
  { type: "stats", label: "Statistics", icon: "📊", defaultData: { heading: "By The Numbers", subtext: "", items: '[{"value":"99.99%","label":"Uptime"},{"value":"1000+","label":"Clients"},{"value":"24/7","label":"Support"}]' } },
  { type: "text", label: "Text Block", icon: "📝", defaultData: { heading: "", content: "Write your content here." } },
  { type: "custom", label: "Custom HTML", icon: "🔧", defaultData: { html: "<div>Custom HTML content</div>" } },
];

// ── Sortable section row ───────────────────────────────────────────────────────
function SortableSection({
  section, onUpdate, onRemove,
}: {
  section: CMSSection;
  onUpdate: (id: string, data: Record<string, unknown>) => void;
  onRemove: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id });
  const config = SECTION_TYPES.find((s) => s.type === section.type);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const data = section.data as Record<string, string>;

  return (
    <div ref={setNodeRef} style={style} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
      {/* Header row */}
      <div className="flex items-center gap-3 px-4 py-3">
        <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-slate-600 hover:text-slate-400">
          <GripVertical className="w-4 h-4" />
        </button>
        <span className="text-lg">{config?.icon}</span>
        <span className="text-white font-medium text-sm flex-1">{config?.label}</span>
        <span className="text-slate-500 text-xs hidden sm:block truncate max-w-[160px]">
          {data.heading || data.content || data.html || ""}
        </span>
        <button
          onClick={() => onUpdate(section.id, { ...section.data, _visible: section.visible ? "false" : "true" })}
          className="p-1.5 text-slate-500 hover:text-white transition-colors"
          title={section.visible ? "Hide section" : "Show section"}
        >
          {section.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>
        <button onClick={() => onRemove(section.id)} className="p-1.5 text-slate-500 hover:text-red-400 transition-colors">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => setOpen(!open)} className="p-1.5 text-slate-500 hover:text-white transition-colors">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Fields */}
      {open && (
        <div className="px-4 pb-4 border-t border-slate-700 pt-4 space-y-3">
          {Object.entries(data).filter(([k]) => !k.startsWith("_")).map(([key, val]) => (
            <div key={key} className="space-y-1">
              <Label className="text-slate-300 text-xs font-medium capitalize">{key.replace(/_/g, " ")}</Label>
              {(key === "html" || key === "content" || key === "items") ? (
                <Textarea
                  value={val}
                  onChange={(e) => onUpdate(section.id, { ...section.data, [key]: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white text-xs font-mono min-h-[100px] resize-y"
                />
              ) : (
                <Input
                  value={val}
                  onChange={(e) => onUpdate(section.id, { ...section.data, [key]: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white h-8 text-sm"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main builder ───────────────────────────────────────────────────────────────
export default function AdminPageBuilder() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const navigate = useNavigate();
  const { token } = useAdmin();
  const { toast } = useToast();

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"builder" | "settings" | "seo">("builder");
  const [showAddSection, setShowAddSection] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [scheduledAt, setScheduledAt] = useState("");
  const [sections, setSections] = useState<CMSSection[]>([]);
  const [seo, setSeo] = useState<CMSSeo>({ title: "", description: "", ogTitle: "", ogDescription: "" });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  useEffect(() => {
    if (isNew || !token || !id) return;
    apiGetPage(id, token)
      .then((page) => {
        setTitle(page.title);
        setSlug(page.slug);
        setStatus(page.status);
        setScheduledAt(page.scheduledAt ?? "");
        setSections(page.sections.sort((a, b) => a.order - b.order));
        setSeo(page.seo);
      })
      .catch(() => toast({ title: "Failed to load page", variant: "destructive" }))
      .finally(() => setLoading(false));
  }, [id, token, isNew]);

  // Auto-generate slug from title
  useEffect(() => {
    if (isNew) {
      setSlug(title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
    }
  }, [title, isNew]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setSections((prev) => {
      const oldIdx = prev.findIndex((s) => s.id === active.id);
      const newIdx = prev.findIndex((s) => s.id === over.id);
      return arrayMove(prev, oldIdx, newIdx).map((s, i) => ({ ...s, order: i }));
    });
  };

  const addSection = (type: CMSSection["type"]) => {
    const config = SECTION_TYPES.find((s) => s.type === type)!;
    const newSection: CMSSection = {
      id: crypto.randomUUID(),
      type,
      order: sections.length,
      visible: true,
      data: { ...config.defaultData },
    };
    setSections((prev) => [...prev, newSection]);
    setShowAddSection(false);
  };

  const updateSectionData = useCallback((sectionId: string, data: Record<string, unknown>) => {
    setSections((prev) => prev.map((s) => {
      if (s.id !== sectionId) return s;
      const visible = data._visible !== undefined ? data._visible === "true" : s.visible;
      const { _visible, ...rest } = data;
      return { ...s, visible, data: rest };
    }));
  }, []);

  const removeSection = useCallback((sectionId: string) => {
    setSections((prev) => prev.filter((s) => s.id !== sectionId));
  }, []);

  const save = async () => {
    if (!token) return;
    if (!title || !slug) {
      toast({ title: "Title and slug are required", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const orderedSections = sections.map((s, i) => ({ ...s, order: i }));
      if (isNew) {
        const page = await apiCreatePage({ title, slug, status, scheduledAt: scheduledAt || null, sections: orderedSections, seo }, token);
        toast({ title: "Page created!" });
        navigate(`/admin/cms/pages/${page.id}`, { replace: true });
      } else {
        await apiUpdatePage(id!, { title, slug, status, scheduledAt: scheduledAt || null, sections: orderedSections, seo }, token);
        toast({ title: "Page saved!" });
      }
    } catch (err: unknown) {
      toast({ title: (err as Error).message ?? "Save failed", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Link to="/admin/cms/pages" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-black text-white">{isNew ? "New Page" : title || "Page Builder"}</h1>
            <p className="text-slate-400 text-xs mt-0.5 font-mono">/{slug || "slug"}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase border ${status === "published" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"}`}>
            {status}
          </span>
          <Button onClick={save} disabled={saving} className="btn-gradient font-bold h-9 text-sm">
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-800/50 border border-slate-700 rounded-xl p-1 w-fit">
        {(["builder", "settings", "seo"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${tab === t ? "bg-primary/20 text-primary" : "text-slate-400 hover:text-white"}`}
          >
            {t === "builder" ? "🧩 Builder" : t === "settings" ? "⚙️ Settings" : "🔍 SEO"}
          </button>
        ))}
      </div>

      {/* Builder tab */}
      {tab === "builder" && (
        <div className="space-y-3">
          {sections.length === 0 && (
            <div className="py-12 text-center border-2 border-dashed border-slate-700 rounded-2xl">
              <p className="text-slate-400 mb-4">No sections yet. Add your first section below.</p>
            </div>
          )}

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
              {sections.map((section) => (
                <SortableSection
                  key={section.id}
                  section={section}
                  onUpdate={updateSectionData}
                  onRemove={removeSection}
                />
              ))}
            </SortableContext>
          </DndContext>

          {/* Add section */}
          {showAddSection ? (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
              <p className="text-slate-300 text-sm font-semibold mb-3">Choose Section Type</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SECTION_TYPES.map((s) => (
                  <button
                    key={s.type}
                    onClick={() => addSection(s.type)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-700/50 border border-slate-600 hover:border-primary/50 hover:bg-primary/10 transition-all text-left"
                  >
                    <span className="text-xl">{s.icon}</span>
                    <span className="text-sm font-medium text-white">{s.label}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => setShowAddSection(false)} className="mt-3 text-slate-500 text-xs hover:text-slate-300">Cancel</button>
            </div>
          ) : (
            <button
              onClick={() => setShowAddSection(true)}
              className="w-full py-3 rounded-xl border-2 border-dashed border-slate-700 text-slate-500 hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> Add Section
            </button>
          )}
        </div>
      )}

      {/* Settings tab */}
      {tab === "settings" && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 space-y-4 max-w-xl">
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">Page Title *</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My Awesome Page" className="bg-slate-700/50 border-slate-600 text-white h-9 text-sm" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">URL Slug *</Label>
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-sm">/</span>
              <Input value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""))} placeholder="my-page" className="bg-slate-700/50 border-slate-600 text-white h-9 text-sm font-mono flex-1" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">Status</Label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as "draft" | "published")}
              className="w-full h-9 px-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white text-sm"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">Schedule Publishing (optional)</Label>
            <Input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white h-9 text-sm"
            />
          </div>
        </div>
      )}

      {/* SEO tab */}
      {tab === "seo" && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 space-y-4 max-w-xl">
          {[
            { key: "title" as keyof CMSSeo, label: "Meta Title" },
            { key: "description" as keyof CMSSeo, label: "Meta Description", multiline: true },
            { key: "ogTitle" as keyof CMSSeo, label: "OG / Social Title" },
            { key: "ogDescription" as keyof CMSSeo, label: "OG / Social Description", multiline: true },
            { key: "canonical" as keyof CMSSeo, label: "Canonical URL" },
          ].map(({ key, label, multiline }) => (
            <div key={key} className="space-y-1.5">
              <Label className="text-slate-300 text-xs">{label}</Label>
              {multiline ? (
                <Textarea
                  value={seo[key] ?? ""}
                  onChange={(e) => setSeo((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="bg-slate-700/50 border-slate-600 text-white text-sm min-h-[80px] resize-none"
                />
              ) : (
                <Input
                  value={seo[key] ?? ""}
                  onChange={(e) => setSeo((prev) => ({ ...prev, [key]: e.target.value }))}
                  className="bg-slate-700/50 border-slate-600 text-white h-9 text-sm"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
