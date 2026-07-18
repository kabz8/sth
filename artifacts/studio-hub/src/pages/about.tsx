import { Reveal } from "@/components/animations";
import { useListTeamMembers } from "@workspace/api-client-react";
import teamImg1 from "@assets/generated_images/team-1.jpg";
import teamImg2 from "@assets/generated_images/team-2.jpg";
import aboutHero from "@assets/generated_images/about-us.jpg";
import { Linkedin } from "lucide-react";

export default function About() {
  const { data: teamMembers } = useListTeamMembers();

  return (
    <div className="w-full pb-32">
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img src={aboutHero} alt="Studio Hub Interior" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/80" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-4xl">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">Our Story.</h1>
            <p className="text-xl text-muted-foreground font-sans">
              Founded in 2010, Studio Hub emerged from a desire to redefine African architecture — marrying global precision with local context.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Philosophy</h2>
              <div className="space-y-6 text-lg text-foreground/80 font-sans leading-relaxed">
                <p>We believe that a building should belong exactly where it is placed. Our architecture does not impose; it responds to the climate, culture, and material landscape of Africa.</p>
                <p>Every blueprint is an exercise in restraint and precision. We obsess over the hairline details, the exact alignment of a shadow, and the tactile quality of raw concrete against warm timber.</p>
                <p className="text-primary font-medium italic">"Architecture is not just building shelter; it is crafting a legacy in three dimensions."</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="aspect-square bg-muted relative">
                <img src={teamImg1} alt="Principal Architect" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                <div className="absolute bottom-0 left-0 bg-background p-6 border-t border-r border-border">
                  <h4 className="font-display text-xl font-bold">Studio Hub</h4>
                  <p className="font-mono text-xs text-primary uppercase tracking-widest mt-1">Principal Architects</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-16">
            <Reveal>
              <h2 className="text-4xl font-display font-bold tracking-tight">The Collective</h2>
              <p className="text-muted-foreground mt-4 font-sans max-w-2xl">A multi-disciplinary team of visionaries, draftsmen, and builders.</p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teamMembers?.map((member, i) => (
              <Reveal key={member.id} delay={i * 0.1}>
                <div className="group">
                  <div className="aspect-[3/4] bg-muted mb-4 overflow-hidden relative">
                    <img 
                      src={member.photo || teamImg2} 
                      alt={member.name} 
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    {member.linkedin && (
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a href={member.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 bg-background flex items-center justify-center rounded-full hover:bg-primary hover:text-background transition-colors">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-bold">{member.name}</h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-primary mt-1">{member.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
