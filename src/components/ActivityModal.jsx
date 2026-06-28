import { useState, useEffect, useRef } from 'react'
import { SEQUENCES } from '../sequences'

const delay = ms => new Promise(r => setTimeout(r, ms))

function LogIcon({ type, done }) {
  if (!done) return <div className="spinner" />
  if (type === 'success') return <span>✅</span>
  if (type === 'error')   return <span>🔴</span>
  return <span>ℹ️</span>
}

export default function ActivityModal({ featureKey, onClose }) {
  const seq = SEQUENCES[featureKey]
  const [logs, setLogs]   = useState([])
  const [prog, setProg]   = useState(0)
  const [fatal, setFatal] = useState(false)
  const [done, setDone]   = useState(false)
  const logRef            = useRef(null)

  useEffect(() => {
    let cancelled = false
    async function run() {
      for (let i = 0; i < seq.steps.length; i++) {
        if (cancelled) return
        const step = seq.steps[i]
        setLogs(prev => [...prev, { ...step, done: false, id: i }])
        setProg(step.prog)
        if (step.dur > 0) await delay(step.dur)
        if (cancelled) return
        setLogs(prev => prev.map(l => l.id === i ? { ...l, done: true } : l))
        if (step.fatal) { setFatal(true); setDone(true); return }
        await delay(280)
      }
      if (!cancelled) setDone(true)
    }
    run()
    return () => { cancelled = true }
  }, [featureKey])

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [logs])

  const now = () => new Date().toLocaleTimeString()

  return (
    <div
      className="modal-overlay"
      onClick={e => { if (done && e.target === e.currentTarget) onClose() }}
    >
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          <span className="m-icon">{seq.icon}</span>
          <div>
            <h3>{seq.title}</h3>
            <div className="m-sub">{seq.desc}</div>
          </div>
        </div>

        {/* Progress */}
        <div className="progress-wrap">
          <div className="progress-label">
            <span>{fatal ? 'Failed' : done ? 'Complete' : 'Working…'}</span>
            <span>{prog}%</span>
          </div>
          <div className="progress-track">
            <div
              className={`progress-fill${fatal ? ' red' : done ? ' green' : ''}`}
              style={{ width: `${prog}%` }}
            />
          </div>
        </div>

        {/* Log */}
        <div className="activity-log" ref={logRef}>
          {logs.map(l => (
            <div key={l.id} className={`log-entry ${l.type}`}>
              <div className="log-icon">
                <LogIcon type={l.type} done={l.done} />
              </div>
              <div className="log-text">
                <div className="lt-msg">{l.msg}</div>
                <div className="lt-time">{now()}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Error banner */}
        {fatal && (
          <div className="error-banner">
            <span className="eb-icon">🚫</span>
            <div>
              <div className="eb-title">Relay Server Connection Failed</div>
              <div className="eb-msg">
                The relay server failed to connect. Make sure you are using a{' '}
                <strong>Neural Network server</strong> for HTTP access and try again.
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="modal-footer">
          <button className="btn-sm ghost" onClick={onClose} disabled={!done}>
            {done ? (fatal ? '← Back to Dashboard' : 'Close') : 'Please wait…'}
          </button>
        </div>
      </div>
    </div>
  )
}
