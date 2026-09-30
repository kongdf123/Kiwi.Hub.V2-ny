'use client'

import { useState } from 'react'
import { Activity, ChevronRight, Gauge, Layers3, ShieldCheck, Users, Wifi, Zap } from 'lucide-react'
import { protocolService, athleteService } from '@/lib/services'
import type { SetView } from './types'
import { ResultDetail } from './result-detail'

export function TestingFeature({ setView }: { setView: SetView }) {
  const protocols = protocolService.listSync()
  const athletes = athleteService.listSync()
  const [step, setStep] = useState(1)
  const [protocolId, setProtocolId] = useState(protocols[0]?.id ?? 'cmj-v2')
  const [athleteId] = useState(athletes[0]?.id ?? 'ath-zhang-wei')
  const [captured, setCaptured] = useState(0)
  const protocol = protocolService.getSync(protocolId) ?? protocols[0]
  const athlete = athleteService.getSync(athleteId) ?? athletes[0]
  if (!protocol || !athlete) return null
  const Icon = protocol.icon
  const primary = protocol.metrics[0]
  return <div className="content testing-content"><div className="testing-head"><div><div className="eyebrow">NEW TEST SESSION</div><h2>开始一次测试</h2><p>会话将连接运动员、协议、数据源、设备、试次与处理结果。</p></div><button className="quiet-button">保存并退出</button></div><div className="stepper">{['选择运动员', '选择协议', '连接设备', '采集测试', '查看结果'].map((label, index) => <div key={label} className={`step ${index + 1 <= step ? 'done' : ''} ${index + 1 === step ? 'current' : ''}`}><span>{index + 1 < step ? '✓' : index + 1}</span><label>{label}</label></div>)}</div><div className="testing-layout"><section className="panel test-card"><div className="test-card-head"><div><span className="protocol-kicker">PROTOCOL · {protocol.name} {protocol.version}</span><h3>{protocol.description}</h3></div><span className="session-id">SESSION · NEW</span></div>{step === 1 && <div className="selection-block"><label>选择运动员</label><button className="selection-button"><div className="athlete-avatar">{athlete.initials}</div><div><strong>{athlete.name}</strong><span>{athlete.team} · {athlete.position}</span></div><ChevronRight size={17} /></button><button className="selection-button muted-selection"><Users size={19} /><div><strong>选择其他运动员</strong><span>从团队目录中选择</span></div><ChevronRight size={17} /></button><button className="primary-button full-button" onClick={() => setStep(2)}>继续 <ChevronRight size={16} /></button></div>}{step === 2 && <div className="selection-block"><label>选择测试协议</label>{protocols.map(item => { const ItemIcon = item.icon; return <button key={item.id} className={`selection-button ${item.id === protocol.id ? 'selected' : ''}`} onClick={() => setProtocolId(item.id)}><div className="protocol-icon"><ItemIcon size={19} /></div><div><strong>{item.name} · {item.version}</strong><span>{item.description} · {item.trials === 'variable' ? '可变试次' : `${item.trials} 次试次`}</span></div>{item.id === protocol.id ? <span className="check">✓</span> : <ChevronRight size={17} />}</button>})}<button className="primary-button full-button" onClick={() => setStep(3)}>继续 <ChevronRight size={16} /></button></div>}{step === 3 && <div className="selection-block"><label>连接测量设备</label><div className="device-status"><div className="device-orb"><Wifi size={25} /></div><div><strong>{protocol.source}</strong><span>已连接 · 设备数据将作为 Source 与 Device 写入会话</span></div><span className="status-badge status-normal">在线</span></div><button className="primary-button full-button" onClick={() => setStep(4)}>开始采集 <ChevronRight size={16} /></button></div>}{step === 4 && <div className="selection-block"><label>采集测试 · {protocol.name}</label><div className="trial-counter"><strong>{captured + 1}</strong><span>/ {protocol.trials === 'variable' ? '多次' : protocol.trials} trial</span></div><p className="capture-note">每次试次的 Raw Data 会先保存到 Test Session，再由协议处理器计算指标。</p><button className="primary-button full-button" onClick={() => { setCaptured(value => value + 1); if (protocol.trials !== 'variable' && captured + 1 >= protocol.trials) setStep(5) }}>记录 trial <ChevronRight size={16} /></button></div>}{step === 5 && <ResultDetail protocol={protocol} sessionId="KW-NEW-SESSION" onOpen={() => setView('sessions')} />}</section><aside className="panel test-summary"><span className="eyebrow">SESSION GRAPH</span><h3>统一会话对象</h3><p>Athlete + Protocol + Source + Device + Trials + Raw Data + Processing + Result + Sync</p><div className="summary-list"><span><Icon />{protocol.name}</span><span><Activity />{primary.label} · {primary.unit}</span><span><Gauge />{protocol.input}</span></div></aside></div></div>
}

export { Activity, Gauge, Layers3, Zap }
const _icons = { Activity, Gauge, Layers3, Zap }
void _icons
