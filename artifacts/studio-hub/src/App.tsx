import { Route, Switch, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useTheme } from '@/hooks/use-theme';

// Layouts
import { PublicLayout } from '@/components/layouts/public-layout';
import { AdminLayout } from '@/components/layouts/admin-layout';
import { PortalLayout } from '@/components/layouts/portal-layout';

// Public Pages
import Home from '@/pages/home';
import Projects from '@/pages/projects';
import ProjectDetail from '@/pages/project-detail';
import Services from '@/pages/services';
import About from '@/pages/about';
import Blog from '@/pages/blog';
import BlogDetail from '@/pages/blog-detail';
import Careers from '@/pages/careers';
import Contact from '@/pages/contact';
import Book from '@/pages/book';
import FAQ from '@/pages/faq';
import NotFound from '@/pages/not-found';

// Admin Pages
import AdminOverview from '@/pages/admin/overview';
import AdminProjects from '@/pages/admin/projects';
import AdminClients from '@/pages/admin/clients';
import AdminBlog from '@/pages/admin/blog';
import AdminTeam from '@/pages/admin/team';
import AdminTestimonials from '@/pages/admin/testimonials';
import AdminCareers from '@/pages/admin/careers';
import AdminMessages from '@/pages/admin/messages';
import AdminAppointments from '@/pages/admin/appointments';
import AdminSettings from '@/pages/admin/settings';

// Portal Pages
import PortalOverview from '@/pages/portal/overview';
import PortalMilestones from '@/pages/portal/milestones';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function AppRouter() {
  return (
    <Switch>
      {/* Admin Routes */}
      <Route path="/admin" nest>
        <AdminLayout>
          <Switch>
            <Route path="/" component={AdminOverview} />
            <Route path="/projects" component={AdminProjects} />
            <Route path="/clients" component={AdminClients} />
            <Route path="/blog" component={AdminBlog} />
            <Route path="/team" component={AdminTeam} />
            <Route path="/testimonials" component={AdminTestimonials} />
            <Route path="/careers" component={AdminCareers} />
            <Route path="/messages" component={AdminMessages} />
            <Route path="/appointments" component={AdminAppointments} />
            <Route path="/settings" component={AdminSettings} />
            <Route>
              <div className="p-8 text-muted-foreground font-mono uppercase tracking-widest text-sm border border-dashed border-border rounded-lg text-center mt-12">Admin Page Not Found</div>
            </Route>
          </Switch>
        </AdminLayout>
      </Route>

      {/* Portal Routes */}
      <Route path="/portal" nest>
        <PortalLayout>
          <Switch>
            <Route path="/" component={PortalOverview} />
            <Route path="/milestones" component={PortalMilestones} />
            <Route>
              <div className="p-8 text-muted-foreground font-mono uppercase tracking-widest text-sm border border-dashed border-border text-center mt-12 bg-card">Portal Page Not Found</div>
            </Route>
          </Switch>
        </PortalLayout>
      </Route>

      {/* Public Routes — bare catch-all, no nest, so paths are never stripped */}
      <Route>
        <PublicLayout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/projects/:id" component={ProjectDetail} />
            <Route path="/projects" component={Projects} />
            <Route path="/services" component={Services} />
            <Route path="/about" component={About} />
            <Route path="/blog/:id" component={BlogDetail} />
            <Route path="/blog" component={Blog} />
            <Route path="/careers" component={Careers} />
            <Route path="/contact" component={Contact} />
            <Route path="/book" component={Book} />
            <Route path="/faq" component={FAQ} />
            <Route component={NotFound} />
          </Switch>
        </PublicLayout>
      </Route>
    </Switch>
  );
}

function App() {
  useTheme(); // Enforce theme
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <AppRouter />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
