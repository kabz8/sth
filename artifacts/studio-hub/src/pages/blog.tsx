import { Reveal } from "@/components/animations";
import { useListBlogPosts } from "@workspace/api-client-react";
import { Link } from "wouter";
import { ArrowRight, Calendar } from "lucide-react";
import { format } from "date-fns";
import defaultBlogImage from "@assets/generated_images/blog-1.jpg";

export default function Blog() {
  const { data: posts, isLoading } = useListBlogPosts();

  return (
    <div className="w-full pb-32">
      <section className="pt-32 pb-16 px-6 md:px-12 bg-background relative border-b border-border">
        <div className="container mx-auto max-w-5xl">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">Insights.</h1>
            <p className="text-lg text-muted-foreground font-sans max-w-2xl">
              Thoughts, essays, and dispatches on architecture, urbanism, and design culture from our studio.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          {isLoading ? (
            <div className="space-y-12 animate-pulse">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/3 aspect-[4/3] bg-muted" />
                  <div className="w-full md:w-2/3 space-y-4">
                    <div className="h-4 bg-muted w-1/4" />
                    <div className="h-8 bg-muted w-3/4" />
                    <div className="h-20 bg-muted w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-20">
              {posts?.map((post, i) => (
                <Reveal key={post.id} delay={i * 0.1}>
                  <Link href={`/blog/${post.id}`}>
                    <article className="group flex flex-col md:flex-row gap-8 lg:gap-12 cursor-pointer items-center">
                      <div className="w-full md:w-5/12 aspect-[4/3] overflow-hidden bg-muted">
                        <img 
                          src={post.featuredImage || defaultBlogImage} 
                          alt={post.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="w-full md:w-7/12 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4 font-mono text-xs uppercase tracking-widest">
                          <span className="text-primary">{post.category || "General"}</span>
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                          </span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-display font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground font-sans text-lg line-clamp-3 mb-6">
                          {post.excerpt || post.content.substring(0, 150) + "..."}
                        </p>
                        <span className="inline-flex items-center font-mono text-xs uppercase tracking-widest text-foreground">
                          Read Essay <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform text-primary" />
                        </span>
                      </div>
                    </article>
                  </Link>
                </Reveal>
              ))}

              {posts?.length === 0 && (
                <div className="text-center py-20 border border-border">
                  <p className="text-muted-foreground font-mono uppercase">No insights published yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
