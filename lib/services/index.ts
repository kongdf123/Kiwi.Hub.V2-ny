import { athleteRecords, athleteTimeline, getAthlete, getProtocol, getResult, getSession, protocolDefinitions, results, sessionRecords, mockServices as legacyServices } from '@/lib/models/domain'
import type { ReportRequest } from '@/lib/models/result'
import type { DataSource, Integration } from '@/lib/models/device'

export const athleteService = {
  list: async () => athleteRecords,
  get: async (id: string) => getAthlete(id),
  profile: async (id: string) => {
    const athlete = getAthlete(id)
    return athlete ? { ...athlete, timeline: athleteTimeline(id) } : undefined
  },
}

export const protocolService = {
  list: async () => protocolDefinitions,
  get: async (id: string) => getProtocol(id),
}

export const testSessionService = {
  list: async () => sessionRecords,
  get: async (id: string) => getSession(id),
  create: async (session: (typeof sessionRecords)[number]) => session,
}

export const resultService = {
  get: async (sessionId: string) => getResult(sessionId),
  forProtocol: async (sessionId: string) => getResult(sessionId),
}

export const reportService = {
  generate: async (request: ReportRequest) => ({ id: `report-${Date.now()}`, status: 'ready' as const, request }),
}

export const syncService = {
  list: async () => sessionRecords.map(session => ({ sessionId: session.id, status: session.status, receivedAt: session.startedAt, retryCount: session.status.includes('FAILED') ? 1 : 0 })),
  retry: async (sessionId: string) => ({ sessionId, status: 'QUEUED' as const }),
}

export const dataSourceService = {
  list: async (): Promise<DataSource[]> => [
    { id: 'app-sprint', name: 'Kunwei Sprint', kind: 'application', status: 'connected', lastSync: '刚刚', version: 'v2.4.1', dataTypes: ['Timing data', 'Sessions'], sessions: 48, errors: 0 },
    { id: 'device-fp', name: 'KW-FP-00124', kind: 'device', status: 'connected', lastSync: '2 分钟前', version: 'v1.8.0', dataTypes: ['Force-time data'], sessions: 32, errors: 1 },
    { id: 'partner-api', name: 'Athlete Management System', kind: 'integration', status: 'connected', lastSync: '5 分钟前', version: 'API v1', dataTypes: ['Athletes', 'Teams'], sessions: 0, errors: 0 },
    { id: 'csv-import', name: 'CSV Import', kind: 'import', status: 'degraded', lastSync: '昨天', version: '—', dataTypes: ['Historical results'], sessions: 12, errors: 2 },
  ],
}

export const integrationService = {
  list: async (): Promise<Integration[]> => [
    { id: 'oauth', name: 'Partner API', provider: 'Kunwei API', authMethod: 'oauth', status: 'connected' },
    { id: 'ams', name: 'Athlete Management System', provider: 'AMS', authMethod: 'machine-to-machine', status: 'connected' },
  ],
}

export const services = { athleteService, protocolService, testSessionService, resultService, reportService, syncService, dataSourceService, integrationService }
export const mockServices = legacyServices
export type MockServices = typeof services

export { results }
