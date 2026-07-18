import { Button } from "@/components/ui/button";
import { Reveal, ParallaxImage } from "@/components/animations";
import { ArrowRight, MoveRight } from "lucide-react";
import { Link } from "wouter";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import heroImage from "@assets/generated_images/hero-nairobi.jpg";
import { useGetFeaturedProjects, useGetProjectStats, useListTestimonials } from "@workspace/api-client-react";

// Split text into words, each word animates up from a masked container
function AnimatedWord({ word, delay, className = "" }: { word: string; delay: number; className?: string }) {
  return (
    <span className="inline-block overflow-hidden leading-[1.1]">
      <motion.span
        className={`inline-block ${className}`}
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {word}
      </motion.span>
    </span>
  );
}

// Thin horizontal rule that draws itself left to right
function DrawLine({ delay }: { delay: number }) {
  return (
    <motion.span
      className="inline-block bg-primary h-px"
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 48, opacity: 1 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      style={{ verticalAlign: "middle" }}
    />
  );
}

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
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease: "easeOut" }}
            src={heroImage}
            alt="Modern Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/55 md:bg-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
        </div>

        {/* Decorative vertical rule */}
        <motion.div
          className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 w-px bg-primary/30 hidden md:block"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 160, opacity: 1 }}
          transition={{ duration: 1, delay: 1.6, ease: "easeOut" }}
        />

        <div className="container mx-auto px-6 md:px-12 relative z-10 pt-16 md:pt-20">
          {/* Studio tag — fades + slides in */}
          <motion.div
            className="flex items-center gap-3 mb-6 md:mb-8"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <DrawLine delay={0.5} />
            <span className="font-mono text-primary text-xs tracking-[0.35em] uppercase">
              Studio Hub Architects
            </span>
            <DrawLine delay={0.7} />
          </motion.div>

          {/* Main headline — each word mask-reveals upward */}
          <h1 className="font-display font-bold leading-[1.05] tracking-tight mb-6 md:mb-10 text-5xl md:text-7xl lg:text-[5.5rem]">
            {/* Line 1 */}
            <span className="block">
              <AnimatedWord word="Architectural" delay={0.55} />{" "}
            </span>
            {/* Line 2 — italic teal "precision" + "meets" */}
            <span className="block">
              <AnimatedWord
                word="precision"
                delay={0.72}
                className="text-primary italic font-light"
              />{" "}
              <AnimatedWord word="meets" delay={0.85} />
            </span>
            {/* Line 3 */}
            <span className="block">
              <AnimatedWord word="bold" delay={1.0} />{" "}
              <AnimatedWord word="vision." delay={1.12} />
            </span>
          </h1>

          {/* Sub-copy — fade in */}
          <motion.p
            className="text-base md:text-lg text-foreground/75 max-w-lg mb-10 font-sans leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.35, ease: "easeOut" }}
          >
            We turn raw landscapes into landmark buildings. Designing spaces
            that feel expensive, tactile, and deeply connected to their
            environment.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4 md:gap-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.55, ease: "easeOut" }}
          >
            <Link href="/projects">
              <Button
                size="lg"
                className="rounded-none font-mono uppercase tracking-widest text-xs px-8 h-14 bg-foreground text-background hover:bg-primary hover:text-primary-foreground border border-transparent hover:border-primary transition-all"
              >
                View Portfolio
              </Button>
            </Link>
            <Link href="/book">
              <Button
                variant="outline"
                size="lg"
                className="rounded-none font-mono uppercase tracking-widest text-xs px-8 h-14 border-border hover:border-primary hover:bg-transparent hover:text-primary transition-all group"
              >
                Book Consultation
                <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Floating metric pill */}
          <motion.div
            className="absolute bottom-8 right-6 md:right-12 hidden md:flex items-center gap-4 border border-border/60 bg-background/70 backdrop-blur-sm px-5 py-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.9, ease: "easeOut" }}
          >
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-primary">5+</div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Years</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-primary">{stats?.total ?? "120"}+</div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Projects</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="text-2xl font-display font-bold text-primary">4</div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Countries</div>
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
              { label: "Years Experience", value: "5+" },
              { label: "Design Awards", value: "15" },
              { label: "Countries Active", value: "4" }
            ].map((stat, i) => (
              <div key={i} className="py-12 px-6 flex flex-col items-center justify-center text-center">
                <Reveal delay={i * 0.1}>
                  <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects && featuredProjects.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-12">
            <Reveal>
              <div className="flex items-end justify-between mb-16">
                <div>
                  <p className="font-mono text-primary text-xs tracking-[0.3em] uppercase mb-4">Selected Works</p>
                  <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">Featured.</h2>
                </div>
                <Link href="/projects">
                  <span className="hidden md:flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:text-primary transition-colors cursor-pointer group">
                    View All <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </span>
                </Link>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {featuredProjects.slice(0, 3).map((project, i) => (
                <Reveal key={project.id} delay={i * 0.15}>
                  <Link href={`/projects/${project.id}`}>
                    <div className="group cursor-pointer">
                      <div className="relative overflow-hidden mb-6 aspect-[4/5] bg-muted">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                          src={project.coverImage || "https://placehold.co/800x1000/1e1e1e/3ECAC8"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform">
                            <ArrowRight className="w-6 h-6 -rotate-45" />
                          </div>
                        </div>
                      </div>
                      <div className="font-mono text-xs uppercase tracking-widest text-primary mb-2">{project.category}</div>
                      <h3 className="text-2xl font-display font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                      <div className="text-muted-foreground font-mono text-sm mt-2 flex justify-between">
                        <span>{project.location}</span>
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            <div className="mt-16 text-center md:hidden">
              <Link href="/projects">
                <Button variant="outline" className="rounded-none font-mono uppercase tracking-widest border-primary text-primary">
                  View All Projects <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-24 bg-card border-t border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-blueprint-dark opacity-30 pointer-events-none" />
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <Reveal>
              <p className="font-mono text-primary text-xs tracking-[0.3em] uppercase mb-4">Client Voices</p>
              <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-16">What they say.</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((t, i) => (
                <Reveal key={t.id} delay={i * 0.15}>
                  <div className="border border-border p-8 bg-background/50 flex flex-col gap-6">
                    <div className="text-4xl text-primary font-display leading-none">"</div>
                    <p className="font-sans text-foreground/90 leading-relaxed italic flex-grow">"{t.quote}"</p>
                    <div>
                      <div className="font-display font-bold">{t.clientName}</div>
                      {t.company && <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mt-1">{t.company}</div>}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="py-32 relative overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <Reveal>
            <p className="font-mono text-primary text-xs tracking-[0.3em] uppercase mb-6">Start a Project</p>
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8 text-background">
              Ready to build<br/>
              <span className="text-primary italic">something iconic?</span>
            </h2>
            <p className="text-foreground/60 max-w-xl mx-auto font-sans mb-12 text-lg">
              Let's talk about your vision. Our team is ready to transform your ideas into architectural reality.
            </p>
            <Link href="/book">
              <Button size="lg" className="rounded-none font-mono uppercase tracking-widest text-sm px-12 h-16 bg-primary text-primary-foreground hover:bg-accent transition-all">
                Book a Free Consultation
                <MoveRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
