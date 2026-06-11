import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import {
  CMSPage, apiGetAllPages, apiSetPageStatus,
  apiDuplicatePage, apiDeletePage,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Plus, Pencil, Copy, Trash2, Eye, EyeOff,
  Globe, FileText, Loader2, ExternalLink, Calendar,
} from "lucide-react";

const STATUS_COLOR = {
  published: "bg-green-500/20 text-green-400 border-green-500/30",
  draft: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

export default function AdminPagesManager() {
  const { token } = useAdmin();
  const { toast } = useToast();
  const [pages, setPages] = useState<CMSPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    apiGetAllPages(token)
      .then(setPages)
      .catch(() => toast({ title: "Failed to load pages", variant: "destructive" }))
      .finally(() => setLoading(false));
  }, [token]);

  const toggleStatus = async (page: CMSPage) => {
    if (!token) return;
    setBusy(page.id);
    try {
      const next = page.status === "published" ? "draft" : "published";
      const updated = await apiSetPageStatus(page.id, next, token);
      setPages((prev) => prev.map((p) => (p.id === page.id ? updated : p)));
      toast({ title: `Page ${next}` });
    } catch {
      toast({ title: "Failed to update status", variant: "destructive" });
    } finally {
      setBusy(null);
    }
  };

  const duplicate = async (page: CMSPage) => {
    if (!token) return;
    setBusy(page.id + "-dup");
    try {
      const copy = await apiDuplicatePage(page.id, token);
      setPages((prev) => [...prev, copy]);
      toast({ title: `"${page.title}" duplicated as draft` });
    } catch {
      toast({ title: "Failed to duplicate", variant: "destructive" });
    } finally {
      setBusy(null);
    }
  };

  const remove = async (page: CMSPage) => {
    if (!token) return;
    if (!confirm(`Delete "${page.title}"? This cannot be undone.`)) return;
    setBusy(page.id + "-del");
    try {
      await apiDeletePage(page.id, token);
      setPages((prev) => prev.filter((p) => p.id !== page.id));
      toast({ title: "Page deleted" });
    } catch {
      toast({ title: "Failed to delete", variant: "destructive" });
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Pages</h1>
          <p className="text-slate-400 text-sm mt-1">Create and manage website pages</p>
        </div>
        <Link to="/admin/cms/pages/new">
          <Button className="btn-gradient font-bold h-9">
            <Plus className="w-4 h-4 mr-2" /> New Page
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : pages.length === 0 ? (
          <div className="py-16 text-center">
            <FileText className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No pages yet. Create your first page.</p>
            <Link to="/admin/cms/pages/new">
              <Button className="btn-gradient mt-4 font-bold"><Plus className="w-4 h-4 mr-2" /> New Page</Button>
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left text-slate-400 font-medium px-5 py-3 text-xs uppercase tracking-wider">Title</th>
                <th className="text-left text-slate-400 font-medium px-5 py-3 text-xs uppercase tracking-wider hidden sm:table-cell">Slug</th>
                <th className="text-left text-slate-400 font-medium px-5 py-3 text-xs uppercase tracking-wider hidden md:table-cell">Status</th>
                <th className="text-left text-slate-400 font-medium px-5 py-3 text-xs uppercase tracking-wider hidden lg:table-cell">Updated</th>
                <th className="text-right text-slate-400 font-medium px-5 py-3 text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} className="border-b border-slate-800 last:border-0 hover:bg-slate-700/20 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <span className="text-white font-medium truncate max-w-[180px]">{page.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden sm:table-cell">
                    <span className="text-slate-400 font-mono text-xs">/{page.slug}</span>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${STATUS_COLOR[page.status]}`}>
                      {page.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                      <Calendar className="w-3 h-3" />
                      {new Date(page.updatedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {/* Preview */}
                      <a
                        href={`/p/${page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700 transition-all"
                        title="Preview"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      {/* Toggle status */}
                      <button
                        onClick={() => toggleStatus(page)}
                        disabled={busy === page.id}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700 transition-all disabled:opacity-50"
                        title={page.status === "published" ? "Unpublish" : "Publish"}
                      >
                        {busy === page.id
                          ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          : page.status === "published"
                            ? <EyeOff className="w-3.5 h-3.5" />
                            : <Eye className="w-3.5 h-3.5" />}
                      </button>
                      {/* Edit */}
                      <Link
                        to={`/admin/cms/pages/${page.id}`}
                        className="p-1.5 rounded-lg text-primary hover:bg-primary/20 transition-all"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Link>
                      {/* Duplicate */}
                      <button
                        onClick={() => duplicate(page)}
                        disabled={busy === page.id + "-dup"}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-700 transition-all disabled:opacity-50"
                        title="Duplicate"
                      >
                        {busy === page.id + "-dup"
                          ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => remove(page)}
                        disabled={busy === page.id + "-del"}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-50"
                        title="Delete"
                      >
                        {busy === page.id + "-del"
                          ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          : <Trash2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
