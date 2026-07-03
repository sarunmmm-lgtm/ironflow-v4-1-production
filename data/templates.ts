import type { PlanTemplate } from "@/types";

export const planTemplates: PlanTemplate[] = [
  {
    id: "upper",
    name: "Upper Body",
    subtitle: "อก · หลัง · ไหล่ · แขน",
    durationMinutes: 45,
    focus: "ส่วนบน",
    exerciseIds: ["bench-press", "lat-pulldown", "dumbbell-row", "shoulder-press", "bicep-curl", "tricep-pushdown"],
  },
  {
    id: "lower",
    name: "Lower Body",
    subtitle: "ขา · ก้น · น่อง",
    durationMinutes: 42,
    focus: "ส่วนล่าง",
    exerciseIds: ["squat", "romanian-deadlift", "leg-press", "lunges", "calf-raise", "plank"],
  },
  {
    id: "fullbody",
    name: "Full Body",
    subtitle: "ครบทุกส่วนในวันเดียว",
    durationMinutes: 55,
    focus: "ทั้งตัว",
    exerciseIds: ["squat", "bench-press", "lat-pulldown", "shoulder-press", "romanian-deadlift", "plank"],
  },
  {
    id: "push",
    name: "Push Day",
    subtitle: "อก · ไหล่ · หลังแขน",
    durationMinutes: 40,
    focus: "Push",
    exerciseIds: ["bench-press", "incline-db-press", "shoulder-press", "lateral-raise", "tricep-pushdown"],
  },
  {
    id: "pull",
    name: "Pull Day",
    subtitle: "หลัง · หน้าแขน",
    durationMinutes: 40,
    focus: "Pull",
    exerciseIds: ["lat-pulldown", "barbell-row", "seated-row", "rear-delt-fly", "bicep-curl", "hammer-curl"],
  },
];
