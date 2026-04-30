import { useState } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import SmartGuideline from './pages/SmartGuideline'
import Laporan from './pages/Laporan'
import Pengaturan from './pages/Pengaturan'
import Sidebar from './components/Sidebar'
import Icon from './components/Icon'

const TITLES = {
  dashboard: { eyebrow: 'Smart Coding Guideline', h: 'Dashboard' },
  guideline: { eyebrow: 'Smart Coding Guideline', h: 'Smart Guideline' },
  laporan: { eyebrow: 'Smart Coding Guideline', h: 'Laporan' },
  pengaturan: { eyebrow: 'Smart Coding Guideline', h: 'Pengaturan' },
}

const App = () => {
  const [user, setUser] = useState(null)
  const [view, setView] = useState('guideline')
  const [toast, setToast] = useState(null)
  const [logoutOpen, setLogoutOpen] = useState(false)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2400)
  }

  const handleNav = (id) => {
    if (id === 'logout') {
      setLogoutOpen(true)
      return
    }
    setView(id)
  }

  const handleLogin = (userData) => {
    setUser(userData)
    setView('guideline')
  }

  const handleLogout = () => {
    setLogoutOpen(false)
    setUser(null)
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  const t = TITLES[view] || TITLES.dashboard

  const now = new Date()
  const dateStr = now.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const initials = user.name
    .split(' ')
    .filter((_, i) => i < 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <div className="app">
      <Sidebar active={view} onNav={handleNav} user={user} />

      <div className="main">
        <div className="topbar">
          <div className="topbar-title">
            <div className="topbar-eyebrow">{t.eyebrow}</div>
            <div className="topbar-h">{t.h}</div>
          </div>
          <div className="topbar-right">
            <input className="search" placeholder="Cari pasien, diagnosis…" />
            <button className="icon-btn">
              <Icon name="bell" size={16} />
              <span className="dot" />
            </button>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                paddingLeft: 14,
                borderLeft: '1px solid var(--line)',
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: 'var(--gold)',
                  display: 'grid',
                  placeItems: 'center',
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                {initials}
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.2 }}>
                <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{user.name}</div>
                <div style={{ color: 'var(--muted)' }}>{dateStr}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          {view === 'dashboard' && <Dashboard />}
          {view === 'guideline' && <SmartGuideline onToast={showToast} />}
          {view === 'laporan' && <Laporan onToast={showToast} />}
          {view === 'pengaturan' && <Pengaturan onToast={showToast} />}
        </div>
      </div>

      {toast && (
        <div className="toast">
          <Icon name="check" size={15} /> {toast}
        </div>
      )}

      {logoutOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(8,8,8,0.5)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 200,
          }}
        >
          <div className="card" style={{ width: 380, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'var(--primary-50)',
                  color: 'var(--primary)',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Icon name="logout" size={20} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'Playfair Display, Georgia',
                    fontSize: 18,
                    fontWeight: 600,
                    color: 'var(--ink)',
                  }}
                >
                  Konfirmasi Logout
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>
                  Anda akan keluar dari sesi saat ini
                </div>
              </div>
            </div>
            <div
              style={{
                fontSize: 13,
                color: 'var(--ink-2)',
                marginBottom: 18,
                lineHeight: 1.5,
              }}
            >
              Pastikan dokumentasi telah disimpan sebelum logout. Data yang belum tersimpan
              akan hilang.
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button className="btn btn-ghost" onClick={() => setLogoutOpen(false)}>
                Batal
              </button>
              <button className="btn btn-primary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
