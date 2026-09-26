import { Reveal } from "@/components/animations";
import { ArrowRight, ArrowUpRight, MoveRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import heroImage from "@assets/generated_images/hero-nairobi.jpg";
import { useGetFeaturedProjects, useGetProjectStats, useListTestimonials } from "@workspace/api-client-react";

function useIsMobile() {
  const [mobile, setMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return mobile;
}

// Word mask reveal — desktop only
function AnimatedWord({ word, delay, className = "" }: { word: string; delay: number; className?: string }) {
  return (
    <span className="inline-block overflow-hidden" style={{ lineHeight: 1.12 }}>
      <motion.span
        className={`inline-block ${className}`}
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {word}
      </motion.span>
    </span>
  );
}

// Self-drawing horizontal rule
function DrawLine({ delay }: { delay: number }) {
  return (
    <motion.span
      className="inline-block bg-primary h-px"
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 40, opacity: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      style={{ verticalAlign: "middle" }}
    />
  );
}

export default function Home() {
  const isMobile = useIsMobile();
  const { data: featuredProjects } = useGetFeaturedProjects();
  const { data: stats } = useGetProjectStats();
  const { data: testimonials } = useListTestimonials();

  return (
    <div className="w-full">
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] md:h-[95vh] w-full flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.4, ease: "easeOut" }}
            src={heroImage}
            alt="Modern Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/65 md:bg-background/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />
        </div>

        {/* Vertical accent rule — desktop only */}
        <motion.div
          className="absolute left-12 top-1/2 -translate-y-1/2 w-px bg-primary/30 hidden md:block"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 140, opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.4, ease: "easeOut" }}
        />

        {/* Content */}
        <div className="container mx-auto px-5 md:px-12 relative z-10 py-12 md:pt-20 md:pb-0">

          {/* Studio tag */}
          <motion.div
            className="flex items-center gap-3 mb-5 md:mb-8"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: isMobile ? 0.1 : 0.3 }}
          >
            <DrawLine delay={isMobile ? 0.2 : 0.45} />
            <span className="font-mono text-primary text-[10px] md:text-xs tracking-[0.3em] uppercase">
              Studio Hub Architects
            </span>
            <DrawLine delay={isMobile ? 0.3 : 0.6} />
          </motion.div>

          {/* Headline */}
          {isMobile ? (
            /* ── Mobile: single fast fade-in ── */
            <motion.h1
              className="font-display font-bold tracking-tight mb-4 text-[2.4rem] leading-[1.1]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              Architectural<br />
              <span className="text-primary italic font-light">precision</span> meets<br />
              bold vision.
            </motion.h1>
          ) : (
            /* ── Desktop: staggered word reveal ── */
            <h1 className="font-display font-bold tracking-tight mb-10 text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.08]">
              <span className="block">
                <AnimatedWord word="Architectural" delay={0.5} />
              </span>
              <span className="block">
                <AnimatedWord word="precision" delay={0.65} className="text-primary italic font-light" />{" "}
                <AnimatedWord word="meets" delay={0.78} />
              </span>
              <span className="block">
                <AnimatedWord word="bold" delay={0.92} />{" "}
                <AnimatedWord word="vision." delay={1.04} />
              </span>
            </h1>
          )}

          {/* Sub-copy */}
          <motion.p
            className="text-sm md:text-lg text-foreground/75 max-w-md md:max-w-lg mb-6 md:mb-10 font-sans leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: isMobile ? 0.25 : 1.25 }}
          >
            We turn raw landscapes into landmark buildings. Designing spaces
            that feel expensive, tactile, and deeply connected to their environment.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-3 md:gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: isMobile ? 0.35 : 1.45 }}
          >
            <Link href="/projects">
              <span className="group inline-flex items-center gap-3 text-sm font-medium text-foreground border-b border-foreground/70 pb-2 hover:text-primary hover:border-primary transition-colors cursor-pointer">
                View Portfolio
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/book">
              <span className="group inline-flex items-center gap-3 text-sm font-medium text-foreground/80 border-b border-border pb-2 hover:text-primary hover:border-primary transition-colors cursor-pointer">
                Book Consultation
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </Link>
          </motion.div>

          {/* Floating metric strip — desktop only */}
          <motion.div
            className="absolute bottom-8 right-12 hidden md:flex items-center gap-5 border border-border/60 bg-background/70 backdrop-blur-sm px-6 py-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            {[
              { v: "5+", l: "Years" },
              { v: stats?.total ? `${stats.total}+` : "120+", l: "Projects" },
              { v: "4", l: "Countries" },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-5">
                {i > 0 && <div className="w-px h-10 bg-border" />}
                <div className="text-center">
                  <div className="text-2xl font-display font-bold text-primary">{m.v}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{m.l}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ───────────────────────────────────────── */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-5 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { label: "Completed Projects", value: stats?.total || "120+" },
              { label: "Years Experience", value: "5+" },
              { label: "Design Awards", value: "15" },
              { label: "Countries Active", value: "4" },
            ].map((stat, i) => (
              <div key={i} className="py-8 md:py-12 px-4 md:px-6 flex flex-col items-center justify-center text-center">
                <Reveal delay={i * 0.1}>
                  <div className="text-3xl md:text-5xl font-display font-bold text-primary mb-1 md:mb-2">{stat.value}</div>
                  <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-muted-foreground leading-tight">{stat.label}</div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ────────────────────────────────── */}
      {featuredProjects && featuredProjects.length > 0 && (
        <section className="py-16 md:py-32">
          <div className="container mx-auto px-5 md:px-12">
            <Reveal>
              <div className="flex items-end justify-between mb-10 md:mb-16">
                <div>
                  <p className="font-mono text-primary text-xs tracking-[0.3em] uppercase mb-3">Selected Works</p>
                  <h2 className="text-3xl md:text-6xl font-display font-bold tracking-tight">Featured.</h2>
                </div>
                <Link href="/projects">
                  <span className="hidden md:flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:text-primary transition-colors cursor-pointer group">
                    View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
              {featuredProjects.slice(0, 3).map((project, i) => (
                <Reveal key={project.id} delay={i * 0.12}>
                  <Link href={`/projects/${project.id}`}>
                    <div className="group cursor-pointer">
                      <div className="relative overflow-hidden mb-4 md:mb-6 aspect-[4/5] bg-muted">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                          src={project.coverImage || "https://placehold.co/800x1000/1e1e1e/3ECAC8"}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <div className="w-14 h-14 rounded-full border border-primary bg-background/30 text-primary backdrop-blur-sm flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform">
                            <ArrowRight className="w-5 h-5 -rotate-45" />
                          </div>
                        </div>
                      </div>
                      <div className="font-mono text-xs uppercase tracking-widest text-primary mb-1">{project.category}</div>
                      <h3 className="text-xl md:text-2xl font-display font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                      <div className="text-muted-foreground font-mono text-xs md:text-sm mt-1 flex justify-between">
                        <span>{project.location}</span>
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 text-center md:hidden">
              <Link href="/projects">
                <span className="group inline-flex items-center gap-3 text-sm font-medium text-primary border-b border-primary/60 pb-2 hover:border-primary transition-colors cursor-pointer">
                  View All Projects <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Testimonials ─────────────────────────────────────── */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-16 md:py-24 bg-card border-t border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-blueprint-dark opacity-30 pointer-events-none" />
          <div className="container mx-auto px-5 md:px-12 relative z-10">
            <Reveal>
              <p className="font-sans text-primary text-xs tracking-[0.3em] uppercase mb-3">Client Voices</p>
              <h2 className="text-3xl md:text-6xl font-display font-bold tracking-tight mb-10 md:mb-16">What they say.</h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
              {testimonials.slice(0, 3).map((t, i) => (
                <Reveal key={t.id} delay={i * 0.12}>
                  <div className="border border-border p-6 md:p-8 bg-background/50 flex flex-col gap-4 md:gap-6">
                    <div className="text-3xl md:text-4xl text-primary font-sans leading-none">"</div>
                    <p className="font-sans text-sm md:text-base text-foreground/85 leading-relaxed italic flex-grow">
                      {t.content}
                    </p>
                    <div>
                      <div className="font-sans font-bold text-sm md:text-base">{t.clientName}</div>
                      {t.company && (
                        <div className="font-sans text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest mt-1">
                          {t.company}
                        </div>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA banner ───────────────────────────────────────── */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none" />
        <div className="container mx-auto px-5 md:px-12 relative z-10 text-center">
          <Reveal>
            <p className="font-mono text-primary text-xs tracking-[0.3em] uppercase mb-5">Start a Project</p>
            <h2 className="text-4xl md:text-7xl font-display font-bold tracking-tight mb-6 md:mb-8 text-background">
              Ready to build<br />
              <span className="text-primary italic">something iconic?</span>
            </h2>
            <p className="text-foreground/60 max-w-md md:max-w-xl mx-auto font-sans mb-8 md:mb-12 text-base md:text-lg">
              Let's talk about your vision. Our team is ready to transform your ideas into architectural reality.
            </p>
            <Link href="/book">
              <span className="group inline-flex items-center gap-3 text-sm md:text-base font-medium text-primary border-b border-primary/70 pb-3 hover:text-accent hover:border-accent transition-colors cursor-pointer">
                Book a Free Consultation
                <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
