export type AthleteStatus = 'normal' | 'warning' | 'attention'

export type Athlete = {
  id: string
  name: string
  initials: string
  team: string
  position: string
  status: AthleteStatus
  birthYear: number
  lastTestAt: string
}

export type AthleteTimelineEntry = {
  sessionId: string
  protocolId: string
  protocolName: string
  occurredAt: string
  primaryResult: string
  unit: string
}

export type AthleteProfile = Athlete & {
  latestPerformance: Record<string, string>
  timeline: AthleteTimelineEntry[]
}
