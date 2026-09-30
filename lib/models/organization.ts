export type Organization = { id: string; name: string; slug: string; plan: 'starter' | 'professional' | 'enterprise'; timezone: string }
export type UserMembership = { userId: string; organizationId: string; role: 'owner' | 'admin' | 'coach' | 'analyst' | 'viewer'; dataScope: 'organization' | 'team' | 'assigned-athletes' }
export type Team = { id: string; organizationId: string; name: string; athleteCount: number }
