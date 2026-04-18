import { cn } from "@/lib/utils"
import { StatBlock } from "@/components/ui/stat-block"

export interface StatItem {
  stat:          string
  label:         string
  description?:  string
}

export interface StatsGridProps {
  stats:     StatItem[]
  className?: string
}

/* ── Column count helpers ── */
const GRID_COLS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
}
const GRID_DIVIDERS: Record<number, string> = {
  2: "sm:divide-y-0 sm:divide-x",
  3: "sm:divide-y-0 sm:divide-x",
  4: "sm:divide-y-0 sm:divide-x",
}

export function StatsGrid({ stats, className }: StatsGridProps) {
  const cols    = Math.min(stats.length, 4)
  const colCls  = GRID_COLS[cols]  ?? "sm:grid-cols-3"
  const divCls  = GRID_DIVIDERS[cols] ?? "sm:divide-y-0 sm:divide-x"

  return (
    <div
      className={cn(
        "rounded-ar-lg border border-ar-border bg-ar-surface overflow-hidden",
        className
      )}
    >
      <div className={cn("grid grid-cols-1 divide-y divide-ar-border", colCls, divCls)}>
        {stats.map((s, i) => (
          <div key={i} className="flex items-center justify-center p-8">
            <StatBlock value={s.stat} label={s.label} description={s.description} align="center" />
          </div>
        ))}
      </div>
    </div>
  )
}
