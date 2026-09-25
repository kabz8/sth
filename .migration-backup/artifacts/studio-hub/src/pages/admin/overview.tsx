import { useGetAnalyticsSummary, useGetRecentActivity } from "@workspace/api-client-react";
import { Building, Users, MessageSquare, Calendar, FileText } from "lucide-react";
import { format } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

export default function AdminOverview() {
  const { data: stats } = useGetAnalyticsSummary();
  const { data: activities } = useGetRecentActivity();

  const mockChartData = [
    { name: 'Jan', projects: 4 },
    { name: 'Feb', projects: 3 },
    { name: 'Mar', projects: 5 },
    { name: 'Apr', projects: 2 },
    { name: 'May', projects: 6 },
    { name: 'Jun', projects: 4 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground font-sans mt-1">Metrics and recent activity across the studio.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Projects", value: stats?.totalProjects || 0, icon: Building, color: "text-primary" },
          { label: "Active Projects", value: stats?.activeProjects || 0, icon: Building, color: "text-accent" },
          { label: "Total Clients", value: stats?.totalClients || 0, icon: Users, color: "text-blue-500" },
          { label: "Pending Appointments", value: stats?.pendingAppointments || 0, icon: Calendar, color: "text-orange-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border p-6 rounded-lg shadow-sm flex items-start justify-between">
            <div>
              <p className="text-sm font-mono uppercase tracking-widest text-muted-foreground mb-2">{stat.label}</p>
              <h3 className="text-4xl font-display font-bold">{stat.value}</h3>
            </div>
            <div className={`p-3 bg-muted rounded-full ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card border border-border p-6 rounded-lg shadow-sm">
          <h3 className="font-display text-lg font-bold mb-6">Project Growth</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip cursor={{fill: 'hsl(var(--muted))'}} contentStyle={{backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))'}} />
                <Bar dataKey="projects" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg shadow-sm flex flex-col h-[400px]">
          <div className="p-6 border-b border-border">
            <h3 className="font-display text-lg font-bold">Recent Activity</h3>
          </div>
          <div className="p-0 overflow-y-auto flex-1">
            <ul className="divide-y divide-border">
              {(activities || []).map((activity) => (
                <li key={activity.id} className="p-4 hover:bg-muted/30 transition-colors flex gap-4">
                  <div className="mt-1">
                    {activity.type === 'project' && <Building className="w-4 h-4 text-primary" />}
                    {activity.type === 'contact' && <MessageSquare className="w-4 h-4 text-accent" />}
                    {activity.type === 'appointment' && <Calendar className="w-4 h-4 text-orange-500" />}
                    {activity.type === 'blog' && <FileText className="w-4 h-4 text-blue-500" />}
                  </div>
                  <div>
                    <p className="text-sm font-sans text-foreground/90">{activity.message}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">{format(new Date(activity.createdAt), 'MMM dd, HH:mm')}</p>
                  </div>
                </li>
              ))}
              {(!activities || activities.length === 0) && (
                <li className="p-8 text-center text-muted-foreground text-sm font-mono uppercase">No recent activity</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
