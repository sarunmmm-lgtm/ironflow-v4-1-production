"use client";

import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Panel } from "@/components/Panel";
import { TimerRing } from "@/components/TimerRing";
import { getExercisesByIds } from "@/data/exercises";
import { addHistory, getSettings, getTodayWorkout } from "@/lib/storage";
import { getCue, parseReps, progress, uid } from "@/lib/workout";
import { playCountdown, playTone } from "@/lib/audio";
import type { WorkoutSetLog } from "@/types";

export function TrainClient() {
  const [loaded, setLoaded] = useState(false);
  const [ids, setIds] = useState<string[]>([]);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [phase, setPhase] = useState<"work" | "rest" | "done">("work");
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(35);
  const [setNumber, setSetNumber] = useState(1);
  const [logs, setLogs] = useState<WorkoutSetLog[]>([]);
  const [startedAt] = useState(Date.now());
  const [reps, setReps] = useState(10);
  const [weightKg, setWeightKg] = useState(0);
  const [settings, setSettings] = useState({ sound: true, countdown: true, autoRest: true });

  useEffect(() => {
    const workout = getTodayWorkout();
    setIds(workout?.exerciseIds?.length ? workout.exerciseIds : ["bench-press", "lat-pulldown", "shoulder-press"]);
    setSettings(getSettings());
    setLoaded(true);
  }, []);

  const workoutExercises = useMemo(() => getExercisesByIds(ids), [ids]);
  const exercise = workoutExercises[Math.min(exerciseIndex, workoutExercises.length - 1)];

  useEffect(() => {
    if (!exercise) return;
    setSecondsLeft(phase === "rest" ? exercise.restSeconds : exercise.workSeconds);
    setReps(parseReps(exercise.reps));
    setWeightKg(exercise.defaultWeightKg);
    setIsRunning(false);
  }, [exercise, phase]);

  useEffect(() => {
    if (!loaded || !exercise || !isRunning || phase === "done") return;

    const timer = window.setInterval(() => {
      setSecondsLeft((value) => {
        if (value <= 1) {
          if (phase === "work") {
            if (settings.autoRest) setPhase("rest");
            else setIsRunning(false);
            if (settings.sound) playTone(540, 0.2, 0.15);
            return exercise.restSeconds;
          }
          if (phase === "rest") {
            setPhase("work");
            if (settings.sound) playTone(1040, 0.18, 0.16);
            return exercise.workSeconds;
          }
          return 0;
        }
        return value - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [loaded, exercise, isRunning, phase, settings]);

  useEffect(() => {
    if (settings.sound && settings.countdown && isRunning && phase === "work") {
      playCountdown(secondsLeft);
    }
  }, [secondsLeft, settings, isRunning, phase]);

  function finish(currentLogs: WorkoutSetLog[] = logs) {
    addHistory({
      id: uid(),
      name: "Today Workout",
      date: new Date().toISOString(),
      durationSeconds: Math.floor((Date.now() - startedAt) / 1000),
      exerciseIds: ids,
      sets: currentLogs,
    });
    setPhase("done");
  }

  function goNextExercise(currentLogs: WorkoutSetLog[] = logs) {
    if (exerciseIndex >= workoutExercises.length - 1) {
      finish(currentLogs);
      return;
    }
    setExerciseIndex((current) => current + 1);
    setSetNumber(1);
    setPhase("work");
  }

  function logSet() {
    if (!exercise) return;
    const nextLogs = [
      ...logs,
      {
        exerciseId: exercise.id,
        setNumber,
        reps,
        weightKg,
        completedAt: new Date().toISOString(),
      },
    ];
    setLogs(nextLogs);
    if (setNumber < exercise.defaultSets) {
      setSetNumber((current) => current + 1);
      setPhase("rest");
      return;
    }
    goNextExercise(nextLogs);
  }

  function toggleRun() {
    if (!isRunning && settings.sound) playTone(1040, 0.18, 0.16);
    setIsRunning(!isRunning);
  }

  if (!loaded || !exercise) {
    return (
      <AppShell>
        <Header title="Train" />
        <Panel><p className="text-iron-muted">กำลังโหลดโปรแกรม...</p></Panel>
        <BottomNav />
      </AppShell>
    );
  }

  if (phase === "done") {
    return (
      <AppShell>
        <div className="pt-8 text-center">
          <div className="mx-auto mb-4 grid h-[92px] w-[92px] place-items-center rounded-[32px] bg-gradient-to-br from-iron-accent to-iron-accent2 text-4xl font-black text-[#071004]">✓</div>
          <h1 className="text-[36px] font-extrabold leading-tight">จบโปรแกรมแล้ว</h1>
          <Panel className="mt-5 text-left">
            <strong>บันทึกแล้ว</strong>
            <p className="text-iron-muted">ทั้งหมด {logs.length} เซ็ต · {workoutExercises.length} ท่า</p>
          </Panel>
        </div>
        <BottomNav />
      </AppShell>
    );
  }

  if (phase === "rest") {
    return (
      <AppShell>
        <section className="grid min-h-[calc(100vh-120px)] content-center gap-6 text-center">
          <div>
            <div className="mb-1 text-xs font-extrabold uppercase tracking-wide text-iron-accent">REST</div>
            <h1 className="text-[38px] font-extrabold">พัก</h1>
          </div>

          <div className="mx-auto grid h-[264px] w-[264px] animate-pulse place-items-center rounded-full bg-[repeating-conic-gradient(#A7FF1A_0_4deg,rgba(167,255,26,.16)_4deg_10deg)]">
            <div className="grid h-[226px] w-[226px] place-items-center rounded-full bg-[#061006]">
              <div>
                <div className="text-[82px] font-black leading-none tracking-[-2px]">{secondsLeft}</div>
                <div className="text-base text-iron-muted">วินาที</div>
              </div>
            </div>
          </div>

          <Panel>
            <strong>ต่อไป</strong>
            <p className="mt-1 text-sm text-iron-muted">{exercise.name} · เซ็ต {setNumber}/{exercise.defaultSets}</p>
          </Panel>

          <button onClick={() => setPhase("work")} className="h-[54px] rounded-[19px] bg-gradient-to-br from-iron-accent to-iron-accent2 font-extrabold text-[#071004]">
            เริ่มต่อ
          </button>
        </section>
        <BottomNav />
      </AppShell>
    );
  }

  return (
    <AppShell>
      <Header title={`${exerciseIndex + 1}/${workoutExercises.length} · Set ${setNumber}/${exercise.defaultSets}`} />

      <section className="relative mb-3.5 h-[315px] overflow-hidden rounded-[36px] border border-white/15 bg-[#070907] shadow-card">
        <img src={exercise.image} alt="" className="h-full w-full object-cover contrast-110 saturate-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.2),#030503_92%)]" />
        <div className="absolute bottom-7 left-5 right-5">
          <small className="font-semibold text-white/80">{exercise.bodyPart}</small>
          <h1 className="mt-1 text-[40px] font-extrabold leading-none tracking-[-1.4px]">{exercise.name}</h1>
        </div>
      </section>

      <Panel className="relative z-10 -mt-14 text-center">
        <TimerRing secondsLeft={secondsLeft} percent={progress(exercise.workSeconds, secondsLeft)} />

        {!isRunning && (
          <div className="mb-3 rounded-2xl border border-iron-accent/30 bg-iron-accent/10 px-3 py-2 text-sm font-bold text-iron-accent">
            พร้อมแล้วกด “เริ่มเซ็ต” เพื่อเริ่มนับเวลา
          </div>
        )}

        <Panel className="text-left">
          <strong>Form Cue</strong>
          <p className="mt-1 text-sm text-iron-muted">{getCue(exercise, secondsLeft)}</p>
        </Panel>

        <div className="grid grid-cols-2 gap-2">
          <label className="rounded-[22px] border border-white/10 bg-white/[.05] p-3 text-left">
            <span className="text-xs text-iron-muted">REPS</span>
            <input type="number" value={reps} onChange={(event) => setReps(Number(event.target.value))} className="mt-1 w-full bg-transparent text-2xl font-black outline-none" />
          </label>
          <label className="rounded-[22px] border border-white/10 bg-white/[.05] p-3 text-left">
            <span className="text-xs text-iron-muted">KG</span>
            <input type="number" value={weightKg} onChange={(event) => setWeightKg(Number(event.target.value))} className="mt-1 w-full bg-transparent text-2xl font-black outline-none" />
          </label>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button onClick={toggleRun} className="inline-flex h-[52px] items-center justify-center gap-2 rounded-[18px] border border-white/15 bg-white/[.045] font-bold">
            {isRunning ? "⏸ หยุด" : "▶ เริ่มเซ็ต"}
          </button>
          <button onClick={logSet} className="inline-flex h-[52px] items-center justify-center gap-2 rounded-[18px] bg-gradient-to-br from-iron-accent to-iron-accent2 font-extrabold text-[#071004]">
            ✓ บันทึกเซ็ต
          </button>
        </div>

        <button onClick={() => goNextExercise()} className="mt-2 inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-[18px] border border-iron-accent/40 text-iron-accent">
          ข้ามไปท่าถัดไป
        </button>
      </Panel>

      <BottomNav />
    </AppShell>
  );
}
