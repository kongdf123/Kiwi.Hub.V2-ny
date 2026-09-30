'use client'

import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { Logo } from './shared'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [notice, setNotice] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotice('演示模式：登录请求已提交')
  }

  return (
    <main className="login-page">
      <div className="login-glow login-glow-one" />
      <div className="login-glow login-glow-two" />
      <header className="login-header">
        <a className="login-brand" href="/" aria-label="返回 Kunwei Hub 首页"><Logo /><span><strong>KUNWEI</strong><small>PERFORMANCE HUB</small></span></a>
        <span className="login-header-note">面向高性能团队的数据基础设施</span>
      </header>
      <div className="login-layout">
        <section className="login-intro" aria-labelledby="login-title">
          <div className="login-kicker"><span className="live-dot" /> SECURE PERFORMANCE WORKSPACE</div>
          <h1 id="login-title">让每一次测试，<br /><em>都推动下一步表现。</em></h1>
          <p>连接运动员、测试协议和所有数据来源，在一个可信的工作区中持续理解团队表现。</p>
          <div className="login-proof"><div className="proof-icon"><ShieldCheck size={19} /></div><div><strong>企业级安全工作区</strong><span>数据加密传输 · 基于角色的访问控制</span></div></div>
        </section>
        <section className="login-card" aria-label="登录表单">
          <div className="login-card-heading"><div><span className="form-kicker">WELCOME BACK</span><h2>登录 Kunwei Hub</h2><p>使用你的工作邮箱继续</p></div><div className="login-card-mark"><LockKeyhole size={18} /></div></div>
          <form onSubmit={handleSubmit}>
            <label className="login-field"><span>工作邮箱</span><div className="input-wrap"><Mail size={17} /><input type="email" placeholder="name@company.com" autoComplete="email" required /></div></label>
            <label className="login-field"><span>密码</span><div className="input-wrap"><LockKeyhole size={17} /><input type={showPassword ? 'text' : 'password'} placeholder="输入你的密码" autoComplete="current-password" minLength={6} required /><button type="button" className="password-toggle" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? '隐藏密码' : '显示密码'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label>
            <div className="login-options"><label className="remember-option"><input type="checkbox" checked={remember} onChange={event => setRemember(event.target.checked)} /><span>记住我</span></label><a href="#forgot">忘记密码？</a></div>
            <button className="login-submit" type="submit">登录工作区 <ArrowRight size={17} /></button>
            {notice && <p className="login-notice" role="status">{notice}</p>}
          </form>
          <div className="login-divider"><span>或</span></div>
          <button className="sso-button" type="button" onClick={() => setNotice('演示模式：SSO 登录请求已提交')}>使用企业 SSO 登录</button>
          <p className="login-help">还没有工作区？<a href="#contact">联系你的管理员</a></p>
        </section>
      </div>
      <footer className="login-footer"><span>© 2026 Kunwei Performance Systems</span><span><a href="#status">系统状态</a><a href="#privacy">隐私与安全</a></span></footer>
    </main>
  )
}
