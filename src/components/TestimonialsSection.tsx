import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "CTO",
    company: "TechStart Solutions",
    content: "Infinitive Cloud transformed our infrastructure. The migration was seamless with zero downtime, and their 24/7 support team is exceptional. Site speed improved by 60%.",
    photo: null,
  },
  {
    name: "Priya Sharma",
    role: "CEO",
    company: "E-Shop India",
    content: "We switched to Infinitive Cloud and saw a 40% improvement in site speed. Their e-commerce optimised hosting has been a game-changer for our conversion rates.",
    photo: null,
  },
  {
    name: "Amit Patel",
    role: "Founder",
    company: "Digital Agency Pro",
    content: "Managing 50+ client websites is a breeze with their reseller hosting. cPanel, WHM, and priority support — exactly what a growing agency needs.",
    photo: null,
  },
  {
    name: "Sneha Reddy",
    role: "VP Engineering",
    company: "FinTech Solutions",
    content: "Their 99.99% uptime isn't just marketing — we've tracked it for 6 months. The dedicated server performance for our fintech app has been rock solid.",
    photo: null,
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-32 bg-muted/20" ref={ref}>
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4">
            Trusted by <span className="gradient-text">Leading Businesses</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            See why companies across India choose Infinitive Cloud.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <Card className="h-full border-border hover:border-accent/20 transition-colors">
                <CardContent className="p-8">
                  <Quote className="w-8 h-8 text-accent/30 mb-4" />
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    "{t.content}"
                  </p>
                  <div className="flex items-center gap-3 border-t border-border pt-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-accent">{t.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
