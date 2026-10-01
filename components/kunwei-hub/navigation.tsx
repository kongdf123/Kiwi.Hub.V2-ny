'use client'

import { useEffect, useRef, useState } from 'react'
import { BarChart3, Bell, CircleHelp, ClipboardList, Code2, Database, ChevronDown, ChevronRight, FileText, FileUp, Layers3, LayoutDashboard, LogOut, MoreHorizontal, RefreshCw, Search, Settings2, Users, Wifi } from 'lucide-react'
import { Logo } from './shared'
import type { View } from './types'

export function Sidebar({ view, setView, onLogout }: { view: View; setView: (view: View) => void; onLogout: () => void }) {
  const primary = [
    { id: 'home' as View, label: '首页', icon: LayoutDashboard },
    { id: 'sessions' as View, label: '测试会话', icon: ClipboardList },
    { id: 'testing' as View, label: '数据接收', icon: FileUp },
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
    <div className="sidebar-bottom"><div className="sync-box"><Wifi size={15} /><div><strong>数据已同步</strong><span>刚刚更新</span></div></div><button className="profile profile-button" onClick={onLogout} aria-label="退出登录"><div className="user-avatar">AC</div><div><strong>Alex Chen</strong><span>Performance Coach</span></div><LogOut size={16} /></button></div>
  </aside>
}

export function Topbar({ view, onLogout }: { view: View; onLogout: () => void }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const titles: Record<View, [string, string]> = { home: ['首页', '中央数据平台概览'], athletes: ['运动员', '统一查看跨项目表现'], testing: ['数据接收', '接收客户端提交的测量会话并查看处理状态'], library: ['测试协议库', 'Protocol-driven test library · 适配不同运动、数据结构与来源'], sessions: ['测试会话', '所有来源的原始数据、处理与分析状态'], dashboard: ['分析仪表盘', 'Senior Men\'s Team · 最近 30 天'], reports: ['报告', '生成和管理表现报告'], sync: ['同步中心', '追踪接收、验证、处理与发布'], sources: ['数据源', '管理客户端、设备与合作伙伴系统'], api: ['API 集成', '版本化 API 与事件通知'], management: ['管理中心', '组织、用户、设备与协议'], users: ['用户与权限', '成员、角色与数据访问范围'] }

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', closeMenu)
    return () => document.removeEventListener('mousedown', closeMenu)
  }, [])

  return <header className="topbar"><div className="mobile-brand"><Logo /><strong>KUNWEI</strong></div><div className="page-heading"><h1>{titles[view][0]}</h1><span>{titles[view][1]}</span></div><div className="top-actions"><label className="global-search"><Search size={17} /><input placeholder="搜索运动员、测试..." aria-label="全局搜索" /></label><button className="icon-button" aria-label="通知"><Bell size={18} /><i /></button><button className="icon-button help" aria-label="帮助"><CircleHelp size={18} /></button><div className="user-menu" ref={userMenuRef}><button className={`top-user ${userMenuOpen ? 'open' : ''}`} onClick={() => setUserMenuOpen(open => !open)} aria-expanded={userMenuOpen} aria-haspopup="menu" aria-label="打开用户菜单"><div className="user-avatar small">AC</div><div><strong>Alex Chen</strong><span>Performance Coach</span></div><ChevronDown size={15} className="user-menu-chevron" /></button>{userMenuOpen && <div className="user-dropdown" role="menu"><div className="user-dropdown-header"><div className="user-avatar">AC</div><div><strong>Alex Chen</strong><span>Alex@kunwei.com</span></div></div><div className="user-dropdown-divider" /><button role="menuitem" onClick={() => setUserMenuOpen(false)}>个人资料</button><button role="menuitem" onClick={() => setUserMenuOpen(false)}>账户设置</button><div className="user-dropdown-divider" /><button role="menuitem" className="logout-item" onClick={onLogout}><LogOut size={15} />退出登录</button></div>}</div></div></header>
}
