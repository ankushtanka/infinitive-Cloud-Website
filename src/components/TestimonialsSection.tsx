import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    company: "TechStart Solutions",
    role: "CTO",
    content: "Infinitive Cloud transformed our infrastructure. The migration was seamless with zero downtime, and their 24/7 support team is exceptional.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    company: "E-Shop India",
    role: "CEO",
    content: "We switched to Infinitive Cloud and saw a 40% improvement in site speed. Their hosting has been a game-changer for our e-commerce business.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    company: "Digital Agency Pro",
    role: "Founder",
    content: "Outstanding infrastructure and support. Our clients love the instant page loads, and the server management takes a huge burden off our team.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-muted/40">
      <div className="section-container">
        <div className="text-center mb-14">
          <p className="section-label">Testimonials</p>
          <h2 className="font-bold mb-3">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            See what businesses say about their experience with Infinitive Cloud.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, index) => (
            <Card
              key={index}
              className="border-border hover:border-primary/20 transition-all duration-300"
              style={{ boxShadow: "var(--shadow-soft)", borderRadius: "12px" }}
            >
              <CardContent className="p-7">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/80 mb-6 text-sm leading-relaxed">"{t.content}"</p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
