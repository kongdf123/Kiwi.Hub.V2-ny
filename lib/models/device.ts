export type Device = { id: string; name: string; type: string; status: 'online' | 'offline' | 'warning'; version: string; organizationId: string }
export type DataSourceKind = 'application' | 'device' | 'integration' | 'import'
export type DataSource = { id: string; name: string; kind: DataSourceKind; status: 'connected' | 'degraded' | 'disconnected'; lastSync: string; version: string; dataTypes: string[]; sessions: number; errors: number }
export type Integration = { id: string; name: string; provider: string; authMethod: 'oauth' | 'api-key' | 'machine-to-machine'; status: 'connected' | 'pending' | 'error' }
export type SyncJob = { sessionId: string; status: string; receivedAt: string; retryCount: number; error?: string }
