import type { AuditPillar } from '@/types/gbp'

/**
 * Single audit pillar card showing name, score bar, and detail bullets.
 */
export function PillarCard({ pillar }: { pillar: AuditPillar }) {
  const max = pillar.maxScore > 0 ? pillar.maxScore : 30
  const pct = Math.min(100, Math.max(0, Math.round((pillar.score / max) * 100)))
  const barColor =
    pct >= 70 ? 'bg-emerald-400' : pct >= 40 ? 'bg-primary-container' : 'bg-rose-400'

  return (
    <div className="p-4 sm:p-5 print:p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3 print:space-y-1.5 hover:bg-white/[0.05] transition-colors print-break-inside-avoid">
      <div className="flex items-center justify-between">
        <span className="font-heading text-xs print:text-[11px] font-bold uppercase tracking-wider text-on-surface/90">
          {pillar.name}
        </span>
        <span className="font-heading text-xs print:text-[11px] font-bold text-on-surface">
          {pillar.score}
          <span className="text-on-surface/40 font-normal">/{max}</span>
        </span>
      </div>

      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <ul className="space-y-1.5 print:space-y-1">
        {pillar.details.map((detail, i) => (
          <li key={i} className="flex items-start gap-2 text-[11px] print:text-[10px] text-on-surface/70 leading-relaxed print:leading-tight">
            <span className="mt-0.5 shrink-0 text-primary-container font-bold">›</span>
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
