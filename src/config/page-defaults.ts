/**
 * Default content for every page — sourced from the hardcoded values in each page component.
 * AdminPageEditor uses these as initial field values when Supabase has no saved content yet.
 */
export const PAGE_DEFAULTS: Record<string, Record<string, string>> = {
  // ─── Home ──────────────────────────────────────────────────────────────────
  home: {
    hero_heading: "Premium Cloud & Web Hosting Built for Speed & Scale",
    hero_subtext:
      "Managed VPS, dedicated servers, shared hosting & enterprise infrastructure — powered by NVMe SSD, LiteSpeed, and 24/7 expert support.",
    hero_cta_primary: "Start Free Trial",
    hero_cta_secondary: "View Plans — From ₹79/mo",
    announcement_text: "🔥 Limited Time: Get 50% OFF on first 3 months",
    announcement_enabled: "false",
    domain_title: "Find Your Perfect Domain Name",
    domain_subtitle:
      "Register your domain at India's lowest prices. Free WHOIS privacy & SSL included with every domain.",
    domain_placeholder: "yourdomain.com",
    features_title: "Everything Your Business Needs",
    features_subtitle: "From cloud hosting to AI solutions, we've got you covered.",
    testimonials_title: "Trusted by 1,000+ Businesses",
    testimonials_subtitle: "See why companies across India choose Infinitive Cloud.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions? We've got answers.",
    meta_title: "Infinitive Cloud | Best Cloud & Web Hosting Company in India",
    meta_description:
      "Premium cloud hosting, VPS, dedicated servers & domain services in India. 99.99% uptime SLA, 24×7 support & 14-day free trial. Launch your business with Infinitive Cloud.",
    og_title: "Infinitive Cloud | Best Cloud & Web Hosting Company in India",
    og_description:
      "Premium cloud hosting, VPS, dedicated servers & domain services. 99.99% uptime SLA, 24×7 support & 14-day free trial.",
  },

  // ─── About ─────────────────────────────────────────────────────────────────
  about: {
    hero_heading: "About Infinitive Cloud",
    hero_subtext:
      "A global cloud, hosting, development, and AI solutions company delivering high-performance, scalable, secure, and future-ready digital infrastructure for businesses of all sizes.",
    hero_badge: "Our Story",
    hero_cta_primary: "Contact Us",
    hero_cta_secondary: "View Solutions",
    mission_title: "Our Mission",
    mission_text:
      "Empower businesses worldwide with reliable, scalable cloud and digital solutions that drive growth, innovation, and transformation. We're committed to making enterprise-grade technology accessible to organizations of all sizes.",
    vision_title: "Our Vision",
    vision_text:
      "Build a sustainable, intelligent digital future where every business has access to cutting-edge cloud infrastructure, AI capabilities, and expert support. We envision a world where technology seamlessly adapts to business needs.",
    values_title: "Our Core Values",
    values_subtitle: "The principles that guide everything we do.",
    team_title: "Meet Our Team",
    team_subtitle: "Passionate experts dedicated to your digital success.",
    meta_title:
      "About Infinitive Cloud - Leading IT Solutions Company India | Our Mission & Vision",
    meta_description:
      "Learn about Infinitive Cloud, a global cloud hosting, web development, and AI solutions company. Our mission is to empower businesses with reliable, scalable digital infrastructure.",
    og_title: "About Infinitive Cloud - Leading IT Solutions Company India",
    og_description:
      "Global cloud, hosting, development, and AI solutions company delivering high-performance, scalable, secure digital infrastructure.",
  },

  // ─── Pricing ───────────────────────────────────────────────────────────────
  pricing: {
    hero_heading: "Simple, Transparent Pricing",
    hero_subtext:
      "Enterprise-grade hosting at India's most competitive prices. All plans include free SSL, 24/7 support & 99.9% uptime guarantee.",
    hero_badge: "Affordable Plans",
    hero_cta_primary: "Start Free Trial",
    hero_cta_secondary: "Compare Plans",
    web_hosting_title: "Web Hosting",
    vps_title: "VPS Hosting",
    cloud_title: "Cloud Hosting",
    dedicated_title: "Dedicated Servers",
    domains_title: "Domains",
    pricing_note: "All prices are in INR. Taxes may apply.",
    meta_title:
      "Pricing - Affordable Cloud Hosting, VPS, WordPress & Reseller Hosting India",
    meta_description:
      "India's most affordable hosting plans. Web hosting from ₹129/mo, Cloud from ₹469/mo, VPS from ₹335/mo, WordPress from ₹129/mo. 99.9% uptime, 24/7 support.",
    og_title: "Affordable Hosting Plans - Infinitive Cloud",
    og_description:
      "Web hosting from ₹129/mo, Cloud from ₹469/mo, VPS from ₹335/mo. Enterprise features at India's best prices.",
  },

  // ─── Contact ───────────────────────────────────────────────────────────────
  contact: {
    hero_heading: "Contact Us",
    hero_subtext:
      "Tell us about your project or inquiry and we'll provide a tailored response with transparent pricing.",
    email: "info@infinitivecloud.com",
    phone: "+91 8690393087",
    whatsapp: "+91 8690393087",
    address: "Navrangpura, Ahmedabad, India",
    hours: "Mon–Sat, 9 AM – 7 PM IST",
    form_title: "Contact Our Team",
    form_subtitle:
      "Fill out the details below and receive a personalized response within 24 hours.",
    form_success_message:
      "We've received your request and will get back to you within 24 hours. If you don't get a reply, please check your Spam folder.",
    meta_title:
      "Contact Us - Cloud, Hosting & Development Services | Infinitive Cloud",
    meta_description:
      "Contact us for inquiries about cloud hosting, web development, mobile apps, or AI solutions. Free consultation, detailed responses within 24 hours, no commitment required.",
    og_title: "Contact Us - Infinitive Cloud",
    og_description:
      "Send your inquiry for cloud, hosting, development, or AI services.",
  },

  // ─── Blog ──────────────────────────────────────────────────────────────────
  blog: {
    hero_heading: "Resources & Knowledge Hub",
    hero_subtext:
      "Expert insights, guides, and best practices for cloud, hosting, development, and AI solutions.",
    hero_cta_primary: "Subscribe",
    cat_all: "All Posts",
    cat_cloud: "Cloud",
    cat_hosting: "Hosting",
    cat_dev: "Development",
    cat_ai: "AI",
    meta_title:
      "Blog - Cloud Computing, Web Development & AI Insights | Infinitive Cloud",
    meta_description:
      "Expert insights, guides, and best practices on cloud computing, web hosting, development, and AI solutions. Stay updated with the latest technology trends and tips.",
    og_title: "Tech Blog - Infinitive Cloud",
    og_description:
      "Expert insights on cloud, hosting, development, and AI solutions.",
  },

  // ─── Careers ───────────────────────────────────────────────────────────────
  careers: {
    hero_heading: "Join Team Infinitive Cloud",
    hero_subtext:
      "Be part of a team that's building the future of cloud infrastructure, hosting, and AI solutions.",
    hero_cta_primary: "Apply Now",
    perks_title: "Why Work With Us?",
    perks_subtitle:
      "We offer competitive compensation, flexible work, and a culture of innovation.",
    meta_title: "Careers at Infinitive Cloud - Join Our Team | IT Jobs India",
    meta_description:
      "Join Infinitive Cloud and work on cutting-edge cloud, AI, and development projects. Growth opportunities, collaborative culture, and exciting projects. Ahmedabad, India.",
    og_title: "Careers at Infinitive Cloud",
    og_description:
      "Join our team building the future of cloud infrastructure and AI solutions.",
  },

  // ─── Solutions ─────────────────────────────────────────────────────────────
  solutions: {
    hero_heading: "Complete Hosting Solutions",
    hero_subtext:
      "Everything you need to launch, grow, and scale your online presence. From shared hosting to enterprise dedicated servers — all backed by 99.99% uptime and 24/7 expert support.",
    hero_cta_primary: "Get Started",
    hero_cta_secondary: "Talk to an Expert",
    hosting_title: "Web Hosting",
    hosting_desc: "Affordable, reliable hosting for all your websites.",
    cloud_title: "Cloud Services",
    cloud_desc: "Scalable cloud infrastructure for modern businesses.",
    dev_title: "Development",
    dev_desc: "Custom web and mobile app development.",
    meta_title:
      "Hosting Solutions | Cloud, VPS, Dedicated & Shared Hosting - Infinitive Cloud",
    meta_description:
      "Complete hosting solutions including shared hosting, VPS, cloud hosting, dedicated servers, domain registration, SSL certificates, and managed services. Enterprise-grade infrastructure in India.",
    og_title: "Hosting Solutions | Cloud, VPS, Dedicated & Shared",
    og_description:
      "Complete hosting solutions — shared, VPS, cloud, dedicated, domains, SSL. Enterprise-grade infrastructure in India.",
  },

  // ─── Knowledgebase ─────────────────────────────────────────────────────────
  knowledgebase: {
    hero_heading: "Knowledgebase",
    hero_subtext:
      "Find answers, tutorials, and step-by-step guides to help you get the most out of your hosting.",
    search_placeholder: "Search for articles...",
    meta_title: "Knowledgebase | Hosting Help & Tutorials - Infinitive Cloud",
    meta_description:
      "Find answers to common hosting questions. Step-by-step tutorials for cPanel, WordPress, domains, SSL, email, and more. Self-service support from Infinitive Cloud.",
    og_title: "Knowledgebase | Hosting Help & Tutorials",
    og_description:
      "Tutorials and guides for cPanel, WordPress, domains, SSL, email, and more.",
  },

  // ─── Quote ─────────────────────────────────────────────────────────────────
  quote: {
    hero_heading: "Request a Custom Quote",
    hero_subtext:
      "Tell us about your project and we'll provide a tailored solution with transparent pricing.",
    form_title: "Get Your Custom Quote",
    form_note:
      "Fill out the details below and receive a personalized proposal within 24 hours.",
    submit_button: "Submit Request",
    success_message:
      "Thank you! Our team will send you a detailed proposal within 24 hours.",
    meta_title:
      "Get Custom Quote - Cloud, Hosting & Development Services | Infinitive Cloud",
    meta_description:
      "Request a custom quote for cloud hosting, web development, mobile apps, or AI solutions. Free consultation, detailed proposal within 24 hours, no commitment required.",
    og_title: "Get Custom Quote - Infinitive Cloud",
    og_description:
      "Request a personalized proposal for cloud, hosting, development, or AI services.",
  },

  // ─── Legal ─────────────────────────────────────────────────────────────────
  privacy: {
    page_title: "Privacy Policy",
    last_updated: "January 2025",
    intro:
      "Welcome to Infinitive Cloud. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or use our cloud, hosting, development, and AI services. By using our site and services, you agree to the terms described in this policy.",
    data_collection_title: "What Information Do We Collect?",
    data_collection_text:
      "We collect personal details, account information, transactional data, technical data, cookies, and communication data to provide and improve our services.",
    cookies_title: "Cookies Policy",
    cookies_text:
      "We use cookies to enhance your browsing experience and improve our services. You can disable cookies in your browser settings.",
    contact_section:
      "For questions about this Privacy Policy, email info@infinitivecloud.com or call +91 8690393087.",
    meta_title: "Privacy Policy - Infinitive Cloud | Data Protection & Security",
    meta_description:
      "Infinitive Cloud Privacy Policy. Learn how we collect, use, and protect your personal information. Your data security is our priority.",
    og_title: "Privacy Policy - Infinitive Cloud",
    og_description:
      "Learn how Infinitive Cloud collects, uses, and protects your personal information.",
  },

  terms: {
    page_title: "Terms of Service",
    last_updated: "January 2025",
    intro:
      "By accessing or using Infinitive Cloud services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
    usage_title: "Acceptable Use",
    usage_text:
      "You agree to use our services for lawful purposes only and in accordance with these terms. Prohibited uses include spam, illegal content, and service abuse.",
    liability_title: "Limitation of Liability",
    liability_text:
      "Infinitive Cloud shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.",
    meta_title: "Terms of Service - Infinitive Cloud | Service Agreement",
    meta_description:
      "Infinitive Cloud Terms of Service. Read our service agreement, usage policies, and conditions for using our cloud, hosting, and development services.",
    og_title: "Terms of Service - Infinitive Cloud",
    og_description:
      "Service agreement and usage policies for Infinitive Cloud services.",
  },

  sla: {
    page_title: "Service Level Agreement (SLA)",
    uptime_guarantee: "99.99%",
    last_updated: "January 2025",
    intro:
      "Infinitive Cloud is committed to providing reliable, high-performance cloud and hosting services. This Service Level Agreement (SLA) defines our uptime guarantees, performance standards, and compensation policies.",
    compensation_text:
      "If uptime falls below our SLA guarantee, you will receive service credits automatically — no need to file a claim.",
    meta_title:
      "Service Level Agreement (SLA) - Infinitive Cloud | 99.99% Uptime Guarantee",
    meta_description:
      "Infinitive Cloud SLA. Our commitment to 99.99% uptime, performance standards, support response times, and compensation policies.",
    og_title: "Service Level Agreement - Infinitive Cloud",
    og_description: "99.99% uptime guarantee with automatic service credits.",
  },

  refund: {
    page_title: "Refund Policy",
    last_updated: "January 2025",
    intro:
      "At Infinitive Cloud, we stand behind the quality of our services. This Refund Policy outlines the terms and conditions under which refunds are provided for various services. Please read this policy carefully before making a purchase.",
    money_back_days: "30",
    eligible_text:
      "All hosting plans are eligible for a full refund within the first 30 days of service.",
    non_refundable_text:
      "Domain registrations, SSL certificates, and one-time setup fees are non-refundable.",
    process_text:
      "To request a refund, contact our support team at billing@infinitivecloud.com within the eligible refund period.",
    meta_title: "Refund Policy - Infinitive Cloud | Clear & Transparent Terms",
    meta_description:
      "Infinitive Cloud Refund Policy. Clear and transparent refund terms for cloud hosting, development services, and AI solutions.",
    og_title: "Refund Policy - Infinitive Cloud",
    og_description:
      "Clear and transparent refund terms for all Infinitive Cloud services.",
  },

  // ─── Solution Pages ────────────────────────────────────────────────────────
  "shared-hosting": {
    hero_heading: "Shared Hosting Plans India",
    hero_subtext:
      "Affordable, reliable, and blazing-fast shared hosting powered by NVMe SSD and LiteSpeed technology. Perfect for personal websites, blogs, small businesses, and WordPress sites.",
    hero_cta_primary: "Start Free Trial",
    hero_cta_secondary: "Talk to Sales",
    features_title: "Why Choose Our Shared Hosting",
    features_subtitle:
      "Enterprise-grade features at the most affordable prices. Every plan is designed for speed, security, and reliability.",
    pricing_title: "Shared Hosting Plans",
    pricing_subtitle: "Choose the right plan for your website.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about shared hosting? We've got answers.",
    meta_title:
      "Shared Hosting India | Affordable cPanel Hosting from ₹49/mo - Infinitive Cloud",
    meta_description:
      "Best shared hosting plans in India starting at ₹49/mo. NVMe SSD, free SSL, LiteSpeed servers, cPanel, and 99.99% uptime. Perfect for WordPress, blogs, and business websites.",
    og_title: "Shared Hosting India | cPanel Hosting from ₹49/mo",
    og_description:
      "Best shared hosting in India. NVMe SSD, free SSL, LiteSpeed, cPanel, 99.99% uptime.",
  },

  "vps-hosting": {
    hero_heading: "Premium VPS Hosting India",
    hero_subtext:
      "High-Performance Virtual Private Servers with Complete Control",
    hero_cta_primary: "Start Free Trial",
    hero_cta_secondary: "Talk to Sales",
    features_title: "Why Choose Our VPS Hosting",
    features_subtitle:
      "Dedicated resources, full root access, and enterprise-grade performance at competitive prices.",
    pricing_title: "VPS Hosting Plans",
    pricing_subtitle: "Choose the right VPS plan for your needs.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about VPS hosting? We've got answers.",
    meta_title:
      "Best VPS Hosting India | Linux & Windows VPS | NVMe SSD | From ₹799/mo",
    meta_description:
      "Premium VPS Hosting India | NVMe SSD Storage | Full Root Access | 99.99% Uptime | Dedicated Resources | Linux & Windows VPS | Starting ₹799/month. Managed VPS available. Free setup!",
    og_title: "Best VPS Hosting India | From ₹799/month | Full Root Access",
    og_description:
      "High-performance VPS hosting with NVMe SSD, dedicated resources, and 24/7 support. Linux & Windows VPS available.",
  },

  "cloud-hosting": {
    hero_heading: "Premium Cloud Hosting Solutions",
    hero_subtext:
      "Enterprise-Grade Cloud Infrastructure with 99.99% Uptime SLA",
    hero_cta_primary: "Start Free Trial",
    hero_cta_secondary: "Talk to Sales",
    features_title: "Why Choose Our Cloud Hosting",
    features_subtitle:
      "Auto-scaling cloud infrastructure with enterprise security and expert 24/7 support.",
    pricing_title: "Cloud Hosting Plans",
    pricing_subtitle: "Scalable plans for every business size.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about cloud hosting? We've got answers.",
    meta_title:
      "Best Cloud Hosting India | 99.99% Uptime | Starting ₹499/mo - Infinitive Cloud",
    meta_description:
      "#1 Cloud Hosting Provider in India | 99.99% Uptime SLA | SSD NVMe Storage | Auto-Scaling | Free SSL | 24/7 Support | Enterprise Security | Starting ₹499/month.",
    og_title: "Best Cloud Hosting India | 99.99% Uptime | From ₹499/month",
    og_description:
      "Premium cloud hosting with auto-scaling, enterprise security, and expert 24/7 support. Trusted by 10,000+ businesses.",
  },

  "dedicated-servers": {
    hero_heading: "Dedicated Servers for Maximum Performance",
    hero_subtext:
      "Enterprise-grade bare metal servers with full root access, NVMe SSD storage, and 99.99% uptime SLA. Built for high-traffic websites, applications, and compute-intensive workloads.",
    hero_cta_primary: "Get a Quote",
    hero_cta_secondary: "Talk to Sales",
    features_title: "Why Our Dedicated Servers",
    features_subtitle:
      "Full control, maximum performance, and enterprise-grade reliability.",
    pricing_title: "Dedicated Server Plans",
    pricing_subtitle: "Bare metal performance at competitive prices.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about dedicated servers? We've got answers.",
    meta_title:
      "Dedicated Servers India | Bare Metal from ₹3,999/mo - Infinitive Cloud",
    meta_description:
      "Enterprise-grade dedicated servers in India starting at ₹3,999/mo. Intel Xeon processors, NVMe SSD, DDoS protection, 99.99% uptime SLA, and 24/7 managed support.",
    og_title: "Dedicated Servers India | Bare Metal from ₹3,999/mo",
    og_description:
      "Enterprise dedicated servers with Intel Xeon, NVMe SSD, DDoS protection, 99.99% uptime.",
  },

  "reseller-hosting": {
    hero_heading: "Reseller Hosting",
    hero_subtext:
      "Start and scale your own hosting business with white-label infrastructure. Sell hosting under your brand with enterprise-grade hardware, easy management, and dedicated support.",
    hero_cta_primary: "Get a Quote",
    hero_cta_secondary: "Talk to Sales",
    features_title: "Why Choose Our Reseller Hosting",
    features_subtitle:
      "Everything you need to start your own hosting business with confidence.",
    pricing_title: "Reseller Hosting Plans",
    pricing_subtitle: "Flexible plans to match your reseller business needs.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about reseller hosting? We've got answers.",
    meta_title:
      "Reseller Hosting | Start Your Hosting Business - Infinitive Cloud",
    meta_description:
      "White-label reseller hosting with SSD NVMe, WHM/cPanel, free SSL, and priority support. Start your own hosting business with reliable infrastructure.",
    og_title: "Reseller Hosting | Start Your Hosting Business",
    og_description:
      "White-label reseller hosting with WHM/cPanel, free SSL, and priority support.",
  },

  "wordpress-hosting": {
    hero_heading: "Managed WordPress Hosting",
    hero_subtext:
      "WordPress hosting optimized for speed, security, and hassle-free management. Focus on your content — we handle everything else.",
    hero_cta_primary: "Start Free Trial",
    hero_cta_secondary: "Talk to Sales",
    features_title: "Why Choose Our WordPress Hosting",
    features_subtitle:
      "Optimized stack for WordPress with automatic updates, daily backups, and expert support.",
    pricing_title: "WordPress Hosting Plans",
    pricing_subtitle: "Plans starting from ₹69/mo.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about WordPress hosting? We've got answers.",
    meta_title:
      "Managed WordPress Hosting India | From ₹69/mo - Infinitive Cloud",
    meta_description:
      "Managed WordPress hosting with NVMe storage, automatic updates, daily backups, free SSL, AI website builder, and 24/7 expert support. Plans from ₹69/mo.",
    og_title: "Managed WordPress Hosting | Fast & Secure",
    og_description:
      "Managed WordPress hosting with NVMe, auto updates, daily backups, free SSL.",
  },

  "woocommerce-hosting": {
    hero_heading: "Launch Your Online Store with Blazing Speed",
    hero_subtext:
      "Purpose-built WooCommerce hosting with LiteSpeed servers, free SSL, automatic backups, and expert 24/7 support. Start selling in minutes.",
    hero_cta_primary: "Start Free Trial",
    hero_cta_secondary: "Talk to Sales",
    features_title: "Why Choose Our WooCommerce Hosting",
    features_subtitle:
      "Optimized infrastructure for WooCommerce stores with maximum performance.",
    pricing_title: "WooCommerce Hosting Plans",
    pricing_subtitle: "Plans optimized for e-commerce.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about WooCommerce hosting? We've got answers.",
    meta_title: "WooCommerce Hosting India | Fast & Secure | Infinitive Cloud",
    meta_description:
      "High-performance WooCommerce hosting with LiteSpeed cache, free SSL, daily backups & 99.99% uptime. Start your online store with Infinitive Cloud.",
    og_title: "WooCommerce Hosting India | Fast & Secure",
    og_description:
      "WooCommerce hosting with LiteSpeed cache, free SSL, daily backups, 99.99% uptime.",
  },

  "nodejs-hosting": {
    hero_heading: "Node.js Hosting — Deploy in Seconds",
    hero_subtext:
      "Deploy your Node.js, Express, NestJS, or Next.js app with one click. Full root access, NVMe SSD, and expert support.",
    hero_cta_primary: "Deploy Now",
    hero_cta_secondary: "Talk to Sales",
    features_title: "Why Choose Our Node.js Hosting",
    features_subtitle:
      "Purpose-built infrastructure for modern Node.js applications.",
    pricing_title: "Node.js Hosting Plans",
    pricing_subtitle: "Flexible plans for Node.js developers.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about Node.js hosting? We've got answers.",
    meta_title:
      "Node.js Hosting India | Deploy Express, NestJS, Next.js | Infinitive Cloud",
    meta_description:
      "High-performance Node.js hosting with NVMe SSD, full root access, and 24/7 support. Deploy Express, NestJS, Next.js apps in minutes.",
    og_title: "Node.js Hosting India | Deploy Express, NestJS, Next.js",
    og_description:
      "Deploy Node.js applications with ease. NVMe SSD, full root access, 24/7 expert support.",
  },

  "gpu-server": {
    hero_heading: "GPU Dedicated Servers built for AI at scale.",
    hero_subtext:
      "High-performance GPU servers powered by NVIDIA GPUs. Perfect for AI training, rendering, and compute-heavy workloads with 99.9% uptime.",
    hero_cta_primary: "Get a Quote",
    hero_cta_secondary: "Talk to Sales",
    features_title: "Why Choose Our GPU Servers",
    features_subtitle:
      "Enterprise-grade GPU infrastructure for AI, ML, and high-performance computing.",
    pricing_title: "GPU Server Plans",
    pricing_subtitle: "Powerful GPU plans for every workload.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about GPU servers? We've got answers.",
    meta_title:
      "GPU Dedicated Server | High-Performance Computing - Infinitive Cloud",
    meta_description:
      "High-performance GPU dedicated servers with 99.9% uptime, DDoS protection, up to 96 GB RAM and 100 TB bandwidth. Ideal for AI, rendering, and compute-heavy workloads.",
    og_title: "GPU Dedicated Server | AI & High-Performance Computing",
    og_description:
      "GPU dedicated servers for AI, rendering, and compute-heavy workloads. NVIDIA GPUs, 99.9% uptime.",
  },

  "streaming-servers": {
    hero_heading: "Streaming Servers",
    hero_subtext:
      "Unlimited streaming servers built for flawless live broadcasts and on-demand video delivery. No buffering, no limits — just seamless playback for your audience worldwide.",
    hero_cta_primary: "Get a Quote",
    hero_cta_secondary: "Talk to Sales",
    features_title: "Why Choose Our Streaming Servers",
    features_subtitle:
      "Ultra-low latency, global CDN, unlimited bandwidth, and DRM protection.",
    pricing_title: "Streaming Server Plans",
    pricing_subtitle: "Plans for every streaming use case.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about streaming servers? We've got answers.",
    meta_title: "Streaming Servers | Live & VOD Hosting - Infinitive Cloud",
    meta_description:
      "High-performance streaming servers for live broadcasts and on-demand video. Ultra-low latency, global CDN, unlimited bandwidth, and DRM protection.",
    og_title: "Streaming Servers | Live & VOD Hosting",
    og_description:
      "Streaming servers with ultra-low latency, global CDN, unlimited bandwidth, and DRM.",
  },

  "ssl-certificates": {
    hero_heading: "SSL Certificates for Complete Security",
    hero_subtext:
      "Protect your website and build customer trust with industry-standard SSL certificates. Free SSL included with all hosting plans, plus premium options for businesses that need more.",
    hero_cta_primary: "Get Free SSL",
    hero_cta_secondary: "View Premium Plans",
    features_title: "Why Choose Our SSL Certificates",
    features_subtitle:
      "Industry-standard encryption to secure your website and boost SEO rankings.",
    pricing_title: "SSL Certificate Plans",
    pricing_subtitle: "Free DV SSL with hosting, premium options available.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about SSL certificates? We've got answers.",
    meta_title:
      "SSL Certificates India | Free & Premium SSL from ₹2,999/yr - Infinitive Cloud",
    meta_description:
      "Secure your website with SSL certificates. Free DV SSL with all hosting plans. Premium OV, EV, and Wildcard SSL certificates with 256-bit encryption and warranty protection.",
    og_title: "SSL Certificates India | Free & Premium SSL",
    og_description:
      "Free DV SSL with hosting. Premium OV, EV, Wildcard SSL with 256-bit encryption.",
  },

  domains: {
    hero_heading: "Register Your Dream Domain Starting at ₹99/yr",
    hero_subtext:
      "Secure your brand online with instant domain registration. Choose from 500+ extensions with free WHOIS privacy, DNS management, and expert support.",
    hero_cta_primary: "Search Domains",
    hero_cta_secondary: "Transfer Domain",
    features_title: "Why Register With Us",
    features_subtitle:
      "India's lowest domain prices with free WHOIS privacy and instant activation.",
    pricing_title: "Domain Prices",
    pricing_subtitle: "Affordable prices for 500+ domain extensions.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about domain registration? We've got answers.",
    meta_title:
      "Domain Registration India | Register .com .in Domains from ₹99/yr - Infinitive Cloud",
    meta_description:
      "Register your domain name in India starting at ₹99/yr. 500+ extensions available with free WHOIS privacy, instant activation, and DNS management. Trusted by 1000+ businesses.",
    og_title: "Domain Registration India | .com .in from ₹99/yr",
    og_description:
      "Register domains from ₹99/yr. 500+ extensions, free WHOIS privacy, instant activation.",
  },

  "server-management": {
    hero_heading: "Managed Server operations, on autopilot.",
    hero_subtext:
      "Enterprise-grade managed server services with 24/7 NOC, sub-minute alert response, CIS hardening, and a named Technical Account Manager.",
    hero_cta_primary: "Get a Quote",
    hero_cta_secondary: "Talk to Sales",
    features_title: "What's Included",
    features_subtitle:
      "Comprehensive managed services so you can focus on your business.",
    pricing_title: "Managed Server Plans",
    pricing_subtitle: "Full management for every server size.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle:
      "Got questions about managed server services? We've got answers.",
    meta_title:
      "Managed Server Services India | 24/7 NOC - Infinitive Cloud",
    meta_description:
      "Enterprise-grade managed server services. 24/7 NOC, sub-minute alert response, CIS hardening, patch management, backups, and a named technical account manager.",
    og_title: "Managed Server Services | 24/7 NOC",
    og_description:
      "Engineer-led managed server operations with sub-minute response and a named TAM.",
  },

  "cloud-migration": {
    hero_heading: "Free Cloud Migration",
    hero_subtext:
      "Moving to Infinitive Cloud? We handle everything — from files and databases to DNS configuration. Zero downtime, zero hassle, completely free.",
    hero_cta_primary: "Request Free Migration",
    hero_cta_secondary: "Talk to an Expert",
    features_title: "What We Migrate",
    features_subtitle:
      "Complete migration service covering files, databases, emails, and DNS.",
    pricing_title: "Migration Plans",
    pricing_subtitle: "Free migration for all hosting plans.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about cloud migration? We've got answers.",
    meta_title:
      "Free Website Migration | Zero Downtime Cloud Migration - Infinitive Cloud",
    meta_description:
      "Free website migration to Infinitive Cloud with zero downtime. We handle the entire process — files, databases, emails, DNS. Migrate from any hosting provider.",
    og_title: "Free Website Migration | Zero Downtime",
    og_description:
      "Free zero-downtime website migration. Files, databases, emails, DNS — we handle everything.",
  },

  "server-licenses": {
    hero_heading: "Software & Server Licenses",
    hero_subtext:
      "Genuine cPanel, CloudLinux, Imunify360, Microsoft Windows & SQL Server licenses with instant activation and reliable support.",
    hero_cta_primary: "Buy License",
    hero_cta_secondary: "Talk to Sales",
    features_title: "Why Buy From Us",
    features_subtitle:
      "Genuine licenses at best prices with instant activation and dedicated support.",
    pricing_title: "License Pricing",
    pricing_subtitle: "Competitive prices for all major server software.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about server licenses? We've got answers.",
    meta_title:
      "Server & Software Licenses | cPanel, Plesk, Windows | Infinitive Cloud",
    meta_description:
      "Buy genuine cPanel, CloudLinux, Imunify360, Windows Server, MS SQL, and TSplus licenses at best prices. Instant activation with reliable support from Infinitive Cloud.",
    og_title: "Server & Software Licenses | cPanel, Plesk, Windows",
    og_description:
      "Genuine server software licenses at best prices with instant activation.",
  },

  "web-development": {
    hero_heading: "Professional Web Development Services",
    hero_subtext:
      "Transform Your Vision into Powerful Digital Experiences",
    hero_cta_primary: "Get a Free Quote",
    hero_cta_secondary: "View Portfolio",
    features_title: "Our Web Development Services",
    features_subtitle:
      "From stunning corporate websites to complex web applications, our expert developers deliver results.",
    pricing_title: "Web Development Packages",
    pricing_subtitle: "Transparent pricing for every project size.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about web development? We've got answers.",
    meta_title:
      "Top Web Development Company India | Custom Website Design & Development",
    meta_description:
      "Leading Web Development Company in India | Custom Websites | E-Commerce | React, Node.js, PHP | 2000+ Websites Built | SEO-Friendly | Mobile Responsive | From ₹10,000. Free Consultation!",
    og_title:
      "Best Web Development Company India | Custom Websites & E-Commerce",
    og_description:
      "Professional web development services. 2000+ websites built. React, Node.js, PHP experts. Free consultation!",
  },

  "mobile-apps": {
    hero_heading: "Expert Mobile App Development",
    hero_subtext: "Transform Ideas into Powerful Mobile Applications",
    hero_cta_primary: "Get a Free Quote",
    hero_cta_secondary: "View Portfolio",
    features_title: "Our Mobile App Services",
    features_subtitle:
      "Native and cross-platform mobile apps for iOS and Android.",
    pricing_title: "Mobile App Development Packages",
    pricing_subtitle: "Transparent pricing for every mobile project.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about mobile app development? We've got answers.",
    meta_title:
      "Best Mobile App Development Company India | iOS & Android App Developers",
    meta_description:
      "Top Mobile App Development Company in India | iOS & Android | React Native | Flutter | 1000+ Apps Built | Startup to Enterprise Solutions | From ₹25,000 | Free Consultation & Quote!",
    og_title:
      "Top Mobile App Development Company India | iOS & Android",
    og_description:
      "Expert mobile app development. 1000+ apps built. Native & cross-platform solutions. Free consultation!",
  },

  "ai-solutions": {
    hero_heading: "Transform Business with AI Solutions",
    hero_subtext:
      "Intelligent Automation & Machine Learning for Modern Businesses",
    hero_cta_primary: "Get a Free Consultation",
    hero_cta_secondary: "View Solutions",
    features_title: "Our AI Services",
    features_subtitle:
      "Custom AI solutions including chatbots, ML models, and business automation.",
    pricing_title: "AI Solutions Packages",
    pricing_subtitle: "Transparent pricing for AI projects.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about AI solutions? We've got answers.",
    meta_title:
      "AI Solutions India | #1 AI Development Company | Chatbots, ML, Automation",
    meta_description:
      "Top-rated AI solutions company in India. Custom AI chatbots, machine learning, business automation, NLP & computer vision. 500+ AI projects delivered. Free consultation.",
    og_title: "Best AI Solutions Company India | Chatbots & Machine Learning",
    og_description:
      "Leading AI development company in India. Custom chatbots, ML models, automation. 500+ projects. Free consultation!",
  },

  "odoo-solutions": {
    hero_heading: "Odoo Solutions",
    hero_subtext:
      "Customized Odoo ERP implementations that streamline your entire business — from sales and inventory to accounting and HR. One platform, every department connected.",
    hero_cta_primary: "Get a Quote",
    hero_cta_secondary: "Talk to Sales",
    features_title: "Our Odoo Services",
    features_subtitle:
      "Complete Odoo ERP implementation, customization, and managed hosting.",
    pricing_title: "Odoo Solution Packages",
    pricing_subtitle: "Tailored Odoo packages for every business size.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about Odoo? We've got answers.",
    meta_title:
      "Odoo ERP Solutions | Custom Implementation - Infinitive Cloud",
    meta_description:
      "Customized Odoo ERP solutions including implementation, e-commerce, accounting, HR, managed hosting, and training. Streamline your entire business operation.",
    og_title: "Odoo ERP Solutions | Custom Implementation",
    og_description:
      "Customized Odoo ERP — implementation, e-commerce, accounting, HR, hosting & training.",
  },

  "email-security": {
    hero_heading: "Professional Email & SSL Solutions",
    hero_subtext:
      "Set up custom domain email with Zoho, Microsoft 365, or Google Workspace. Protect your website with trusted SSL certificates.",
    hero_cta_primary: "Get Started",
    hero_cta_secondary: "Talk to Sales",
    features_title: "Email & Security Solutions",
    features_subtitle:
      "Enterprise email and SSL security for your business.",
    pricing_title: "Email & SSL Plans",
    pricing_subtitle: "Professional email and security at competitive prices.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about email or SSL? We've got answers.",
    meta_title:
      "Business Email & SSL Certificates India | Infinitive Cloud",
    meta_description:
      "Professional business email (Zoho, Microsoft 365, Google Workspace) and SSL certificates. Secure your business with Infinitive Cloud.",
    og_title: "Business Email & SSL Certificates India",
    og_description:
      "Professional business email and SSL certificates for your business.",
  },

  "n8n-hosting": {
    hero_heading: "Self-Hosted n8n — Own Your Automation",
    hero_subtext:
      "Deploy production-ready, self-hosted n8n on a dedicated VPS in under 2 minutes. Pre-installed, pre-configured, with full root access. From ₹599/mo.",
    hero_cta_primary: "Deploy n8n Now",
    hero_cta_secondary: "Learn More",
    features_title: "Why Self-Host n8n With Us",
    features_subtitle:
      "Full control, no execution limits, and complete data ownership.",
    pricing_title: "n8n Hosting Plans",
    pricing_subtitle: "Plans for solo automators to enterprise teams.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about n8n hosting? We've got answers.",
    meta_title:
      "Self-Hosted n8n Hosting — Own Your Automation | INFINITIVE CLOUD",
    meta_description:
      "Deploy production-ready, self-hosted n8n on a dedicated VPS in under 2 minutes. Pre-installed, pre-configured, with full root access. From ₹599/mo.",
    og_title: "Self-Hosted n8n Hosting | Own Your Automation",
    og_description:
      "Deploy self-hosted n8n in 2 minutes. Full root access, no limits, complete data ownership.",
  },

  openclaw: {
    hero_heading: "Your private AI workspace",
    hero_subtext:
      "Deploy Openclaw — a private, self-hosted, open-source AI platform — on a dedicated VPS in 2 minutes. Bring any LLM, own your data. From ₹799/mo.",
    hero_cta_primary: "Deploy Now",
    hero_cta_secondary: "Learn More",
    features_title: "Why Self-Host Your AI",
    features_subtitle:
      "Complete privacy, no usage caps, and full control over your AI workspace.",
    pricing_title: "Openclaw Hosting Plans",
    pricing_subtitle: "Plans for individuals and teams.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about Openclaw hosting? We've got answers.",
    meta_title:
      "Openclaw — Self-Hosted Open-Source AI Workspace | INFINITIVE CLOUD",
    meta_description:
      "Deploy Openclaw — a private, self-hosted, open-source AI platform — on a dedicated VPS in 2 minutes. Bring any LLM, own your data. From ₹799/mo.",
    og_title: "Openclaw | Self-Hosted AI Workspace",
    og_description:
      "Private, self-hosted AI workspace. Deploy in 2 minutes, own your data.",
  },

  "google-workspace": {
    hero_heading: "Your team's new home — powered by Google",
    hero_subtext:
      "Google Workspace for your business — custom email, Drive, Meet, Docs and more. INR billing, free migration, 24/7 support. Plans from ₹125/user/mo.",
    hero_cta_primary: "Get Started",
    hero_cta_secondary: "Talk to Sales",
    features_title: "Everything in Google Workspace",
    features_subtitle:
      "Professional tools your team already knows, now with expert support.",
    pricing_title: "Google Workspace Plans",
    pricing_subtitle: "Plans from ₹125/user/mo with INR billing.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about Google Workspace? We've got answers.",
    meta_title: "Google Workspace Hosting in India — INFINITIVE CLOUD",
    meta_description:
      "Google Workspace for your business — custom email, Drive, Meet, Docs and more. INR billing, free migration, 24/7 support. Plans from ₹125/user/mo.",
    og_title: "Google Workspace India | INFINITIVE CLOUD",
    og_description:
      "Google Workspace with INR billing, free migration, and 24/7 support.",
  },

  "vps-server": {
    hero_heading: "VPS Server Hosting India",
    hero_subtext:
      "Premium VPS hosting with full root access, NVMe SSD, dedicated resources, free DDoS protection and 99.99% uptime SLA. Starting at ₹499/mo.",
    hero_cta_primary: "Start Free Trial",
    hero_cta_secondary: "View Plans",
    features_title: "Why Choose Our VPS Servers",
    features_subtitle:
      "Enterprise-grade VPS with full root access and guaranteed resources.",
    pricing_title: "VPS Server Plans",
    pricing_subtitle: "Simple plans, serious power.",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Got questions about VPS servers? We've got answers.",
    meta_title:
      "VPS Server Hosting India | NVMe SSD & Root Access | Infinitive Cloud",
    meta_description:
      "Premium VPS hosting with full root access, NVMe SSD, dedicated resources, free DDoS protection and 99.99% uptime SLA. Starting at ₹499/mo.",
    og_title: "VPS Server Hosting India | NVMe SSD & Root Access",
    og_description:
      "Premium VPS with full root access, NVMe SSD, DDoS protection, 99.99% uptime.",
  },
};
