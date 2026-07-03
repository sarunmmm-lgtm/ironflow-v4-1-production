"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Header } from "@/components/Header";
import { Panel } from "@/components/Panel";
import { clearHistory, clearTodayWorkout, defaultSettings, getSettings, saveSettings } from "@/lib/storage";
import type { AppSettings } from "@/types";

export function SettingsClient() {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  function update(next: AppSettings) {
    setSettings(next);
    saveSettings(next);
  }

  return (
    <AppShell>
      <Header title="Settings" />

      <Panel>
        {([
          ["sound", "เสียงเอฟเฟกต์"],
          ["countdown", "เสียงนับถอยหลัง"],
          ["autoRest", "พักอัตโนมัติ"],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => update({ ...settings, [key]: !settings[key] })}
            className="mb-2.5 grid w-full grid-cols-[48px_1fr_auto] items-center gap-3 rounded-3xl border border-white/[.08] bg-white/[.045] p-3 text-left"
          >
            <div className="grid h-12 w-12 place-items-center rounded-[18px] bg-iron-accent font-black text-[#071004]">
              {settings[key] ? "✓" : "×"}
            </div>
            <div>
              <strong>{label}</strong>
              <p className="text-sm text-iron-muted">{settings[key] ? "เปิดอยู่" : "ปิดอยู่"}</p>
            </div>
            <span className="rounded-full border border-iron-accent/20 bg-iron-accent/10 px-2.5 py-1.5 text-xs font-bold text-iron-accent">
              {settings[key] ? "ON" : "OFF"}
            </span>
          </button>
        ))}
      </Panel>

      <Panel>
        <h2 className="mb-2 text-xl font-bold">ข้อมูลในเครื่อง</h2>
        <button
          onClick={() => {
            clearTodayWorkout();
            alert("ลบแพลนวันนี้แล้ว");
          }}
          className="mb-2 h-12 w-full rounded-2xl border border-white/10 bg-white/[.045] font-bold"
        >
          ลบแพลนวันนี้
        </button>
        <button
          onClick={() => {
            clearHistory();
            alert("ลบประวัติแล้ว");
          }}
          className="h-12 w-full rounded-2xl border border-red-400/30 bg-red-500/10 font-bold text-red-200"
        >
          ลบประวัติทั้งหมด
        </button>
      </Panel>
    </AppShell>
  );
}
