'use client'

import { Activity } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { statusMap, type Status } from './types'

export function Logo() {
  return <div className="brand-mark"><span /><span /><span /></div>
}

export function StatusBadge({ status }: { status: Status }) {
  const item = statusMap[status]
  return <span className={`status-badge ${item.className}`}><span className="status-dot" />{item.label}</span>
}

export function MetricCard({ label, value, unit, trend, trendClass = 'up', icon: Icon }: { label: string; value: string; unit?: string; trend: string; trendClass?: string; icon: LucideIcon }) {
  return <article className="metric-card"><div className="metric-top"><span>{label}</span><div className="metric-icon"><Icon size={16} /></div></div><div className="metric-value">{value}<small>{unit}</small></div><div className={`metric-trend ${trendClass}`}>{trend}</div></article>
}

export function TrendChart({ compact = false }: { compact?: boolean }) {
  return <div className={`trend-chart ${compact ? 'compact' : ''}`}><div className="chart-grid"><svg viewBox="0 0 700 190" preserveAspectRatio="none" role="img" aria-label="CMJ 跳高趋势图"><path d="M0 150 C45 132, 70 145, 110 118 S175 125, 210 105 S265 117, 300 88 S360 105, 400 94 S450 75, 495 82 S540 60, 580 68 S630 48, 700 42" fill="none" stroke="#1d8a78" strokeWidth="3" /><path d="M0 150 C45 132, 70 145, 110 118 S175 125, 210 105 S265 117, 300 88 S360 105, 400 94 S450 75, 495 82 S540 60, 580 68 S630 48, 700 42 L700 190 L0 190Z" fill="url(#area)" opacity=".28" /><defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#1d8a78" /><stop offset="1" stopColor="#1d8a78" stopOpacity="0" /></linearGradient></defs></svg></div>{!compact && <div className="chart-labels"><span>01 Sep</span><span>08 Sep</span><span>15 Sep</span><span>22 Sep</span><span>29 Sep</span></div>}</div>
}

export function AttentionRow({ athlete, metric, detail, status }: { athlete: string; metric: string; detail: string; status: 'attention' | 'warning' }) {
  return <div className="attention-row"><div className="athlete-avatar">{athlete.split(' ').map(v => v[0]).join('')}</div><div className="row-main"><strong>{athlete}</strong><span>{metric}</span></div><div className="row-detail">{detail}</div><StatusBadge status={status} /><span className="muted-icon">›</span></div>
}

export function RecentRow({ time, name, test, result }: { time: string; name: string; test: string; result: string }) {
  return <div className="recent-row"><span className="time">{time}</span><strong>{name}</strong><span className="test-pill">{test}</span><span className="result">{result}</span><span className="muted-icon">›</span></div>
}

export const EmptyIcon = Activity
