import { Link, useLocation } from "wouter";
import { LayoutDashboard, CheckSquare, MessageSquare, LogOut, FileText } from "lucide-react";

export function PortalSidebar() {
  const [location] = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Project Hub", path: "/portal" },
    { icon: CheckSquare, label: "Milestones", path: "/portal/milestones" },
    { icon: FileText, label: "Documents", path: "/portal/documents" },
    { icon: MessageSquare, label: "Messages", path: "/portal/messages" },
  ];

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-screen fixed top-0 left-0 flex flex-col text-sidebar-foreground">
      <div className="p-6 border-b border-sidebar-border mb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-primary mb-2 block">Client Portal</span>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-accent text-accent-foreground flex items-center justify-center font-display font-bold text-sm">S</div>
          <span className="font-display font-bold text-lg tracking-tight">Studio Hub</span>
        </div>
      </div>
      
      <div className="flex-1 px-4 space-y-2">
        <p className="text-[10px] font-mono uppercase text-muted-foreground tracking-widest px-2 mb-4">Navigation</p>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const active = location === item.path || (item.path !== "/portal" && location.startsWith(item.path));
            return (
              <li key={item.path}>
                <Link href={item.path}>
                  <span className={`flex items-center gap-3 px-3 py-3 rounded-none font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer border-l-2 ${
                    active 
                      ? "bg-sidebar-accent border-primary text-primary" 
                      : "border-transparent text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground hover:border-sidebar-border"
                  }`}>
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="p-6 border-t border-sidebar-border bg-sidebar-accent/30">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-display font-bold text-lg border border-border">C</div>
          <div>
            <p className="text-sm font-bold font-display">John Doe</p>
            <p className="text-xs text-muted-foreground">johndoe@example.com</p>
          </div>
        </div>
        <Link href="/">
          <span className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-destructive transition-colors cursor-pointer">
            <LogOut className="w-4 h-4" />
            Sign Out
          </span>
        </Link>
      </div>
    </div>
  );
}

export function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <PortalSidebar />
      <main className="flex-1 ml-64 min-h-screen p-10 bg-card/50">
        {children}
      </main>
    </div>
  );
}
