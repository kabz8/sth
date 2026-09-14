import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpRight, Send } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Please tell us a little more"),
});

type FormValues = z.infer<typeof formSchema>;

export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const createContact = useCreateContact();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: FormValues) {
    createContact.mutate(
      {
        data: {
          name: values.name,
          email: values.email,
          phone: values.phone || undefined,
          message: values.message,
        },
      },
      {
        onSuccess: () => {
          toast({
            title: "Message sent",
            description: "We have received your message and will respond shortly.",
          });
          form.reset();
          setOpen(false);
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Message not sent",
            description: "Something went wrong. Please try again.",
          });
        },
      },
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen && !createContact.isPending) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          className="group fixed bottom-6 right-[5.5rem] z-50 inline-flex h-12 items-center gap-2 border border-primary/70 bg-background/85 px-4 text-sm font-medium text-primary backdrop-blur-md transition-all hover:border-primary hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Open send message form"
        >
          <span>Send Message</span>
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-xl rounded-none border-primary/30 bg-background p-6 md:p-8">
        <DialogHeader className="pr-8 text-left">
          <p className="mb-3 font-mono text-[10px] tracking-[0.28em] text-primary">
            Start a conversation
          </p>
          <DialogTitle className="font-display text-3xl font-bold tracking-tight">
            Send a message.
          </DialogTitle>
          <DialogDescription className="font-sans text-muted-foreground">
            Tell us about your project and we will get back to you shortly.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans text-sm">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name"
                        autoComplete="name"
                        className="h-11 rounded-none border-border bg-card focus-visible:ring-primary"
                        {...field}
                      />
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
                    <FormLabel className="font-sans text-sm">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="h-11 rounded-none border-border bg-card focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-sans text-sm">
                    Phone number <span className="text-muted-foreground">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+254 700 000 000"
                      autoComplete="tel"
                      className="h-11 rounded-none border-border bg-card focus-visible:ring-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-sans text-sm">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="How can we help with your project?"
                      className="min-h-32 resize-none rounded-none border-border bg-card focus-visible:ring-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-5">
              <p className="text-xs text-muted-foreground">
                We usually respond within one business day.
              </p>
              <button
                type="submit"
                disabled={createContact.isPending}
                className="group inline-flex shrink-0 items-center gap-2 border-b border-primary/70 pb-2 text-sm font-medium text-primary transition-colors hover:border-primary hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
              >
                {createContact.isPending ? "Sending..." : "Send message"}
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}