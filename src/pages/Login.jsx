import { useState } from 'react'
import Icon from '../components/Icon'

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const DEMO_USERS = [
    { username: 'dpjp', password: 'yarsi123', name: 'dr. Ahmad Fauzi', role: 'DPJP · Internis' },
    { username: 'admin', password: 'admin123', name: 'Admin RS YARSI', role: 'Administrator' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!form.username || !form.password) {
      setError('Username dan password wajib diisi.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      const user = DEMO_USERS.find(
        (u) => u.username === form.username && u.password === form.password
      )
      if (user) {
        onLogin({ name: user.name, role: user.role })
      } else {
        setError('Username atau password salah.')
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div className="login-page">
      {/* Left panel */}
      <div className="login-left">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="brand" style={{ padding: 0, border: 'none', gap: 14 }}>
            <img
              src="/logo-rs-yarsi.png"
              alt="RS YARSI"
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                objectFit: 'cover',
                background: '#fff',
                flexShrink: 0,
              }}
            />
            <div>
              <div className="brand-name" style={{ fontSize: 22 }}>YARSI</div>
              <div className="brand-sub">Hospital · Syariah</div>
            </div>
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 36,
              fontWeight: 700,
              color: '#fff',
              letterSpacing: -0.5,
              lineHeight: 1.15,
              marginBottom: 16,
            }}
          >
            Smart Coding<br />Guideline
          </h1>
          <p
            style={{
              fontSize: 14,
              color: 'rgba(243,233,214,0.75)',
              lineHeight: 1.7,
              maxWidth: 340,
              marginBottom: 32,
            }}
          >
            Sistem dokumentasi klinis cerdas berbasis evidence-based guideline
            untuk mendukung koding INA-CBG yang valid, transparan, dan sesuai
            prinsip syariah.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: 'shield', t: 'Anti Fraud, Anti Maysir, Anti Gharar' },
              { icon: 'book', t: 'Evidence-Based Clinical Guideline' },
              { icon: 'chart', t: 'Monitoring & Laporan Real-time' },
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontSize: 13,
                  color: 'rgba(243,233,214,0.85)',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: 'rgba(218,165,32,0.15)',
                    color: 'var(--gold)',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon name={f.icon} size={15} />
                </div>
                {f.t}
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 11.5, color: 'rgba(243,233,214,0.4)', letterSpacing: 0.5 }}>
            © 2025 RS YARSI · Sistem Smart Coding v1.2.0
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="login-right">
        <div className="login-form-wrap fade-in">
          <div style={{ marginBottom: 32 }}>
            <h2
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: 28,
                fontWeight: 600,
                color: 'var(--ink)',
                letterSpacing: -0.3,
                marginBottom: 6,
              }}
            >
              Selamat Datang
            </h2>
            <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.5 }}>
              Masuk ke akun Anda untuk mengakses Smart Coding Guideline RS YARSI.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label className="label">Username</label>
              <div className="login-input-wrap">
                <input
                  className="input"
                  type="text"
                  placeholder="Masukkan username..."
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  autoComplete="username"
                  autoFocus
                />
                <span className="input-icon" style={{ pointerEvents: 'none' }}>
                  <Icon name="user" size={15} />
                </span>
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label className="label">Password</label>
              <div className="login-input-wrap">
                <input
                  className="input"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Masukkan password..."
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  autoComplete="current-password"
                />
                <span className="input-icon" style={{ pointerEvents: 'none' }}>
                  <Icon name="lock" size={15} />
                </span>
                <button
                  type="button"
                  className="toggle-pass"
                  onClick={() => setShowPass((v) => !v)}
                  tabIndex={-1}
                >
                  <Icon name={showPass ? 'eyeOff' : 'eye'} size={15} />
                </button>
              </div>
            </div>

            {error && (
              <div
                style={{
                  background: 'var(--bad-soft)',
                  border: '1px solid #f0caca',
                  color: 'var(--bad)',
                  borderRadius: 8,
                  padding: '10px 14px',
                  fontSize: 13,
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <Icon name="alert" size={14} />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', height: 44, fontSize: 14, justifyContent: 'center' }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: '#fff',
                      borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'spin 0.7s linear infinite',
                    }}
                  />
                  Memverifikasi...
                </>
              ) : (
                <>
                  Masuk
                  <Icon name="arrowRight" size={15} />
                </>
              )}
            </button>
          </form>

          <div className="divider" style={{ margin: '24px 0' }} />

          <div
            style={{
              background: 'var(--bg)',
              borderRadius: 10,
              padding: '12px 16px',
              fontSize: 12,
              color: 'var(--muted)',
            }}
          >
            <div style={{ fontWeight: 600, color: 'var(--ink-2)', marginBottom: 6 }}>
              Akun Demo:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--primary)', fontWeight: 600 }}>
                  dpjp
                </span>
                {' '}/ password:{' '}
                <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>yarsi123</span>
              </div>
              <div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--primary)', fontWeight: 600 }}>
                  admin
                </span>
                {' '}/ password:{' '}
                <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>admin123</span>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: 'var(--muted-2)' }}>
            © 2025 RS YARSI — Smart Coding Guideline v1.2.0
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Login
