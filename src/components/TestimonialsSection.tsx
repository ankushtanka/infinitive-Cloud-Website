import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "TechStart Solutions",
      role: "CTO",
      content: "Infinitive Cloud transformed our infrastructure. The migration was seamless with zero downtime, and their 24/7 support team is exceptional. Highly recommended for growing startups.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      company: "E-Shop India",
      role: "CEO",
      content: "We switched to Infinitive Cloud's hosting and saw a 40% improvement in site speed. Their profession-optimized hosting for e-commerce has been a game-changer for our business.",
      rating: 5,
    },
    {
      name: "Amit Patel",
      company: "Digital Agency Pro",
      role: "Founder",
      content: "The AI solutions from CodinAI automated our customer support completely. We've saved countless hours and our clients love the instant responses. Outstanding service!",
      rating: 5,
    },
  ];

  return (
    <section className="section-container py-20 bg-muted/30">
      <div className="text-center mb-12 animate-fade-in">
        <h2 className="mb-4">
          Trusted by <span className="gradient-text">Industry Leaders</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          See what our clients say about their experience with Infinitive Cloud
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="card-hover animate-fade-in-up bg-card/50 backdrop-blur-sm"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardContent className="pt-6">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-primary">{testimonial.role}</p>
                <p className="text-sm text-muted-foreground">{testimonial.company}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
