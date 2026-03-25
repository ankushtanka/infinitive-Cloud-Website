import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { question: "What is cloud hosting and how is it different from shared hosting?", answer: "Cloud hosting uses a network of virtual servers to host your website, offering better scalability, performance, and reliability. Unlike shared hosting where resources are shared with other users, cloud hosting gives you dedicated resources that can scale up or down based on your traffic needs." },
  { question: "Do you offer a free trial?", answer: "Yes. We offer a 15-day free trial on all cloud and VPS hosting plans. No credit card required, no setup fees. You get full access to all features during the trial period. All plans also come with a 30-day money-back guarantee." },
  { question: "What is your uptime guarantee?", answer: "We guarantee 99.99% uptime across all hosting plans, backed by a real service credit SLA. If we fail to meet this guarantee, you receive service credits automatically." },
  { question: "Do you provide free website migration?", answer: "Our expert migration team handles the entire process for free — from DNS configuration to database transfer. We've completed 30+ live migrations with zero downtime and zero data loss." },
  { question: "What control panel do you provide?", answer: "All our hosting plans include cPanel (shared/cloud) or WHM (VPS/dedicated) at no extra cost. These run on genuine licenses — not pirated software." },
  { question: "Can I upgrade my hosting plan later?", answer: "Yes. You can upgrade or downgrade your plan anytime. Upgrades are instant with no downtime — your additional resources are available immediately." },
  { question: "Do you offer managed hosting?", answer: "Yes. Our managed hosting option includes 24/7 server monitoring, OS updates, security patching, performance optimisation, and proactive issue resolution — available on VPS and dedicated server plans." },
];

const FAQSection = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="section-container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-card border border-border rounded-lg px-6 data-[state=open]:border-accent/30 transition-colors"
              >
                <AccordionTrigger className="text-left font-semibold text-sm md:text-base hover:no-underline py-5">
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
