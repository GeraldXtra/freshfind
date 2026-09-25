import { useEffect } from 'react'

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'var(--space-5)',
  background: 'color-mix(in srgb, var(--color-green-900) 55%, transparent)',
}

const panelStyle = {
  width: '100%',
  maxWidth: '560px',
  padding: 'var(--space-5)',
  background: 'var(--color-surface)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-float)',
}

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-3)',
}

const inputStyle = {
  flex: 1,
  minWidth: 0,
  padding: 'var(--space-3) var(--space-4)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  font: 'inherit',
  color: 'var(--color-text)',
}

const closeStyle = {
  flexShrink: 0,
  width: '40px',
  height: '40px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: 'var(--radius-pill)',
  background: 'var(--color-green-soft)',
  color: 'var(--color-green-900)',
  cursor: 'pointer',
}

const hintStyle = {
  margin: 'var(--space-3) 0 0',
  fontSize: '0.9rem',
  color: 'var(--color-text-muted)',
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

// Full-screen search overlay. Closes via the X button or the Escape key.
export default function SearchOverlay({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div style={overlayStyle} role="dialog" aria-modal="true" aria-label="Search">
      <div style={panelStyle}>
        <div style={rowStyle}>
          <input
            type="search"
            autoFocus
            placeholder="Search markets, areas or produce"
            aria-label="Search markets, areas or produce"
            style={inputStyle}
          />
          <button type="button" onClick={onClose} aria-label="Close search" style={closeStyle}>
            <CloseIcon />
          </button>
        </div>
        <p style={hintStyle}>Search results coming soon</p>
      </div>
    </div>
  )
}
