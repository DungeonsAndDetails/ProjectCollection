import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import { PlayerProvider } from './PlayerContext'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PlayerProvider>
      <App />
    </PlayerProvider>
  </React.StrictMode>
)

