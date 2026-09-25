import { useListBlogPosts, useDeleteBlogPost } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { getListBlogPostsQueryKey } from "@workspace/api-client-react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function AdminBlog() {
  const { data: posts, isLoading } = useListBlogPosts();
  const deletePost = useDeleteBlogPost();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListBlogPostsQueryKey() });
          toast({ title: "Post deleted" });
        }
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground font-sans mt-1">Manage insights and essays.</p>
        </div>
        <Button className="bg-primary hover:bg-accent text-primary-foreground font-mono uppercase text-xs tracking-widest rounded-none">
          <Plus className="w-4 h-4 mr-2" /> New Post
        </Button>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left font-sans">
            <thead className="text-xs font-mono uppercase tracking-widest text-muted-foreground bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground animate-pulse">Loading...</td></tr>
              ) : posts?.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No posts found.</td></tr>
              ) : (
                posts?.map((post) => (
                  <tr key={post.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground line-clamp-1">{post.title}</p>
                      <p className="text-xs text-muted-foreground">{post.author}</p>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{post.category || "General"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded border ${
                        post.published ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted text-muted-foreground border-border'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{format(new Date(post.createdAt), 'MMM dd, yyyy')}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(post.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
