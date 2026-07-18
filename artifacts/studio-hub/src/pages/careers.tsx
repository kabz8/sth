import { Reveal } from "@/components/animations";
import { useListCareers } from "@workspace/api-client-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Briefcase } from "lucide-react";

export default function Careers() {
  const { data: careers, isLoading } = useListCareers();
  
  const activeCareers = careers?.filter(c => c.isActive) || [];

  return (
    <div className="w-full pb-32">
      <section className="pt-32 pb-16 px-6 md:px-12 bg-card border-b border-border">
        <div className="container mx-auto text-center max-w-3xl">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">Join the Studio.</h1>
            <p className="text-lg text-muted-foreground font-sans">
              We are always looking for rigorous thinkers, meticulous draftsmen, and creative problem-solvers to join our team in Nairobi.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          {isLoading ? (
            <div className="animate-pulse space-y-6">
              <div className="h-20 bg-muted border border-border" />
              <div className="h-20 bg-muted border border-border" />
            </div>
          ) : activeCareers.length > 0 ? (
            <Reveal delay={0.2}>
              <Accordion type="single" collapsible className="w-full">
                {activeCareers.map((career) => (
                  <AccordionItem key={career.id} value={`career-${career.id}`} className="border border-border bg-card mb-4 px-6">
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between w-full text-left gap-4 pr-6">
                        <div>
                          <h3 className="font-display text-2xl font-bold group-hover:text-primary transition-colors">{career.title}</h3>
                          <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mt-2">{career.department}</p>
                        </div>
                        <div className="flex gap-4 font-mono text-xs uppercase text-foreground items-center">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-primary" /> {career.location || "Nairobi"}</span>
                          <span className="flex items-center gap-1"><Briefcase className="w-3 h-3 text-primary" /> {career.type.replace('_', ' ')}</span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-8 border-t border-border mt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                        <div>
                          <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-4">Role Description</h4>
                          <p className="font-sans text-muted-foreground leading-relaxed whitespace-pre-wrap">{career.description}</p>
                        </div>
                        <div>
                          <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-4">Requirements</h4>
                          <p className="font-sans text-muted-foreground leading-relaxed whitespace-pre-wrap">{career.requirements}</p>
                        </div>
                      </div>
                      <div className="mt-8 pt-6 border-t border-border">
                        <a href="mailto:careers@studiohub.co.ke" className="inline-block bg-primary text-primary-foreground font-mono uppercase text-xs tracking-widest px-8 py-4 hover:bg-accent transition-colors">
                          Apply via Email
                        </a>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          ) : (
            <div className="text-center py-20 border border-dashed border-border bg-card">
              <p className="text-muted-foreground font-mono uppercase tracking-widest mb-4">No open positions currently.</p>
              <p className="font-sans text-foreground/80">However, we are always open to meeting exceptional talent. Send your portfolio to <a href="mailto:careers@studiohub.co.ke" className="text-primary hover:underline">careers@studiohub.co.ke</a>.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
