import { useParams, Link } from "wouter";
import { useGetBlogPost, useListBlogPosts } from "@workspace/api-client-react";
import { Reveal, ParallaxImage } from "@/components/animations";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import defaultBlogImage from "@assets/generated_images/blog-1.jpg";

export default function BlogPostDetail() {
  const params = useParams();
  const postId = parseInt(params.id || "0");

  const { data: post, isLoading } = useGetBlogPost(postId, {
    query: { enabled: !!postId, queryKey: ["/api/blog", postId] }
  });

  const { data: relatedPosts } = useListBlogPosts({ limit: 2 });

  if (isLoading) return <div className="min-h-screen pt-32 px-12 animate-pulse">Loading essay...</div>;
  if (!post) return <div className="min-h-screen pt-32 px-12">Post not found.</div>;

  return (
    <div className="w-full pb-32">
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <Reveal>
            <Link href="/blog">
              <span className="inline-flex items-center text-xs font-mono uppercase tracking-widest text-primary mb-12 hover:text-accent transition-colors cursor-pointer">
                <ArrowLeft className="w-4 h-4 mr-2" /> All Insights
              </span>
            </Link>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6 flex gap-4">
              <span className="text-primary">{post.category}</span>
              <span>•</span>
              <span>{format(new Date(post.createdAt), 'MMM dd, yyyy')}</span>
              {post.readTime && (
                <>
                  <span>•</span>
                  <span>{post.readTime} min read</span>
                </>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-8 leading-tight">
              {post.title}
            </h1>
            {post.author && (
              <p className="font-mono text-sm uppercase text-foreground mb-12">
                By {post.author}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="mb-16">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <Reveal delay={0.2}>
            <div className="aspect-[21/9] w-full bg-muted overflow-hidden">
              <img src={post.featuredImage || defaultBlogImage} alt={post.title} className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 border-b border-border">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <Reveal delay={0.3}>
            <div className="prose prose-lg dark:prose-invert prose-p:font-sans prose-p:leading-loose prose-p:text-foreground/90 prose-headings:font-display prose-headings:text-foreground prose-a:text-primary max-w-none">
              {post.content.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <h3 className="font-display text-3xl font-bold mb-12">More Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {relatedPosts?.filter(p => p.id !== post.id).slice(0, 2).map((related) => (
              <Link key={related.id} href={`/blog/${related.id}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-[16/9] mb-4 overflow-hidden bg-muted">
                    <img src={related.featuredImage || defaultBlogImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                  </div>
                  <div className="font-mono text-[10px] text-primary uppercase mb-2">{related.category}</div>
                  <h4 className="font-display text-2xl font-bold group-hover:text-primary transition-colors">{related.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
