import { useParams } from "wouter";
import { useGetProject, useListProjects } from "@workspace/api-client-react";
import { Reveal, ParallaxImage } from "@/components/animations";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function ProjectDetail() {
  const params = useParams();
  const projectId = parseInt(params.id || "0");
  
  const { data: project, isLoading } = useGetProject(projectId, {
    query: { enabled: !!projectId, queryKey: ["/api/projects", projectId] }
  });

  const { data: relatedProjects } = useListProjects({ category: project?.category, limit: 3 });

  if (isLoading) {
    return <div className="min-h-screen pt-32 px-12 animate-pulse">Loading...</div>;
  }

  if (!project) {
    return <div className="min-h-screen pt-32 px-12">Project not found</div>;
  }

  return (
    <div className="w-full pb-32">
      {/* Project Hero */}
      <section className="relative h-[80vh] w-full flex items-end pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={project.coverImage || ""} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <Link href="/projects">
            <span className="inline-flex items-center text-xs font-mono uppercase tracking-widest text-primary mb-8 hover:text-accent transition-colors cursor-pointer">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Archive
            </span>
          </Link>
          <Reveal>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-8 font-mono text-sm uppercase tracking-widest text-muted-foreground">
              <div><span className="text-foreground block mb-1 text-xs">Location</span>{project.location}</div>
              <div><span className="text-foreground block mb-1 text-xs">Category</span>{project.category}</div>
              <div><span className="text-foreground block mb-1 text-xs">Year</span>{project.year}</div>
              {project.area && <div><span className="text-foreground block mb-1 text-xs">Area</span>{project.area}</div>}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story & Description */}
      <section className="py-24 border-b border-border bg-card relative">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-blueprint opacity-[0.03] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            <div className="md:col-span-4">
              <Reveal>
                <h3 className="font-mono text-sm uppercase tracking-widest text-primary mb-8 border-b border-border pb-4">The Brief</h3>
                <p className="text-lg font-sans leading-relaxed text-foreground/90">{project.description}</p>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <Reveal delay={0.2}>
                <h3 className="font-mono text-sm uppercase tracking-widest text-primary mb-8 border-b border-border pb-4">The Story</h3>
                <div className="prose prose-lg dark:prose-invert prose-p:font-sans prose-p:leading-relaxed prose-headings:font-display max-w-none">
                  {project.story?.split('\n\n').map((para, i) => <p key={i}>{para}</p>) || <p>Story details coming soon.</p>}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      {project.images && project.images.length > 0 && (
        <section className="py-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {project.images.map((img, i) => (
                <Reveal key={i} delay={i * 0.1} className={i % 3 === 0 ? "md:col-span-2" : "col-span-1"}>
                  <ParallaxImage src={img} alt={`Gallery image ${i+1}`} className={`w-full ${i % 3 === 0 ? 'h-[70vh]' : 'aspect-square'}`} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next/Prev Projects (Related) */}
      <section className="py-24 border-t border-border bg-card">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-12">
            <h2 className="text-3xl font-display tracking-tight">Similar Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects?.filter(p => p.id !== project.id).slice(0, 3).map(related => (
              <Link key={related.id} href={`/projects/${related.id}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-[4/3] bg-muted mb-4 overflow-hidden">
                    <img src={related.coverImage || ""} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <h4 className="font-display text-xl group-hover:text-primary transition-colors">{related.title}</h4>
                  <p className="font-mono text-xs text-muted-foreground uppercase mt-2">{related.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
