import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Header } from "@/components/Header";
import { Panel } from "@/components/Panel";
import { getExercise } from "@/data/exercises";

export default function ExerciseDetailPage({ params }: { params: { id: string } }) {
  const exercise = getExercise(params.id);
  if (!exercise) return notFound();

  return (
    <AppShell>
      <Header title={exercise.name} />

      <section className="relative mb-3.5 h-[260px] overflow-hidden rounded-[36px] border border-white/15 bg-[#070907] shadow-card">
        <img src={exercise.image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.1),#030503_92%)]" />
        <div className="absolute bottom-7 left-5 right-5">
          <small className="font-semibold text-white/80">{exercise.bodyPart}</small>
          <h1 className="mt-1 text-[40px] font-extrabold leading-none tracking-[-1.4px]">{exercise.name}</h1>
        </div>
      </section>

      <Panel>
        <h2 className="text-xl font-black">วิธีเล่น</h2>
        <p className="mt-2 text-sm leading-relaxed text-iron-muted">{exercise.cue}</p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-[22px] border border-white/10 bg-white/[.05] p-3">
            <span className="text-xs text-iron-muted">SETS</span>
            <strong className="block text-xl">{exercise.defaultSets}</strong>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-white/[.05] p-3">
            <span className="text-xs text-iron-muted">REPS</span>
            <strong className="block text-xl">{exercise.reps}</strong>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-white/[.05] p-3">
            <span className="text-xs text-iron-muted">KG</span>
            <strong className="block text-xl">{exercise.defaultWeightKg}</strong>
          </div>
        </div>

        <Link href="/plan" className="mt-4 grid h-[54px] place-items-center rounded-[19px] bg-gradient-to-br from-iron-accent to-iron-accent2 font-extrabold text-[#071004] shadow-glow">
          เลือกในแพลน
        </Link>
      </Panel>
    </AppShell>
  );
}
