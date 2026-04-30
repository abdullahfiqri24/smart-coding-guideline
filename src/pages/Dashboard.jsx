import Icon from '../components/Icon'

const Dashboard = () => {
  const donut = [
    { label: 'Severity Level 1', value: 82, color: '#5b0202' },
    { label: 'Severity Level 2', value: 14, color: '#daa520' },
    { label: 'Severity Level 3', value: 4, color: '#080808' },
  ]
  let acc = 0
  const segs = donut.map((d) => {
    const start = acc
    acc += d.value
    return { ...d, start, end: acc }
  })
  const arc = (start, end, r = 42) => {
    const a1 = (start / 100) * Math.PI * 2 - Math.PI / 2
    const a2 = (end / 100) * Math.PI * 2 - Math.PI / 2
    const x1 = 60 + r * Math.cos(a1)
    const y1 = 60 + r * Math.sin(a1)
    const x2 = 60 + r * Math.cos(a2)
    const y2 = 60 + r * Math.sin(a2)
    const large = end - start > 50 ? 1 : 0
    return `M 60 60 L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`
  }

  const trend = [
    { m: 'Des', v1: 78, v2: 16, v3: 6 },
    { m: 'Jan', v1: 80, v2: 15, v3: 5 },
    { m: 'Feb', v1: 79, v2: 17, v3: 4 },
    { m: 'Mar', v1: 83, v2: 13, v3: 4 },
    { m: 'Apr', v1: 82, v2: 14, v3: 4 },
    { m: 'Mei', v1: 82, v2: 14, v3: 4 },
  ]

  return (
    <div className="fade-in">
      <div className="kpi-grid">
        <div className="kpi">
          <div className="kpi-label">Pasien Hari Ini</div>
          <div className="kpi-value">12</div>
          <div className="kpi-sub">5 baru · 7 follow-up</div>
          <div className="kpi-icon"><Icon name="user" size={18} /></div>
          <span className="kpi-trend up">▲ 8% vs kemarin</span>
        </div>
        <div className="kpi">
          <div className="kpi-label">Dokumentasi Lengkap</div>
          <div className="kpi-value">
            8{' '}
            <span style={{ fontSize: 18, color: 'var(--muted)', fontWeight: 400 }}>/ 12</span>
          </div>
          <div className="kpi-sub">66.7% akurasi koding</div>
          <div className="kpi-icon" style={{ background: 'var(--ok-soft)', color: 'var(--ok)' }}>
            <Icon name="check" size={18} />
          </div>
          <span className="kpi-trend up">▲ 4 dari minggu lalu</span>
        </div>
        <div className="kpi">
          <div className="kpi-label">Perlu Dilengkapi</div>
          <div className="kpi-value">4</div>
          <div className="kpi-sub">Belum memenuhi kriteria objektif</div>
          <div className="kpi-icon" style={{ background: 'var(--warn-soft)', color: 'var(--warn)' }}>
            <Icon name="alert" size={18} />
          </div>
          <span className="kpi-trend flat">● Perlu tindak lanjut</span>
        </div>
        <div className="kpi">
          <div className="kpi-label">Status Validasi</div>
          <div className="kpi-value" style={{ color: 'var(--primary)' }}>VALID</div>
          <div className="kpi-sub">Anti fraud · maysir · gharar</div>
          <div className="kpi-icon" style={{ background: 'var(--primary-50)', color: 'var(--primary)' }}>
            <Icon name="shield" size={18} />
          </div>
          <span className="kpi-trend up">▲ 12 klaim siap</span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 16,
          marginTop: 20,
        }}
      >
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Distribusi Severity Level (2025)</div>
              <div className="card-sub">Data rawat inap BPJS · RS YARSI</div>
            </div>
            <span className="pill gold">YTD</span>
          </div>
          <div
            className="card-pad"
            style={{
              display: 'grid',
              gridTemplateColumns: '180px 1fr',
              gap: 24,
              alignItems: 'center',
            }}
          >
            <svg viewBox="0 0 120 120" width="180" height="180">
              {segs.map((s, i) => (
                <path
                  key={i}
                  d={arc(s.start, s.end)}
                  fill={s.color}
                  stroke="#fff"
                  strokeWidth="1"
                />
              ))}
              <circle cx="60" cy="60" r="26" fill="#fff" />
              <text
                x="60"
                y="58"
                textAnchor="middle"
                fontFamily="Playfair Display, Georgia"
                fontSize="20"
                fontWeight="600"
                fill="#080808"
              >
                82%
              </text>
              <text
                x="60"
                y="73"
                textAnchor="middle"
                fontSize="8"
                fill="#6b6660"
                letterSpacing="1.5"
              >
                LEVEL 1
              </text>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {donut.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{ width: 12, height: 12, borderRadius: 3, background: d.color }}
                  />
                  <div style={{ flex: 1, fontSize: 13, color: 'var(--ink-2)' }}>{d.label}</div>
                  <div
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--ink)',
                    }}
                  >
                    {d.value}%
                  </div>
                </div>
              ))}
              <div className="divider" style={{ margin: '4px 0' }} />
              <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>
                Dominasi{' '}
                <strong style={{ color: 'var(--primary)' }}>Level 1</strong> mengindikasikan
                potensi gap antara kondisi klinis dan dokumentasi.
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div className="card-title">Pengingat DPJP</div>
            <span className="pill ink">3</span>
          </div>
          <div className="card-pad" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              {
                ic: 'shield',
                t: 'Pastikan dokumentasi sesuai evidence',
                d: 'Kriteria objektif harus terpenuhi minimal 2.',
              },
              {
                ic: 'clipboard',
                t: 'Lengkapi komorbid dan komplikasi',
                d: 'Cantumkan diagnosis sekunder bila ada.',
              },
              {
                ic: 'check',
                t: 'Validasi sebelum coding',
                d: 'Tinjau checklist di tahap akhir.',
              },
            ].map((r, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: 12,
                  background: 'var(--bg)',
                  borderRadius: 10,
                  border: '1px solid var(--line)',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: 'var(--gold-50)',
                    color: 'var(--primary)',
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon name={r.ic} size={16} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{r.t}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{r.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <div className="card-head">
          <div>
            <div className="card-title">Tren Severity 6 Bulan Terakhir</div>
            <div className="card-sub">Persentase distribusi per bulan</div>
          </div>
          <div style={{ display: 'flex', gap: 14, fontSize: 11, color: 'var(--muted)' }}>
            {[
              { color: '#5b0202', label: 'Level 1' },
              { color: '#daa520', label: 'Level 2' },
              { color: '#080808', label: 'Level 3' },
            ].map((l, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{ width: 10, height: 10, background: l.color, borderRadius: 2 }}
                />
                {l.label}
              </span>
            ))}
          </div>
        </div>
        <div className="card-pad">
          <svg viewBox="0 0 720 220" width="100%" height="220">
            {[0, 25, 50, 75, 100].map((v, i) => (
              <g key={i}>
                <line
                  x1="50"
                  x2="700"
                  y1={200 - v * 1.6}
                  y2={200 - v * 1.6}
                  stroke="#ebe7e1"
                  strokeDasharray="3 4"
                />
                <text x="42" y={204 - v * 1.6} textAnchor="end" fontSize="10" fill="#9a948c">
                  {v}%
                </text>
              </g>
            ))}
            {trend.map((t, i) => {
              const x = 80 + i * 110
              return (
                <g key={i}>
                  <rect
                    x={x - 22}
                    y={200 - t.v1 * 1.6}
                    width="14"
                    height={t.v1 * 1.6}
                    fill="#5b0202"
                    rx="2"
                  />
                  <rect
                    x={x - 6}
                    y={200 - t.v2 * 1.6}
                    width="14"
                    height={t.v2 * 1.6}
                    fill="#daa520"
                    rx="2"
                  />
                  <rect
                    x={x + 10}
                    y={200 - t.v3 * 1.6}
                    width="14"
                    height={t.v3 * 1.6}
                    fill="#080808"
                    rx="2"
                  />
                  <text
                    x={x}
                    y="216"
                    textAnchor="middle"
                    fontSize="11"
                    fill="#6b6660"
                    fontWeight="500"
                  >
                    {t.m}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
