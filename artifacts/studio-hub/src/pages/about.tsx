import { Reveal } from "@/components/animations";
import { motion } from "framer-motion";
import aboutHero from "@assets/generated_images/about-us.jpg";

// Clean geometric human avatar — architectural / editorial feel
function FounderAvatar() {
  return (
    <svg
      viewBox="0 0 320 400"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Background */}
      <rect width="320" height="400" fill="#1a1a1a" />

      {/* Blueprint grid lines */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1="0" y1={i * 50} x2="320" y2={i * 50}
          stroke="#3ECAC8" strokeWidth="0.3" strokeOpacity="0.15"
        />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={i * 53} y1="0" x2={i * 53} y2="400"
          stroke="#3ECAC8" strokeWidth="0.3" strokeOpacity="0.15"
        />
      ))}

      {/* Teal accent bar top */}
      <rect x="0" y="0" width="4" height="400" fill="#3ECAC8" />

      {/* Shoulders / body silhouette */}
      <path
        d="M 60 400 Q 60 310 100 290 Q 130 278 160 278 Q 190 278 220 290 Q 260 310 260 400 Z"
        fill="#2a2a2a"
        stroke="#3ECAC8"
        strokeWidth="1"
        strokeOpacity="0.4"
      />

      {/* Jacket lapels */}
      <path
        d="M 160 278 L 130 310 L 118 400"
        fill="none"
        stroke="#3ECAC8"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      <path
        d="M 160 278 L 190 310 L 202 400"
        fill="none"
        stroke="#3ECAC8"
        strokeWidth="1"
        strokeOpacity="0.5"
      />

      {/* Neck */}
      <rect x="143" y="238" width="34" height="44" rx="4" fill="#2e2e2e" />

      {/* Head */}
      <ellipse cx="160" cy="190" rx="62" ry="72" fill="#2e2e2e" stroke="#3ECAC8" strokeWidth="0.8" strokeOpacity="0.3" />

      {/* Hair — clean short crop */}
      <path
        d="M 98 175 Q 100 115 160 112 Q 220 115 222 175 Q 210 148 160 146 Q 110 148 98 175 Z"
        fill="#1a1a1a"
      />
      {/* Slight forehead curve */}
      <path
        d="M 110 168 Q 115 142 160 140 Q 205 142 210 168"
        fill="#222"
        stroke="none"
      />

      {/* Eyes */}
      <ellipse cx="136" cy="193" rx="10" ry="7" fill="#111" />
      <ellipse cx="184" cy="193" rx="10" ry="7" fill="#111" />
      <circle cx="138" cy="191" r="2.5" fill="#fff" opacity="0.8" />
      <circle cx="186" cy="191" r="2.5" fill="#fff" opacity="0.8" />
      {/* Eyebrows */}
      <path d="M 124 182 Q 136 178 148 182" stroke="#555" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M 172 182 Q 184 178 196 182" stroke="#555" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Nose */}
      <path d="M 160 198 Q 153 216 157 222 Q 160 224 163 222 Q 167 216 160 198" fill="#333" />

      {/* Lips */}
      <path d="M 146 235 Q 160 243 174 235" stroke="#555" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 150 235 Q 160 230 170 235" stroke="#444" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Ears */}
      <ellipse cx="98" cy="197" rx="8" ry="12" fill="#2e2e2e" />
      <ellipse cx="222" cy="197" rx="8" ry="12" fill="#2e2e2e" />

      {/* Teal corner accent */}
      <polyline
        points="270,10 310,10 310,50"
        fill="none"
        stroke="#3ECAC8"
        strokeWidth="2"
        opacity="0.6"
      />
      <polyline
        points="10,350 10,390 50,390"
        fill="none"
        stroke="#EF725D"
        strokeWidth="2"
        opacity="0.6"
      />
    </svg>
  );
}

