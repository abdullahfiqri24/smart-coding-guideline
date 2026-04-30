import { useState, useRef, useEffect } from 'react'
import Icon from '../components/Icon'

const ICD10 = [
  { code: 'D64.9', name: 'Anemia, unspecified' },
  { code: 'E87.6', name: 'Hipokalemia' },
  { code: 'E87.5', name: 'Hiperkalemia' },
  { code: 'E87.1', name: 'Hiponatremia' },
  { code: 'G81.9', name: 'Hemiparese' },
  { code: 'J18.9', name: 'Pneumonia, unspecified' },
  { code: 'I50.9', name: 'Congestive Heart Failure' },
  { code: 'E11.9', name: 'Diabetes Mellitus tipe 2' },
  { code: 'I10', name: 'Hipertensi essensial' },
  { code: 'N18.9', name: 'Penyakit ginjal kronis' },
]

const ICD9 = [
  { code: '99.04', name: 'Transfusi PRC' },
  { code: '38.93', name: 'Pemasangan kateter vena' },
  { code: '96.71', name: 'Ventilasi mekanik invasif' },
  { code: '93.94', name: 'Nebulisasi' },
  { code: '99.15', name: 'Infus parenteral konsentrat nutrisi' },
]

const GUIDELINES = {
  'D64.9': { dx: 'Anemia', kriteria: 'Hb <10 g/dL', intervensi: 'Transfusi PRC', monitoring: 'Hb post transfusi' },
  'E87.6': { dx: 'Hipokalemia', kriteria: 'K <3.0 mEq/L', intervensi: 'KCl intravena', monitoring: 'Kalium ulang' },
  'E87.5': { dx: 'Hiperkalemia', kriteria: 'K >5.5 mEq/L', intervensi: 'Terapi emergensi (Ca gluconate / insulin / dextrose)', monitoring: 'Kalium ulang' },
  'E87.1': { dx: 'Hiponatremia', kriteria: 'Na <130 mEq/L', intervensi: 'NaCl 3% IV', monitoring: 'Natrium ulang' },
  'G81.9': { dx: 'Hemiparese', kriteria: 'Defisit neurologis', intervensi: 'Konsul SpKFR + fisioterapi', monitoring: 'Evaluasi fungsi' },
  'J18.9': { dx: 'Pneumonia', kriteria: 'Demam >38°C, leukositosis, infiltrat foto thorax, takipneu', intervensi: 'Antibiotik, oksigen, hidrasi', monitoring: 'Klinis & lab harian' },
  'I50.9': { dx: 'CHF', kriteria: 'Dyspnea, edema, NT-proBNP ↑', intervensi: 'Diuretik, ACE-i, β-blocker', monitoring: 'BB harian, balance cairan' },
  'E11.9': { dx: 'DM tipe 2', kriteria: 'GDS ≥200, HbA1c ≥6.5%', intervensi: 'Insulin / OAD', monitoring: 'GDS 6 jam' },
  'I10': { dx: 'Hipertensi', kriteria: 'TD ≥140/90 mmHg', intervensi: 'Antihipertensi', monitoring: 'TD harian' },
  'N18.9': { dx: 'CKD', kriteria: 'eGFR <60 ml/min', intervensi: 'Renal protection, diet rendah protein', monitoring: 'Ureum, kreatinin' },
}

const BILLING_FIELDS = [
  ['Prosedur Non Bedah', 0],
  ['Prosedur Bedah', 0],
  ['Konsultasi', 250000],
  ['Tenaga Ahli', 0],
  ['Keperawatan', 0],
  ['Penunjang', 0],
  ['Radiologi', 0],
  ['Laboratorium', 80000],
  ['Pelayanan Darah', 20000],
  ['Rehabilitasi', 0],
  ['Kamar / Akomodasi', 0],
  ['Rawat Intensif', 0],
  ['Obat', 100000],
  ['Obat Kronis', 0],
  ['Obat Kemoterapi', 0],
  ['Alkes', 0],
  ['BMHP', 0],
  ['Sewa Alat', 0],
]

const fmtRp = (n) => 'Rp ' + (n || 0).toLocaleString('id-ID')

const Stepper = ({ step }) => {
  const labels = ['Input Diagnosis', 'Rekomendasi', 'Checklist', 'Validasi']
  return (
    <div className="stepper">
      {labels.map((l, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <div className={`step ${i < step ? 'done' : ''} ${i === step ? 'active' : ''}`} style={{ flex: 'unset' }}>
            <div className="step-num">
              {i < step ? <Icon name="check" size={14} /> : i + 1}
            </div>
            <div className="step-text">{l}</div>
          </div>
          {i < labels.length - 1 && (
            <div className={`step-line ${i < step ? 'done' : ''}`} style={{ flex: 1 }} />
          )}
        </div>
      ))}
    </div>
  )
}

