import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Globe, IndianRupee, TrendingUp, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Order {
  id: string;
  created_at: string;
  payment_id: string | null;
  whmcs_order_id: number | null;
  whmcs_invoice_id: number | null;
  status: string | null;
  response: any;
}

const statusColor = (s: string | null) => {
  if (!s) return "bg-slate-500/20 text-slate-400";
  if (s === "paid" || s === "success") return "bg-green-500/20 text-green-400";
  if (s === "pending") return "bg-yellow-500/20 text-yellow-400";
  if (s === "failed" || s === "cancelled") return "bg-red-500/20 text-red-400";
  return "bg-blue-500/20 text-blue-400";
};

const Stat = ({
  icon: Icon, label, value, sub, color,
}: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; color: string;
}) => (
  <Card className="bg-slate-800/50 border-slate-700">
    <CardContent className="p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-400 text-sm font-medium">{label}</span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="text-2xl font-black text-white">{value}</div>
      {sub && <div className="text-slate-500 text-xs mt-1">{sub}</div>}
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase
      .from("whmcs_order_syncs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100)
      .then(({ data }) => {
        setOrders((data as Order[]) ?? []);
        setLoading(false);
      });
  }, []);

  const totalRevenue = orders
    .filter((o) => o.status === "paid" || o.status === "success")
    .reduce((acc, o) => {
      const amt = o.response?.total ?? o.response?.amount ?? 0;
      return acc + Number(amt);
    }, 0);

  const paidCount = orders.filter((o) => o.status === "paid" || o.status === "success").length;
  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const recentOrders = orders.slice(0, 8);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Welcome back — here's what's happening</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={ShoppingCart} label="Total Orders" value={loading ? "—" : orders.length} sub="All time" color="bg-primary/20 text-primary" />
        <Stat icon={CheckCircle2} label="Paid Orders" value={loading ? "—" : paidCount} sub="Completed" color="bg-green-500/20 text-green-400" />
        <Stat icon={Clock} label="Pending" value={loading ? "—" : pendingCount} sub="Awaiting payment" color="bg-yellow-500/20 text-yellow-400" />
        <Stat
          icon={IndianRupee}
          label="Revenue"
          value={loading ? "—" : totalRevenue > 0 ? `₹${Math.round(totalRevenue).toLocaleString("en-IN")}` : "—"}
          sub="Paid orders"
          color="bg-emerald-500/20 text-emerald-400"
        />
      </div>

      {/* Recent Orders */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-white text-base font-bold">Recent Orders</CardTitle>
          <Link to="/admin/orders" className="text-primary text-xs hover:underline font-medium">
            View All →
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="text-slate-500 text-sm text-center py-10">No orders yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    {["Order ID", "Invoice", "Payment ID", "Domain", "Status", "Date"].map((h) => (
                      <th key={h} className="text-left text-slate-400 font-medium px-5 py-3 text-xs uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-slate-800 hover:bg-slate-700/30 transition-colors">
                      <td className="px-5 py-3 text-white font-mono text-xs">#{order.whmcs_order_id ?? "—"}</td>
                      <td className="px-5 py-3 text-slate-300 font-mono text-xs">#{order.whmcs_invoice_id ?? "—"}</td>
                      <td className="px-5 py-3 text-slate-400 font-mono text-xs truncate max-w-[120px]">{order.payment_id ?? "—"}</td>
                      <td className="px-5 py-3 text-slate-300 text-xs">{order.response?.domain ?? order.response?.items?.[0]?.name ?? "—"}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusColor(order.status)}`}>
                          {order.status ?? "unknown"}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-slate-500 text-xs">
                        {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { to: "/admin/pricing", icon: Globe, label: "Edit Domain Prices", desc: "Update live pricing for all TLDs", color: "text-blue-400" },
          { to: "/admin/content", icon: TrendingUp, label: "Edit Website Content", desc: "Change hero text, banners, descriptions", color: "text-purple-400" },
          { to: "/admin/orders", icon: ShoppingCart, label: "View All Orders", desc: "Browse and filter all orders", color: "text-green-400" },
        ].map((item) => (
          <Link key={item.to} to={item.to}>
            <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 hover:bg-slate-700/50 transition-all cursor-pointer h-full">
              <CardContent className="p-5">
                <item.icon className={`w-6 h-6 mb-3 ${item.color}`} />
                <div className="text-white font-semibold text-sm">{item.label}</div>
                <div className="text-slate-500 text-xs mt-1">{item.desc}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
