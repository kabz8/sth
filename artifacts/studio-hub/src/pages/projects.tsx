import { useState } from "react";
import { useListProjects } from "@workspace/api-client-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/animations";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  
  // Use the API hook to list projects
  const { data: projects, isLoading } = useListProjects();

  const categories = ["All", "Residential", "Hospitality", "Commercial", "Site Supervision"];

  const filteredProjects = projects?.filter(p => 
    activeCategory === "All" || p.category === activeCategory
  ) || [];

  return (
    <div className="w-full pb-32">
      <section className="pt-32 pb-16 px-6 md:px-12 border-b border-border bg-card relative">
        <div className="absolute inset-0 bg-blueprint opacity-[0.02] pointer-events-none" />
        <div className="container mx-auto relative z-10">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8">Archive.</h1>
            <p className="text-lg text-muted-foreground font-sans max-w-2xl mb-12">
              An exploration of form, function, and place. Browse our curated collection of architectural works across Africa.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`font-mono text-xs uppercase tracking-widest px-6 py-3 border transition-all ${
                    activeCategory === category
                      ? "bg-foreground text-background border-foreground"
                      : "bg-transparent text-foreground border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col gap-4">
                  <div className="aspect-[4/5] bg-muted w-full" />
                  <div className="h-6 bg-muted w-2/3" />
                  <div className="h-4 bg-muted w-1/3" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group"
                  >
                    <Link href={`/projects/${project.id}`}>
                      <div className="cursor-pointer">
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
                        <div className="flex flex-col">
                          <div className="font-mono text-xs uppercase tracking-widest text-primary mb-2">
                            {project.category}
                          </div>
                          <h3 className="text-2xl font-display font-bold group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <div className="text-muted-foreground font-mono text-sm mt-2 flex justify-between items-center">
                            <span>{project.location}</span>
                            <span>{project.year}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {filteredProjects.length === 0 && !isLoading && (
            <div className="text-center py-32 border border-dashed border-border">
              <p className="text-muted-foreground font-mono uppercase tracking-widest">No projects found in this category.</p>
              <Button 
                variant="outline" 
                className="mt-6 rounded-none font-mono uppercase tracking-widest border-primary text-primary"
                onClick={() => setActiveCategory("All")}
              >
                Clear Filter
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
