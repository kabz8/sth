import { Link, useLocation } from "wouter";
import { Menu, X, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
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
      <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-border/40 py-3 md:py-4">
        <div className="container mx-auto px-4 md:px-12 flex items-center justify-between">
          <Link href="/">
            <div className="cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
              <Logo />
            </div>
          </Link>

          {/* Desktop nav */}
           <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <span
                   className={`relative text-sm font-medium transition-colors cursor-pointer after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-primary after:transition-all after:duration-300 ${
                    location === link.path
                       ? "text-primary after:w-full"
                       : "text-foreground/70 hover:text-primary after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>

           <div className="hidden md:flex items-center gap-4">
            <Link href="/book">
               <span className="group inline-flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors cursor-pointer">
                 Consultation
                 <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
               </span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
             className="md:hidden text-foreground p-2 -mr-2 hover:text-primary transition-colors"
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
             className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex flex-col"
          >
            {/* Mobile header */}
             <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
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
             <div className="flex flex-col flex-grow px-6 pt-10 pb-10 overflow-y-auto">
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
                       className={`group flex items-center justify-between py-5 border-b border-border/40 cursor-pointer transition-colors ${
                         location === link.path ? "text-primary" : "text-foreground hover:text-primary"
                       }`}
                     >
                       <span className="flex items-baseline gap-4">
                         <span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
                         <span className="text-3xl font-display tracking-tight">{link.name}</span>
                       </span>
                       <ArrowRight className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                     </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                 className="mt-10"
              >
                <Link href="/book">
                   <span
                    onClick={() => setMobileMenuOpen(false)}
                     className="group inline-flex items-center gap-3 text-lg font-medium text-primary border-b border-primary/60 pb-2 hover:border-primary transition-colors cursor-pointer"
                  >
                    Book Consultation
                     <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                   </span>
                </Link>
              </motion.div>

              {/* Mobile contact info */}
              <div className="mt-auto pt-8 border-t border-border/40">
                 <p className="font-mono text-xs tracking-widest text-muted-foreground mb-1">Call us</p>
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
