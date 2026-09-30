import { Activity, Gauge, Layers3, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type View = 'home' | 'athletes' | 'testing' | 'library' | 'dashboard' | 'reports' | 'management' | 'users' | 'sessions' | 'sources' | 'sync' | 'api'
export type Status = 'normal' | 'warning' | 'attention' | 'offline'
export type Protocol = { sport: string; category: string; name: string; description: string; source: string; metrics: string[]; icon: LucideIcon }

export const protocols: Protocol[] = [
  { sport: 'JUMP', category: '跳跃', name: 'CMJ', description: '反向跳跃 · Force-time signal', source: 'Kunwei Force Plate', metrics: ['Jump Height', 'Peak Force', 'RSI-mod'], icon: Activity },
  { sport: 'SPRINT', category: '短跑', name: '30m Sprint', description: '分段计时 · 5m / 10m / 20m / 30m', source: 'Kunwei Sprint App', metrics: ['Max Velocity', 'Acceleration', '30m Time'], icon: Zap },
  { sport: 'SWIMMING', category: '游泳', name: '100m Freestyle', description: '泳道计时 · Split times', source: 'Partner Timing System', metrics: ['Reaction', '100m Time', 'Average Velocity'], icon: Activity },
  { sport: 'STRENGTH', category: '力量', name: 'IMTP', description: '等长中拉 · Force-time signal', source: 'Kunwei Force Plate', metrics: ['Peak Force', 'RFD', 'Impulse'], icon: Gauge },
  { sport: 'ATHLETICS', category: '田径', name: 'High Jump', description: '多次尝试 · Success / failure', source: 'Manual entry', metrics: ['Best Height', 'Attempts', 'Clearance Rate'], icon: Layers3 },
  { sport: 'JUMP', category: '跳跃', name: 'Long Jump', description: '助跑跳远 · Attempt data', source: 'Manual entry', metrics: ['Best Distance', 'Attempts', 'Personal Best'], icon: Activity },
]

export const athletes = [
  { name: 'Zhang Wei', initials: 'ZW', team: "Senior Men's Team", position: 'Forward', last: '今天 09:42', metric: '52.4 cm', status: 'attention' as Status, change: '-12.4%' },
  { name: 'Li Ming', initials: 'LM', team: "Senior Men's Team", position: 'Midfielder', last: '今天 09:37', metric: '2,980 N', status: 'warning' as Status, change: '13.2%' },
  { name: 'Wang Hao', initials: 'WH', team: "Senior Men's Team", position: 'Defender', last: '今天 09:15', metric: '48.1 cm', status: 'normal' as Status, change: '+4.8%' },
  { name: 'Chen Jie', initials: 'CJ', team: 'U21', position: 'Goalkeeper', last: '14 天前', metric: '—', status: 'attention' as Status, change: '未测试' },
  { name: 'Liu Yang', initials: 'LY', team: "Senior Men's Team", position: 'Forward', last: '昨天 16:20', metric: '51.2 cm', status: 'normal' as Status, change: '+2.1%' },
  { name: 'Zhao Rui', initials: 'ZR', team: 'U21', position: 'Midfielder', last: '昨天 15:04', metric: '46.8 cm', status: 'normal' as Status, change: '+6.7%' },
]

type StatusItem = { label: string; className: string }
export const statusMap: Record<Status, StatusItem> = {
  normal: { label: '正常', className: 'status-normal' }, warning: { label: '关注', className: 'status-warning' }, attention: { label: '需处理', className: 'status-attention' }, offline: { label: '离线', className: 'status-offline' },
}

export type SetView = (view: View) => void