export default function About() {
  return (
    <div className="w-full pb-32">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img src={aboutHero} alt="Studio Hub Interior" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/80" />
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-4xl">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">Our Story.</h1>
            <p className="text-xl text-muted-foreground font-sans">
              Founded in 2020 by Alex Muhia Kimani — a practice built on precision,
              purpose, and spaces that belong exactly where they are placed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Philosophy</h2>
              <div className="space-y-6 text-lg text-foreground/80 font-sans leading-relaxed">
                <p>We believe that a building should belong exactly where it is placed. Our architecture does not impose; it responds to the climate, culture, and material landscape of the land.</p>
                <p>Every blueprint is an exercise in restraint and precision. We obsess over the hairline details, the exact alignment of a shadow, and the tactile quality of raw concrete against warm timber.</p>
                <p className="text-primary font-medium italic">"Architecture is not just building shelter; it is crafting a legacy in three dimensions."</p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="aspect-square bg-card border border-border relative overflow-hidden">
                <FounderAvatar />
                <div className="absolute bottom-0 left-0 bg-background p-6 border-t border-r border-border">
                  <h4 className="font-display text-xl font-bold">Alex Muhia Kimani</h4>
                  <p className="font-mono text-xs text-primary uppercase tracking-widest mt-1">Founder & Principal Architect</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Founder + Partners */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-6 md:px-12">
          <Reveal>
            <p className="font-mono text-primary text-xs tracking-[0.3em] uppercase mb-4">The Practice</p>
            <h2 className="text-4xl font-display font-bold tracking-tight mb-4">Leadership</h2>
            <p className="text-muted-foreground font-sans max-w-2xl mb-16">
              Led by Alex Muhia Kimani and a collective of specialist partners spanning architecture, interior design, and structural engineering.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Founder card */}
            <Reveal delay={0}>
              <div className="group">
                <div className="aspect-[3/4] bg-card border border-border mb-5 overflow-hidden relative">
                  <FounderAvatar />
                  <motion.div
                    className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>
                <h3 className="font-display text-xl font-bold">Alex Muhia Kimani</h3>
                <p className="font-mono text-xs uppercase tracking-widest text-primary mt-1 mb-2">Founder & Principal Architect</p>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Founded Studio Hub in 2020 with a vision to create spaces that are both technically precise and deeply contextual.
                </p>
              </div>
            </Reveal>

            {/* Partners placeholder card */}
            <Reveal delay={0.12}>
              <div className="group">
                <div className="aspect-[3/4] bg-card border border-border mb-5 overflow-hidden relative flex items-center justify-center">
                  {/* Abstract partner avatar */}
                  <svg viewBox="0 0 280 373" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <rect width="280" height="373" fill="#1a1a1a" />
                    {Array.from({ length: 8 }).map((_, i) => (
                      <line key={i} x1="0" y1={i * 53} x2="280" y2={i * 53} stroke="#3ECAC8" strokeWidth="0.3" strokeOpacity="0.12" />
                    ))}
                    <rect x="0" y="0" width="4" height="373" fill="#EF725D" />
                    <path d="M 50 373 Q 50 290 85 272 Q 115 260 140 260 Q 165 260 195 272 Q 230 290 230 373 Z" fill="#2a2a2a" stroke="#EF725D" strokeWidth="0.8" strokeOpacity="0.3" />
                    <rect x="124" y="222" width="32" height="40" rx="4" fill="#2e2e2e" />
                    <ellipse cx="140" cy="176" rx="56" ry="66" fill="#2e2e2e" />
                    <path d="M 84 164 Q 88 108 140 106 Q 192 108 196 164 Q 183 136 140 134 Q 97 136 84 164 Z" fill="#1a1a1a" />
                    <ellipse cx="120" cy="179" rx="9" ry="6" fill="#111" />
                    <ellipse cx="160" cy="179" rx="9" ry="6" fill="#111" />
                    <circle cx="122" cy="177" r="2" fill="#fff" opacity="0.8" />
                    <circle cx="162" cy="177" r="2" fill="#fff" opacity="0.8" />
                    <path d="M 130 220 Q 140 227 150 220" stroke="#555" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <polyline points="240,10 270,10 270,40" fill="none" stroke="#EF725D" strokeWidth="2" opacity="0.5" />
                  </svg>
                  <motion.div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="font-display text-xl font-bold">Design Partners</h3>
                <p className="font-mono text-xs uppercase tracking-widest text-primary mt-1 mb-2">Interior & Space Planning</p>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  A curated collective of interior design specialists crafting cohesive, human-centered spaces across every project.
                </p>
              </div>
            </Reveal>

            {/* Engineering partners */}
            <Reveal delay={0.24}>
              <div className="group">
                <div className="aspect-[3/4] bg-card border border-border mb-5 overflow-hidden relative flex items-center justify-center">
                  <svg viewBox="0 0 280 373" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <rect width="280" height="373" fill="#1a1a1a" />
                    {Array.from({ length: 8 }).map((_, i) => (
                      <line key={i} x1={i * 40} y1="0" x2={i * 40} y2="373" stroke="#3ECAC8" strokeWidth="0.3" strokeOpacity="0.12" />
                    ))}
                    <rect x="276" y="0" width="4" height="373" fill="#3ECAC8" />
                    <path d="M 50 373 Q 50 290 85 272 Q 115 260 140 260 Q 165 260 195 272 Q 230 290 230 373 Z" fill="#2a2a2a" stroke="#3ECAC8" strokeWidth="0.8" strokeOpacity="0.3" />
                    <rect x="124" y="222" width="32" height="40" rx="4" fill="#2e2e2e" />
                    <ellipse cx="140" cy="176" rx="56" ry="66" fill="#2e2e2e" />
                    <path d="M 84 164 Q 88 108 140 106 Q 192 108 196 164 Q 180 140 140 138 Q 100 140 84 164 Z" fill="#1a1a1a" />
                    <ellipse cx="120" cy="179" rx="9" ry="6" fill="#111" />
                    <ellipse cx="160" cy="179" rx="9" ry="6" fill="#111" />
                    <circle cx="122" cy="177" r="2" fill="#fff" opacity="0.8" />
                    <circle cx="162" cy="177" r="2" fill="#fff" opacity="0.8" />
                    <path d="M 130 220 Q 140 227 150 220" stroke="#555" strokeWidth="2" fill="none" strokeLinecap="round" />
                    <polyline points="10,333 10,363 40,363" fill="none" stroke="#3ECAC8" strokeWidth="2" opacity="0.5" />
                  </svg>
                  <motion.div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h3 className="font-display text-xl font-bold">Technical Partners</h3>
                <p className="font-mono text-xs uppercase tracking-widest text-primary mt-1 mb-2">Structural & MEP Engineering</p>
                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                  Structural and systems engineering partners who bring every design from blueprint to built reality, safely and precisely.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Founded year banner */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-6 md:px-12">
          <Reveal>
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-16">
              <div className="text-[6rem] md:text-[10rem] font-display font-bold leading-none text-primary/15 select-none">
                2020
              </div>
              <div>
                <p className="font-mono text-primary text-xs tracking-[0.3em] uppercase mb-3">Est.</p>
                <p className="text-2xl md:text-3xl font-display font-bold">The year Studio Hub was born.</p>
                <p className="text-muted-foreground font-sans mt-3 max-w-lg">
                  From a single founder's conviction that Kenyan spaces deserved better — more considered, more precise, more enduring — a practice took shape.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
