import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations";
import { Link } from "wouter";
import { Building2, Home, Hammer, DraftingCompass, PencilRuler, Maximize } from "lucide-react";

const services = [
  {
    id: "architectural-design",
    title: "Architectural Design",
    description: "From the first sketch to the final drawing set, we design distinctive buildings that respond to climate, context, and the way people live.",
    icon: "building",
  },
  {
    id: "interior-architecture",
    title: "Interior Architecture",
    description: "We shape cohesive interiors through thoughtful planning, material palettes, lighting, and custom details that make every room feel intentional.",
    icon: "home",
  },
  {
    id: "masterplanning",
    title: "Masterplanning & Urban Design",
    description: "We turn complex sites into clear, connected environments with strong movement, landscape, public space, and long-term development strategies.",
    icon: "compass",
  },
  {
    id: "project-management",
    title: "Project Management",
    description: "Our structured project management keeps consultants, contractors, budgets, and decisions aligned from approval through construction.",
    icon: "hammer",
  },
  {
    id: "site-supervision",
    title: "Site Supervision",
    description: "We protect the design intent on site through regular inspections, quality checks, contractor coordination, and practical issue resolution.",
    icon: "pencil",
  },
  {
    id: "feasibility-advisory",
    title: "Feasibility & Development Advisory",
    description: "Before you build, we test the opportunity with site analysis, planning considerations, development options, and a clear path to delivery.",
    icon: "maximize",
  },
] as const;

export default function Services() {
  const getIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'building': return <Building2 className="w-12 h-12 stroke-1" />;
      case 'home': return <Home className="w-12 h-12 stroke-1" />;
      case 'hammer': return <Hammer className="w-12 h-12 stroke-1" />;
      case 'compass': return <DraftingCompass className="w-12 h-12 stroke-1" />;
      case 'pencil': return <PencilRuler className="w-12 h-12 stroke-1" />;
      default: return <Maximize className="w-12 h-12 stroke-1" />;
    }
  };

  return (
    <div className="w-full pb-32">
      <section className="pt-32 pb-24 px-6 md:px-12 bg-card border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint-dark opacity-10 pointer-events-none mix-blend-overlay" />
        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8">Expertise.</h1>
            <p className="text-xl text-muted-foreground font-sans leading-relaxed">
              We offer comprehensive architectural services, bridging the gap between visionary design and rigorous execution. Our multi-disciplinary approach ensures every detail is considered.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={i * 0.1}>
                <div className="p-10 border border-border hover:border-primary bg-card transition-colors group relative overflow-hidden h-full flex flex-col">
                  <div className="absolute -right-8 -top-8 text-border/30 group-hover:text-primary/10 transition-colors transform scale-150 rotate-12">
                    {getIcon(service.icon)}
                  </div>
                  <div className="text-primary mb-8 relative z-10">
                    {getIcon(service.icon)}
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4 relative z-10 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground font-sans leading-relaxed relative z-10 flex-grow">{service.description}</p>
                  <div className="mt-8 pt-8 border-t border-border relative z-10">
                    <Link href="/contact">
                      <span className="font-mono text-xs uppercase tracking-widest text-foreground hover:text-primary transition-colors cursor-pointer">Inquire about service →</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Not sure where to begin?</h2>
            <p className="text-lg font-sans mb-10 opacity-90">Book a strategic consultation to discuss your vision, evaluate feasibility, and outline a roadmap for your project.</p>
            <Link href="/book">
              <Button size="lg" className="rounded-none bg-background text-foreground hover:bg-accent hover:text-accent-foreground font-mono uppercase tracking-widest px-10 h-14">
                Schedule Consultation
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
