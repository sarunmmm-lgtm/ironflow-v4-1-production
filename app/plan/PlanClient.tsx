"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Panel } from "@/components/Panel";
import { ExerciseRow } from "@/components/ExerciseRow";
import { bodyParts, exercises } from "@/data/exercises";
import { planTemplates } from "@/data/templates";
import { saveTodayWorkout } from "@/lib/storage";
import { uid } from "@/lib/workout";
import type { BodyPart } from "@/types";

export function PlanClient() {
  const router = useRouter();
  const [bodyPart, setBodyPart] = useState<BodyPart | "All">("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const templateId = query.get("template");
    const template = planTemplates.find((item) => item.id === templateId);
    if (template) setSelectedIds(template.exerciseIds);
  }, []);

  const filteredExercises = useMemo(() => {
    if (bodyPart === "All") return exercises;
    return exercises.filter((exercise) => exercise.bodyPart === bodyPart);
  }, [bodyPart]);

  function toggleExercise(id: string) {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function saveAndStart() {
    if (!selectedIds.length) return;
    saveTodayWorkout({
      id: uid(),
      name: "Today Workout",
      exerciseIds: selectedIds,
      createdAt: new Date().toISOString(),
    });
    router.push("/train");
  }

  return (
    <AppShell>
      <Header title="เลือกท่าวันนี้" />

      <Panel>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-black">{selectedIds.length} ท่าที่เลือก</h2>
            <p className="text-sm text-iron-muted">เลือกท่าเอง หรือใช้แพลนสำเร็จรูปจากหน้า Home</p>
          </div>
          <button
            onClick={() => setSelectedIds([])}
            className="rounded-full border border-white/10 bg-white/[.045] px-3 py-2 text-xs font-bold text-iron-muted"
          >
            ล้าง
          </button>
        </div>

        <button
          disabled={!selectedIds.length}
          onClick={saveAndStart}
          className="mt-4 h-[54px] w-full rounded-[19px] bg-gradient-to-br from-iron-accent to-iron-accent2 font-extrabold text-[#071004] disabled:opacity-40"
        >
          บันทึกและเริ่มเล่น
        </button>
      </Panel>

      <div className="no-scrollbar mb-3 flex gap-2 overflow-x-auto">
        {(["All", ...bodyParts] as Array<BodyPart | "All">).map((part) => (
          <button
            key={part}
            onClick={() => setBodyPart(part)}
            className={`h-10 shrink-0 rounded-full border px-4 font-bold ${
              bodyPart === part ? "border-transparent bg-iron-accent text-[#071004]" : "border-white/10 bg-white/[.045] text-iron-muted"
            }`}
          >
            {part === "All" ? "ทั้งหมด" : part}
          </button>
        ))}
      </div>

      <Panel>
        {filteredExercises.map((exercise, index) => (
          <ExerciseRow
            key={exercise.id}
            exercise={exercise}
            index={index}
            selected={selectedIds.includes(exercise.id)}
            onClick={() => toggleExercise(exercise.id)}
          />
        ))}
      </Panel>

      <BottomNav />
    </AppShell>
  );
}
