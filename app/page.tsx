import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Metric } from "@/components/Metric";
import { Panel } from "@/components/Panel";
import { TemplateCard } from "@/components/TemplateCard";
import { planTemplates } from "@/data/templates";

export default function Home() {
  return (
    <AppShell>
      <Header />

      <section className="relative mb-3.5 min-h-[235px] overflow-hidden rounded-hero border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.025)),radial-gradient(circle_at_72%_18%,rgba(167,255,26,.24),transparent_22%),#0B0E0A] p-5 shadow-card">
        <div className="relative z-10 mb-3 inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-iron-accent">
          ☑ Manual workout planner
        </div>
        <h1 className="relative z-10 mb-3 max-w-[270px] text-[36px] font-extrabold leading-none tracking-[-1.4px]">
          เลือกท่าวันนี้ แล้วเริ่มเล่นได้เลย
        </h1>
        <p className="relative z-10 mb-4 max-w-[260px] text-sm leading-relaxed text-[#d9e2d4]">
          ใช้แพลนสำเร็จรูป หรือเลือกท่าเองจากทุกส่วนของร่างกาย
        </p>
        <Link
          href="/plan"
          className="relative z-10 inline-flex h-[54px] items-center rounded-[19px] bg-gradient-to-br from-iron-accent to-iron-accent2 px-5 font-extrabold text-[#071004] shadow-glow"
        >
          สร้างแพลนวันนี้
        </Link>
      </section>

      <section className="mb-3.5 grid grid-cols-3 gap-2.5">
        <Metric icon="☑" value="22" label="ท่าทั้งหมด" />
        <Metric icon="⏱" value="45m" label="แนะนำ" />
        <Metric icon="🔥" value="312" label="kcal" />
      </section>

      <div className="mb-2.5 mt-5 flex items-end justify-between px-1">
        <h2 className="text-xl font-bold">แพลนสำเร็จรูป</h2>
        <Link href="/library" className="text-sm font-semibold text-iron-muted">
          ดูท่าทั้งหมด
        </Link>
      </div>

      <div className="grid gap-3">
        {planTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      <Panel className="mt-4">
        <h3 className="font-bold">วิธีใช้</h3>
        <p className="mt-1 text-sm leading-relaxed text-iron-muted">
          เลือกแพลนสำเร็จรูป หรือไปหน้า Plan เพื่อเลือกท่าเอง จากนั้นกดบันทึกเป็นโปรแกรมวันนี้ แล้วเริ่มเล่นในหน้า Train
        </p>
      </Panel>

      <BottomNav />
    </AppShell>
  );
}
