import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Headphones, Mic, Play, Radio, Server, Shield, Tv, Users, Video, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import UniversalOrbitDiagram from "@/components/infographics/UniversalOrbitDiagram";

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
        <meta name="keywords" content="streaming server India, live streaming hosting, VOD server, media server, IPTV server" />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/streaming-servers" />
        <meta property="og:title" content="Streaming Servers | Live & VOD Hosting" />
        <meta property="og:description" content="Streaming servers with ultra-low latency, global CDN, unlimited bandwidth, and DRM." />
        <meta property="og:url" content="https://infinitivecloud.com/solutions/streaming-servers" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://infinitivecloud.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Streaming Servers | Live & VOD Hosting" />
        <meta name="twitter:description" content="Streaming servers with ultra-low latency, global CDN, unlimited bandwidth, and DRM." />
        <meta name="twitter:image" content="https://infinitivecloud.com/og-image.png" />
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
                <Link to="/contact"><Button className="btn-gradient glow-effect font-bold h-14 px-8">Get a Quote</Button></Link>
                <Link to="/contact"><Button variant="outline" className="h-14 px-8 font-semibold">Talk to an Expert</Button></Link>
              </div>
            </div>
          </section>
          {{/* Premium animated infographic */}}
          <section className="section-container -mt-8 mb-20">
            <div className="max-w-5xl mx-auto animate-fade-in">
              <UniversalOrbitDiagram
                CenterIcon={{Radio}}
                centerTitle="Stream Engine"
                centerSubtitle="Low-Latency Edge"
                statusLabel="Live · 0 packet loss"
                metric="< 50ms"
                badge="HLS · RTMP · WebRTC"
                uid="streamin"
                nodes={{[
                  { icon: Video, label: "Encode", angle: 0 },
                  { icon: Globe, label: "CDN", angle: 60 },
                  { icon: Users, label: "Viewers", angle: 120 },
                  { icon: Mic, label: "Audio", angle: 180 },
                  { icon: Tv, label: "Player", angle: 240 },
                  { icon: Shield, label: "DRM", angle: 300 },
                ]}}
              />
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
