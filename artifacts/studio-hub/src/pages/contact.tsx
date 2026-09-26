import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/animations";
import { MapPin, Phone, Mail } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message is too short"),
});

export default function Contact() {
  const { toast } = useToast();
  const createContact = useCreateContact();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createContact.mutate({ data: values }, {
      onSuccess: () => {
        toast({
          title: "Message Sent",
          description: "We have received your message and will respond shortly.",
        });
        form.reset();
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to send message. Please try again.",
        });
      }
    });
  }

  return (
    <div className="w-full pb-32">
      <section className="pt-32 pb-16 px-6 md:px-12 border-b border-border bg-card relative">
        <div className="absolute inset-0 bg-blueprint-dark opacity-[0.05] pointer-events-none" />
        <div className="container mx-auto relative z-10">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">Contact.</h1>
            <p className="text-lg text-muted-foreground font-sans max-w-xl">
              Get in touch with our team for general inquiries, press, or career opportunities.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            
            <Reveal delay={0.1}>
              <div className="space-y-12">
                <div>
                  <h3 className="font-mono text-sm uppercase tracking-widest text-primary mb-6">Our Studio</h3>
                  <div className="space-y-6 font-sans text-lg">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                      <p>Ruiru, Kiambu County<br />Nairobi, Kenya</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Phone className="w-6 h-6 text-primary shrink-0" />
                      <a href="tel:+254701719824" className="hover:text-primary transition-colors">0701 719 824</a>
                    </div>
                    <div className="flex items-center gap-4">
                      <Mail className="w-6 h-6 text-primary shrink-0" />
                      <p>hello@studiohub.co.ke</p>
                    </div>
                  </div>
                </div>

                <div className="aspect-video bg-muted border border-border w-full relative">
                  {/* Google Maps placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-mono text-xs uppercase tracking-widest">
                    [ Interactive Map ]
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-card border border-border p-8 md:p-12 shadow-xl shadow-black/5">
                <h3 className="font-display text-3xl font-bold mb-8">Send a Message</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-mono text-xs uppercase tracking-widest">Name</FormLabel>
                            <FormControl>
                              <Input className="rounded-none border-border bg-background h-12 focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-mono text-xs uppercase tracking-widest">Email</FormLabel>
                            <FormControl>
                              <Input type="email" className="rounded-none border-border bg-background h-12 focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-mono text-xs uppercase tracking-widest">Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input className="rounded-none border-border bg-background h-12 focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-mono text-xs uppercase tracking-widest">Subject</FormLabel>
                            <FormControl>
                              <Input className="rounded-none border-border bg-background h-12 focus-visible:ring-primary" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-mono text-xs uppercase tracking-widest">Message</FormLabel>
                          <FormControl>
                            <Textarea className="rounded-none border-border bg-background min-h-[150px] focus-visible:ring-primary resize-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      disabled={createContact.isPending}
                      className="w-full h-14 rounded-none bg-primary text-primary-foreground hover:bg-accent font-mono uppercase tracking-widest"
                    >
                      {createContact.isPending ? "Sending..." : "Submit Message"}
                    </Button>
                  </form>
                </Form>
              </div>
            </Reveal>

          </div>
        </div>
      </section>
    </div>
  );
}
