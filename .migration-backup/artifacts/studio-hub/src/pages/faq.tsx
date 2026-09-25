import { Reveal } from "@/components/animations";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is your typical architectural process?",
    a: "Our process begins with an in-depth consultation to understand your vision. We then move through conceptual design, schematic development, securing necessary approvals, detailed construction documentation, and rigorous site supervision until handover."
  },
  {
    q: "Do you handle projects outside of Nairobi?",
    a: "Yes. While our studio is based in Nairobi, we have successfully designed and supervised projects across Kenya and East Africa. Our design principles adapt to various regional contexts."
  },
  {
    q: "How are your fees structured?",
    a: "Our fees are typically calculated as a percentage of the total construction cost, aligned with standard professional guidelines. We also offer fixed-fee arrangements for specific consulting or interior design scopes."
  },
  {
    q: "Do you manage the construction contractors?",
    a: "We act as the lead consultant and project manager. We help you select the best contractors through a tender process and provide site supervision to ensure they adhere strictly to our blueprints and quality standards."
  },
  {
    q: "How long does the design phase usually take?",
    a: "A standard residential project takes 2-4 months for full design and approvals. Larger commercial or hospitality projects can take 6-12 months. Precision cannot be rushed."
  }
];

export default function FAQ() {
  return (
    <div className="w-full pb-32">
      <section className="pt-32 pb-16 px-6 md:px-12 bg-card border-b border-border">
        <div className="container mx-auto text-center max-w-3xl">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">FAQ.</h1>
            <p className="text-lg text-muted-foreground font-sans">Common questions about our process, fees, and approach to architecture.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <Reveal delay={0.2}>
            <Accordion type="single" collapsible className="w-full border-t border-border">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="text-left font-display text-xl hover:text-primary transition-colors py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-sans text-lg pb-6 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
