"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Panel } from "@/components/Panel";
import { ExerciseRow } from "@/components/ExerciseRow";
import { bodyParts, exercises } from "@/data/exercises";
import type { BodyPart } from "@/types";

export function LibraryClient() {
  const [bodyPart, setBodyPart] = useState<BodyPart | "All">("All");

  const filteredExercises = useMemo(() => {
    if (bodyPart === "All") return exercises;
    return exercises.filter((exercise) => exercise.bodyPart === bodyPart);
  }, [bodyPart]);

  return (
    <AppShell>
      <Header title="Exercise Library" />

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
          <Link key={exercise.id} href={`/exercise/${exercise.id}`}>
            <ExerciseRow exercise={exercise} index={index} />
          </Link>
        ))}
      </Panel>

      <BottomNav />
    </AppShell>
  );
}
