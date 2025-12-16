import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { StructuredData, createServiceSchema, createBreadcrumbSchema, createFAQSchema } from "@/components/StructuredData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Sparkles, Bot, Brain, Zap, BarChart, MessageSquare,
  CheckCircle2, ArrowRight, Cpu, Settings
} from "lucide-react";

const AISolutions = () => {
  const serviceSchema = createServiceSchema(
    "AI Solutions & Artificial Intelligence Development Services",
    "Custom AI solutions including chatbots, machine learning, business automation, NLP, and computer vision. Transform your business with cutting-edge artificial intelligence technology.",
    "https://infinitivecloud.com/solutions/ai-solutions",
    "Artificial Intelligence Development",
    "₹15,000 - ₹5,00,000"
  );

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", url: "https://infinitivecloud.com/" },
    { name: "Solutions", url: "https://infinitivecloud.com/solutions" },
    { name: "AI Solutions", url: "https://infinitivecloud.com/solutions/ai-solutions" }
  ]);

  const faqSchema = createFAQSchema([
    {
      question: "What AI solutions do you offer?",
      answer: "We offer comprehensive AI solutions including AI chatbots & assistants, business automation, custom machine learning models, AI analytics, natural language processing (NLP), computer vision, and predictive AI systems. Our solutions are tailored to your specific business needs."
    },
    {
      question: "How much does AI development cost in India?",
      answer: "AI development costs vary based on complexity. Simple AI chatbots start from ₹15,000, while complex machine learning solutions range from ₹50,000 to ₹5,00,000+. We provide custom quotes after understanding your requirements."
    },
    {
      question: "What technologies do you use for AI development?",
      answer: "We use leading AI technologies including OpenAI GPT, TensorFlow, PyTorch, Hugging Face, LangChain, Anthropic Claude, Google Gemini, and custom machine learning models. We select the best technology stack for your specific use case."
    },
    {
      question: "How long does it take to develop an AI solution?",
      answer: "Timeline depends on project complexity. Simple AI chatbots can be deployed in 2-4 weeks, while complex machine learning systems may take 2-6 months. We provide detailed project timelines during consultation."
    }
  ]);

  const services = [
    {
      icon: Bot,
      title: "AI Chatbots & Assistants",
      description: "Intelligent conversational AI for customer support, sales, and engagement with NLP capabilities."
    },
    {
      icon: Zap,
      title: "Business Automation",
      description: "Automate repetitive tasks, workflows, and processes using AI-powered automation solutions."
    },
    {
      icon: Brain,
      title: "Machine Learning Models",
      description: "Custom ML models for prediction, classification, recommendation, and data analysis."
    },
    {
      icon: BarChart,
      title: "AI Analytics",
      description: "Advanced analytics and insights powered by artificial intelligence and data science."
    },
    {
      icon: MessageSquare,
      title: "Natural Language Processing",
      description: "Text analysis, sentiment detection, content generation, and language understanding."
    },
    {
      icon: Cpu,
      title: "Computer Vision",
      description: "Image recognition, object detection, and visual analysis for various applications."
    }
  ];

  const useCases = [
    "Customer Service Automation",
    "Sales & Lead Generation",
    "Content Creation",
    "Data Analysis & Insights",
    "Predictive Maintenance",
    "Fraud Detection",
    "Personalization Engines",
    "Document Processing",
    "Voice Assistants",
    "Recommendation Systems"
  ];

  const technologies = [
    "OpenAI GPT", "TensorFlow", "PyTorch", "Hugging Face", 
    "LangChain", "Anthropic Claude", "Google Gemini", "Custom Models"
  ];

  return (
    <>
      <Helmet>
        <title>AI Solutions India | #1 AI Development Company | Chatbots, ML, Automation</title>
        <meta name="description" content="Top-rated AI solutions company in India ⭐ Custom AI chatbots, machine learning, business automation, NLP & computer vision. 500+ AI projects delivered. Free consultation. Get quote today!" />
        <meta name="keywords" content="AI solutions India, artificial intelligence company, AI chatbot development India, machine learning services, AI business automation, NLP services India, computer vision, AI development company, best AI company India, ChatGPT integration, OpenAI services" />
        <link rel="canonical" href="https://infinitivecloud.com/solutions/ai-solutions" />
        <meta property="og:title" content="Best AI Solutions Company India | Chatbots & Machine Learning" />
        <meta property="og:description" content="Leading AI development company in India. Custom chatbots, ML models, automation. 500+ projects. Free consultation!" />
        <meta property="og:url" content="https://infinitivecloud.com/solutions/ai-solutions" />
        <meta property="og:type" content="service" />
        <meta property="og:image" content="https://infinitivecloud.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Solutions India | AI Chatbots & Machine Learning Development" />
        <meta name="twitter:description" content="Custom AI solutions: chatbots, ML, automation, NLP. 500+ projects delivered." />
        <meta name="twitter:image" content="https://infinitivecloud.com/og-image.png" />
      </Helmet>
      
      <StructuredData data={serviceSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 pb-20">
          {/* Hero */}
          <section className="section-container mb-20">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary">AI-Powered Innovation</span>
              </div>
              <h1 className="mb-6">
                Transform Business with <span className="gradient-text">AI Solutions</span>
              </h1>
              <p className="text-xl md:text-2xl text-foreground mb-6 leading-relaxed">
                Intelligent Automation & Machine Learning for Modern Businesses
              </p>
              <p className="text-base md:text-lg text-foreground/70 mb-8 max-w-3xl mx-auto leading-relaxed">
                Harness the power of artificial intelligence to automate workflows, gain actionable insights, 
                and deliver exceptional customer experiences. From AI chatbots to custom machine learning 
                models, we build intelligent solutions that drive real business value.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/quote">
                  <Button size="lg" className="btn-gradient glow-effect font-bold h-14 px-8">
                    Explore AI Solutions
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="h-14 px-8 font-semibold">
                    Talk to AI Experts
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="section-container mb-20">
            <div className="text-center mb-12">
              <h2 className="mb-4">
                AI <span className="gradient-text">Services & Capabilities</span>
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Comprehensive artificial intelligence solutions tailored to your business needs.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card 
                    key={index} 
                    className="card-hover animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 glow-effect">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                      <p className="text-foreground/70 leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Use Cases */}
          <section className="section-container mb-20">
            <div className="text-center mb-12">
              <h2 className="mb-4">
                AI <span className="gradient-text">Use Cases</span>
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Real-world applications of AI across industries and business functions.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {useCases.map((useCase, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-semibold text-foreground">{useCase}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Technologies */}
          <section className="section-container mb-20">
            <div className="text-center mb-12">
              <h2 className="mb-4">
                AI <span className="gradient-text">Technologies</span>
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {technologies.map((tech, index) => (
                <div 
                  key={index}
                  className="px-6 py-3 rounded-full bg-muted border border-border hover:border-primary hover:bg-primary/5 transition-all cursor-default"
                >
                  <span className="font-semibold text-foreground">{tech}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SEO Content */}
          <section className="section-container mb-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">
                Why Your Business Needs AI Solutions
              </h2>
              <p className="text-foreground/80 leading-relaxed mb-6">
                Artificial Intelligence is no longer a futuristic concept—it's a practical tool that 
                businesses of all sizes use to gain competitive advantages. AI solutions can automate 
                time-consuming tasks, provide 24/7 customer support, uncover hidden insights in data, 
                and enable personalized customer experiences at scale.
              </p>
              
              <h3 className="text-2xl font-bold mb-4 mt-8">
                AI Chatbots: The Future of Customer Engagement
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-6">
                AI-powered chatbots can handle thousands of customer inquiries simultaneously, provide 
                instant responses, qualify leads, schedule appointments, and even process transactions. 
                Unlike rule-based bots, modern AI chatbots understand context, learn from interactions, 
                and deliver natural, human-like conversations that improve customer satisfaction while 
                reducing support costs.
              </p>

              <h3 className="text-2xl font-bold mb-4 mt-8">
                Our AI Development Approach
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-6">
                We start by understanding your business challenges and identifying opportunities where 
                AI can deliver measurable value. Our team then designs, develops, and deploys custom AI 
                solutions using the latest technologies and best practices. We provide comprehensive 
                training, ongoing optimization, and support to ensure your AI systems continuously improve 
                and deliver ROI.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="section-container">
            <Card className="bg-gradient-to-br from-primary/10 via-accent/10 to-background border-2 border-primary/20">
              <CardContent className="pt-12 pb-12 text-center">
                <h2 className="mb-4">Ready to Implement AI?</h2>
                <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
                  Discover how AI can transform your business operations and customer experiences.
                </p>
                <Link to="/quote">
                  <Button size="lg" className="btn-gradient glow-effect font-bold h-14 px-10">
                    Schedule AI Consultation
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AISolutions;
