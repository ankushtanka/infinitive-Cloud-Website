import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { CMSBlog, CMSSeo, apiGetBlog, apiCreateBlog, apiUpdateBlog } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Loader2, Image, Tag, X } from "lucide-react";

const CATEGORIES = ["Cloud", "Hosting", "Development", "AI", "Security", "Business", "General"];

export default function AdminBlogEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const navigate = useNavigate();
  const { token } = useAdmin();
  const { toast } = useToast();
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"content" | "meta" | "seo">("content");
  const [tagInput, setTagInput] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [scheduledAt, setScheduledAt] = useState("");
  const [category, setCategory] = useState("General");
  const [tags, setTags] = useState<string[]>([]);
  const [author, setAuthor] = useState("Admin");
  const [seo, setSeo] = useState<CMSSeo>({ title: "", description: "", ogTitle: "", ogDescription: "" });

  useEffect(() => {
    if (isNew || !token || !id) return;
    apiGetBlog(id, token)
      .then((blog) => {
        setTitle(blog.title);
        setSlug(blog.slug);
        setContent(blog.content);
        setExcerpt(blog.excerpt);
        setFeaturedImage(blog.featuredImage);
        setStatus(blog.status);
        setScheduledAt(blog.scheduledAt ?? "");
        setCategory(blog.category);
        setTags(blog.tags);
        setAuthor(blog.author);
        setSeo(blog.seo);
      })
      .catch(() => toast({ title: "Failed to load blog", variant: "destructive" }))
      .finally(() => setLoading(false));
  }, [id, token, isNew]);

  // Auto slug from title (new only)
  useEffect(() => {
    if (isNew) {
      setSlug(title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
    }
  }, [title, isNew]);

  // Auto SEO from title/excerpt
  useEffect(() => {
    if (isNew) {
      setSeo((prev) => ({
        ...prev,
        title: prev.title || title,
        ogTitle: prev.ogTitle || title,
        description: prev.description || excerpt,
        ogDescription: prev.ogDescription || excerpt,
      }));
    }
  }, [title, excerpt, isNew]);

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
    setTagInput("");
  };

  const removeTag = (t: string) => setTags((prev) => prev.filter((x) => x !== t));

  const save = async () => {
    if (!token) return;
    if (!title) { toast({ title: "Title is required", variant: "destructive" }); return; }
    setSaving(true);
    try {
      const payload: Partial<CMSBlog> = {
        title, slug, content, excerpt, featuredImage,
        status, scheduledAt: scheduledAt || null,
        category, tags, author, seo,
      };
      if (isNew) {
        const blog = await apiCreateBlog(payload, token);
        toast({ title: "Blog post created!" });
        navigate(`/admin/cms/blogs/${blog.id}`, { replace: true });
      } else {
        await apiUpdateBlog(id!, payload, token);
        toast({ title: "Blog post saved!" });
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
          <Link to="/admin/cms/blogs" className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-xl font-black text-white">{isNew ? "New Blog Post" : (title || "Edit Post")}</h1>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "draft" | "published")}
            className="h-9 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <Button onClick={save} disabled={saving} className="btn-gradient font-bold h-9 text-sm">
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-800/50 border border-slate-700 rounded-xl p-1 w-fit">
        {(["content", "meta", "seo"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${tab === t ? "bg-primary/20 text-primary" : "text-slate-400 hover:text-white"}`}
          >
            {t === "content" ? "✍️ Content" : t === "meta" ? "🏷️ Meta" : "🔍 SEO"}
          </button>
        ))}
      </div>

      {/* Content tab */}
      {tab === "content" && (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">Post Title *</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter blog post title…" className="bg-slate-800 border-slate-700 text-white text-lg font-semibold h-12" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">Excerpt (shown in blog list)</Label>
            <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Brief summary of the post…" className="bg-slate-800 border-slate-700 text-white min-h-[80px] resize-none" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">Content</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post content here…"
              className="bg-slate-800 border-slate-700 text-white min-h-[400px] resize-y font-mono text-sm"
            />
            <p className="text-slate-500 text-xs">HTML supported. {content.split(/\s+/).filter(Boolean).length} words · ~{Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 200))} min read</p>
          </div>
        </div>
      )}

      {/* Meta tab */}
      {tab === "meta" && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">URL Slug</Label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""))} className="bg-slate-800 border-slate-700 text-white h-9 text-sm font-mono" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Category</Label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-9 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm">
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Author</Label>
              <Input value={author} onChange={(e) => setAuthor(e.target.value)} className="bg-slate-800 border-slate-700 text-white h-9 text-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Schedule Publishing (optional)</Label>
              <Input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} className="bg-slate-800 border-slate-700 text-white h-9 text-sm" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Featured Image URL</Label>
              <Input value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} placeholder="https://…" className="bg-slate-800 border-slate-700 text-white h-9 text-sm" />
              {featuredImage && (
                <div className="rounded-lg overflow-hidden border border-slate-700 mt-2">
                  <img src={featuredImage} alt="Preview" className="w-full h-32 object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
                </div>
              )}
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Tags</Label>
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                  placeholder="Add tag…"
                  className="bg-slate-800 border-slate-700 text-white h-9 text-sm flex-1"
                />
                <Button onClick={addTag} size="sm" variant="outline" className="h-9 border-slate-600">
                  <Tag className="w-3.5 h-3.5" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((t) => (
                  <span key={t} className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs border border-primary/30">
                    {t}
                    <button onClick={() => removeTag(t)} className="hover:text-red-400"><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            </div>
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
          ].map(({ key, label, multiline }) => (
            <div key={key} className="space-y-1.5">
              <Label className="text-slate-300 text-xs">{label}</Label>
              {multiline
                ? <Textarea value={seo[key] ?? ""} onChange={(e) => setSeo((p) => ({ ...p, [key]: e.target.value }))} className="bg-slate-700/50 border-slate-600 text-white text-sm min-h-[80px] resize-none" />
                : <Input value={seo[key] ?? ""} onChange={(e) => setSeo((p) => ({ ...p, [key]: e.target.value }))} className="bg-slate-700/50 border-slate-600 text-white h-9 text-sm" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
