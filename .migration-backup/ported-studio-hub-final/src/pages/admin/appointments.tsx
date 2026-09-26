import { useListAppointments, useUpdateAppointment, getListAppointmentsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar, CheckCircle, XCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdminAppointments() {
  const { data: appointments, isLoading } = useListAppointments();
  const updateAppointment = useUpdateAppointment();
  const queryClient = useQueryClient();

  const handleStatusChange = (id: number, status: string) => {
    updateAppointment.mutate({ id, data: { status } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListAppointmentsQueryKey() });
      }
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight">Consultations</h1>
        <p className="text-muted-foreground font-sans mt-1">Manage incoming booking requests.</p>
      </div>

      <div className="grid gap-6">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground animate-pulse">Loading...</div>
        ) : appointments?.length === 0 ? (
          <div className="p-12 border border-dashed border-border rounded-lg text-center text-muted-foreground font-mono text-sm uppercase">No appointments found.</div>
        ) : (
          appointments?.map((apt) => (
            <div key={apt.id} className="bg-card border border-border rounded-lg p-6 flex flex-col md:flex-row gap-6 shadow-sm">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="font-display font-bold text-xl">{apt.name}</h3>
                  <span className={`px-2 py-1 text-[10px] font-mono uppercase tracking-widest rounded border ${
                    apt.status === 'pending' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                    apt.status === 'confirmed' ? 'bg-primary/10 text-primary border-primary/20' :
                    apt.status === 'completed' ? 'bg-muted text-muted-foreground border-border' :
                    'bg-destructive/10 text-destructive border-destructive/20'
                  }`}>
                    {apt.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground font-mono text-[10px] uppercase mb-1">Contact</p>
                    <p>{apt.email}</p>
                    <p>{apt.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-mono text-[10px] uppercase mb-1">Project Details</p>
                    <p className="capitalize">{apt.projectType}</p>
                    <p className="text-muted-foreground">{apt.location}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-mono text-[10px] uppercase mb-1">Budget Range</p>
                    <p>{apt.budget?.replace(/_/g, ' ').toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-mono text-[10px] uppercase mb-1">Preferred Time</p>
                    <p className="font-medium text-primary flex items-center gap-1"><Calendar className="w-3 h-3"/> {apt.preferredDate || 'Flexible'}</p>
                  </div>
                </div>

                {apt.message && (
                  <div className="pt-4 border-t border-border mt-4">
                    <p className="text-sm font-sans text-foreground/80 italic">"{apt.message}"</p>
                  </div>
                )}
                
                <p className="text-xs text-muted-foreground font-mono pt-2">Requested on {format(new Date(apt.createdAt), 'MMM dd, yyyy')}</p>
              </div>

              <div className="w-full md:w-48 flex flex-col justify-start border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                <p className="text-xs font-mono uppercase text-muted-foreground mb-2">Update Status</p>
                <Select value={apt.status} onValueChange={(val) => handleStatusChange(apt.id, val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
