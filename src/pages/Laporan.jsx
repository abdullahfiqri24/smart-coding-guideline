import { useState } from 'react'
import Icon from '../components/Icon'

const REPORT_DATA = [
  { tgl: '22/05/2025', rm: '12345678', nama: 'Ahmad Farhan', dx: 'Pneumonia, unspecified', icd: 'J18.9', sev: 2, status: 'Lengkap', dpjp: 'dr. Ahmad Fauzi', biaya: 8500000 },
  { tgl: '22/05/2025', rm: '67654321', nama: 'Siti Aminah', dx: 'CHF (Congestive Heart Failure)', icd: 'I50.9', sev: 3, status: 'Belum Lengkap', dpjp: 'dr. Sarah Hidayati', biaya: 12400000 },
  { tgl: '21/05/2025', rm: '55566677', nama: 'Budi Santoso', dx: 'DM tipe 2 dengan Komplikasi', icd: 'E11.9', sev: 2, status: 'Lengkap', dpjp: 'dr. Ahmad Fauzi', biaya: 6800000 },
  { tgl: '21/05/2025', rm: '11223344', nama: 'Rina Marlina', dx: 'Gastroenteritis Acute', icd: 'A09', sev: 1, status: 'Peringatan', dpjp: 'dr. Tania Putri', biaya: 3200000 },
  { tgl: '20/05/2025', rm: '99887766', nama: 'Joko Prasetyo', dx: 'HTN dengan Komplikasi', icd: 'I10', sev: 2, status: 'Belum Lengkap', dpjp: 'dr. Sarah Hidayati', biaya: 4500000 },
  { tgl: '20/05/2025', rm: '44332211', nama: 'Dewi Lestari', dx: 'Anemia, unspecified', icd: 'D64.9', sev: 1, status: 'Lengkap', dpjp: 'dr. Ahmad Fauzi', biaya: 5100000 },
  { tgl: '19/05/2025', rm: '77665544', nama: 'Hendra Wijaya', dx: 'CKD Stage 4', icd: 'N18.4', sev: 3, status: 'Lengkap', dpjp: 'dr. Tania Putri', biaya: 18900000 },
  { tgl: '19/05/2025', rm: '88776655', nama: 'Maya Sari', dx: 'Hipokalemia', icd: 'E87.6', sev: 2, status: 'Lengkap', dpjp: 'dr. Sarah Hidayati', biaya: 4200000 },
  { tgl: '18/05/2025', rm: '22334455', nama: 'Rudi Hartono', dx: 'Hemiparese post stroke', icd: 'G81.9', sev: 3, status: 'Belum Lengkap', dpjp: 'dr. Ahmad Fauzi', biaya: 22500000 },
  { tgl: '18/05/2025', rm: '33445566', nama: 'Lina Permata', dx: 'Pneumonia, unspecified', icd: 'J18.9', sev: 1, status: 'Lengkap', dpjp: 'dr. Tania Putri', biaya: 5600000 },
  { tgl: '17/05/2025', rm: '99001122', nama: 'Bambang S.', dx: 'Hiponatremia', icd: 'E87.1', sev: 2, status: 'Peringatan', dpjp: 'dr. Sarah Hidayati', biaya: 4800000 },
  { tgl: '17/05/2025', rm: '11002233', nama: 'Wati Ningsih', dx: 'CHF dengan AF', icd: 'I50.9', sev: 3, status: 'Lengkap', dpjp: 'dr. Ahmad Fauzi', biaya: 14200000 },
]

const sevColor = (s) => (s === 3 ? 'bad' : s === 2 ? 'warn' : 'gold')
const statusPill = (s) => (s === 'Lengkap' ? 'ok' : s === 'Peringatan' ? 'warn' : 'bad')
const fmtRp = (n) => 'Rp ' + (n || 0).toLocaleString('id-ID')

