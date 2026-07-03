import Link from "next/link";
import type { PlanTemplate } from "@/types";

export function TemplateCard({ template }: { template: PlanTemplate }) {
  return (
    <Link
      href={`/plan?template=${template.id}`}
      className="block rounded-[30px] border border-white/10 bg-gradient-to-br from-white/[.08] to-white/[.035] p-4 shadow-card"
    >
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-[18px] bg-iron-accent text-xl text-[#071004]">🏋</div>
      <h2 className="text-[26px] font-black leading-none tracking-[-.8px]">{template.name}</h2>
      <p className="mt-2 text-sm text-iron-muted">{template.subtitle}</p>
      <div className="mt-4 flex gap-2">
        <span className="rounded-full border border-iron-accent/20 bg-iron-accent/10 px-3 py-1.5 text-xs font-bold text-iron-accent">
          {template.durationMinutes} นาที
        </span>
        <span className="rounded-full border border-white/10 bg-white/[.045] px-3 py-1.5 text-xs font-bold text-iron-muted">
          {template.focus}
        </span>
      </div>
    </Link>
  );
}
