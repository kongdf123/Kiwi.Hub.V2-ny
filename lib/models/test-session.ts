export type SessionStatus = 'LOCAL' | 'QUEUED' | 'UPLOADING' | 'RECEIVED' | 'VALIDATING' | 'PROCESSING' | 'ANALYZED' | 'PUBLISHED' | 'UPLOAD_FAILED' | 'VALIDATION_FAILED' | 'PROCESSING_FAILED'

export type TestSession = {
  id: string
  athleteId: string
  athleteName: string
  protocolId: string
  protocolName: string
  source: string
  device: string
  status: SessionStatus
  trialCount: number
  startedAt: string
  completedAt?: string
  primaryResult: string
}

export type Trial = { id: string; sessionId: string; index: number; status: 'pending' | 'captured' | 'validated' | 'failed'; value?: string }
export type RawData = { id: string; sessionId: string; source: string; receivedAt: string; payloadType: string; size: string }
export type ProcessingState = { status: SessionStatus; startedAt?: string; completedAt?: string; error?: string }

export const sessionLifecycle: SessionStatus[] = ['LOCAL', 'QUEUED', 'UPLOADING', 'RECEIVED', 'VALIDATING', 'PROCESSING', 'ANALYZED', 'PUBLISHED']

export const sessionFailureStates: SessionStatus[] = ['UPLOAD_FAILED', 'VALIDATION_FAILED', 'PROCESSING_FAILED']
