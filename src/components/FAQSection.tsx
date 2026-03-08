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
    answer: "Yes! We offer a 15-day free trial on all cloud and VPS hosting plans. No credit card required, no setup fees, and no hidden charges.",
  },
  {
    question: "What is your uptime guarantee?",
    answer: "We guarantee 99.99% uptime across all hosting plans, backed by a real service credit SLA. If we fail to meet this guarantee, you receive service credits automatically.",
  },
  {
    question: "Do you provide free website migration?",
    answer: "Absolutely. Our expert migration team handles the entire process for free — from DNS configuration to database transfer with zero downtime.",
  },
  {
    question: "What control panel do you provide?",
    answer: "All our hosting plans include cPanel (shared/cloud) or WHM (VPS/dedicated) at no extra cost.",
  },
  {
    question: "Can I upgrade my hosting plan later?",
    answer: "Yes. You can upgrade or downgrade your plan anytime. Upgrades are instant with no downtime.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-muted/40">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="section-label">FAQ</p>
          <h2 className="font-bold mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-card border border-border rounded-xl px-5 data-[state=open]:border-primary/20 transition-all"
                style={{ borderRadius: "12px" }}
              >
                <AccordionTrigger className="text-left font-medium text-sm hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
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
