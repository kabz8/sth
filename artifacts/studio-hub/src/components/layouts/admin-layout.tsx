import { Link, useLocation } from "wouter";
import { Building, LayoutDashboard, Users, FileText, Image, MessageSquare, Calendar, Settings, LogOut, Briefcase } from "lucide-react";

export function AdminSidebar() {
  const [location] = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/admin" },
    { icon: Building, label: "Projects", path: "/admin/projects" },
    { icon: Users, label: "Clients", path: "/admin/clients" },
    { icon: FileText, label: "Blog Posts", path: "/admin/blog" },
    { icon: Users, label: "Team", path: "/admin/team" },
    { icon: MessageSquare, label: "Testimonials", path: "/admin/testimonials" },
    { icon: Briefcase, label: "Careers", path: "/admin/careers" },
    { icon: MessageSquare, label: "Inbox", path: "/admin/messages" },
    { icon: Calendar, label: "Appointments", path: "/admin/appointments" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-screen fixed top-0 left-0 flex flex-col text-sidebar-foreground">
      <div className="p-6 border-b border-sidebar-border flex items-center gap-3">
        <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center font-display font-bold">S</div>
        <span className="font-display font-bold uppercase tracking-tight">Studio Admin</span>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const active = location === item.path || (item.path !== "/admin" && location.startsWith(item.path));
            return (
              <li key={item.path}>
                <Link href={item.path}>
                  <span className={`flex items-center gap-3 px-3 py-2.5 rounded-md font-sans text-sm transition-colors cursor-pointer ${
                    active 
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  }`}>
                    <item.icon className={`w-4 h-4 ${active ? "text-primary" : ""}`} />
                    {item.label}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <Link href="/">
          <span className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-destructive transition-colors cursor-pointer">
            <LogOut className="w-4 h-4" />
            Exit Admin
          </span>
        </Link>
      </div>
    </div>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <AdminSidebar />
      <main className="flex-1 ml-64 min-h-screen p-8">
        {children}
      </main>
    </div>
  );
}
