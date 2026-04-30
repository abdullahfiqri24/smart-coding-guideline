import { useState } from 'react'
import Icon from '../components/Icon'

const Pengaturan = ({ onToast }) => {
  const [tab, setTab] = useState('profil')
  const [profile, setProfile] = useState({
    name: 'dr. Ahmad Fauzi',
    nip: '198501152012031001',
    spec: 'Internis',
    email: 'ahmad.fauzi@yarsi.id',
    phone: '+62 812-3456-7890',
    ruang: 'IRNA 3',
  })
  const [notif, setNotif] = useState({
    emailReminder: true,
    pushDokumentasi: true,
    weeklyReport: false,
    fraudAlert: true,
  })
  const [pref, setPref] = useState({
    theme: 'light',
    lang: 'id',
    autoSave: true,
    confirmCoding: true,
  })

  const tabs = [
    { id: 'profil', label: 'Profil DPJP', icon: 'user' },
    { id: 'notif', label: 'Notifikasi', icon: 'bell' },
    { id: 'pref', label: 'Preferensi', icon: 'settings' },
    { id: 'syariah', label: 'Prinsip Syariah', icon: 'shield' },
  ]

  const Toggle = ({ on, onChange }) => (
    <button
      onClick={() => onChange(!on)}
      style={{
        width: 42,
        height: 24,
        borderRadius: 999,
        background: on ? 'var(--primary)' : '#d9d4cc',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.15s',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 3,
          left: on ? 21 : 3,
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: '#fff',
          transition: 'left 0.18s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }}
      />
    </button>
  )

  const Field = ({ label, children }) => (
    <div style={{ marginBottom: 16 }}>
      <label className="label">{label}</label>
      {children}
    </div>
  )

  const ToggleRow = ({ title, desc, on, onChange }) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 0',
        borderBottom: '1px solid var(--line-2)',
      }}
    >
      <div style={{ flex: 1, paddingRight: 16 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--ink)' }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{desc}</div>
      </div>
      <Toggle on={on} onChange={onChange} />
    </div>
  )

  return (
    <div className="fade-in">
      <h2 className="sec-title">
        <span className="acc" />
        Pengaturan
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 20 }}>
        <div
          className="card"
          style={{ padding: 8, height: 'fit-content', position: 'sticky', top: 80 }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '11px 12px',
                border: 'none',
                borderRadius: 8,
                background: tab === t.id ? 'var(--primary-50)' : 'transparent',
                color: tab === t.id ? 'var(--primary)' : 'var(--ink-2)',
                fontWeight: tab === t.id ? 600 : 500,
                fontSize: 13,
                fontFamily: 'inherit',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <Icon name={t.icon} size={15} />
              {t.label}
            </button>
          ))}
        </div>

        <div className="card">
          {tab === 'profil' && (
            <>
              <div className="card-head">
                <div>
                  <div className="card-title">Profil DPJP</div>
                  <div className="card-sub">
                    Informasi pribadi Dokter Penanggung Jawab Pelayanan
                  </div>
                </div>
              </div>
              <div className="card-pad">
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    paddingBottom: 20,
                    marginBottom: 20,
                    borderBottom: '1px solid var(--line)',
                  }}
                >
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 16,
                      background: 'var(--primary)',
                      color: 'var(--gold)',
                      display: 'grid',
                      placeItems: 'center',
                      fontFamily: 'Playfair Display, Georgia',
                      fontSize: 28,
                      fontWeight: 600,
                    }}
                  >
                    AF
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: 'Playfair Display, Georgia',
                        fontSize: 20,
                        fontWeight: 600,
                        color: 'var(--ink)',
                      }}
                    >
                      {profile.name}
                    </div>
                    <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 4 }}>
                      NIP {profile.nip} · {profile.spec}
                    </div>
                  </div>
                  <button className="btn btn-ghost btn-sm">
                    <Icon name="edit" size={13} /> Ubah Foto
                  </button>
                </div>
                <div className="grid-2">
                  <Field label="Nama Lengkap">
                    <input
                      className="input"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  </Field>
                  <Field label="NIP">
                    <input
                      className="input"
                      value={profile.nip}
                      onChange={(e) => setProfile({ ...profile, nip: e.target.value })}
                    />
                  </Field>
                  <Field label="Spesialisasi">
                    <input
                      className="input"
                      value={profile.spec}
                      onChange={(e) => setProfile({ ...profile, spec: e.target.value })}
                    />
                  </Field>
                  <Field label="Ruang Praktek">
                    <input
                      className="input"
                      value={profile.ruang}
                      onChange={(e) => setProfile({ ...profile, ruang: e.target.value })}
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      className="input"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </Field>
                  <Field label="No. Telepon">
                    <input
                      className="input"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </Field>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 10,
                    marginTop: 12,
                    paddingTop: 16,
                    borderTop: '1px solid var(--line)',
                  }}
                >
                  <button className="btn btn-ghost">Batal</button>
                  <button
                    className="btn btn-primary"
                    onClick={() => onToast('Profil tersimpan.')}
                  >
                    <Icon name="save" size={14} /> Simpan Perubahan
                  </button>
                </div>
              </div>
            </>
          )}

          {tab === 'notif' && (
            <>
              <div className="card-head">
                <div>
                  <div className="card-title">Pengaturan Notifikasi</div>
                  <div className="card-sub">Atur cara sistem memberi pengingat</div>
                </div>
              </div>
              <div className="card-pad">
                <ToggleRow
                  title="Email Reminder Dokumentasi"
                  desc="Kirim email harian untuk pasien yang dokumentasinya belum lengkap."
                  on={notif.emailReminder}
                  onChange={(v) => setNotif({ ...notif, emailReminder: v })}
                />
                <ToggleRow
                  title="Push Notifikasi Dokumentasi"
                  desc="Tampilkan notifikasi real-time saat checklist belum terpenuhi."
                  on={notif.pushDokumentasi}
                  onChange={(v) => setNotif({ ...notif, pushDokumentasi: v })}
                />
                <ToggleRow
                  title="Laporan Mingguan"
                  desc="Rangkuman akurasi dokumentasi setiap Senin pagi."
                  on={notif.weeklyReport}
                  onChange={(v) => setNotif({ ...notif, weeklyReport: v })}
                />
                <ToggleRow
                  title="Alert Anti Fraud"
                  desc="Peringatan saat sistem mendeteksi potensi gharar atau coding tidak sesuai."
                  on={notif.fraudAlert}
                  onChange={(v) => setNotif({ ...notif, fraudAlert: v })}
                />
              </div>
            </>
          )}

          {tab === 'pref' && (
            <>
              <div className="card-head">
                <div>
                  <div className="card-title">Preferensi Aplikasi</div>
                  <div className="card-sub">Sesuaikan tampilan dan perilaku sistem</div>
                </div>
              </div>
              <div className="card-pad">
                <div
                  style={{
                    marginBottom: 20,
                    paddingBottom: 18,
                    borderBottom: '1px solid var(--line)',
                  }}
                >
                  <div className="label">Tema</div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                    {[
                      { id: 'light', label: 'Terang', icon: 'sun' },
                      { id: 'dark', label: 'Gelap', icon: 'moon' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setPref({ ...pref, theme: t.id })}
                        style={{
                          flex: 1,
                          padding: 14,
                          borderRadius: 10,
                          border: `1.5px solid ${pref.theme === t.id ? 'var(--primary)' : 'var(--line)'}`,
                          background: pref.theme === t.id ? 'var(--primary-50)' : '#fff',
                          color: pref.theme === t.id ? 'var(--primary)' : 'var(--ink-2)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          fontWeight: 600,
                          fontFamily: 'inherit',
                          fontSize: 13,
                        }}
                      >
                        <Icon name={t.icon} size={16} />
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
                <Field label="Bahasa">
                  <select
                    className="select"
                    value={pref.lang}
                    onChange={(e) => setPref({ ...pref, lang: e.target.value })}
                  >
                    <option value="id">Bahasa Indonesia</option>
                    <option value="en">English</option>
                  </select>
                </Field>
                <ToggleRow
                  title="Auto-Save Diagnosis"
                  desc="Sistem menyimpan input diagnosis secara otomatis setiap 30 detik."
                  on={pref.autoSave}
                  onChange={(v) => setPref({ ...pref, autoSave: v })}
                />
                <ToggleRow
                  title="Konfirmasi sebelum Coding"
                  desc="Tampilkan dialog konfirmasi sebelum mengirim klaim ke INA-CBG."
                  on={pref.confirmCoding}
                  onChange={(v) => setPref({ ...pref, confirmCoding: v })}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 10,
                    marginTop: 16,
                    paddingTop: 16,
                    borderTop: '1px solid var(--line)',
                  }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={() => onToast('Preferensi tersimpan.')}
                  >
                    <Icon name="save" size={14} /> Simpan
                  </button>
                </div>
              </div>
            </>
          )}

          {tab === 'syariah' && (
            <>
              <div className="card-head">
                <div>
                  <div className="card-title">Prinsip Syariah</div>
                  <div className="card-sub">
                    Komitmen sistem pada anti fraud, anti maysir, dan anti gharar
                  </div>
                </div>
                <span className="pill gold">
                  <Icon name="shield" size={11} /> Aktif
                </span>
              </div>
              <div
                className="card-pad"
                style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
              >
                {[
                  {
                    t: 'Anti Fraud',
                    d: 'Sistem mencegah pengkodean diagnosis yang tidak didukung bukti klinis. Setiap input divalidasi terhadap evidence-based guideline.',
                  },
                  {
                    t: 'Anti Maysir',
                    d: 'Klaim berbasis kepastian data, bukan spekulasi. Tidak ada upcoding tanpa dasar dokumentasi yang lengkap.',
                  },
                  {
                    t: 'Anti Gharar',
                    d: 'Transparansi dan kejelasan dokumentasi pada setiap tahap. Status validasi terlihat sebelum proses coding INA-CBG.',
                  },
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: 14,
                      padding: 16,
                      background: 'var(--gold-50)',
                      border: '1px solid var(--gold-soft)',
                      borderRadius: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: 'var(--primary)',
                        color: 'var(--gold)',
                        display: 'grid',
                        placeItems: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon name="shield" size={16} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          color: 'var(--primary)',
                          fontSize: 14,
                          marginBottom: 4,
                        }}
                      >
                        {s.t}
                      </div>
                      <div
                        style={{
                          fontSize: 12.5,
                          color: 'var(--ink-2)',
                          lineHeight: 1.55,
                        }}
                      >
                        {s.d}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Pengaturan
