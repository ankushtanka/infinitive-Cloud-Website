import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Mail, Search, Cloud, Server, Code, Smartphone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const popularPages = [
    { name: "Cloud Hosting", href: "/solutions/cloud-hosting", icon: Cloud },
    { name: "VPS Hosting", href: "/solutions/vps-hosting", icon: Server },
    { name: "Web Development", href: "/solutions/web-development", icon: Code },
    { name: "Mobile Apps", href: "/solutions/mobile-apps", icon: Smartphone },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>404 - Page Not Found | Infinitive Cloud</title>
        <meta name="description" content="The page you're looking for doesn't exist. Explore our cloud hosting, web development, and AI solutions." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navigation />
      
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            {/* 404 Visual */}
            <div className="mb-8 animate-fade-in">
              <h1 className="text-8xl md:text-9xl font-bold gradient-text mb-4">404</h1>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
            </div>
            
            {/* Error Message */}
            <div className="mb-12 animate-fade-in-up">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Oops! Page Not Found
              </h2>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                The page you're looking for doesn't exist or has been moved. 
                Don't worry, let's get you back on track!
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Requested URL: <code className="bg-muted px-2 py-1 rounded text-xs">{location.pathname}</code>
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <Link to="/">
                <Button size="lg" className="btn-gradient text-white w-full sm:w-auto">
                  <Home className="mr-2 h-5 w-5" />
                  Go to Homepage
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => window.history.back()}
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Button>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Support
                </Button>
              </Link>
            </div>
            
            {/* Popular Pages */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-lg font-semibold mb-6">
                <Search className="inline-block mr-2 h-5 w-5" />
                Popular Solutions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {popularPages.map((page, index) => {
                  const Icon = page.icon;
                  return (
                    <Link key={page.name} to={page.href}>
                      <Card className="card-hover h-full">
                        <CardContent className="pt-6 text-center">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-3">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-sm font-medium">{page.name}</span>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="mt-12 pt-8 border-t border-border animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <p className="text-sm text-muted-foreground mb-4">Quick Links</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link to="/about" className="text-primary hover:underline">About Us</Link>
                <Link to="/pricing" className="text-primary hover:underline">Pricing</Link>
                <Link to="/blog" className="text-primary hover:underline">Blog</Link>
                <Link to="/careers" className="text-primary hover:underline">Careers</Link>
                <Link to="/solutions" className="text-primary hover:underline">All Solutions</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;