import { useEffect, useState, useCallback } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { CMSMenu, CMSMenuItem, apiGetAllMenus, apiSaveMenu, apiDeleteMenu } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Save, Loader2, ChevronDown, ChevronRight, GripVertical, ExternalLink } from "lucide-react";

const LOCATIONS: { value: CMSMenu["location"]; label: string; desc: string }[] = [
  { value: "header", label: "Header Menu", desc: "Main navigation shown in the top header" },
  { value: "footer", label: "Footer Menu", desc: "Links shown in the website footer" },
  { value: "mega", label: "Mega Menu", desc: "Full-width dropdown navigation" },
];

function newItem(): CMSMenuItem {
  return { id: crypto.randomUUID(), label: "New Link", url: "#", target: "_self", children: [] };
}

function MenuItemRow({
  item, depth = 0, onChange, onRemove,
}: {
  item: CMSMenuItem;
  depth?: number;
  onChange: (updated: CMSMenuItem) => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(true);
  const hasChildren = item.children.length > 0;

  const updateChild = (index: number, updated: CMSMenuItem) => {
    const children = [...item.children];
    children[index] = updated;
    onChange({ ...item, children });
  };

  const removeChild = (index: number) => {
    onChange({ ...item, children: item.children.filter((_, i) => i !== index) });
  };

  const addChild = () => {
    onChange({ ...item, children: [...item.children, newItem()] });
  };

  return (
    <div className={`${depth > 0 ? "ml-6 border-l border-slate-700 pl-4" : ""}`}>
      <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 mb-2">
        <GripVertical className="w-4 h-4 text-slate-600 flex-shrink-0 cursor-grab" />
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Input
            value={item.label}
            onChange={(e) => onChange({ ...item, label: e.target.value })}
            placeholder="Label"
            className="bg-slate-700/50 border-slate-600 text-white h-7 text-xs"
          />
          <Input
            value={item.url}
            onChange={(e) => onChange({ ...item, url: e.target.value })}
            placeholder="URL (e.g. /about)"
            className="bg-slate-700/50 border-slate-600 text-white h-7 text-xs font-mono"
          />
        </div>
        <select
          value={item.target}
          onChange={(e) => onChange({ ...item, target: e.target.value as "_self" | "_blank" })}
          className="h-7 px-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white text-xs"
        >
          <option value="_self">Same Tab</option>
          <option value="_blank">New Tab</option>
        </select>
        {depth < 2 && (
          <button onClick={addChild} className="p-1 text-slate-500 hover:text-primary transition-colors" title="Add child">
            <Plus className="w-3.5 h-3.5" />
          </button>
        )}
        <button onClick={onRemove} className="p-1 text-slate-500 hover:text-red-400 transition-colors">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
        {hasChildren && (
          <button onClick={() => setOpen(!open)} className="p-1 text-slate-500 hover:text-white transition-colors">
            {open ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
      {open && item.children.map((child, i) => (
        <MenuItemRow
          key={child.id}
          item={child}
          depth={depth + 1}
          onChange={(u) => updateChild(i, u)}
          onRemove={() => removeChild(i)}
        />
      ))}
    </div>
  );
}

export default function AdminMenuManager() {
  const { token } = useAdmin();
  const { toast } = useToast();
  const [menus, setMenus] = useState<CMSMenu[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string>("header");

  useEffect(() => {
    if (!token) return;
    apiGetAllMenus(token)
      .then((data) => {
        // Ensure all 3 locations exist
        const all = LOCATIONS.map((loc) => {
          const existing = data.find((m) => m.location === loc.value);
          return existing ?? { id: crypto.randomUUID(), name: loc.label, location: loc.value, items: [], updatedAt: new Date().toISOString() };
        });
        setMenus(all);
      })
      .catch(() => toast({ title: "Failed to load menus", variant: "destructive" }))
      .finally(() => setLoading(false));
  }, [token]);

  const currentMenu = menus.find((m) => m.location === activeMenu);

  const updateItems = useCallback((items: CMSMenuItem[]) => {
    setMenus((prev) => prev.map((m) => m.location === activeMenu ? { ...m, items } : m));
  }, [activeMenu]);

  const addItem = () => {
    if (!currentMenu) return;
    updateItems([...currentMenu.items, newItem()]);
  };

  const updateItem = (index: number, updated: CMSMenuItem) => {
    if (!currentMenu) return;
    const items = [...currentMenu.items];
    items[index] = updated;
    updateItems(items);
  };

  const removeItem = (index: number) => {
    if (!currentMenu) return;
    updateItems(currentMenu.items.filter((_, i) => i !== index));
  };

  const saveMenu = async () => {
    if (!token || !currentMenu) return;
    setSaving(activeMenu);
    try {
      const saved = await apiSaveMenu(currentMenu, token);
      setMenus((prev) => prev.map((m) => m.location === activeMenu ? saved : m));
      toast({ title: "Menu saved!" });
    } catch {
      toast({ title: "Failed to save menu", variant: "destructive" });
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-white">Menu Management</h1>
          <p className="text-slate-400 text-sm mt-1">Configure header, footer, and mega menus</p>
        </div>
        <Button onClick={saveMenu} disabled={saving === activeMenu} className="btn-gradient font-bold h-9">
          {saving === activeMenu ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Save Menu
        </Button>
      </div>

      {/* Location tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {LOCATIONS.map((loc) => (
          <button
            key={loc.value}
            onClick={() => setActiveMenu(loc.value)}
            className={`p-4 rounded-xl border text-left transition-all ${activeMenu === loc.value ? "border-primary/50 bg-primary/10" : "border-slate-700 bg-slate-800/50 hover:border-slate-600"}`}
          >
            <div className="text-white font-semibold text-sm">{loc.label}</div>
            <div className="text-slate-400 text-xs mt-1">{loc.desc}</div>
            <div className="text-slate-500 text-xs mt-2">
              {menus.find((m) => m.location === loc.value)?.items.length ?? 0} items
            </div>
          </button>
        ))}
      </div>

      {/* Menu editor */}
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-bold">{LOCATIONS.find((l) => l.value === activeMenu)?.label}</h2>
            <span className="text-slate-400 text-xs">Drag to reorder · Click + to add child items (dropdowns)</span>
          </div>

          {currentMenu?.items.length === 0 && (
            <p className="text-slate-500 text-sm text-center py-6">No menu items yet. Add your first item below.</p>
          )}

          {currentMenu?.items.map((item, i) => (
            <MenuItemRow
              key={item.id}
              item={item}
              onChange={(u) => updateItem(i, u)}
              onRemove={() => removeItem(i)}
            />
          ))}

          <button
            onClick={addItem}
            className="w-full py-2.5 rounded-xl border-2 border-dashed border-slate-700 text-slate-500 hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" /> Add Menu Item
          </button>
        </div>
      )}

      {/* Preview hint */}
      {currentMenu && currentMenu.items.length > 0 && (
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
          <p className="text-slate-400 text-xs font-semibold mb-2">PREVIEW</p>
          <div className="flex flex-wrap gap-4">
            {currentMenu.items.map((item) => (
              <div key={item.id} className="text-sm">
                <span className="text-white font-medium">{item.label}</span>
                {item.children.length > 0 && (
                  <span className="text-slate-500 text-xs ml-1">({item.children.length} children)</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
