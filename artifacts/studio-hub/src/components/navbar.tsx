import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./logo";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Studio", path: "/about" },
    { name: "Insights", path: "/blog" },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-background border-b border-border/60 py-3">
        <div className="container mx-auto px-4 md:px-12 flex items-center justify-between">
          <Link href="/">
            <div className="cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
              <Logo />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <span
                  className={`text-sm font-medium tracking-wide transition-colors cursor-pointer uppercase font-mono ${
                    location === link.path
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/book">
              <Button className="group font-mono uppercase tracking-wider text-xs rounded-none border border-primary bg-primary hover:bg-accent hover:border-accent text-primary-foreground">
                Consultation
                <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-background flex flex-col"
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <Logo />
              <button
                className="text-foreground p-2"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile links */}
            <div className="flex flex-col flex-grow px-6 pt-8 pb-12 gap-2 overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.07 }}
                >
                  <Link href={link.path}>
                    <span
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-4 text-3xl font-display uppercase tracking-tight border-b border-border/40 cursor-pointer transition-colors ${
                        location === link.path ? "text-primary" : "hover:text-primary"
                      }`}
                    >
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-8"
              >
                <Link href="/book">
                  <Button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full group font-mono uppercase tracking-wider text-sm rounded-none py-6 bg-primary hover:bg-accent text-primary-foreground"
                  >
                    Book Consultation
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </motion.div>

              {/* Mobile contact info */}
              <div className="mt-auto pt-8 border-t border-border/40">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-1">Call us</p>
                <a href="tel:+254701719824" className="text-foreground font-sans text-lg hover:text-primary transition-colors">
                  0701 719 824
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
