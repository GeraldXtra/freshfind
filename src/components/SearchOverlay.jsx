import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import markets from "../data/markets.json";
import produce from "../data/produce.json";
import "../styles/search-overlay.css";

function SearchIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return undefined;
    setQuery("");
    if (inputRef.current) inputRef.current.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const text = query.trim().toLowerCase();
  const marketMatches = text
    ? markets
        .filter(
          (market) =>
            market.name.toLowerCase().includes(text) ||
            market.area.toLowerCase().includes(text),
        )
        .slice(0, 4)
    : [];
  const produceMatches = text
    ? produce
        .filter((item) => item.name.toLowerCase().includes(text))
        .slice(0, 4)
    : [];

  function handleSubmit(event) {
    event.preventDefault();
    if (!text) return;
    navigate(`/directory?q=${encodeURIComponent(query.trim())}`);
    onClose();
  }

  return (
    <div className="search-overlay" onClick={onClose}>
      <div
        className="search-panel"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-label="Search FreshFind"
      >
        <form className="search-form" onSubmit={handleSubmit}>
          <SearchIcon />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search markets, areas or produce"
            aria-label="Search markets, areas or produce"
          />
          <button
            type="button"
            className="search-close"
            onClick={onClose}
            aria-label="Close search"
          >
            <CloseIcon />
          </button>
        </form>

        {text && marketMatches.length === 0 && produceMatches.length === 0 && (
          <p className="search-empty">
            Nothing matches that yet. Press Enter to search the full directory.
          </p>
        )}

        {marketMatches.length > 0 && (
          <div className="search-group">
            <p className="search-group-title">Markets</p>
            {marketMatches.map((market) => (
              <Link
                key={market.id}
                to={`/market/${market.id}`}
                className="search-result"
                onClick={onClose}
              >
                <span>{market.name}</span>
                <span className="search-result-sub">{market.area}</span>
              </Link>
            ))}
          </div>
        )}

        {produceMatches.length > 0 && (
          <div className="search-group">
            <p className="search-group-title">Produce</p>
            {produceMatches.map((item) => (
              <Link
                key={item.id}
                to={`/directory?produce=${item.id}`}
                className="search-result"
                onClick={onClose}
              >
                <span>{item.name}</span>
                <span className="search-result-sub">Markets that sell it</span>
              </Link>
            ))}
          </div>
        )}

        <p className="search-hint">
          Press Enter to see all matching markets in the directory
        </p>
      </div>
    </div>
  );
}
