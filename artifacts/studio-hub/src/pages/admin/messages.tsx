import { useListContacts, useUpdateContact, useDeleteContact, getListContactsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Mail, Check, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function AdminMessages() {
  const { data: messages, isLoading } = useListContacts();
  const updateContact = useUpdateContact();
  const deleteContact = useDeleteContact();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleMarkRead = (id: number) => {
    updateContact.mutate({ id, data: { status: 'read' } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListContactsQueryKey() });
        toast({ title: "Marked as read" });
      }
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this message?")) {
      deleteContact.mutate({ id }, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListContactsQueryKey() });
          toast({ title: "Message deleted" });
        }
      });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight">Inbox</h1>
        <p className="text-muted-foreground font-sans mt-1">Contact form submissions from the website.</p>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            {[1,2,3].map(i => <div key={i} className="h-24 bg-card border border-border rounded-lg" />)}
          </div>
        ) : messages?.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-border rounded-lg bg-card text-muted-foreground font-mono uppercase tracking-widest text-sm">
            Inbox is empty
          </div>
        ) : (
          messages?.map((msg) => (
            <div key={msg.id} className={`p-6 border rounded-lg transition-colors flex gap-6 ${msg.status === 'new' ? 'bg-card border-primary/30 shadow-sm' : 'bg-muted/10 border-border opacity-70 hover:opacity-100'}`}>
              <div className={`mt-1 rounded-full p-2 h-max ${msg.status === 'new' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-lg font-display flex items-center gap-3">
                      {msg.name}
                      {msg.status === 'new' && <span className="px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-mono uppercase rounded">New</span>}
                    </h4>
                    <p className="text-sm font-mono text-muted-foreground mt-1">
                      <a href={`mailto:${msg.email}`} className="hover:text-primary transition-colors">{msg.email}</a>
                      {msg.phone && <span className="mx-2">•</span>}
                      {msg.phone && <span>{msg.phone}</span>}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{format(new Date(msg.createdAt), 'MMM dd, yyyy HH:mm')}</span>
                </div>
                <div className="mt-4">
                  <p className="font-medium text-sm mb-1">{msg.subject}</p>
                  <p className="text-foreground/80 font-sans whitespace-pre-wrap text-sm leading-relaxed">{msg.message}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {msg.status === 'new' && (
                  <Button variant="outline" size="icon" onClick={() => handleMarkRead(msg.id)} title="Mark as read" className="border-border hover:bg-primary hover:text-primary-foreground hover:border-primary">
                    <Check className="w-4 h-4" />
                  </Button>
                )}
                <Button variant="outline" size="icon" onClick={() => handleDelete(msg.id)} title="Delete" className="border-border hover:bg-destructive hover:text-destructive-foreground hover:border-destructive text-muted-foreground">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
