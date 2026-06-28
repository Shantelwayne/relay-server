import { useState } from 'react'
import BootScreen from './components/BootScreen'
import Dashboard  from './components/Dashboard'
import './index.css'

export default function App() {
  const [booted, setBooted] = useState(false)
  return booted
    ? <Dashboard />
    : <BootScreen onDone={() => setBooted(true)} />
}
