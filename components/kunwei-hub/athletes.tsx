'use client'

import { ArrowLeft, ChevronRight, Search, UserRound } from 'lucide-react'
import { MetricCard, StatusBadge } from './shared'
import { statusMap, type SetView } from './types'
import { athleteService, resultService, testSessionService, protocolService } from '@/lib/services'
import { useState } from 'react'

export function AthletesFeature({ setView }: { setView: SetView }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const athleteRecords = athleteService.listSync()
  const filtered = athleteRecords.filter(athlete => athlete.name.toLowerCase().includes(query.toLowerCase()))
  const selected = selectedId ? athleteService.getSync(selectedId) : null
  if (selected) return <AthleteProfile athleteId={selected.id} onBack={() => setSelectedId(null)} setView={setView} />
  return <div className="content"><div className="page-actions"><div><div className="eyebrow">ATHLETE DIRECTORY</div><h2>运动员</h2><p>统一查看跨项目表现与纵向测试历史</p></div><button className="secondary-button" onClick={() => setView('sessions')}>查看测试会话 <ChevronRight size={16} /></button></div><section className="panel table-panel"><div className="table-toolbar"><label className="table-search"><Search size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索姓名或 ID" /></label></div><div className="table-scroll"><table><thead><tr><th>运动员</th><th>团队</th><th>位置</th><th>最近测试</th><th>状态</th><th /></tr></thead><tbody>{filtered.map(athlete => <tr key={athlete.id} className="clickable-row" onClick={() => setSelectedId(athlete.id)}><td><div className="table-athlete"><div className="athlete-avatar">{athlete.initials}</div><div><strong>{athlete.name}</strong><span>{athlete.id}</span></div></div></td><td>{athlete.team}</td><td>{athlete.position}</td><td>{athlete.lastTestAt}</td><td><StatusBadge status={athlete.status as keyof typeof statusMap} /></td><td><ChevronRight size={16} className="muted-icon" /></td></tr>)}</tbody></table></div></section></div>
}

function AthleteProfile({ athleteId, onBack, setView }: { athleteId: string; onBack: () => void; setView: SetView }) {
  const profile = athleteService.profileSync(athleteId)
  const athlete = profile?.athlete ?? athleteService.getSync(athleteId)!
  const timeline = profile?.timeline ?? testSessionService.listSync().filter(session => session.athleteId === athleteId)
  return <div className="content"><button className="back-link" onClick={onBack}><ArrowLeft size={15} />返回运动员</button><div className="page-actions"><div><div className="eyebrow">ATHLETE PROFILE</div><h2>{athlete.name}</h2><p>{athlete.team} · {athlete.position} · ID {athlete.id}</p></div><button className="secondary-button" onClick={() => setView('sessions')}>查看测试会话 <ChevronRight size={16} /></button></div><div className="metric-grid"><MetricCard label="最近 CMJ" value="52.4" trend="+5.2% vs 基线" icon={UserRound} /><MetricCard label="30m Sprint" value="4.21" unit="s" trend="最新有效结果" icon={ChevronRight} /><MetricCard label="测试会话" value={String(timeline.length)} trend="跨 3 个协议" icon={ChevronRight} /></div><section className="panel timeline-panel"><div className="panel-heading"><div><h3>测试时间线</h3><span>跨运动、设备与协议的统一历史</span></div></div><div className="audit-list">{timeline.length ? timeline.map(session => { const protocol = protocolService.getSync(session.protocolId); const result = resultService.getSync(session.id); return <button className="timeline-item clickable-row" key={session.id} onClick={() => setView('sessions')}><span className="audit-avatar">{protocol?.sport.slice(0, 2)}</span><div><strong>{session.protocolName}</strong><span>{session.startedAt} · {session.source}</span></div><b>{result?.primary.value ?? session.primaryResult} {result?.primary.unit}</b><ChevronRight size={16} /></button> }) : <p className="empty-copy">暂无测试记录</p>}</div></section></div>
}
