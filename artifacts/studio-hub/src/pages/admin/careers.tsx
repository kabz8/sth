import { useListCareers, useDeleteCareer } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { getListCareersQueryKey } from "@workspace/api-client-react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function AdminCareers() {
  const { data: careers, isLoading } = useListCareers();
  const deleteCareer = useDeleteCareer();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this career listing?")) {
      deleteCareer.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListCareersQueryKey() });
          toast({ title: "Career listing deleted" });
        }
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Careers</h1>
        </div>
        <Button className="bg-primary hover:bg-accent text-primary-foreground font-mono uppercase text-xs tracking-widest rounded-none">
          <Plus className="w-4 h-4 mr-2" /> New Role
        </Button>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left font-sans">
            <thead className="text-xs font-mono uppercase tracking-widest text-muted-foreground bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground animate-pulse">Loading...</td></tr>
              ) : careers?.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No careers found.</td></tr>
              ) : (
                careers?.map((career) => (
                  <tr key={career.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground">{career.title}</td>
                    <td className="px-6 py-4 text-muted-foreground">{career.department}</td>
                    <td className="px-6 py-4 text-muted-foreground">{career.type.replace('_', ' ')}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 text-xs font-mono uppercase tracking-wider rounded border ${
                        career.isActive ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted text-muted-foreground border-border'
                      }`}>
                        {career.isActive ? 'Active' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDelete(career.id)}>
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
