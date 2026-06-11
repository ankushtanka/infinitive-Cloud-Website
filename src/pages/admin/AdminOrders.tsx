import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Loader2, RefreshCw, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

interface Order {
  id: string;
  created_at: string;
  updated_at: string;
  payment_id: string | null;
  whmcs_order_id: number | null;
  whmcs_invoice_id: number | null;
  gateway_order_id: string | null;
  status: string | null;
  response: any;
}

const STATUS_OPTIONS = ["all", "paid", "success", "pending", "failed", "cancelled"];

const statusStyle = (s: string | null) => {
  if (!s) return "bg-slate-500/20 text-slate-400 border-slate-500/30";
  if (s === "paid" || s === "success") return "bg-green-500/20 text-green-400 border-green-500/30";
  if (s === "pending") return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  return "bg-red-500/20 text-red-400 border-red-500/30";
};

const OrderRow = ({ order }: { order: Order }) => {
  const [expanded, setExpanded] = useState(false);
  const domain = order.response?.domain ?? order.response?.items?.[0]?.name ?? "—";
  const amount = order.response?.total ?? order.response?.amount;
  const clientName = order.response?.firstname
    ? `${order.response.firstname} ${order.response.lastname ?? ""}`.trim()
    : order.response?.client?.firstname
    ? `${order.response.client.firstname} ${order.response.client.lastname ?? ""}`.trim()
    : "—";
  const clientEmail = order.response?.email ?? order.response?.client?.email ?? "—";

  return (
    <>
      <tr
        className="border-b border-slate-800 hover:bg-slate-700/20 transition-colors cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <td className="px-4 py-3 text-white font-mono text-xs">#{order.whmcs_order_id ?? "—"}</td>
        <td className="px-4 py-3 text-slate-300 font-mono text-xs">#{order.whmcs_invoice_id ?? "—"}</td>
        <td className="px-4 py-3 text-slate-300 text-xs max-w-[140px] truncate">{domain}</td>
        <td className="px-4 py-3 text-slate-300 text-xs">{clientName}</td>
        <td className="px-4 py-3 text-slate-400 text-xs hidden md:table-cell">{clientEmail}</td>
        <td className="px-4 py-3 text-white text-xs font-bold">
          {amount ? `₹${Math.round(Number(amount)).toLocaleString("en-IN")}` : "—"}
        </td>
        <td className="px-4 py-3">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${statusStyle(order.status)}`}>
            {order.status ?? "unknown"}
          </span>
        </td>
        <td className="px-4 py-3 text-slate-500 text-xs hidden lg:table-cell">
          {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </td>
        <td className="px-4 py-3">
          {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-slate-800 bg-slate-800/30">
          <td colSpan={9} className="px-6 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <div className="text-slate-500 mb-1">Payment ID</div>
                <div className="text-slate-300 font-mono break-all">{order.payment_id ?? "—"}</div>
              </div>
              <div>
                <div className="text-slate-500 mb-1">Gateway Order ID</div>
                <div className="text-slate-300 font-mono break-all">{order.gateway_order_id ?? "—"}</div>
              </div>
              <div>
                <div className="text-slate-500 mb-1">Last Updated</div>
                <div className="text-slate-300">{new Date(order.updated_at).toLocaleString("en-IN")}</div>
              </div>
              <div>
                <div className="text-slate-500 mb-1">Items</div>
                <div className="text-slate-300">
                  {Array.isArray(order.response?.items)
                    ? order.response.items.map((i: any) => i.label ?? i.name).join(", ")
                    : domain}
                </div>
              </div>
              {order.whmcs_invoice_id && (
                <div className="col-span-2 md:col-span-4">
                  <a
                    href={`https://client.infinitivecloud.com/viewinvoice.php?id=${order.whmcs_invoice_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Invoice in WHMCS <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    // Orders from Supabase are not available without Supabase config
    setOrders([]);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const filtered = orders.filter((o) => {
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    const q = search.toLowerCase();
    const domain = (o.response?.domain ?? o.response?.items?.[0]?.name ?? "").toLowerCase();
    const clientName = `${o.response?.firstname ?? ""} ${o.response?.lastname ?? ""}`.toLowerCase();
    const clientEmail = (o.response?.email ?? "").toLowerCase();
    const matchSearch =
      !q ||
      domain.includes(q) ||
      clientName.includes(q) ||
      clientEmail.includes(q) ||
      String(o.whmcs_order_id).includes(q) ||
      String(o.whmcs_invoice_id).includes(q) ||
      (o.payment_id ?? "").toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Orders</h1>
          <p className="text-slate-400 text-sm mt-1">{orders.length} total orders</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => { setRefreshing(true); fetchOrders(); }}
          disabled={refreshing}
          className="border-slate-700 text-slate-300 hover:bg-slate-800"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            placeholder="Search domain, customer, order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all border
                ${statusFilter === s
                  ? "bg-primary/20 text-primary border-primary/40"
                  : "bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600"
                }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-slate-500 text-sm text-center py-16">No orders found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-700">
                    {["Order", "Invoice", "Domain/Service", "Customer", "Email", "Amount", "Status", "Date", ""].map((h) => (
                      <th key={h} className="text-left text-slate-400 font-medium px-4 py-3 text-xs uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order) => (
                    <OrderRow key={order.id} order={order} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <p className="text-slate-600 text-xs text-center">
        Showing {filtered.length} of {orders.length} orders · Data from Supabase order syncs
      </p>
    </div>
  );
};

export default AdminOrders;
