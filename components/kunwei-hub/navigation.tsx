'use client'

import { BarChart3, Bell, CircleHelp, ClipboardList, Code2, Database, ChevronDown, ChevronRight, FileText, Layers3, LayoutDashboard, MoreHorizontal, RefreshCw, Search, Settings2, Users, Wifi } from 'lucide-react'
import { Logo } from './shared'
import type { View } from './types'

export function Sidebar({ view, setView }: { view: View; setView: (view: View) => void }) {
  const primary = [
    { id: 'home' as View, label: '首页', icon: LayoutDashboard },
    { id: 'sessions' as View, label: '测试会话', icon: ClipboardList },
    { id: 'library' as View, label: '测试协议库', icon: Layers3 },
    { id: 'athletes' as View, label: '运动员', icon: Users },
    { id: 'dashboard' as View, label: '分析仪表盘', icon: BarChart3 },
    { id: 'reports' as View, label: '报告', icon: FileText },
    { id: 'sync' as View, label: '同步中心', icon: RefreshCw },
    { id: 'sources' as View, label: '数据源', icon: Database },
    { id: 'api' as View, label: 'API 集成', icon: Code2 },
  ]
  return <aside className="sidebar">
    <div className="brand"><Logo /><div><strong>KUNWEI</strong><small>PERFORMANCE HUB</small></div></div>
    <div className="org-switcher"><div className="org-avatar">KP</div><div><strong>Kunwei Performance</strong><span>Senior Men's Team</span></div><ChevronDown size={15} /></div>
    <nav className="nav-list" aria-label="主导航"><span className="nav-label">工作区</span>{primary.map(item => <button key={item.id} onClick={() => setView(item.id)} className={`nav-item ${view === item.id ? 'active' : ''}`}><item.icon size={18} /><span>{item.label}</span>{item.id === 'athletes' && <em>32</em>}</button>)}<span className="nav-label management-label">管理</span><button onClick={() => setView('management')} className={`nav-item ${view === 'management' ? 'active' : ''}`}><Settings2 size={18} /><span>管理中心</span><ChevronRight size={15} className="nav-chevron" /></button></nav>
    <div className="sidebar-bottom"><div className="sync-box"><Wifi size={15} /><div><strong>数据已同步</strong><span>刚刚更新</span></div></div><div className="profile"><div className="user-avatar">AC</div><div><strong>Alex Chen</strong><span>Performance Coach</span></div><MoreHorizontal size={16} /></div></div>
  </aside>
}

export function Topbar({ view }: { view: View }) {
  const titles: Record<View, [string, string]> = { home: ['首页', '中央数据平台概览'], athletes: ['运动员', '统一查看跨项目表现'], testing: ['采集入口', '选择运动员、协议与数据源，开始一次 Hub 测试'], library: ['测试协议库', 'Protocol-driven test library · 适配不同运动、数据结构与来源'], sessions: ['测试会话', '所有来源的原始数据、处理与分析状态'], dashboard: ['分析仪表盘', 'Senior Men\'s Team · 最近 30 天'], reports: ['报告', '生成和管理表现报告'], sync: ['同步中心', '追踪接收、验证、处理与发布'], sources: ['数据源', '管理客户端、设备与合作伙伴系统'], api: ['API 集成', '版本化 API 与事件通知'], management: ['管理中心', '组织、用户、设备与协议'] }
  return <header className="topbar"><div className="mobile-brand"><Logo /><strong>KUNWEI</strong></div><div className="page-heading"><h1>{titles[view][0]}</h1><span>{titles[view][1]}</span></div><div className="top-actions"><label className="global-search"><Search size={17} /><input placeholder="搜索运动员、测试..." aria-label="全局搜索" /></label><button className="icon-button" aria-label="通知"><Bell size={18} /><i /></button><button className="icon-button help" aria-label="帮助"><CircleHelp size={18} /></button><div className="top-user"><div className="user-avatar small">JW</div><ChevronDown size={14} /></div></div></header>
}
