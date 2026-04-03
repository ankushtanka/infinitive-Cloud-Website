import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  User,
  FileText,
  LogOut,
  ExternalLink,
  Search,
  Globe,
  Loader2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getInvoices } from "@/lib/whmcs";

interface WhmcsUser {
  clientid: number;
  firstname: string;
  lastname: string;
  email: string;
}

interface Invoice {
  id: number;
  date: string;
  duedate: string;
  total: string;
  status: string;
  payment_url?: string;
}

const statusColor: Record<string, string> = {
  Paid: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
  Unpaid: "bg-amber-500/15 text-amber-600 border-amber-500/30",
  Overdue: "bg-red-500/15 text-red-600 border-red-500/30",
  Cancelled: "bg-muted text-muted-foreground border-border",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<WhmcsUser | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("whmcs_user");
    if (!stored) {
      navigate("/login");
      return;
    }
    const parsed: WhmcsUser = JSON.parse(stored);
    setUser(parsed);

    (async () => {
      try {
        const res = await getInvoices(parsed.clientid);
        if (res.result === "success" && Array.isArray(res.invoices)) {
          setInvoices(res.invoices);
        }
      } catch {
        toast({ title: "Error", description: "Could not load invoices.", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("whmcs_user");
    toast({ title: "Logged out" });
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Dashboard | Infinitive Cloud</title>
      </Helmet>
      <Navigation />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Welcome, {user.firstname}
                </h1>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a href="https://client.infinitivecloud.com" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5" /> Client Area
                </Button>
              </a>
              <Button variant="ghost" size="sm" className="gap-1.5 text-destructive" onClick={logout}>
                <LogOut className="w-3.5 h-3.5" /> Logout
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            <Link to="/solutions/domains">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <Search className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Search Domain</span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/pricing">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">View Plans</span>
                </CardContent>
              </Card>
            </Link>
            <a href="https://client.infinitivecloud.com" target="_blank" rel="noopener noreferrer">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Manage Services</span>
                </CardContent>
              </Card>
            </a>
          </div>

          {/* Invoices */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" /> Recent Invoices
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-14 w-full rounded-lg" />
                  ))}
                </div>
              ) : invoices.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No invoices found.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b text-left text-muted-foreground">
                        <th className="pb-3 font-medium">Invoice #</th>
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium">Total</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((inv) => (
                        <tr key={inv.id} className="border-b last:border-0">
                          <td className="py-3 font-medium">#{inv.id}</td>
                          <td className="py-3 text-muted-foreground">{inv.date}</td>
                          <td className="py-3 font-semibold">₹{inv.total}</td>
                          <td className="py-3">
                            <Badge
                              variant="outline"
                              className={statusColor[inv.status] || ""}
                            >
                              {inv.status}
                            </Badge>
                          </td>
                          <td className="py-3">
                            {inv.payment_url && inv.status !== "Paid" && (
                              <a href={inv.payment_url} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="outline" className="h-7 text-xs">
                                  Pay Now
                                </Button>
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
