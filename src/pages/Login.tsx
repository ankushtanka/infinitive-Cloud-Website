import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LogIn, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { validateLogin } from "@/lib/whmcs";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setLoading(true);
    try {
      const result = await validateLogin(email, password);
      if (result.result === "success" && result.userid) {
        const user = {
          clientid: result.userid,
          firstname: result.client?.firstname || email.split("@")[0],
          lastname: result.client?.lastname || "",
          email: result.client?.email || email,
        };
        localStorage.setItem("whmcs_user", JSON.stringify(user));
        toast({ title: "Welcome back!", description: `Logged in as ${user.firstname}` });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: result.message || "Invalid email or password.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Connection Error",
        description: "Could not reach the server. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Login | Infinitive Cloud</title>
        <meta name="description" content="Login to your Infinitive Cloud account to manage domains, hosting, and billing." />
      </Helmet>
      <Navigation />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="border-border/50 shadow-xl">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto p-3 rounded-xl bg-primary/10 w-fit mb-3">
                <LogIn className="w-7 h-7 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Sign in to your client area</p>
            </CardHeader>
            <CardContent className="pt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full btn-gradient h-11 font-bold" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <LogIn className="w-4 h-4 mr-2" />}
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>
                  Don't have an account?{" "}
                  <Link to="/contact" className="text-primary font-medium hover:underline">
                    Get Started
                  </Link>
                </p>
                <a
                  href="https://client.infinitivecloud.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-primary hover:underline"
                >
                  Go to Client Area <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
