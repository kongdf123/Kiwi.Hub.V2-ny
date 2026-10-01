'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2, ClipboardCheck, FileUp, RefreshCw, ShieldCheck } from 'lucide-react'
import { protocolService, testSessionService } from '@/lib/services'
import type { SetView } from './types'

export function TestingFeature({ setView }: { setView: SetView }) {
  const protocols = protocolService.listSync()
  const sessions = testSessionService.listSync()
  const [protocolId, setProtocolId] = useState(protocols[0]?.id ?? 'cmj-v2')
  const [notice, setNotice] = useState('')
  const protocol = protocolService.getSync(protocolId) ?? protocols[0]
  const recentSession = sessions[0]

  if (!protocol) return null

  const receiveSession = () => {
    setNotice('已模拟接收客户端测量会话，进入验证队列')
    window.setTimeout(() => setNotice(''), 2400)
  }

  return <div className="content testing-content">
    <div className="testing-head"><div><div className="eyebrow">MEASUREMENT INGESTION</div><h2>接收测量会话</h2><p>测量在 KWinPerformance Desktop、iPad 或其他客户端完成后，由 KWinHub 接收并处理。</p></div><button className="quiet-button" onClick={() => setView('sessions')}>返回测试会话</button></div>
    {notice && <div className="toast-notice" role="status"><CheckCircle2 size={16} />{notice}</div>}
    <div className="testing-layout"><section className="panel test-card"><div className="test-card-head"><div><span className="protocol-kicker">INGESTION CONTRACT · {protocol.name} {protocol.version}</span><h3>客户端提交完成后的 Measurement Session</h3></div><span className="session-id">{recentSession?.status ?? 'RECEIVED'}</span></div><div className="selection-block"><label>选择协议定义以查看接收规则</label>{protocols.map(item => <button key={item.id} className={`selection-button ${item.id === protocol.id ? 'selected' : ''}`} onClick={() => setProtocolId(item.id)}><div className="protocol-icon"><ClipboardCheck size={19} /></div><div><strong>{item.name} · {item.version}</strong><span>{item.description} · {item.metrics.length} 个标准指标</span></div>{item.id === protocol.id && <span className="check">✓</span>}</button>)}<div className="ingestion-dropzone"><FileUp size={22} /><strong>提交已完成的会话包</strong><span>演示入口：客户端上传 metadata、trials 与 raw data 后返回 202 Accepted</span><button className="primary-button full-button" onClick={receiveSession}>模拟接收会话 <ArrowRight size={16} /></button></div></div></section><aside className="panel ingestion-status"><div className="panel-heading"><div><h3>Hub 处理管线</h3><span>客户端不在此处进行实时采集</span></div><RefreshCw size={17} /></div>{['RECEIVED', 'VALIDATING', 'PROCESSING', 'ANALYZED', 'PUBLISHED'].map((status, index) => <div className={`processing-step ${index === 0 ? 'active' : ''}`} key={status}><span className="processing-icon">{index === 0 ? <CheckCircle2 size={15} /> : index + 1}</span><div><strong>{status}</strong><span>{index === 0 ? '会话已进入 Hub' : index === 1 ? '校验协议版本与原始数据' : index === 2 ? '运行标准化处理规则' : index === 3 ? '生成指标与比较结果' : '结果可用于仪表盘与报告'}</span></div></div>)}<div className="api-security"><ShieldCheck size={16} /><span>保留原始数据，支持幂等上传与失败重试。</span></div></aside></div>
  </div>
}
