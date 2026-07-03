"use client";

import type { AppSettings, TodayWorkout, WorkoutHistory } from "@/types";

const TODAY_KEY = "ironflow_today_workout_1";
const HISTORY_KEY = "ironflow_history_1";
const SETTINGS_KEY = "ironflow_settings_1";

export const defaultSettings: AppSettings = {
  sound: true,
  countdown: true,
  autoRest: true,
};

export function saveTodayWorkout(workout: TodayWorkout) {
  localStorage.setItem(TODAY_KEY, JSON.stringify(workout));
}

export function getTodayWorkout(): TodayWorkout | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(TODAY_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as TodayWorkout;
  } catch {
    return null;
  }
}

export function clearTodayWorkout() {
  localStorage.removeItem(TODAY_KEY);
}

export function getHistory(): WorkoutHistory[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(HISTORY_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as WorkoutHistory[];
  } catch {
    return [];
  }
}

export function addHistory(item: WorkoutHistory) {
  const list = getHistory();
  localStorage.setItem(HISTORY_KEY, JSON.stringify([item, ...list].slice(0, 100)));
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}

export function getSettings(): AppSettings {
  if (typeof window === "undefined") return defaultSettings;
  const raw = localStorage.getItem(SETTINGS_KEY);
  if (!raw) return defaultSettings;
  try {
    return { ...defaultSettings, ...JSON.parse(raw) } as AppSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: AppSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
