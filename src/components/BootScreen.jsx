import { useState, useEffect } from 'react'

// Each step: message, duration in ms, progress %
const BOOT_STEPS = [
  { msg: 'Initializing listening application…',          dur: 8000,  prog: 8   },
  { msg: 'Listening app loaded',                          dur: 2000,  prog: 14  },
  { msg: 'Connecting to proxy server…',                  dur: 12000, prog: 22  },
  { msg: 'Proxy server handshake complete',              dur: 2000,  prog: 29  },
  { msg: 'Connecting to Ubuntu relay server…',           dur: 14000, prog: 38  },
  { msg: 'Ubuntu server responded',                      dur: 2000,  prog: 44  },
  { msg: 'Establishing encrypted tunnel…',               dur: 10000, prog: 52  },
  { msg: 'Tunnel established',                           dur: 2000,  prog: 58  },
  { msg: 'Connecting to listen app — this may take a while…', dur: 25000, prog: 68 },
  { msg: 'Listen app acknowledged',                      dur: 2000,  prog: 74  },
  { msg: 'Connection established ✓',                     dur: 4000,  prog: 82  },
  { msg: 'Finalizing connection & loading modules…',     dur: 10000, prog: 92  },
  { msg: 'All modules ready. Launching control panel…', dur: 3000,  prog: 100 },
]

export default function BootScreen({ onDone }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [prog,      setProg]      = useState(0)
  const [visible,   setVisible]   = useState([])   // completed lines
  const [current,   setCurrent]   = useState('')   // typing line

  useEffect(() => {
    let cancelled = false
    let idx = 0

    async function runSteps() {
      for (let i = 0; i < BOOT_STEPS.length; i++) {
        if (cancelled) return
        const step = BOOT_STEPS[i]
        setStepIndex(i)
        setCurrent(step.msg)

        // animate progress gradually over the duration
        const start    = i === 0 ? 0 : BOOT_STEPS[i - 1].prog
        const end      = step.prog
        const ticks    = 40
        const interval = step.dur / ticks
        for (let t = 0; t <= ticks; t++) {
          if (cancelled) return
          setProg(Math.round(start + ((end - start) * t) / ticks))
          await delay(interval)
        }

        if (cancelled) return
        // move current line to visible list
        setVisible(prev => [...prev, { msg: step.msg, success: !step.msg.includes('…') }])
        setCurrent('')

        // small pause between steps
        await delay(300)
      }
      if (!cancelled) {
        await delay(600)
        onDone()
      }
    }

    runSteps()
    return () => { cancelled = true }
  }, [])

  const totalSeconds = BOOT_STEPS.reduce((a, s) => a + s.dur, 0) / 1000
  const elapsed      = Math.round((prog / 100) * totalSeconds)

  return (
    <div className="boot-screen">
      <div className="boot-logo">
        <div className="boot-logo-icon">📡</div>
        <div className="boot-logo-text">Relay<span>Ctrl</span></div>
      </div>

      <div className="boot-card">
        <div className="boot-card-header">
          <span className="boot-badge">● SYSTEM BOOT</span>
          <span className="boot-timer">{elapsed}s</span>
        </div>

        {/* Terminal log */}
        <div className="boot-log">
          {visible.map((v, i) => (
            <div key={i} className={`boot-line ${v.success ? 'ok' : 'info'}`}>
              <span className="bl-icon">{v.success ? '✔' : '›'}</span>
              <span className="bl-msg">{v.msg}</span>
            </div>
          ))}
          {current && (
            <div className="boot-line active">
              <span className="bl-icon">
                <span className="boot-spinner" />
              </span>
              <span className="bl-msg">{current}<span className="cursor">_</span></span>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="boot-progress-wrap">
          <div className="boot-progress-track">
            <div className="boot-progress-fill" style={{ width: `${prog}%` }} />
          </div>
          <div className="boot-progress-label">
            <span>{prog < 100 ? 'Initializing…' : 'Ready'}</span>
            <span>{prog}%</span>
          </div>
        </div>
      </div>

      <div className="boot-note">
        Secure connection · End-to-end encrypted · Do not close this tab
      </div>
    </div>
  )
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms))
}
