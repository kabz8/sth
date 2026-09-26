import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { FloatingContact } from "@/components/floating-contact";
import { useEffect } from "react";
import { useLocation } from "wouter";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <main className="flex-grow pt-[64px] relative z-10">{children}</main>
      <Footer />
      <FloatingContact />
      <WhatsAppButton />
    </div>
  );
}
