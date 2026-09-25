import { useState } from 'react'
import '../styles/chatbot.css'

function ChatIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && (
        <div className="chatbot-panel" role="dialog" aria-label="Fresh Assistant">
          <h4 className="chatbot-header">Fresh Assistant</h4>
          <p className="chatbot-body">Coming soon</p>
        </div>
      )}

      <button
        type="button"
        className="chatbot-button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close Fresh Assistant' : 'Open Fresh Assistant'}
      >
        <ChatIcon />
      </button>
    </>
  )
}
