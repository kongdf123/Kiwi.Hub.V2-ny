import type { LucideIcon } from 'lucide-react'
import { protocolDefinitions, athleteRecords, statusMap, mockServices, getProtocol, getSession, getResult, getAthlete, athleteTimeline, sessionRecords, results, statusLabels } from '@/lib/models/domain'

export const protocols = protocolDefinitions.map(protocol => ({
  sport: protocol.sport,
  category: protocol.category,
  name: protocol.name,
  description: protocol.description,
  source: protocol.source,
  metrics: protocol.metrics.map(metric => metric.label),
  icon: protocol.icon,
}))
export const athletes = athleteRecords.map(athlete => ({ ...athlete, last: athlete.lastTestAt, metric: athlete.name === 'Zhang Wei' ? '52.4 cm' : athlete.name === 'Li Ming' ? '2,980 N' : '48.1 cm', change: athlete.name === 'Zhang Wei' ? '-12.4%' : '+4.8%' }))
export type Protocol = { sport: string; category: string; name: string; description: string; source: string; metrics: string[]; icon: LucideIcon }
export type Athlete = (typeof athletes)[number]
export type Status = 'normal' | 'warning' | 'attention' | 'offline'
export type View = 'home' | 'athletes' | 'testing' | 'library' | 'dashboard' | 'reports' | 'management' | 'users' | 'sessions' | 'sources' | 'sync' | 'api'
export type SetView = (view: View) => void
export { protocolDefinitions, athleteRecords, sessionRecords, results, statusLabels, statusMap, mockServices, getProtocol, getSession, getResult, getAthlete, athleteTimeline }
export type { ProtocolDefinition, TestSession, Result, SessionStatus, ProtocolInput, MetricDefinition, MockServices } from '@/lib/models/domain'
