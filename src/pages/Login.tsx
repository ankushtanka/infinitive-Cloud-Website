import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Login - Infinitive Cloud | Access Your Account</title>
        <meta name="description" content="Login to your Infinitive Cloud account to manage your hosting, domains, and cloud services." />
        <link rel="canonical" href="https://infinitivecloud.com/login" />
      </Helmet>

      <Navigation />

      <main className="pt-24 pb-20">
        <section className="section-container">
          <div className="max-w-md mx-auto animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="mb-4">
                <span className="gradient-text">Welcome Back</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Sign in to manage your cloud services
              </p>
            </div>

            <Card className="border border-border shadow-[var(--shadow-medium)]">
              <CardContent className="pt-8 pb-8 px-8">
                <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                      <Link to="/contact" className="text-xs text-primary hover:underline font-medium">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="btn-gradient glow-effect w-full h-12 text-base font-bold mt-2">
                    Sign In
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link to="/contact" className="text-primary font-semibold hover:underline">
                    Get Started
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