const Laporan = ({ onToast }) => {
  const [search, setSearch] = useState('')
  const [statusF, setStatusF] = useState('Semua')
  const [sevF, setSevF] = useState('Semua')
  const [dpjpF, setDpjpF] = useState('Semua')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  const dpjps = ['Semua', ...Array.from(new Set(REPORT_DATA.map((r) => r.dpjp)))]

  const filtered = REPORT_DATA.filter((r) => {
    if (
      search &&
      !`${r.nama} ${r.dx} ${r.rm} ${r.icd}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
      return false
    if (statusF !== 'Semua' && r.status !== statusF) return false
    if (sevF !== 'Semua' && String(r.sev) !== sevF) return false
    if (dpjpF !== 'Semua' && r.dpjp !== dpjpF) return false
    return true
  })

  const exportExcel = () => {
    const headers = ['Tanggal', 'No RM', 'Nama Pasien', 'Diagnosis', 'ICD-10', 'Severity', 'Status', 'DPJP', 'Biaya']
    const rows = filtered.map((r) => [
      r.tgl, r.rm, r.nama, r.dx, r.icd, `Level ${r.sev}`, r.status, r.dpjp, r.biaya,
    ])
    const escape = (v) => {
      const s = String(v).replace(/"/g, '""')
      return /[",;\n]/.test(s) ? `"${s}"` : s
    }
    const csv = '﻿' + [headers, ...rows].map((r) => r.map(escape).join(';')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `laporan-smart-coding-${Date.now()}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    onToast(`${filtered.length} baris diekspor ke Excel.`)
  }

  const totalBiaya = filtered.reduce((a, b) => a + b.biaya, 0)

  return (
    <div className="fade-in">
      <h2 className="sec-title">
        <span className="acc" />
        Laporan Dokumentasi Klinis
      </h2>

      <div className="kpi-grid" style={{ marginBottom: 20 }}>
        <div className="kpi">
          <div className="kpi-label">Total Pasien</div>
          <div className="kpi-value">{filtered.length}</div>
          <div className="kpi-sub">dari {REPORT_DATA.length} catatan</div>
          <div className="kpi-icon"><Icon name="user" size={18} /></div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Lengkap</div>
          <div className="kpi-value" style={{ color: 'var(--ok)' }}>
            {filtered.filter((r) => r.status === 'Lengkap').length}
          </div>
          <div className="kpi-sub">dokumentasi tervalidasi</div>
          <div className="kpi-icon" style={{ background: 'var(--ok-soft)', color: 'var(--ok)' }}>
            <Icon name="check" size={18} />
          </div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Belum Lengkap</div>
          <div className="kpi-value" style={{ color: 'var(--bad)' }}>
            {filtered.filter((r) => r.status === 'Belum Lengkap').length}
          </div>
          <div className="kpi-sub">perlu tindak lanjut</div>
          <div className="kpi-icon" style={{ background: 'var(--bad-soft)', color: 'var(--bad)' }}>
            <Icon name="alert" size={18} />
          </div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Total Biaya</div>
          <div className="kpi-value" style={{ fontSize: 22 }}>{fmtRp(totalBiaya)}</div>
          <div className="kpi-sub">akumulasi periode terpilih</div>
          <div className="kpi-icon" style={{ background: 'var(--primary-50)', color: 'var(--primary)' }}>
            <Icon name="chart" size={18} />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <div className="card-title">Filter & Pencarian</div>
          <button className="btn btn-gold btn-sm" onClick={exportExcel}>
            <Icon name="download" size={14} /> Export Excel
          </button>
        </div>
        <div className="card-pad">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1.4fr 1fr 1fr',
              gap: 12,
            }}
          >
            <div>
              <label className="label">Pencarian</label>
              <input
                className="input search-icon"
                placeholder="Nama, RM, diagnosis…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <label className="label">Status</label>
              <select
                className="select"
                value={statusF}
                onChange={(e) => setStatusF(e.target.value)}
              >
                {['Semua', 'Lengkap', 'Belum Lengkap', 'Peringatan'].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Severity</label>
              <select
                className="select"
                value={sevF}
                onChange={(e) => setSevF(e.target.value)}
              >
                {['Semua', '1', '2', '3'].map((s) => (
                  <option key={s} value={s}>
                    {s === 'Semua' ? s : `Level ${s}`}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">DPJP</label>
              <select
                className="select"
                value={dpjpF}
                onChange={(e) => setDpjpF(e.target.value)}
              >
                {dpjps.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Dari Tanggal</label>
              <input
                className="input"
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div>
              <label className="label">Sampai Tanggal</label>
              <input
                className="input"
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-head">
          <div>
            <div className="card-title">Daftar Pasien & Dokumentasi</div>
            <div className="card-sub">{filtered.length} hasil ditemukan</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => {
                setSearch('')
                setStatusF('Semua')
                setSevF('Semua')
                setDpjpF('Semua')
                setFrom('')
                setTo('')
              }}
            >
              <Icon name="refresh" size={13} /> Reset
            </button>
            <button className="btn btn-gold btn-sm" onClick={exportExcel}>
              <Icon name="download" size={13} /> Export
            </button>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>No. RM</th>
                <th>Nama Pasien</th>
                <th>Diagnosis</th>
                <th>ICD-10</th>
                <th>Severity</th>
                <th>DPJP</th>
                <th style={{ textAlign: 'right' }}>Biaya</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan="10"
                    style={{ textAlign: 'center', padding: 40, color: 'var(--muted)' }}
                  >
                    Tidak ada data sesuai filter
                  </td>
                </tr>
              )}
              {filtered.map((r, i) => (
                <tr key={i}>
                  <td style={{ whiteSpace: 'nowrap' }}>{r.tgl}</td>
                  <td>
                    <span
                      style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12 }}
                    >
                      {r.rm}
                    </span>
                  </td>
                  <td>
                    <strong style={{ color: 'var(--ink)' }}>{r.nama}</strong>
                  </td>
                  <td>{r.dx}</td>
                  <td>
                    <span
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 12,
                        color: 'var(--primary)',
                        fontWeight: 600,
                      }}
                    >
                      {r.icd}
                    </span>
                  </td>
                  <td>
                    <span className={`pill ${sevColor(r.sev)}`}>Level {r.sev}</span>
                  </td>
                  <td>{r.dpjp}</td>
                  <td
                    style={{
                      textAlign: 'right',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: 600,
                    }}
                  >
                    {fmtRp(r.biaya)}
                  </td>
                  <td>
                    <span className={`pill ${statusPill(r.status)}`}>{r.status}</span>
                  </td>
                  <td>
                    <button className="icon-btn" style={{ width: 30, height: 30 }}>
                      <Icon name="eye" size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '14px 20px',
            borderTop: '1px solid var(--line)',
          }}
        >
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            Menampilkan 1–{filtered.length} dari {filtered.length} entri
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['‹', '1', '2', '3', '›'].map((p, i) => (
              <button
                key={i}
                className="icon-btn"
                style={{
                  width: 32,
                  height: 32,
                  fontSize: 12,
                  fontWeight: 600,
                  background: p === '1' ? 'var(--primary)' : '#fff',
                  color: p === '1' ? '#fff' : 'var(--ink-2)',
                  borderColor: p === '1' ? 'var(--primary)' : 'var(--line)',
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Laporan
