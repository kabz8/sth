import { useListMilestones } from "@workspace/api-client-react";
import { format } from "date-fns";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { Reveal } from "@/components/animations";

export default function PortalOverview() {
  const { data: milestones, isLoading } = useListMilestones({ projectId: 1 }); // Assuming mocked client has project ID 1

  const completed = milestones?.filter(m => m.status === 'completed').length || 0;
  const total = milestones?.length || 0;
  const progress = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="space-y-12 max-w-5xl">
      <Reveal>
        <header className="border-b border-border pb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Project Dashboard</p>
          <h1 className="text-4xl font-display font-bold tracking-tight mb-4">Your Project</h1>
          <p className="text-muted-foreground font-sans text-lg">Welcome back. Here's the latest status of your project.</p>
        </header>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Reveal delay={0.1} className="md:col-span-2">
          <div className="bg-card border border-border p-8 shadow-sm">
            <h3 className="font-display text-2xl font-bold mb-6">Progress Tracker</h3>
            
            <div className="mb-8">
              <div className="flex justify-between font-mono text-xs uppercase tracking-widest mb-2">
                <span>Overall Completion</span>
                <span className="text-primary">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 w-full bg-muted overflow-hidden">
                <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="space-y-6">
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  {[1,2,3].map(i => <div key={i} className="h-12 bg-muted" />)}
                </div>
              ) : (
                milestones?.slice(0, 5).map((milestone, i) => (
                  <div key={milestone.id} className="flex gap-4 items-start">
                    <div className="mt-0.5">
                      {milestone.status === 'completed' ? <CheckCircle2 className="w-5 h-5 text-primary" /> : 
                       milestone.status === 'in_progress' ? <Clock className="w-5 h-5 text-accent" /> :
                       <Circle className="w-5 h-5 text-muted-foreground" />}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-bold font-sans ${milestone.status === 'completed' ? 'text-foreground' : 'text-foreground/80'}`}>{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-[10px] uppercase text-muted-foreground block mb-1">
                        {milestone.status.replace('_', ' ')}
                      </span>
                      {milestone.dueDate && (
                        <span className="text-xs text-foreground/70 font-sans">
                          {format(new Date(milestone.dueDate), 'MMM dd')}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="mt-8 pt-6 border-t border-border">
              <a href="/portal/milestones" className="font-mono text-xs text-primary uppercase tracking-widest hover:text-accent transition-colors">
                View Full Timeline →
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="space-y-8">
          <div className="bg-card border border-border p-6 shadow-sm">
            <h3 className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-4 border-b border-border pb-2">Key Contacts</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted border border-border overflow-hidden">
                  <img src="https://placehold.co/100x100/1e1e1e/3ECAC8?text=DO" alt="" />
                </div>
                <div>
                  <p className="font-bold font-sans text-sm">David Ochieng</p>
                  <p className="text-xs text-muted-foreground">Lead Architect</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted border border-border overflow-hidden">
                  <img src="https://placehold.co/100x100/1e1e1e/EF725D?text=SM" alt="" />
                </div>
                <div>
                  <p className="font-bold font-sans text-sm">Sarah Mwangi</p>
                  <p className="text-xs text-muted-foreground">Project Manager</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary text-primary-foreground p-6">
            <h3 className="font-display font-bold text-xl mb-2">Need to discuss?</h3>
            <p className="text-sm font-sans mb-6 opacity-90">Schedule a quick sync with the team.</p>
            <button className="w-full bg-background text-foreground font-mono uppercase text-xs tracking-widest py-3 hover:bg-accent hover:text-accent-foreground transition-colors">
              Request Meeting
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
