import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Cloud, Server, Code, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { StructuredData, createBreadcrumbSchema } from "@/components/StructuredData";

const Blog = () => {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://infinitivecloud.com/" },
    { name: "Blog", url: "https://infinitivecloud.com/blog" }
  ]);
  const categories = [
    { name: "Cloud", icon: Cloud, count: 12 },
    { name: "Hosting", icon: Server, count: 18 },
    { name: "Development", icon: Code, count: 15 },
    { name: "AI", icon: Sparkles, count: 8 },
  ];

  const articles = [
    {
      category: "Cloud",
      title: "Getting Started with Cloud Migration: A Complete Guide",
      excerpt: "Learn how to migrate your infrastructure to the cloud with zero downtime and maximum efficiency.",
      date: "December 10, 2024",
      readTime: "8 min read",
    },
    {
      category: "Hosting",
      title: "Why Profession-Optimized Hosting Matters for Your Business",
      excerpt: "Discover how specialized hosting solutions can improve your website performance and user experience.",
      date: "December 8, 2024",
      readTime: "6 min read",
    },
    {
      category: "AI",
      title: "AI Chatbots: Transforming Customer Support in 2024",
      excerpt: "Explore how AI-powered chatbots are revolutionizing customer service and business automation.",
      date: "December 5, 2024",
      readTime: "10 min read",
    },
    {
      category: "Development",
      title: "Modern Web Development Best Practices",
      excerpt: "Essential practices for building fast, secure, and scalable web applications in today's landscape.",
      date: "December 3, 2024",
      readTime: "12 min read",
    },
    {
      category: "Cloud",
      title: "Understanding Cloud Security: Protecting Your Data",
      excerpt: "A comprehensive look at cloud security measures and how to keep your business data safe.",
      date: "November 28, 2024",
      readTime: "9 min read",
    },
    {
      category: "Hosting",
      title: "Eco-Friendly Hosting: The Future of Web Infrastructure",
      excerpt: "Learn about green hosting solutions and how they benefit both your business and the environment.",
      date: "November 25, 2024",
      readTime: "7 min read",
    },
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Blog - Cloud Computing, Web Development & AI Insights | Infinitive Cloud</title>
        <meta name="description" content="Expert insights, guides, and best practices on cloud computing, web hosting, development, and AI solutions. Stay updated with the latest technology trends and tips." />
        <meta name="keywords" content="cloud computing blog, web development articles, AI technology insights, hosting tips, technology trends India, IT best practices" />
        <link rel="canonical" href="https://infinitivecloud.com/blog" />
        <meta property="og:title" content="Tech Blog - Infinitive Cloud" />
        <meta property="og:description" content="Expert insights on cloud, hosting, development, and AI solutions." />
        <meta property="og:url" content="https://infinitivecloud.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://infinitivecloud.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog - Infinitive Cloud" />
        <meta name="twitter:description" content="Cloud, hosting, and AI technology insights and guides." />
        <meta name="twitter:image" content="https://infinitivecloud.com/og-image.png" />
      </Helmet>
      
      <StructuredData data={breadcrumbSchema} />
      
      <Navigation />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="section-container mb-20">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="mb-6">
              Resources & <span className="gradient-text">Knowledge Hub</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expert insights, guides, and best practices for cloud, hosting, development, and AI solutions.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="section-container mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card
                  key={index}
                  className="card-hover cursor-pointer animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-3 glow-effect">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} articles</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Card
                key={index}
                className="card-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {article.category}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                  <CardDescription>{article.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                    <span>{article.readTime}</span>
                  </div>
                  <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5">
                    Read More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="section-container mt-20">
          <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border-2 border-primary/20">
            <CardContent className="pt-12 pb-12 text-center">
              <h2 className="mb-4">Stay Updated</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Subscribe to our newsletter for the latest insights, tips, and updates on cloud technology.
              </p>
              <Link to="/contact">
                <Button size="lg" className="btn-gradient text-white font-semibold px-8">
                  Subscribe Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
