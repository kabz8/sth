export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src="/logo-icon.png"
        alt="Studio Hub Architects icon"
        className="h-10 w-auto object-contain"
      />
      <div className="flex flex-col leading-none">
        <span className="font-display font-bold text-sm tracking-widest uppercase text-foreground">
          Studio-Hub.
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          Architects
        </span>
      </div>
    </div>
  );
}
