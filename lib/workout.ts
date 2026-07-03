import type { Exercise } from "@/types";

export function progress(total: number, left: number) {
  if (total <= 0) return 0;
  return Math.max(0, Math.min(100, ((total - left) / total) * 100));
}

export function getCue(exercise: Exercise, secondsLeft: number) {
  if (secondsLeft <= 5) return "ใกล้จบเซ็ตแล้ว เร่งจังหวะ!";
  return exercise.cue;
}

export function parseReps(reps: string) {
  const value = parseInt(reps, 10);
  return Number.isFinite(value) ? value : 10;
}

export function uid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
