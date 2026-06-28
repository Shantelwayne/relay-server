import { useState } from 'react'
import ConnectScreen from './components/ConnectScreen'
import Dashboard from './components/Dashboard'

export default function App() {
  const [device, setDevice] = useState(null)

  return device
    ? <Dashboard device={device} onDisconnect={() => setDevice(null)} />
    : <ConnectScreen onConnect={setDevice} />
}
