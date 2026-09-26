import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateAppointment } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(5, "Phone is required"),
  projectType: z.string().min(1, "Project type is required"),
  budget: z.string().optional(),
  location: z.string().optional(),
  preferredDate: z.string().optional(),
  message: z.string().optional(),
});

export default function Book() {
  const { toast } = useToast();
  const createAppointment = useCreateAppointment();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "", email: "", phone: "", projectType: "", budget: "", location: "", preferredDate: "", message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createAppointment.mutate({ data: values }, {
      onSuccess: () => {
        toast({ title: "Request Received", description: "We will contact you shortly to confirm your consultation." });
        form.reset();
      },
      onError: () => {
        toast({ variant: "destructive", title: "Error", description: "Failed to submit request." });
      }
    });
  }

  return (
    <div className="w-full pb-32">
      <section className="pt-32 pb-16 px-6 md:px-12 bg-primary text-primary-foreground relative">
        <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none mix-blend-overlay" />
        <div className="container mx-auto relative z-10 max-w-4xl text-center">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">Start a Project.</h1>
            <p className="text-lg text-primary-foreground/80 font-sans">
              Book a strategic consultation. We'll discuss your vision, evaluate the site feasibility, and outline a path forward.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <Reveal delay={0.2}>
            <div className="bg-card border border-border p-8 md:p-12 shadow-2xl">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Personal Info */}
                  <div className="space-y-6">
                    <h3 className="font-mono text-sm text-primary uppercase tracking-widest border-b border-border pb-2">Client Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel className="font-mono text-xs uppercase text-muted-foreground">Full Name</FormLabel>
                        <FormControl><Input className="rounded-none border-border h-12" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel className="font-mono text-xs uppercase text-muted-foreground">Email</FormLabel>
                        <FormControl><Input type="email" className="rounded-none border-border h-12" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel className="font-mono text-xs uppercase text-muted-foreground">Phone Number</FormLabel>
                        <FormControl><Input className="rounded-none border-border h-12" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-6 pt-6">
                    <h3 className="font-mono text-sm text-primary uppercase tracking-widest border-b border-border pb-2">Project Brief</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="projectType" render={({ field }) => (
                        <FormItem><FormLabel className="font-mono text-xs uppercase text-muted-foreground">Project Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger className="rounded-none border-border h-12"><SelectValue placeholder="Select type" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="residential">Residential Architecture</SelectItem>
                            <SelectItem value="commercial">Commercial Space</SelectItem>
                            <SelectItem value="hospitality">Hospitality / Resort</SelectItem>
                            <SelectItem value="interior">Interior Design</SelectItem>
                          </SelectContent>
                        </Select><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="budget" render={({ field }) => (
                        <FormItem><FormLabel className="font-mono text-xs uppercase text-muted-foreground">Estimated Budget</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger className="rounded-none border-border h-12"><SelectValue placeholder="Select range" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="under_10m">Under 10M KES</SelectItem>
                            <SelectItem value="10m_50m">10M - 50M KES</SelectItem>
                            <SelectItem value="50m_100m">50M - 100M KES</SelectItem>
                            <SelectItem value="over_100m">Over 100M KES</SelectItem>
                          </SelectContent>
                        </Select><FormMessage /></FormItem>
                      )} />
                    </div>
                    
                    <FormField control={form.control} name="location" render={({ field }) => (
                      <FormItem><FormLabel className="font-mono text-xs uppercase text-muted-foreground">Site Location</FormLabel>
                      <FormControl><Input placeholder="City, Area, or Plot details" className="rounded-none border-border h-12" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />

                    <FormField control={form.control} name="preferredDate" render={({ field }) => (
                      <FormItem><FormLabel className="font-mono text-xs uppercase text-muted-foreground">Preferred Meeting Month</FormLabel>
                      <FormControl><Input type="month" className="rounded-none border-border h-12" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />

                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem><FormLabel className="font-mono text-xs uppercase text-muted-foreground">Project Description</FormLabel>
                      <FormControl><Textarea placeholder="Tell us about your vision..." className="rounded-none border-border min-h-[120px] resize-none" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>

                  <Button type="submit" disabled={createAppointment.isPending} className="w-full h-16 rounded-none bg-foreground text-background hover:bg-primary font-mono uppercase tracking-widest text-sm transition-colors">
                    {createAppointment.isPending ? "Submitting..." : "Request Consultation"}
                  </Button>
                </form>
              </Form>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
