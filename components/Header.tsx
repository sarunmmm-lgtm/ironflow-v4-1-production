export function Header({ title, subtitle }: { title?: string; subtitle?: string }) {
  return (
    <div className="mb-[18px] flex items-center justify-between">
      {title ? (
        <div>
          <div className="text-[22px] font-black tracking-[-.8px]">{title}</div>
          <div className="text-xs font-medium text-iron-muted">{subtitle || "IRONFLOW"}</div>
        </div>
      ) : (
        <div className="flex items-center gap-2.5">
          <div className="grid h-[42px] w-[42px] place-items-center rounded-2xl bg-gradient-to-br from-iron-accent to-iron-accent2 text-[#071004] shadow-glow">
            ⚡
          </div>
          <div>
            <div className="text-2xl font-black leading-none tracking-[-.8px]">
              IRON<span className="text-iron-accent">FLOW</span>
            </div>
            <div className="text-xs font-medium text-iron-muted">manual workout planner</div>
          </div>
        </div>
      )}
    </div>
  );
}