const Combo = ({ value, onChange, options, placeholder }) => {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const sel = options.find((o) => o.code === value)
  const filtered = options.filter((o) =>
    `${o.code} ${o.name}`.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="input"
        style={{
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ color: sel ? 'var(--ink)' : 'var(--muted-2)' }}>
          {sel ? (
            <>
              <strong
                style={{
                  color: 'var(--primary)',
                  marginRight: 8,
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {sel.code}
              </strong>
              {sel.name}
            </>
          ) : (
            placeholder
          )}
        </span>
        <Icon name="search" size={14} />
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            zIndex: 30,
            background: '#fff',
            border: '1px solid var(--line)',
            borderRadius: 10,
            boxShadow: '0 12px 28px rgba(0,0,0,0.10)',
            overflow: 'hidden',
          }}
        >
          <input
            className="input"
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari kode atau diagnosis…"
            style={{ borderRadius: 0, border: 'none', borderBottom: '1px solid var(--line)' }}
          />
          <div style={{ maxHeight: 220, overflowY: 'auto' }}>
            {filtered.length === 0 && (
              <div style={{ padding: 14, color: 'var(--muted)', fontSize: 13 }}>
                Tidak ditemukan
              </div>
            )}
            {filtered.map((o) => (
              <div
                key={o.code}
                onClick={() => {
                  onChange(o.code)
                  setOpen(false)
                  setQ('')
                }}
                style={{
                  padding: '10px 14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 13,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
              >
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 600,
                    color: 'var(--primary)',
                    minWidth: 60,
                  }}
                >
                  {o.code}
                </span>
                <span style={{ color: 'var(--ink-2)' }}>{o.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const MultiPick = ({ values, onChange, options, placeholder }) => {
  const [pick, setPick] = useState('')
  const add = (code) => {
    if (code && !values.includes(code)) onChange([...values, code])
    setPick('')
  }
  const remove = (code) => onChange(values.filter((v) => v !== code))

  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          marginBottom: 8,
          minHeight: values.length ? 32 : 0,
        }}
      >
        {values.map((v) => {
          const o = options.find((x) => x.code === v)
          return o ? (
            <span key={v} className="tag">
              <strong style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>
                {o.code}
              </strong>
              {o.name}
              <span className="x" onClick={() => remove(v)}>
                <Icon name="x" size={10} />
              </span>
            </span>
          ) : null
        })}
      </div>
      <select className="select" value={pick} onChange={(e) => add(e.target.value)}>
        <option value="">{placeholder}</option>
        {options
          .filter((o) => !values.includes(o.code))
          .map((o) => (
            <option key={o.code} value={o.code}>
              {o.code} — {o.name}
            </option>
          ))}
      </select>
    </div>
  )
}

const PatientHeader = ({ p }) => (
  <div className="patient-card">
    <div className="patient-avatar">{p.initials}</div>
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <div className="patient-name">{p.name}</div>
        <span className="pill gold">{p.gender}</span>
        <span className="pill ink">RM {p.rm}</span>
      </div>
      <div className="patient-meta">
        <span>
          <Icon name="calendar" size={13} />
          <strong>{p.dob}</strong> ({p.age} th)
        </span>
        <span>
          <Icon name="clipboard" size={13} /> No. SEP <strong>{p.sep}</strong>
        </span>
        <span>
          <Icon name="user" size={13} /> Ruang <strong>{p.ruang}</strong> · Kelas {p.kelas}
        </span>
        <span>
          <Icon name="stethoscope" size={13} /> DPJP <strong>dr. Ahmad Fauzi</strong>
        </span>
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
      <span className="pill ok">
        <Icon name="shield" size={12} /> BPJS Aktif
      </span>
      <div style={{ fontSize: 11, color: 'var(--muted)' }}>Masuk RS: {p.tglMasuk}</div>
    </div>
  </div>
)

const Billing = ({ items, onChange, total }) => (
  <div className="card">
    <div className="card-head">
      <div>
        <div className="card-title">Tarif & Komponen Pembiayaan INA-CBG</div>
        <div className="card-sub">Komponen biaya dasar paket BPJS Kesehatan</div>
      </div>
      <span className="pill gold">
        <Icon name="info" size={11} /> Hover ikon untuk panduan
      </span>
    </div>
    <div className="card-pad">
      <div className="bill-grid">
        <div className="bill-cell head">
          <span className="bill-q">?</span>
          <span style={{ marginLeft: 8, fontStyle: 'italic' }}>Tarif Rumah Sakit :</span>
          <strong
            style={{
              marginLeft: 6,
              fontFamily: 'JetBrains Mono, monospace',
              color: 'var(--primary)',
              fontSize: 14,
            }}
          >
            {fmtRp(total)}
          </strong>
        </div>
        {items.map((it, i) => (
          <div key={i} className="bill-cell">
            <span className="bill-q" title={it[0]}>
              ?
            </span>
            <span className="bill-name">{it[0]}</span>
            <input
              className={`bill-input ${it[1] > 0 ? 'has-value' : ''}`}
              type="text"
              value={it[1] === 0 ? '0' : it[1].toLocaleString('id-ID')}
              onChange={(e) => {
                const v = parseInt(e.target.value.replace(/\D/g, '')) || 0
                onChange(i, v)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
)

const Recommendation = ({ codes, checks, onToggle }) => {
  const rows = codes.map((c) => GUIDELINES[c]).filter(Boolean)
  if (!rows.length) return null
  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-title">Rekomendasi Evidence-Based Guideline</div>
          <div className="card-sub">Auto-generated dari diagnosis · ICD-10 / ICD-9</div>
        </div>
        <span className="pill gold">
          <Icon name="book" size={11} /> Evidence Based
        </span>
      </div>
      <div style={{ padding: '0 20px 20px', overflowX: 'auto' }}>
        <table className="rec-tbl">
          <thead>
            <tr>
              <th style={{ width: 32 }} />
              <th style={{ width: 140 }}>Diagnosis</th>
              <th style={{ width: 200 }}>Kriteria Objektif</th>
              <th>Intervensi Wajib</th>
              <th style={{ width: 180 }}>Monitoring</th>
              <th style={{ width: 100 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {codes.map((code) => {
              const r = GUIDELINES[code]
              if (!r) return null
              const ck = checks[code] || { kriteria: true, intervensi: true, monitoring: true }
              const valid = ck.kriteria && ck.intervensi && ck.monitoring
              return (
                <tr key={code}>
                  <td>
                    <div className={`checkbox ${valid ? 'checked' : ''}`}>
                      <Icon name="check" size={11} />
                    </div>
                  </td>
                  <td>
                    <div className="dx">{r.dx}</div>
                    <div
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 11,
                        color: 'var(--muted)',
                        marginTop: 2,
                      }}
                    >
                      {code}
                    </div>
                  </td>
                  <td>{r.kriteria}</td>
                  <td>{r.intervensi}</td>
                  <td>{r.monitoring}</td>
                  <td>
                    {valid ? (
                      <span className="pill ok">VALID</span>
                    ) : (
                      <span className="pill bad">TIDAK VALID</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const StatusBanner = ({ valid, count, total, onBack, onSubmit }) => (
  <div className={`status-banner ${valid ? 'valid' : 'invalid'}`}>
    <div className="s-left">
      <div className="s-icon">
        {valid ? (
          <Icon name="check" size={22} stroke={3} />
        ) : (
          <Icon name="alert" size={22} stroke={2.5} />
        )}
      </div>
      <div>
        <div className="s-h">
          {valid ? 'DOKUMENTASI VALID' : 'DOKUMENTASI BELUM VALID'}
        </div>
        <div className="s-d">
          {valid
            ? `Sesuai evidence-based guideline · ${count}/${total} kriteria terpenuhi · siap proses coding INA-CBG`
            : `Belum memenuhi seluruh kriteria · ${count}/${total} item terpenuhi · lengkapi sebelum coding`}
        </div>
      </div>
    </div>
    <div style={{ display: 'flex', gap: 10 }}>
      <button className="btn btn-ghost" onClick={onBack}>
        <Icon name="arrowLeft" size={14} /> Kembali
      </button>
      <button className="btn btn-primary" disabled={!valid} onClick={onSubmit}>
        Lanjut ke Coding <Icon name="arrowRight" size={14} />
      </button>
    </div>
  </div>
)

const SmartGuideline = ({ onToast }) => {
  const [step, setStep] = useState(0)
  const [primary, setPrimary] = useState('D64.9')
  const [secondary, setSecondary] = useState(['E87.6'])
  const [procedures, setProcedures] = useState([])
  const [billing, setBilling] = useState(BILLING_FIELDS)
  const [checks, setChecks] = useState({})
  const [showRec, setShowRec] = useState(false)
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const recRef = useRef(null)

  const billTotal = billing.reduce((a, b) => a + b[1], 0)

  const patient = {
    initials: 'AF',
    name: 'Ahmad Farhan',
    rm: '12345678',
    sep: '2025052200001',
    gender: 'Laki-laki',
    dob: '15/08/1965',
    age: 59,
    ruang: 'IRNA 3',
    kelas: '1',
    tglMasuk: 'Kamis, 22 Mei 2025',
  }

  const allCodes = [primary, ...secondary, ...procedures].filter(Boolean)

  const checkCount = (() => {
    let n = 0, t = 0
    allCodes.forEach((c) => {
      if (!GUIDELINES[c]) return
      const ck = checks[c] || { kriteria: true, intervensi: true, monitoring: true }
      ;['kriteria', 'intervensi', 'monitoring'].forEach((k) => {
        t++
        if (ck[k]) n++
      })
    })
    return { n, t }
  })()

  const isValid = showRec && checkCount.n === checkCount.t && checkCount.t > 0

  const handleProcess = () => {
    setShowRec(true)
    setStep(1)
    onToast('Rekomendasi berhasil dimuat. Tinjau kriteria objektif.')
    setTimeout(() => {
      recRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  const toggleCheck = (code, key) => {
    setChecks((prev) => {
      const cur = prev[code] || { kriteria: true, intervensi: true, monitoring: true }
      return { ...prev, [code]: { ...cur, [key]: !cur[key] } }
    })
  }

  return (
    <div className="fade-in">
      <h2 className="sec-title">
        <span className="acc" />
        Identitas Pasien
      </h2>
      <PatientHeader p={patient} />

      <div className="card" style={{ marginTop: 20, padding: 18 }}>
        <Stepper step={step} />
      </div>

      <div style={{ marginTop: 20 }}>
        <Billing
          items={billing}
          total={billTotal}
          onChange={(idx, v) =>
            setBilling((b) => b.map((x, i) => (i === idx ? [x[0], v] : x)))
          }
        />
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <div className="card-head">
          <div>
            <div className="card-title">Input Diagnosis & Tindakan</div>
            <div className="card-sub">ICD-10 untuk diagnosis · ICD-9-CM untuk tindakan</div>
          </div>
          <span className="pill gold">
            <Icon name="stethoscope" size={11} /> Anti Gharar
          </span>
        </div>
        <div className="card-pad">
          <div className="grid-2" style={{ marginBottom: 16 }}>
            <div>
              <label className="label">Diagnosis Utama (ICD-10)</label>
              <Combo
                value={primary}
                onChange={setPrimary}
                options={ICD10}
                placeholder="Pilih diagnosis utama…"
              />
            </div>
            <div>
              <label className="label">Tindakan / Prosedur (ICD-9-CM)</label>
              <MultiPick
                values={procedures}
                onChange={setProcedures}
                options={ICD9}
                placeholder="+ Tambah tindakan…"
              />
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="label">Diagnosis Sekunder (Komorbid / Komplikasi)</label>
            <MultiPick
              values={secondary}
              onChange={setSecondary}
              options={ICD10.filter((o) => o.code !== primary)}
              placeholder="+ Tambah komorbid / komplikasi…"
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="label">Catatan Klinis (Opsional)</label>
            <textarea
              className="textarea"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tuliskan riwayat, temuan klinis, atau catatan tambahan…"
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
              paddingTop: 8,
              borderTop: '1px dashed var(--line)',
            }}
          >
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>
              {allCodes.length} kode terpilih · sistem akan generate rekomendasi evidence-based
            </div>
            <button className="btn btn-primary" onClick={handleProcess}>
              Proses Rekomendasi <Icon name="arrowRight" size={14} />
            </button>
          </div>
        </div>
      </div>

      {showRec && (
        <div ref={recRef} style={{ marginTop: 20 }} className="fade-in">
          <Recommendation
            codes={allCodes.filter((c) => GUIDELINES[c])}
            checks={checks}
            onToggle={toggleCheck}
          />

          <div className="card" style={{ marginTop: 16 }}>
            <div className="card-head">
              <div>
                <div className="card-title">Checklist Dokumentasi Klinis</div>
                <div className="card-sub">Tandai item yang telah didokumentasikan</div>
              </div>
              <span className="pill ink">
                {checkCount.n} / {checkCount.t}
              </span>
            </div>
            <div style={{ padding: '0 20px 20px', overflowX: 'auto' }}>
              <table className="tbl">
                <thead>
                  <tr>
                    <th style={{ width: 200 }}>Diagnosis</th>
                    <th>Kriteria Objektif</th>
                    <th>Intervensi Wajib</th>
                    <th>Monitoring</th>
                  </tr>
                </thead>
                <tbody>
                  {allCodes
                    .filter((c) => GUIDELINES[c])
                    .map((code) => {
                      const r = GUIDELINES[code]
                      const ck = checks[code] || {
                        kriteria: true,
                        intervensi: true,
                        monitoring: true,
                      }
                      const Cell = ({ k, label }) => (
                        <td
                          onClick={() => toggleCheck(code, k)}
                          style={{ cursor: 'pointer' }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 8,
                            }}
                          >
                            <div
                              className={`checkbox ${ck[k] ? 'checked' : ''}`}
                              style={{ marginTop: 1 }}
                            >
                              {ck[k] && <Icon name="check" size={11} />}
                            </div>
                            <div
                              style={{
                                fontSize: 12.5,
                                color: ck[k] ? 'var(--ink-2)' : 'var(--muted)',
                              }}
                            >
                              {label}
                            </div>
                          </div>
                        </td>
                      )
                      return (
                        <tr key={code}>
                          <td>
                            <div style={{ fontWeight: 600, color: 'var(--primary)' }}>
                              {r.dx}
                            </div>
                            <div
                              style={{
                                fontFamily: 'JetBrains Mono, monospace',
                                fontSize: 11,
                                color: 'var(--muted)',
                              }}
                            >
                              {code}
                            </div>
                          </td>
                          <Cell k="kriteria" label={r.kriteria} />
                          <Cell k="intervensi" label={r.intervensi} />
                          <Cell k="monitoring" label={r.monitoring} />
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>

          <StatusBanner
            valid={isValid}
            count={checkCount.n}
            total={checkCount.t}
            onBack={() => {
              setShowRec(false)
              setStep(0)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            onSubmit={() => {
              setStep(3)
              setSubmitted(true)
            }}
          />
        </div>
      )}

      {submitted && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(8,8,8,0.55)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 200,
          }}
          onClick={() => setSubmitted(false)}
        >
          <div
            className="card"
            style={{ width: 460, padding: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'grid', placeItems: 'center', marginBottom: 16 }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'var(--ok-soft)',
                  color: 'var(--ok)',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <Icon name="check" size={30} stroke={3} />
              </div>
            </div>
            <div
              style={{
                textAlign: 'center',
                fontFamily: 'Playfair Display, Georgia',
                fontSize: 22,
                fontWeight: 600,
                color: 'var(--ink)',
                marginBottom: 6,
              }}
            >
              Berhasil Dikirim ke Coding
            </div>
            <div
              style={{
                textAlign: 'center',
                fontSize: 13,
                color: 'var(--muted)',
                marginBottom: 18,
                lineHeight: 1.55,
              }}
            >
              Dokumentasi klinis pasien{' '}
              <strong style={{ color: 'var(--ink-2)' }}>{patient.name}</strong> telah divalidasi &
              diteruskan ke tim koder INA-CBG.
            </div>
            <div
              style={{
                background: 'var(--bg)',
                borderRadius: 10,
                padding: 14,
                fontSize: 12.5,
                marginBottom: 16,
              }}
            >
              {[
                ['No. SEP', patient.sep],
                ['Diagnosis Utama', primary],
                ['Total Kriteria', `${checkCount.n}/${checkCount.t} terpenuhi`],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '4px 0',
                  }}
                >
                  <span style={{ color: 'var(--muted)' }}>{k}</span>
                  <strong
                    style={{ fontFamily: k === 'No. SEP' ? 'JetBrains Mono, monospace' : undefined }}
                  >
                    {v}
                  </strong>
                </div>
              ))}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '4px 0',
                }}
              >
                <span style={{ color: 'var(--muted)' }}>Status</span>
                <span className="pill ok">VALID</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                className="btn btn-ghost"
                style={{ flex: 1 }}
                onClick={() => setSubmitted(false)}
              >
                Tutup
              </button>
              <button
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={() => {
                  setSubmitted(false)
                  setShowRec(false)
                  setStep(0)
                  onToast('Dokumentasi terkirim ke koder.')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                Pasien Berikutnya <Icon name="arrowRight" size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SmartGuideline
