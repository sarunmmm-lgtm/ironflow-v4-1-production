import type { Exercise } from "@/types";

export function ExerciseRow({
  exercise,
  index,
  selected,
  onClick,
}: {
  exercise: Exercise;
  index: number;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`mb-2.5 grid w-full grid-cols-[72px_1fr_auto] items-center gap-3 rounded-3xl border p-2.5 text-left ${
        selected ? "border-iron-accent/70 bg-iron-accent/10" : "border-white/[.08] bg-white/[.045]"
      }`}
    >
      <img src={exercise.image} alt="" className="h-[62px] w-[72px] rounded-[18px] object-cover" />
      <div>
        <strong className="block font-bold">
          {index + 1}. {exercise.name}
        </strong>
        <small className="text-iron-muted">
          {exercise.bodyPart} · {exercise.defaultSets} เซ็ต · {exercise.reps}
        </small>
      </div>
      {selected ? (
        <div className="grid h-8 w-8 place-items-center rounded-full bg-iron-accent font-black text-[#071004]">✓</div>
      ) : (
        <span className="rounded-full border border-iron-accent/20 bg-iron-accent/10 px-2.5 py-1.5 text-xs font-bold text-iron-accent">
          +
        </span>
      )}
    </button>
  );
}
