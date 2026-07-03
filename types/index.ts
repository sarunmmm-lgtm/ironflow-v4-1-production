export type BodyPart = "Chest" | "Back" | "Shoulders" | "Arms" | "Legs" | "Core";

export type Exercise = {
  id: string;
  name: string;
  bodyPart: BodyPart;
  muscles: string[];
  reps: string;
  defaultSets: number;
  defaultWeightKg: number;
  workSeconds: number;
  restSeconds: number;
  image: string;
  cue: string;
};

export type PlanTemplate = {
  id: string;
  name: string;
  subtitle: string;
  durationMinutes: number;
  focus: string;
  exerciseIds: string[];
};

export type TodayWorkout = {
  id: string;
  name: string;
  exerciseIds: string[];
  createdAt: string;
};

export type WorkoutSetLog = {
  exerciseId: string;
  setNumber: number;
  reps: number;
  weightKg: number;
  completedAt: string;
};

export type WorkoutHistory = {
  id: string;
  name: string;
  date: string;
  durationSeconds: number;
  exerciseIds: string[];
  sets: WorkoutSetLog[];
};

export type AppSettings = {
  sound: boolean;
  countdown: boolean;
  autoRest: boolean;
};
