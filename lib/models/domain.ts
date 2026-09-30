import { Activity, Gauge, Layers3, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type SessionStatus = 'LOCAL' | 'QUEUED' | 'UPLOADING' | 'RECEIVED' | 'VALIDATING' | 'PROCESSING' | 'ANALYZED' | 'PUBLISHED' | 'VALIDATION_FAILED' | 'PROCESSING_FAILED'
export type ProtocolInput = 'force-time' | 'timing' | 'manual-attempt'

export type MetricDefinition = { key: string; label: string; unit: string; format?: string }
export type ProtocolDefinition = {
  id: string
  key: string
  name: string
  version: string
  sport: string
  category: string
  description: string
  input: ProtocolInput
  trials: number | 'variable'
  source: string
  metrics: MetricDefinition[]
  icon: LucideIcon
}
export type Athlete = { id: string; name: string; initials: string; team: string; position: string; status: 'normal' | 'warning' | 'attention'; birthYear: number; lastTestAt: string }
export type TestSession = { id: string; athleteId: string; athleteName: string; protocolId: string; protocolName: string; source: string; device: string; status: SessionStatus; trialCount: number; startedAt: string; completedAt?: string; primaryResult: string }
export type Result = { sessionId: string; primary: { label: string; value: string; unit: string }; metrics: Record<string, string>; analysis: string }
export type SyncJob = { sessionId: string; status: SessionStatus; receivedAt: string; retryCount: number; error?: string }

export const protocolDefinitions: ProtocolDefinition[] = [
  { id: 'cmj-v2', key: 'cmj', name: 'CMJ', version: 'v2.0', sport: 'JUMP', category: '跳跃', description: '反向跳跃 · Force-time signal', input: 'force-time', trials: 3, source: 'Kunwei Force Plate', metrics: [{ key: 'jumpHeight', label: 'Jump Height', unit: 'cm' }, { key: 'peakForce', label: 'Peak Force', unit: 'N' }, { key: 'peakPower', label: 'Peak Power', unit: 'W' }, { key: 'rsiMod', label: 'RSI-mod', unit: '' }, { key: 'asymmetry', label: 'Asymmetry', unit: '%' }], icon: Activity },
  { id: 'sprint-30-v1', key: 'sprint-30m', name: '30m Sprint', version: 'v1.2', sport: 'SPRINT', category: '短跑', description: '分段计时 · 5m / 10m / 20m / 30m', input: 'timing', trials: 3, source: 'Kunwei Sprint App', metrics: [{ key: 'reaction', label: 'Reaction Time', unit: 's' }, { key: 'split5', label: '5m Split', unit: 's' }, { key: 'split10', label: '10m Split', unit: 's' }, { key: 'split20', label: '20m Split', unit: 's' }, { key: 'split30', label: '30m Time', unit: 's' }, { key: 'maxVelocity', label: 'Max Velocity', unit: 'm/s' }], icon: Zap },
  { id: 'high-jump-v1', key: 'high-jump', name: 'High Jump', version: 'v1.0', sport: 'ATHLETICS', category: '田径', description: '多次尝试 · Success / failure', input: 'manual-attempt', trials: 'variable', source: 'Manual entry', metrics: [{ key: 'bestHeight', label: 'Best Height', unit: 'm' }, { key: 'attempts', label: 'Attempts', unit: '' }, { key: 'successRate', label: 'Success Rate', unit: '%' }], icon: Layers3 },
]

export const athleteRecords: Athlete[] = [
  { id: 'ath-zhang-wei', name: 'Zhang Wei', initials: 'ZW', team: "Senior Men's Team", position: 'Forward', status: 'attention', birthYear: 1998, lastTestAt: '今天 09:42' },
  { id: 'ath-li-ming', name: 'Li Ming', initials: 'LM', team: "Senior Men's Team", position: 'Midfielder', status: 'warning', birthYear: 1997, lastTestAt: '今天 09:37' },
  { id: 'ath-wang-hao', name: 'Wang Hao', initials: 'WH', team: "Senior Men's Team", position: 'Defender', status: 'normal', birthYear: 1999, lastTestAt: '今天 09:15' },
  { id: 'ath-chen-yu', name: 'Chen Yu', initials: 'CY', team: 'U21', position: 'Goalkeeper', status: 'normal', birthYear: 2003, lastTestAt: '昨天 16:20' },
]

export const sessionRecords: TestSession[] = [
  { id: 'KW-20260929-000123', athleteId: 'ath-zhang-wei', athleteName: 'Zhang Wei', protocolId: 'sprint-30-v1', protocolName: '30m Sprint v1.2', source: 'Kunwei Sprint App', device: 'TG-0021', status: 'PUBLISHED', trialCount: 3, startedAt: '2026-09-29 09:42', completedAt: '2026-09-29 09:46', primaryResult: '4.21 s' },
  { id: 'KW-20260929-000122', athleteId: 'ath-li-ming', athleteName: 'Li Ming', protocolId: 'cmj-v2', protocolName: 'CMJ v2.0', source: 'Kunwei Force Plate', device: 'FP-00124', status: 'PROCESSING', trialCount: 5, startedAt: '2026-09-29 09:37', primaryResult: '52.4 cm' },
  { id: 'KW-20260928-000121', athleteId: 'ath-wang-hao', athleteName: 'Wang Hao', protocolId: 'high-jump-v1', protocolName: 'High Jump v1.0', source: 'Manual entry', device: 'Manual', status: 'VALIDATION_FAILED', trialCount: 3, startedAt: '2026-09-28 15:04', primaryResult: '1.85 m' },
]

export const results: Result[] = [
  { sessionId: 'KW-20260929-000123', primary: { label: '30m Time', value: '4.21', unit: 's' }, metrics: { Reaction: '0.151 s', '5m Split': '1.21 s', '10m Split': '1.82 s', '20m Split': '2.93 s', 'Max Velocity': '8.42 m/s' }, analysis: '加速段表现稳定，20m 后速度提升明显。' },
  { sessionId: 'KW-20260929-000122', primary: { label: 'Jump Height', value: '52.4', unit: 'cm' }, metrics: { 'Peak Force': '2,134 N', 'Peak Power': '4,920 W', 'RSI-mod': '0.41', Asymmetry: '6.2%' }, analysis: '结果高于个人基线，左右侧差异仍在可接受范围。' },
]

export const statusLabels: Record<SessionStatus, string> = { LOCAL: '本地', QUEUED: '排队中', UPLOADING: '上传中', RECEIVED: '已接收', VALIDATING: '验证中', PROCESSING: '处理中', ANALYZED: '已分析', PUBLISHED: '已发布', VALIDATION_FAILED: '验证失败', PROCESSING_FAILED: '处理失败' }

export function getProtocol(id: string) { return protocolDefinitions.find(protocol => protocol.id === id) }
export function getSession(id: string) { return sessionRecords.find(session => session.id === id) }
export function getResult(sessionId: string) { return results.find(result => result.sessionId === sessionId) }
export function getAthlete(id: string) { return athleteRecords.find(athlete => athlete.id === id) }

export const athleteTimeline = (athleteId: string) => sessionRecords.filter(session => session.athleteId === athleteId)

export const mockServices = {
  athleteService: { list: async () => athleteRecords, get: async (id: string) => getAthlete(id) },
  protocolService: { list: async () => protocolDefinitions, get: async (id: string) => getProtocol(id) },
  testSessionService: { list: async () => sessionRecords, get: async (id: string) => getSession(id), create: async (session: TestSession) => session },
  resultService: { get: async (sessionId: string) => getResult(sessionId) },
  syncService: { list: async () => sessionRecords.map(session => ({ sessionId: session.id, status: session.status, receivedAt: session.startedAt, retryCount: session.status.includes('FAILED') ? 1 : 0 })) },
}
export type MockServices = typeof mockServices

export const protocols = protocolDefinitions
export const athletes = athleteRecords.map(athlete => ({ ...athlete, last: athlete.lastTestAt, metric: athlete.name === 'Zhang Wei' ? '52.4 cm' : athlete.name === 'Li Ming' ? '2,980 N' : '48.1 cm', change: athlete.name === 'Zhang Wei' ? '-12.4%' : '+4.8%' }))
export type Protocol = ProtocolDefinition
export type Status = Athlete['status']
export type View = 'home' | 'athletes' | 'testing' | 'library' | 'dashboard' | 'reports' | 'management' | 'users' | 'sessions' | 'sources' | 'sync' | 'api'
export type SetView = (view: View) => void
export const statusMap = { normal: { label: '正常', className: 'status-normal' }, warning: { label: '关注', className: 'status-warning' }, attention: { label: '需处理', className: 'status-attention' }, offline: { label: '离线', className: 'status-offline' } }
export type { LucideIcon }

export { Activity, Gauge, Layers3, Zap }
