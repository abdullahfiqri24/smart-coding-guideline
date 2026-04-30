import Icon from './Icon'

const Sidebar = ({ active, onNav, user }) => {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'guideline', label: 'Smart Guideline', icon: 'guideline' },
    { id: 'laporan', label: 'Laporan', icon: 'report' },
    { id: 'pengaturan', label: 'Pengaturan', icon: 'settings' },
  ]

  const initials = user.name
    .split(' ')
    .filter((_, i) => i < 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()

  return (
    <aside className="sidebar">
      <div className="brand">
        <img
          src="/logo-rs-yarsi.png"
          alt="RS YARSI"
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            objectFit: 'cover',
            background: '#fff',
            flexShrink: 0,
          }}
        />
        <div>
          <div className="brand-name">YARSI</div>
          <div className="brand-sub">Hospital · Syariah</div>
        </div>
      </div>

      <div className="user-card">
        <div className="user-avatar">{initials}</div>
        <div>
          <div className="user-name">{user.name}</div>
          <div className="user-role">{user.role}</div>
        </div>
      </div>

      <nav className="nav">
        <div className="nav-label">Menu</div>
        {items.map((it) => (
          <button
            key={it.id}
            className={`nav-item ${active === it.id ? 'active' : ''}`}
            onClick={() => onNav(it.id)}
          >
            <span className="nav-icon">
              <Icon name={it.icon} size={17} />
            </span>
            {it.label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button
          className="nav-item"
          onClick={() => onNav('logout')}
          style={{ marginBottom: 12 }}
        >
          <span className="nav-icon">
            <Icon name="logout" size={17} />
          </span>
          Logout
        </button>
      </nav>

      <div className="sidebar-foot">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="foot-pill">
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--gold)',
              }}
            />
            Smart · Valid · Syariah
          </span>
          <div style={{ marginTop: 6 }}>v1.2.0</div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
