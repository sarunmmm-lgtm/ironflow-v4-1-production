export function TimerRing({ secondsLeft, percent }: { secondsLeft: number; percent: number }) {
  return (
    <div
      className="mx-auto mb-4 grid h-[210px] w-[210px] place-items-center rounded-full shadow-[0_0_58px_rgba(167,255,26,.12)]"
      style={{ background: `conic-gradient(#A7FF1A ${percent}%, rgba(255,255,255,.10) 0)` }}
    >
      <div className="grid h-[184px] w-[184px] place-items-center rounded-full border border-white/[.08] bg-[radial-gradient(circle,rgba(167,255,26,.08),transparent_58%),#060906] text-center">
        <div>
          <div className="text-[13px] font-semibold text-white/70">เหลือเวลา</div>
          <div className="text-[52px] font-black leading-none tracking-[-1.8px]">{secondsLeft}</div>
          <div className="text-[13px] font-semibold text-white/70">วินาที</div>
        </div>
      </div>
    </div>
  );
}
