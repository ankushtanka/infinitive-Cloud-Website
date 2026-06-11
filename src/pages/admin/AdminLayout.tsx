import { useEffect } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import {
  LayoutDashboard, ShoppingCart, Globe, FileText,
  LogOut, Settings, Menu, X, ChevronRight, Loader2, LayoutList,
  Newspaper, Navigation, PanelLeft, SearchCheck,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navSections = [
  {
    label: "General",
    items: [
      { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { path: "/admin/orders", label: "Orders", icon: ShoppingCart },
      { path: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
  {
    label: "Content Management",
    items: [
      { path: "/admin/cms/pages", label: "Pages", icon: PanelLeft },
      { path: "/admin/cms/blogs", label: "Blog Posts", icon: Newspaper },
      { path: "/admin/cms/menus", label: "Menus", icon: Navigation },
      { path: "/admin/pages", label: "Page Content", icon: LayoutList },
      { path: "/admin/content", label: "Site Content", icon: FileText },
      { path: "/admin/seo", label: "SEO Management", icon: SearchCheck },
    ],
  },
  {
    label: "Store",
    items: [
      { path: "/admin/pricing", label: "Domain Pricing", icon: Globe },
    ],
  },
];

const AdminLayout = () => {
  const { isAuthenticated, loading, logout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-800 z-30 flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">IC</span>
          </div>
          <div>
            <div className="text-white font-bold text-sm">Infinitive Cloud</div>
            <div className="text-slate-400 text-xs">Admin Panel</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
          {navSections.map((section) => (
            <div key={section.label}>
              <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest px-3 mb-1">{section.label}</p>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                        ${active
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "text-slate-400 hover:text-white hover:bg-slate-800"
                        }`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      {item.label}
                      {active && <ChevronRight className="w-3 h-3 ml-auto" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all w-full"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-slate-900 border-b border-slate-800 px-4 md:px-6 py-4 flex items-center gap-4 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-400 hover:text-white"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <span className="text-white font-semibold text-sm">
            {navSections.flatMap((s) => s.items).find((n) => location.pathname.startsWith(n.path))?.label ?? "Admin"}
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
