import { useListMilestones } from "@workspace/api-client-react";
import { format } from "date-fns";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { Reveal } from "@/components/animations";

export default function PortalMilestones() {
  const { data: milestones, isLoading } = useListMilestones({ projectId: 1 });

  return (
    <div className="space-y-8 max-w-4xl">
      <Reveal>
        <h1 className="text-3xl font-display font-bold tracking-tight">Milestones Timeline</h1>
        <p className="text-muted-foreground font-sans mt-1">Detailed progression of your architectural project.</p>
      </Reveal>

      <div className="bg-card border border-border p-8 shadow-sm">
        {isLoading ? (
          <div className="animate-pulse space-y-8">
            {[1,2,3].map(i => <div key={i} className="h-16 bg-muted border-l-2 border-primary" />)}
          </div>
        ) : (
          <div className="relative border-l border-border ml-3 space-y-12 pb-4">
            {milestones?.map((milestone, i) => (
              <Reveal key={milestone.id} delay={i * 0.1} className="relative pl-8">
                <div className="absolute -left-[11px] top-1 bg-card rounded-full">
                  {milestone.status === 'completed' ? <CheckCircle2 className="w-5 h-5 text-primary" /> : 
                   milestone.status === 'in_progress' ? <Clock className="w-5 h-5 text-accent" /> :
                   <Circle className="w-5 h-5 text-muted-foreground fill-card" />}
                </div>
                
                <div>
                  <span className={`inline-block px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest rounded border mb-2 ${
                    milestone.status === 'completed' ? 'bg-primary/10 text-primary border-primary/20' : 
                    milestone.status === 'in_progress' ? 'bg-accent/10 text-accent border-accent/20' :
                    'bg-muted text-muted-foreground border-border'
                  }`}>
                    {milestone.status.replace('_', ' ')}
                  </span>
                  
                  <h3 className={`text-xl font-display font-bold ${milestone.status !== 'pending' ? 'text-foreground' : 'text-foreground/70'}`}>
                    {milestone.title}
                  </h3>
                  
                  {milestone.description && (
                    <p className="text-muted-foreground font-sans mt-2 leading-relaxed">
                      {milestone.description}
                    </p>
                  )}
                  
                  <div className="flex gap-6 mt-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {milestone.dueDate && (
                      <span>Due: {format(new Date(milestone.dueDate), 'MMM dd, yyyy')}</span>
                    )}
                    {milestone.completedDate && (
                      <span className="text-primary">Completed: {format(new Date(milestone.completedDate), 'MMM dd, yyyy')}</span>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
