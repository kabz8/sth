import { Button } from "@/components/ui/button";
import { Reveal, ParallaxImage } from "@/components/animations";
import { ArrowRight, MoveRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import heroImage from "@assets/generated_images/hero-nairobi.jpg";
import { useGetFeaturedProjects, useGetProjectStats, useListTestimonials } from "@workspace/api-client-react";

export default function Home() {
  const { data: featuredProjects } = useGetFeaturedProjects();
  const { data: stats } = useGetProjectStats();
  const { data: testimonials } = useListTestimonials();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-[95vh] w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src={heroImage} 
            alt="Modern Nairobi Architecture" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/60 md:bg-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <div className="font-mono text-primary text-sm md:text-base tracking-[0.3em] uppercase mb-6 flex items-center gap-4">
              <span className="w-12 h-px bg-primary"></span>
              Nairobi, Kenya
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.05] tracking-tight mb-8">
              Architectural <br/>
              <span className="text-primary italic font-light">precision</span> meets <br/>
              African boldness.
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-xl mb-10 font-sans leading-relaxed">
              We turn raw landscapes into landmark buildings. Designing spaces that feel expensive, tactile, and deeply connected to their environment.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/projects">
                <Button size="lg" className="rounded-none font-mono uppercase tracking-widest text-xs px-8 h-14 bg-foreground text-background hover:bg-primary hover:text-primary-foreground border border-transparent hover:border-primary transition-all">
                  View Portfolio
                </Button>
              </Link>
              <Link href="/book">
                <Button variant="outline" size="lg" className="rounded-none font-mono uppercase tracking-widest text-xs px-8 h-14 border-border hover:border-primary hover:bg-transparent hover:text-primary transition-all group">
                  Book Consultation
                  <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { label: "Completed Projects", value: stats?.total || "120+" },
              { label: "Years Experience", value: "14+" },
              { label: "Design Awards", value: "15" },
              { label: "Countries Active", value: "4" }
            ].map((stat, i) => (
              <div key={i} className="py-12 px-6 flex flex-col items-center justify-center text-center">
                <Reveal delay={i * 0.1}>
                  <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">{stat.value}</div>
                  <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects preview */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-blueprint opacity-[0.03] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
                Selected <span className="text-primary italic font-light">Works</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <Link href="/projects">
                <Button variant="link" className="font-mono uppercase tracking-widest text-xs text-foreground hover:text-primary p-0 h-auto flex items-center group">
                  Explore full archive
                  <MoveRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {(featuredProjects || []).slice(0, 4).map((project, i) => (
              <Reveal key={project.id} delay={i * 0.1} className={`group cursor-pointer ${i % 2 === 1 ? 'md:mt-24' : ''}`}>
                <Link href={`/projects/${project.id}`}>
                  <div className="relative overflow-hidden mb-6 aspect-[4/5] md:aspect-[3/4]">
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      src={project.coverImage || "https://placehold.co/800x1000/1e1e1e/3ECAC8?text=Project"} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-background/90 backdrop-blur text-foreground font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border border-border">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-muted-foreground font-mono text-sm">{project.location} • {project.year}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors group-hover:bg-primary/5">
                      <ArrowRight className="w-4 h-4 -rotate-45" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-6 md:px-12">
          <Reveal>
            <div className="max-w-2xl mb-16">
              <h2 className="text-3xl md:text-5xl font-display tracking-tight mb-6">Our Expertise</h2>
              <p className="text-muted-foreground font-sans text-lg">We deliver end-to-end architectural solutions, from initial concept to the final handover, ensuring uncompromising quality at every stage.</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
            {[
              { num: "01", title: "Architectural Design", desc: "Crafting bespoke designs that balance aesthetics, functionality, and sustainability." },
              { num: "02", title: "Interior Architecture", desc: "Curating spaces that are tactile, refined, and deeply personal." },
              { num: "03", title: "Site Supervision", desc: "Rigorous oversight to ensure the blueprint becomes reality without compromise." }
            ].map((service, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-border hover:bg-muted/30 transition-colors h-full flex flex-col">
                  <span className="font-mono text-primary text-xl mb-8 block">{service.num}.</span>
                  <h3 className="text-2xl font-display font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground font-sans mb-12 flex-grow">{service.desc}</p>
                  <Link href="/services">
                    <span className="inline-flex items-center font-mono uppercase text-xs tracking-widest text-foreground hover:text-primary transition-colors group cursor-pointer">
                      Learn more <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">The Process</h2>
              <p className="text-muted-foreground max-w-xl mx-auto font-sans">A measured, deliberate approach to bringing ambitious visions to life.</p>
            </Reveal>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2 hidden md:block" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 relative z-10">
              {['Consultation', 'Design', 'Approval', 'Construction', 'Handover'].map((step, i) => (
                <Reveal key={i} delay={i * 0.1} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center font-mono text-primary mb-6 shadow-sm">
                    0{i+1}
                  </div>
                  <h4 className="font-display font-bold text-lg mb-2">{step}</h4>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none mix-blend-overlay" />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground mb-8">
              Ready to build <br className="hidden md:block"/> your legacy?
            </h2>
            <p className="text-primary-foreground/80 font-sans text-lg max-w-xl mx-auto mb-12">
              Start the conversation today and let us translate your vision into an enduring architectural statement.
            </p>
            <Link href="/book">
              <Button size="lg" className="rounded-none bg-background text-foreground hover:bg-accent hover:text-accent-foreground font-mono uppercase tracking-widest px-10 h-16 text-sm border-none shadow-xl hover:-translate-y-1 transition-transform group">
                Book a Consultation
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
