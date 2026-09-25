import { useState } from 'react'

const buttonStyle = {
  position: 'fixed',
  right: 'var(--space-5)',
  bottom: 'var(--space-5)',
  zIndex: 900,
  width: '56px',
  height: '56px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: 'var(--radius-pill)',
  background: 'var(--color-green-700)',
  color: 'var(--color-surface)',
  boxShadow: 'var(--shadow-float)',
  cursor: 'pointer',
}

const panelStyle = {
  position: 'fixed',
  right: 'var(--space-5)',
  bottom: 'calc(var(--space-5) + 56px + var(--space-3))',
  zIndex: 900,
  width: '320px',
  maxWidth: 'calc(100vw - 2 * var(--space-5))',
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: 'var(--shadow-float)',
  overflow: 'hidden',
}

const headerStyle = {
  margin: 0,
  padding: 'var(--space-3) var(--space-4)',
  borderBottom: '1px solid var(--color-border)',
  fontSize: '1rem',
}

const bodyStyle = {
  margin: 0,
  padding: 'var(--space-5) var(--space-4)',
  color: 'var(--color-text-muted)',
}

function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

// Floating chat button. The panel is a placeholder, real assistant logic comes later.
export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && (
        <div style={panelStyle} role="dialog" aria-label="Fresh Assistant">
          <h4 style={headerStyle}>Fresh Assistant</h4>
          <p style={bodyStyle}>Coming soon</p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close Fresh Assistant' : 'Open Fresh Assistant'}
        style={buttonStyle}
      >
        <ChatIcon />
      </button>
    </>
  )
}
