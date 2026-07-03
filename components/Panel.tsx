import { cn } from "@/lib/cn";

export function Panel({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <section
      className={cn(
        "mb-3.5 rounded-app border border-white/10 bg-gradient-to-b from-white/[.075] to-white/[.035] p-4 shadow-[0_18px_55px_rgba(0,0,0,.28)] backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </section>
  );
}
