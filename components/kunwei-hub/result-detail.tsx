'use client'

import { ChevronRight, ShieldCheck } from 'lucide-react'
import type { ProtocolDefinition } from '@/lib/models/domain'
import { resultService } from '@/lib/services'
import { TrendChart } from './shared'

export function ResultDetail({ protocol, sessionId, onOpen }: { protocol: ProtocolDefinition; sessionId: string; onOpen: () => void }) {
  const result = resultService.forProtocolSync(sessionId, protocol.id)
  const primary = result?.primary ?? { label: protocol.metrics[0]?.label ?? 'Primary result', value: '—', unit: protocol.metrics[0]?.unit ?? '' }
  const metrics = result?.metrics ?? Object.fromEntries(protocol.metrics.slice(1).map(metric => [metric.label, `— ${metric.unit}`]))
  return <div className="result-preview"><div className="result-banner"><ShieldCheck size={18} /><span>测试完成 · 结果由 {protocol.name} 协议生成</span></div><div className="result-hero"><span className="protocol-kicker">{protocol.name} RESULT · {sessionId}</span><div><strong>{primary.value}</strong><span>{primary.unit}<br />{primary.label}</span></div></div><div className="result-metrics">{Object.entries(metrics).map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><TrendChart compact /><button className="primary-button full-button" onClick={onOpen}>打开完整结果 <ChevronRight size={16} /></button></div>
}
