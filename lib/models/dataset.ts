export type DataSourceKind = 'application' | 'device' | 'integration' | 'import'
export type DataQuality = 'complete' | 'warning' | 'invalid' | 'processing-error'

export type Dataset = {
  id: string
  sessionId?: string
  sourceId: string
  protocolId?: string
  name: string
  modality: 'force' | 'timing' | 'manual' | 'position' | 'video' | 'events'
  quality: DataQuality
  records: number
}

export type RawMeasurement = { id: string; datasetId: string; modality: Dataset['modality']; payloadRef: string; capturedAt: string }
export type ProcessedMeasurement = { id: string; rawMeasurementId: string; metricKey: string; value: number; unit: string }
export type CanonicalData = { datasetId: string; schemaVersion: string; measurements: RawMeasurement[]; processed: ProcessedMeasurement[] }

export type DataSource = { id: string; name: string; kind: DataSourceKind; status: 'connected' | 'degraded' | 'offline'; lastSync: string; version: string; dataTypes: string[]; sessions: number; errors: number }
export type DatasetStatus = 'LOCAL' | 'QUEUED' | 'UPLOADING' | 'RECEIVED' | 'VALIDATING' | 'PROCESSING' | 'ANALYZED' | 'PUBLISHED' | 'UPLOAD_FAILED' | 'VALIDATION_FAILED' | 'PROCESSING_FAILED'

export type DataPipeline = { source: string; adapter: string; canonical: string; measurement: string; metric: string; result: string }
export const canonicalPipeline: DataPipeline = { source: 'Data Source', adapter: 'Adapter', canonical: 'Canonical Data', measurement: 'Measurement', metric: 'Metric', result: 'Result' }

export type DashboardWidget = { id: string; type: 'metric' | 'trend' | 'distribution' | 'athlete-table' | 'attention' | 'comparison'; label: string; protocolId?: string; metricKey?: string; value: string; trend?: string }

export type ReportDefinition = { id: string; type: 'performance' | 'biomechanics' | 'functional' | 'research' | 'test'; scope: 'athlete' | 'team' | 'session'; subjects: string[]; protocolIds: string[]; metricKeys: string[]; timeRange: string; comparison: string }

export type AsyncIngestionResponse = { sessionId: string; status: 'RECEIVED'; statusUrl: string; retryAfter: number; idempotencyKey: string }

export const mockDashboardWidgets: DashboardWidget[] = [
  { id: 'widget-cmj', type: 'metric', label: 'CMJ 平均跳高', protocolId: 'cmj-v2', metricKey: 'jump-height', value: '48.2 cm', trend: '↑ 3.4% vs 上周期' },
  { id: 'widget-sprint', type: 'metric', label: '30m 最佳成绩', protocolId: 'sprint-30-v1', metricKey: '30m-split', value: '4.21 s', trend: '↑ 2.1% vs 上周期' },
  { id: 'widget-coverage', type: 'metric', label: '测试覆盖率', value: '87.5%', trend: '28 / 32 名运动员' },
  { id: 'widget-attention', type: 'attention', label: '需要关注', value: '3', trend: '基于个人基线与阈值' },
]

export const mockReportDefinition: ReportDefinition = { id: 'report-performance-001', type: 'performance', scope: 'athlete', subjects: ['ath-zhang-wei'], protocolIds: ['cmj-v2', 'sprint-30-v1', 'high-jump-v1'], metricKeys: ['jump-height', '30m-split', 'best-height'], timeRange: '最近 30 天', comparison: '个人基线 + 团队平均' }

export const mockIngestionResponse: AsyncIngestionResponse = { sessionId: 'ses-kw-20260929-000123', status: 'RECEIVED', statusUrl: '/api/v1/test-sessions/ses-kw-20260929-000123/status', retryAfter: 2, idempotencyKey: 'session-20260929-000123' }

export const datasetForSession = (sessionId: string): Dataset => ({ id: `dataset-${sessionId}`, sessionId, sourceId: 'device-fp', protocolId: 'cmj-v2', name: 'CMJ Force-Time Capture', modality: 'force', quality: 'complete', records: 18420 })

export const syncLifecycle: DatasetStatus[] = ['LOCAL', 'QUEUED', 'UPLOADING', 'RECEIVED', 'VALIDATING', 'PROCESSING', 'ANALYZED', 'PUBLISHED']
export const failureStates: DatasetStatus[] = ['UPLOAD_FAILED', 'VALIDATION_FAILED', 'PROCESSING_FAILED']

export const rawMeasurementForDataset = (datasetId: string): RawMeasurement => ({ id: `raw-${datasetId}`, datasetId, modality: 'force', payloadRef: 's3://kunwei/raw/force-time/…', capturedAt: '2026-09-29T09:42:04Z' })

export const canonicalDataForDataset = (datasetId: string): CanonicalData => ({ datasetId, schemaVersion: 'kw-canonical-1.0', measurements: [rawMeasurementForDataset(datasetId)], processed: [{ id: `processed-${datasetId}`, rawMeasurementId: `raw-${datasetId}`, metricKey: 'jump-height', value: 52.4, unit: 'cm' }] })
