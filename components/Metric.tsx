export function Metric({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="grid min-h-[85px] content-between rounded-[22px] border border-white/10 bg-white/[.05] p-3 backdrop-blur-xl">
      <span className="text-[21px] text-iron-accent">{icon}</span>
      <div>
        <strong className="block text-[22px] leading-none tracking-[-.4px]">{value}</strong>
        <span className="text-xs text-iron-muted">{label}</span>
      </div>
    </div>
  );
}
