import React, { useContext, useEffect, useState } from 'react'
import { PlayerContext } from '../../PlayerContext'
import { socket } from '../../socket'

export default function ProfileEditor({ onClose }) {
  const { name, setName } = useContext(PlayerContext)
  const [displayName, setDisplayName] = useState(name || '')
  const [avatarColor, setAvatarColor] = useState('#4caf50')
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function load() {
      const n = String(displayName || name || '').trim()
      if (!n) return
      try {
        setLoading(true)
        const res = await fetch(`http://localhost:3001/profiles/${encodeURIComponent(n)}`)
        if (!res.ok) return
        const p = await res.json()
        if (p) {
          if (p.name) setDisplayName(p.name)
          if (p.avatarColor) setAvatarColor(p.avatarColor)
          if (p.bio) setBio(p.bio)
        }
      } catch (e) {
        // ignore
      } finally {
        setLoading(false)
      }
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function save() {
    const n = String(displayName || '').trim()
    if (!n) return
    const payload = { name: n, avatarColor, bio, updatedAt: Date.now() }
    try {
      setLoading(true)
      await fetch(`http://localhost:3001/profiles/${encodeURIComponent(n)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      setName(n)
      try { localStorage.setItem('playerName', n) } catch (e) {}
      try { if (socket && socket.emit) socket.emit('join', n) } catch (e) {}
      onClose && onClose()
    } catch (e) {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  const container = {
    position: 'absolute', left: 20, top: 20, zIndex: 40,
    minWidth: 300, maxWidth: 420,
    background: 'linear-gradient(180deg, rgba(16,18,20,0.95), rgba(10,12,14,0.95))',
    color: '#fff', padding: 16, borderRadius: 10, boxShadow: '0 6px 18px rgba(0,0,0,0.6)'
  }
  const label = { display: 'block', fontSize: 12, marginBottom: 6, color: '#cfcfcf' }
  const input = { width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: '#fff' }
  const textarea = { ...input, minHeight: 66 }
  const footer = { display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }
  const btn = { padding: '8px 12px', borderRadius: 6, border: 'none', cursor: 'pointer' }

  return (
    <div style={container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <strong style={{ fontSize: 16 }}>Profile</strong>
        <button onClick={() => onClose && onClose()} style={{ background: 'transparent', color: '#fff', border: 'none', fontSize: 18 }}>✕</button>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <label style={label}>Display name</label>
          <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} style={input} />

          <label style={{ ...label, marginTop: 10 }}>Bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} style={textarea} />

          <label style={{ ...label, marginTop: 10 }}>Avatar color</label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="color" value={avatarColor} onChange={(e) => setAvatarColor(e.target.value)} style={{ width: 48, height: 32, padding: 0, border: 'none', background: 'transparent' }} />
            <div style={{ color: '#cfcfcf', fontSize: 12 }}>{avatarColor}</div>
          </div>
        </div>

        <div style={{ width: 110, textAlign: 'center' }}>
          <div style={{ width: 88, height: 88, borderRadius: 12, background: avatarColor, margin: '0 auto 8px', boxShadow: 'inset 0 -8px 18px rgba(0,0,0,0.25)' }} />
          <div style={{ fontSize: 12, color: '#cfcfcf' }}>Preview</div>
        </div>
      </div>

      <div style={footer}>
        <button onClick={() => onClose && onClose()} style={{ ...btn, background: 'transparent', color: '#ddd' }}>Cancel</button>
        <button onClick={save} disabled={!displayName || loading} style={{ ...btn, background: '#4caf50', color: '#fff' }}>{loading ? 'Saving...' : 'Save'}</button>
      </div>
    </div>
  )
}
