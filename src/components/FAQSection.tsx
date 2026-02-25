import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is cloud hosting and how is it different from shared hosting?",
    answer: "Cloud hosting uses a network of virtual servers to host your website, offering better scalability, performance, and reliability. Unlike shared hosting where resources are shared with other users, cloud hosting gives you dedicated resources that can scale up or down based on your traffic needs.",
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes! We offer a 15-day free trial on all cloud and VPS hosting plans. No credit card required, no setup fees, and no hidden charges. You get full access to all features during the trial period.",
  },
  {
    question: "What is your uptime guarantee?",
    answer: "We guarantee 99.99% uptime across all hosting plans, backed by a real service credit SLA. If we fail to meet this guarantee, you receive service credits automatically — no need to file a claim.",
  },
  {
    question: "Do you provide free website migration?",
    answer: "Absolutely. Our expert migration team handles the entire process for free — from DNS configuration to database transfer. We've completed 30+ live migrations with zero downtime and zero data loss.",
  },
  {
    question: "What control panel do you provide?",
    answer: "All our hosting plans include cPanel (shared/cloud) or WHM (VPS/dedicated) at no extra cost. cPanel makes it easy to manage your websites, email accounts, databases, and domains from a single dashboard.",
  },
  {
    question: "Can I upgrade my hosting plan later?",
    answer: "Yes. You can upgrade or downgrade your plan anytime from your control panel. Upgrades are instant with no downtime — your additional resources are available immediately.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards, UPI, net banking, and PayPal. All transactions are processed securely with 256-bit SSL encryption.",
  },
  {
    question: "Do you offer managed hosting?",
    answer: "Yes. Our managed hosting option includes 24/7 server monitoring, OS updates, security patching, performance optimisation, and proactive issue resolution. Available on VPS and dedicated server plans.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Got questions? We've got answers. If you don't find what you're looking for, reach out to our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-base hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
