import type { LucideIcon } from 'lucide-react'

export type ProtocolInput = 'force-time' | 'timing' | 'manual-attempt'
export type MetricDefinition = { key: string; label: string; unit: string; format?: string }

export type TestProtocol = {
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
  validation: string[]
  processing: string[]
  visualization: string[]
  comparison: string[]
  report: string[]
  icon: LucideIcon
}

export type ProtocolDefinition = TestProtocol
export type ProtocolStatus = 'active' | 'draft' | 'archived'
export type ProtocolCatalogItem = TestProtocol & { status: ProtocolStatus }

export type ProtocolWorkflow = {
  protocolId: string
  steps: string[]
  inputLabels: string[]
}

export const protocolWorkflows: Record<string, ProtocolWorkflow> = {
  cmj: { protocolId: 'cmj-v2', steps: ['选择运动员', '选择协议', '连接设备', '试跳 1', '试跳 2', '试跳 3', '查看结果'], inputLabels: ['Force Plate', 'Trial 1', 'Trial 2', 'Trial 3'] },
  'sprint-30m': { protocolId: 'sprint-30-v1', steps: ['选择运动员', '选择协议', '连接计时设备', 'Start', '5m', '10m', '20m', '30m', '查看结果'], inputLabels: ['Start', '5m', '10m', '20m', '30m'] },
  'high-jump': { protocolId: 'high-jump-v1', steps: ['选择运动员', '选择协议', '记录尝试', 'Attempt 1', 'Attempt 2', 'Attempt 3', '查看结果'], inputLabels: ['Height', 'Success / Failure'] },
}

export function getProtocolWorkflow(protocol: Pick<TestProtocol, 'key'>) {
  return protocolWorkflows[protocol.key] ?? protocolWorkflows.cmj
}

export function protocolToResultLabels(protocol: Pick<TestProtocol, 'metrics'>) {
  return protocol.metrics.map(metric => metric.label)
}

export function createProtocolDefinition(input: Omit<TestProtocol, 'icon'> & { icon: LucideIcon }): TestProtocol {
  return { ...input }
}

export const protocolLifecycle = ['LOCAL', 'QUEUED', 'UPLOADING', 'RECEIVED', 'VALIDATING', 'PROCESSING', 'ANALYZED', 'PUBLISHED'] as const

export type ProtocolLifecycleState = typeof protocolLifecycle[number]
