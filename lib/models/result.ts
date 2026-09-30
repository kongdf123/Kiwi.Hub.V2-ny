export type Result = {
  sessionId: string
  primary: { label: string; value: string; unit: string }
  metrics: Record<string, string>
  analysis: string
  visualization?: { type: 'trend' | 'split' | 'attempts'; label: string; values: number[] }
  comparison?: { baseline: string; teamAverage: string; delta: string }
}

export type ReportScope = 'athlete' | 'team' | 'test' | 'performance-summary'
export type ReportRequest = { scope: ReportScope; athleteId?: string; protocolId?: string; metricKeys: string[]; timeRange: string }
