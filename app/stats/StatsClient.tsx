"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Panel } from "@/components/Panel";
import { Metric } from "@/components/Metric";
import { getHistory } from "@/lib/storage";
import type { WorkoutHistory } from "@/types";

export function StatsClient() {
  const [items, setItems] = useState<WorkoutHistory[]>([]);

  useEffect(() => {
    setItems(getHistory());
  }, []);

  const totalSets = items.reduce((sum, item) => sum + item.sets.length, 0);
  const totalMinutes = Math.round(items.reduce((sum, item) => sum + item.durationSeconds, 0) / 60);

  return (
    <AppShell>
      <Header title="Progress" />

      <section className="mb-3.5 grid grid-cols-3 gap-2.5">
        <Metric icon="🔥" value={`${items.length}`} label="Workouts" />
        <Metric icon="⏱" value={`${totalMinutes}m`} label="Training" />
        <Metric icon="✓" value={`${totalSets}`} label="Sets" />
      </section>

      <Panel>
        <h3 className="mb-3 font-bold">ประวัติล่าสุด</h3>
        {items.length ? (
          items.slice(0, 10).map((item) => (
            <div key={item.id} className="mb-2 rounded-2xl border border-white/10 bg-white/[.04] p-3">
              <strong>{item.name}</strong>
              <p className="text-sm text-iron-muted">
                {new Date(item.date).toLocaleDateString("th-TH")} · {item.exerciseIds.length} ท่า · {item.sets.length} เซ็ต
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-iron-muted">ยังไม่มีประวัติการเล่น กด Train เพื่อเริ่มเล่นและบันทึกผล</p>
        )}
      </Panel>

      <BottomNav />
    </AppShell>
  );
}
