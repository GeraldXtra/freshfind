import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import data from "../data/chatbot.json";
import { answerQuestion } from "../utils/chatbot";
import useGeolocation from "../hooks/useGeolocation";
import avatar from "../assets/images/brand/chatbot-avatar.png";
import "../styles/chatbot.css";

let nextId = 1;

function makeMessage(from, text, link = null) {
  nextId += 1;
  return { id: nextId, from, text, link };
}

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
  );
}

function CloseIcon() {
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
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

function SendIcon() {
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
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4z" />
    </svg>
  );
}

function ChevronIcon() {
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
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => [
    makeMessage("bot", data.greeting),
  ]);
  const [chips, setChips] = useState(data.quickReplies);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const { status, coords, request } = useGeolocation();
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (listRef.current)
      listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typing, open]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function send(text) {
    const question = text.trim();
    if (!question || typing) return;
    setMessages((list) => [...list, makeMessage("user", question)]);
    setInput("");
    setTyping(true);
    const answer = answerQuestion(question, {
      now: new Date(),
      coords: status === "granted" ? coords : null,
    });
    if (answer.action === "near-me" && status !== "granted") request();
    setTimeout(() => {
      setMessages((list) => [
        ...list,
        makeMessage("bot", answer.text, answer.link),
      ]);
      setChips(answer.quickReplies || data.quickReplies);
      setTyping(false);
    }, 500);
  }

  function handleSubmit(event) {
    event.preventDefault();
    send(input);
  }

  return (
    <>
      {open && (
        <div
          className="chatbot-panel"
          role="dialog"
          aria-label="Fresh Assistant"
        >
          <div className="chatbot-header">
            <img src={avatar} alt="" className="chatbot-avatar" />
            <div className="chatbot-header-text">
              <strong>Fresh Assistant</strong>
              <span className="chatbot-status">
                <span className="chatbot-status-dot" />
                Online
              </span>
            </div>
            <button
              type="button"
              className="chatbot-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="chatbot-messages" ref={listRef}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.from === "bot"
                    ? "chatbot-row is-bot"
                    : "chatbot-row is-user"
                }
              >
                {message.from === "bot" && (
                  <img src={avatar} alt="" className="chatbot-row-avatar" />
                )}
                <div className="chatbot-bubble">
                  <p>{message.text}</p>
                  {message.link && (
                    <Link
                      to={message.link.to}
                      className="chatbot-link"
                      onClick={() => setOpen(false)}
                    >
                      {message.link.label}
                      <ChevronIcon />
                    </Link>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="chatbot-row is-bot">
                <img src={avatar} alt="" className="chatbot-row-avatar" />
                <div className="chatbot-bubble chatbot-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>

          <div className="chatbot-chips">
            {chips.map((chip) => (
              <button
                key={chip}
                type="button"
                className="chatbot-chip"
                onClick={() => send(chip)}
              >
                {chip}
              </button>
            ))}
          </div>

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your question..."
              aria-label="Your question"
            />
            <button type="submit" className="chatbot-send" aria-label="Send">
              <SendIcon />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className="chatbot-button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close Fresh Assistant" : "Open Fresh Assistant"}
      >
        <ChatIcon />
      </button>
    </>
  );
}
