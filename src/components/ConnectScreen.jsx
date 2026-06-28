import { useState } from 'react'

const delay = ms => new Promise(r => setTimeout(r, ms))

export default function ConnectScreen({ onConnect }) {
  const [host,  setHost]  = useState('192.168.1.105')
  const [port,  setPort]  = useState('4444')
  const [token, setToken] = useState('')
  const [busy,  setBusy]  = useState(false)

  async function handleConnect() {
    if (!host || !port) return
    setBusy(true)
    await delay(1600)
    onConnect({ host, port })
  }

  return (
    <div className="connect-screen">
      <div className="logo">
        <div className="logo-icon">📡</div>
        Remote<span>Ctrl</span>
      </div>

      <div className="connect-card">
        <h2>Connect to Device</h2>

        <div className="field">
          <label>Host / IP Address</label>
          <input
            value={host}
            onChange={e => setHost(e.target.value)}
            placeholder="e.g. 192.168.1.105"
          />
        </div>

        <div className="field">
          <label>Port</label>
          <input
            value={port}
            onChange={e => setPort(e.target.value)}
            placeholder="4444"
          />
        </div>

        <div className="field">
          <label>Auth Token (optional)</label>
          <input
            type="password"
            value={token}
            onChange={e => setToken(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button
          className="btn-connect"
          onClick={handleConnect}
          disabled={busy || !host || !port}
        >
          {busy ? 'Connecting…' : '⚡  Connect'}
        </button>
      </div>
    </div>
  )
}
