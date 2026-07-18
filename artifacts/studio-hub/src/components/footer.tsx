import { Link } from "wouter";
import { ArrowRight, MapPin, Phone, Mail, Instagram, Linkedin, Twitter } from "lucide-react";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t border-border pt-24 pb-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint-dark opacity-20 pointer-events-none" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/">
              <div className="cursor-pointer group mb-6">
                <Logo />
              </div>
            </Link>
            <p className="text-muted-foreground font-sans leading-relaxed mb-8 max-w-sm">
              Architectural precision meets bold vision. Crafting timeless,
              functional, and elegant spaces across Kenya since 2020.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/studio_hub.architects" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-sm uppercase tracking-widest text-primary mb-6">Explore</h4>
            <ul className="space-y-4 font-sans">
              <li><Link href="/projects"><span className="hover:text-primary transition-colors cursor-pointer">Projects</span></Link></li>
              <li><Link href="/services"><span className="hover:text-primary transition-colors cursor-pointer">Expertise</span></Link></li>
              <li><Link href="/about"><span className="hover:text-primary transition-colors cursor-pointer">Our Story</span></Link></li>
              <li><Link href="/blog"><span className="hover:text-primary transition-colors cursor-pointer">Insights</span></Link></li>
              <li><Link href="/careers"><span className="hover:text-primary transition-colors cursor-pointer">Careers</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-sm uppercase tracking-widest text-primary mb-6">Connect</h4>
            <ul className="space-y-4 font-sans">
              <li><Link href="/contact"><span className="hover:text-primary transition-colors cursor-pointer">Contact Us</span></Link></li>
              <li><Link href="/book"><span className="hover:text-primary transition-colors cursor-pointer">Book Consultation</span></Link></li>
              <li><Link href="/faq"><span className="hover:text-primary transition-colors cursor-pointer">FAQ</span></Link></li>
              <li><Link href="/portal"><span className="hover:text-primary transition-colors cursor-pointer text-accent flex items-center gap-1">Client Portal <ArrowRight className="w-3 h-3"/></span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-sm uppercase tracking-widest text-primary mb-6">Office</h4>
            <ul className="space-y-6 font-sans">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 shrink-0 text-primary mt-1" />
                <span>Ruiru, Kiambu County<br />Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 shrink-0 text-primary" />
                <a href="tel:+254701719824" className="hover:text-primary transition-colors">0701 719 824</a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 shrink-0 text-primary" />
                <span>hello@studiohub.co.ke</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-mono text-muted-foreground">
          <p>© {new Date().getFullYear()} Studio Hub Architects. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy"><span className="hover:text-primary transition-colors cursor-pointer">Privacy</span></Link>
            <Link href="/terms"><span className="hover:text-primary transition-colors cursor-pointer">Terms</span></Link>
            <span className="text-muted-foreground/50">|</span>
            <span>
              Designed &amp; developed by{" "}
              <a href="https://milespace.co.ke" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent transition-colors font-semibold">
                Milespace
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
