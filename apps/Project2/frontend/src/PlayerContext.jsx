import React, { createContext, useEffect, useState } from 'react'
import { socket } from './socket'

export const PlayerContext = createContext({ name: '', setName: () => {} })

export function PlayerProvider({ children }) {
  const [name, setName] = useState(() => {
    try {
      return localStorage.getItem('playerName') || ''
    } catch (e) {
      return ''
    }
  })

  // Persist locally and save a minimal profile to the backend
  useEffect(() => {
    try {
      if (name) {
        localStorage.setItem('playerName', name)
        fetch(`http://localhost:3001/profiles/${encodeURIComponent(name)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, updatedAt: Date.now() })
        }).catch(() => {})
        try {
          // inform realtime server of the chosen display name
          if (socket && socket.emit) socket.emit('join', name)
        } catch (e) {}
      }
    } catch (e) {
      // ignore
    }
  }, [name])

  // On mount, attempt to load profile from server (merge/extend later)
  useEffect(() => {
    async function loadProfile() {
      if (!name) return
      try {
        const res = await fetch(`http://localhost:3001/profiles/${encodeURIComponent(name)}`)
        if (!res.ok) return
        const profile = await res.json()
        if (profile && profile.name && profile.name !== name) {
          // if server has a canonical name, prefer it (optional)
          setName(profile.name)
        }
      } catch (e) {
        // ignore
      }
    }
    loadProfile()
    // run only on mount (name initial value used)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PlayerContext.Provider value={{ name, setName }}>
      {children}
    </PlayerContext.Provider>
  )
}
