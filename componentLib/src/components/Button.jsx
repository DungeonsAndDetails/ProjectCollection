import React from 'react'

export default function Button({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={"pc-button " + className}
      style={{ padding: '8px 14px', borderRadius: 6 }}
    >
      {children}
    </button>
  )
}
