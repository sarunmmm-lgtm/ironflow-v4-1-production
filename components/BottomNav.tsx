import Link from "next/link";

const items = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/plan", label: "Plan", icon: "☑" },
  { href: "/train", label: "Train", icon: "▶" },
  { href: "/stats", label: "Stats", icon: "▥" },
  { href: "/library", label: "Library", icon: "□" },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-3 left-1/2 z-50 grid h-[72px] w-[min(calc(100%-22px),410px)] -translate-x-1/2 grid-cols-5 overflow-hidden rounded-[28px] border border-white/10 bg-[#0A0D09]/85 shadow-card backdrop-blur-2xl">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="grid place-items-center gap-0.5 text-[10px] font-bold text-iron-muted">
          <span className="text-[21px] text-iron-accent">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
