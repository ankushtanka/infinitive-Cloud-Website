import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { CMSBlog, apiGetAllBlogs, apiSetBlogStatus, apiDeleteBlog } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Plus, Pencil, Trash2, Eye, EyeOff, FileText, Loader2, Calendar, Clock, Tag,
} from "lucide-react";

const STATUS_COLOR = {
  published: "bg-green-500/20 text-green-400 border-green-500/30",
  draft: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

export default function AdminBlogManager() {
  const { token } = useAdmin();
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<CMSBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  useEffect(() => {
    if (!token) return;
    apiGetAllBlogs(token)
      .then(setBlogs)
      .catch(() => toast({ title: "Failed to load blogs", variant: "destructive" }))
      .finally(() => setLoading(false));
  }, [token]);

  const toggleStatus = async (blog: CMSBlog) => {
    if (!token) return;
    setBusy(blog.id);
    try {
      const next = blog.status === "published" ? "draft" : "published";
      const updated = await apiSetBlogStatus(blog.id, next, token);
      setBlogs((prev) => prev.map((b) => (b.id === blog.id ? updated : b)));
      toast({ title: `Blog ${next}` });
    } catch {
      toast({ title: "Failed to update status", variant: "destructive" });
    } finally {
      setBusy(null);
    }
  };

  const remove = async (blog: CMSBlog) => {
    if (!token) return;
    if (!confirm(`Delete "${blog.title}"?`)) return;
    setBusy(blog.id + "-del");
    try {
      await apiDeleteBlog(blog.id, token);
      setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
      toast({ title: "Blog deleted" });
    } catch {
      toast({ title: "Failed to delete", variant: "destructive" });
    } finally {
      setBusy(null);
    }
  };

  const filtered = blogs.filter((b) => filter === "all" || b.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-white">Blog Management</h1>
          <p className="text-slate-400 text-sm mt-1">{blogs.length} posts total</p>
        </div>
        <Link to="/admin/cms/blogs/new">
          <Button className="btn-gradient font-bold h-9"><Plus className="w-4 h-4 mr-2" /> New Post</Button>
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-slate-800/50 border border-slate-700 rounded-xl p-1 w-fit">
        {(["all", "published", "draft"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${filter === f ? "bg-primary/20 text-primary" : "text-slate-400 hover:text-white"}`}
          >
            {f} ({f === "all" ? blogs.length : blogs.filter((b) => b.status === f).length})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No {filter !== "all" ? filter : ""} posts yet.</p>
            <Link to="/admin/cms/blogs/new">
              <Button className="btn-gradient mt-4 font-bold"><Plus className="w-4 h-4 mr-2" /> New Post</Button>
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-800">
            {filtered.map((blog) => (
              <div key={blog.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-700/20 transition-colors">
                {/* Featured image placeholder */}
                <div className="w-14 h-10 rounded-lg bg-slate-700 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {blog.featuredImage
                    ? <img src={blog.featuredImage} alt="" className="w-full h-full object-cover" />
                    : <FileText className="w-4 h-4 text-slate-500" />}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-medium text-sm truncate">{blog.title}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border flex-shrink-0 ${STATUS_COLOR[blog.status]}`}>
                      {blog.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-slate-500 text-xs flex-wrap">
                    <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{blog.category}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{blog.readTime} min read</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(blog.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => toggleStatus(blog)}
                    disabled={busy === blog.id}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700 transition-all disabled:opacity-50"
                    title={blog.status === "published" ? "Unpublish" : "Publish"}
                  >
                    {busy === blog.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      : blog.status === "published" ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <Link
                    to={`/admin/cms/blogs/${blog.id}`}
                    className="p-1.5 rounded-lg text-primary hover:bg-primary/20 transition-all"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => remove(blog)}
                    disabled={busy === blog.id + "-del"}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-50"
                  >
                    {busy === blog.id + "-del" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
