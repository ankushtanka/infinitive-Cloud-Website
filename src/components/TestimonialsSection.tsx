import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    company: "TechStart Solutions",
    role: "CTO",
    content: "Infinitive Cloud transformed our infrastructure. The migration was seamless with zero downtime, and their 24/7 support team is exceptional. Site speed improved by 60%.",
    rating: 5,
    highlight: "60% faster",
  },
  {
    name: "Priya Sharma",
    company: "E-Shop India",
    role: "CEO",
    content: "We switched to Infinitive Cloud and saw a 40% improvement in site speed. Their e-commerce optimised hosting has been a game-changer for our conversion rates.",
    rating: 5,
    highlight: "40% speed boost",
  },
  {
    name: "Amit Patel",
    company: "Digital Agency Pro",
    role: "Founder",
    content: "Managing 50+ client websites is a breeze with their reseller hosting. cPanel, WHM, and priority support — exactly what a growing agency needs.",
    rating: 5,
    highlight: "50+ websites",
  },
  {
    name: "Sneha Reddy",
    company: "FinTech Solutions",
    role: "VP Engineering",
    content: "Their 99.99% uptime isn't just marketing — we've tracked it for 6 months. The dedicated server performance for our fintech app has been rock solid.",
    rating: 5,
    highlight: "99.99% uptime",
  },
  {
    name: "Vikram Singh",
    company: "StartupHub",
    role: "Co-Founder",
    content: "The free trial convinced us. Within 14 days we knew this was the right hosting partner. Migration was handled completely by their team — zero hassle.",
    rating: 5,
    highlight: "Zero hassle",
  },
  {
    name: "Anjali Mehta",
    company: "Creative Studio",
    role: "Director",
    content: "Best customer support we've experienced. Response time is under 10 minutes, even at 2 AM. That kind of reliability is worth every rupee.",
    rating: 5,
    highlight: "<10 min response",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-12 md:py-24 bg-muted/30" ref={ref}>
      <div className="section-container">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold text-xs md:text-sm px-4 py-1.5 rounded-full mb-3 md:mb-4">
            <Star className="w-4 h-4 fill-primary" />
            4.9/5 Average Rating
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Trusted by <span className="gradient-text">1,000+ Businesses</span>
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            See why companies across India choose Infinitive Cloud.
          </p>
        </div>

        {/* Mobile: show 3 testimonials, Desktop: show all 6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className={index >= 3 ? "hidden md:block" : ""}
            >
              <Card className="card-hover bg-card h-full group">
                <CardContent className="pt-4 md:pt-6 pb-4 md:pb-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-primary bg-primary/10 px-2 md:px-2.5 py-0.5 md:py-1 rounded-full">
                      {testimonial.highlight}
                    </span>
                  </div>

                  <Quote className="w-6 h-6 md:w-8 md:h-8 text-primary/20 mb-2 md:mb-3 flex-shrink-0" />
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-4 md:mb-6 flex-1 line-clamp-4 md:line-clamp-none">
                    {testimonial.content}
                  </p>

                  <div className="border-t border-border/50 pt-3 md:pt-4">
                    <p className="font-bold text-foreground text-xs md:text-sm">{testimonial.name}</p>
                    <p className="text-[10px] md:text-xs text-primary font-medium">{testimonial.role}, {testimonial.company}</p>
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