import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Globe, Zap, Shield, Server, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const StreamingServers = () => {
  const features = [
    { icon: Play, title: "Live & VOD Streaming", description: "Support for both live broadcasts and on-demand video with adaptive bitrate streaming." },
    { icon: Globe, title: "Global CDN", description: "Content delivered from edge servers worldwide for buffer-free viewing everywhere." },
    { icon: Zap, title: "Ultra-Low Latency", description: "Sub-second latency for live events, auctions, sports, and real-time interactions." },
    { icon: Shield, title: "DRM & Security", description: "Protect your content with encryption, token authentication, and geo-restrictions." },
    { icon: Server, title: "Unlimited Bandwidth", description: "No caps on viewers or data transfer — scale to millions of concurrent streams." },
    { icon: Headphones, title: "24/7 Streaming Support", description: "Dedicated support team that understands streaming infrastructure inside and out." },
  ];

  return (
    <>
      <Helmet>
        <title>Streaming Servers | Live & VOD Hosting - Infinitive Cloud</title>
        <meta name="description" content="High-performance streaming servers for live broadcasts and on-demand video. Ultra-low latency, global CDN, unlimited bandwidth, and DRM protection." />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/streaming-servers" />
      </Helmet>
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          <section className="section-container mb-16">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="mb-6">
                <span className="gradient-text">Streaming</span> Servers
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Unlimited streaming servers built for flawless live broadcasts and on-demand video delivery. No buffering, no limits — just seamless playback for your audience worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link to="/quote"><Button className="btn-gradient glow-effect font-bold h-14 px-8">Get a Quote</Button></Link>
                <Link to="/contact"><Button variant="outline" className="h-14 px-8 font-semibold">Talk to an Expert</Button></Link>
              </div>
            </div>
          </section>

          <section className="section-container mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <Card key={f.title} className="card-hover animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    <CardContent className="p-8">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                      <p className="text-muted-foreground">{f.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default StreamingServers;
