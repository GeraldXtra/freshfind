import { useState } from "react";
import { Link } from "react-router-dom";
import markets from "../data/markets.json";
import produce from "../data/produce.json";
import { marketImage, produceImage } from "../utils/images";
import { hoursLabel } from "../utils/schedule";
import { seasonLabel } from "../utils/season";
import { whatsappShareUrl, xShareUrl, facebookShareUrl } from "../utils/links";
import useBookmarks from "../hooks/useBookmarks";
import Breadcrumbs from "../components/Breadcrumbs";
import "../styles/bookmarks.css";

function PinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      <path d="M14 3v6h6M8 13h8M8 17h5" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v12M6 11l6 6 6-6M4 21h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
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

function WhatsAppIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 22v-8.2h2.8l.4-3.3h-3.2V8.4c0-.9.3-1.6 1.6-1.6h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.3h2.8V22h3.4z" />
    </svg>
  );
}

function marketNames(ids) {
  return ids.map((id) => {
    const market = markets.find((entry) => entry.id === id);
    return market ? market.name : id;
  });
}

export default function Bookmarks() {
  const {
    markets: savedMarketIds,
    produce: savedProduceIds,
    remove,
    setNote,
    getNote,
    clearAll,
    count,
  } = useBookmarks();
  const savedMarkets = savedMarketIds
    .map((id) => markets.find((entry) => entry.id === id))
    .filter(Boolean);
  const savedProduce = savedProduceIds
    .map((id) => produce.find((entry) => entry.id === id))
    .filter(Boolean);
  const [tab, setTab] = useState(
    savedMarkets.length === 0 && savedProduce.length > 0
      ? "produce"
      : "markets",
  );
  const [status, setStatus] = useState("");

  const siteUrl = `${window.location.origin}${import.meta.env.BASE_URL}`;

  function buildList() {
    const lines = [
      `FreshFind bookmarks (${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })})`,
      "",
    ];
    lines.push("Markets");
    if (savedMarkets.length === 0) lines.push("- None saved");
    savedMarkets.forEach((market) => {
      const note = getNote(market.id);
      lines.push(
        `- ${market.name}, ${market.area}. ${hoursLabel(market.schedule)}.${note ? ` Note: ${note}` : ""}`,
      );
    });
    lines.push("", "Produce");
    if (savedProduce.length === 0) lines.push("- None saved");
    savedProduce.forEach((item) => {
      const note = getNote(item.id);
      lines.push(
        `- ${item.name}. In season ${seasonLabel(item.season)}. Found at ${marketNames(item.markets).join(", ")}.${note ? ` Note: ${note}` : ""}`,
      );
    });
    lines.push("", `Made with FreshFind: ${siteUrl}`);
    return lines.join("\n");
  }

  async function handleExport() {
    const text = buildList();
    let copied = false;
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      copied = false;
    }
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "freshfind-bookmarks.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setStatus(copied ? "List copied and downloaded" : "List downloaded");
    setTimeout(() => setStatus(""), 3000);
  }

  const shareText = count
    ? `My FreshFind picks: ${[...savedMarkets.map((market) => market.name), ...savedProduce.map((item) => item.name)].join(", ")}. Find Lagos farmers markets at ${siteUrl}`
    : `Find Lagos farmers markets, opening hours and what's in season at ${siteUrl}`;

  return (
    <div className="bookmarks">
      <div className="container">
        <Breadcrumbs
          trail={[{ label: "Home", to: "/" }, { label: "My Bookmarks" }]}
        />

        <div className="bookmarks-head">
          <div>
            <h1>My Bookmarks</h1>
            <p className="bookmarks-sub">Saved for this session.</p>
          </div>
          <div className="bookmarks-actions">
            <button
              type="button"
              className="bookmarks-export"
              onClick={handleExport}
              disabled={count === 0}
            >
              <DownloadIcon />
              Export list
            </button>
            <div className="bookmarks-share">
              <span>Share:</span>
              <a
                href={whatsappShareUrl(shareText)}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on WhatsApp"
              >
                <WhatsAppIcon />
              </a>
              <a
                href={xShareUrl(shareText)}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on X"
              >
                <XIcon />
              </a>
              <a
                href={facebookShareUrl(siteUrl)}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on Facebook"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>

        {status && (
          <p className="bookmarks-status" role="status">
            {status}
          </p>
        )}

        <div className="bookmarks-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "markets"}
            className={
              tab === "markets" ? "bookmarks-tab is-active" : "bookmarks-tab"
            }
            onClick={() => setTab("markets")}
          >
            Markets ({savedMarkets.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "produce"}
            className={
              tab === "produce" ? "bookmarks-tab is-active" : "bookmarks-tab"
            }
            onClick={() => setTab("produce")}
          >
            Produce ({savedProduce.length})
          </button>
          {count > 0 && (
            <button
              type="button"
              className="bookmarks-clear"
              onClick={clearAll}
            >
              Clear all
            </button>
          )}
        </div>

        {tab === "markets" &&
          (savedMarkets.length === 0 ? (
            <div className="bookmarks-empty">
              <p>
                No markets saved yet. Tap the bookmark icon on any market card
                to keep it here for this session.
              </p>
              <Link to="/directory" className="btn-primary">
                Browse the directory
              </Link>
            </div>
          ) : (
            <div className="bookmarks-list">
              {savedMarkets.map((market) => (
                <article key={market.id} className="card bookmarks-item">
                  <Link
                    to={`/market/${market.id}`}
                    className="bookmarks-item-media"
                  >
                    <img
                      src={marketImage(market.image)}
                      alt={market.name}
                      loading="lazy"
                    />
                  </Link>
                  <div className="bookmarks-item-body">
                    <h2 className="bookmarks-item-title">
                      <Link to={`/market/${market.id}`}>{market.name}</Link>
                    </h2>
                    <p className="bookmarks-item-meta">
                      <PinIcon />
                      {market.area}
                    </p>
                    <p className="bookmarks-item-meta">
                      <ClockIcon />
                      {hoursLabel(market.schedule)}
                    </p>
                    <label className="bookmarks-note">
                      <NoteIcon />
                      <input
                        type="text"
                        value={getNote(market.id) || ""}
                        onChange={(event) =>
                          setNote(market.id, event.target.value)
                        }
                        placeholder="Add a note for this session"
                        maxLength={80}
                      />
                    </label>
                  </div>
                  <button
                    type="button"
                    className="bookmarks-remove"
                    onClick={() => remove("market", market.id)}
                    aria-label={`Remove ${market.name} from bookmarks`}
                  >
                    <CloseIcon />
                  </button>
                </article>
              ))}
            </div>
          ))}

        {tab === "produce" &&
          (savedProduce.length === 0 ? (
            <div className="bookmarks-empty">
              <p>
                No produce saved yet. Tap the bookmark icon on any produce card
                to keep it here for this session.
              </p>
              <Link to="/produce" className="btn-primary">
                Open the produce guide
              </Link>
            </div>
          ) : (
            <div className="bookmarks-list">
              {savedProduce.map((item) => (
                <article key={item.id} className="card bookmarks-item">
                  <Link to="/produce" className="bookmarks-item-media is-round">
                    <img
                      src={produceImage(item.image)}
                      alt={item.name}
                      loading="lazy"
                    />
                  </Link>
                  <div className="bookmarks-item-body">
                    <h2 className="bookmarks-item-title">
                      <Link to="/produce">{item.name}</Link>
                    </h2>
                    <p className="bookmarks-item-meta">
                      <ClockIcon />
                      In season {seasonLabel(item.season)}
                    </p>
                    <p className="bookmarks-item-meta">
                      <PinIcon />
                      Found at {marketNames(item.markets).join(", ")}
                    </p>
                    <label className="bookmarks-note">
                      <NoteIcon />
                      <input
                        type="text"
                        value={getNote(item.id) || ""}
                        onChange={(event) =>
                          setNote(item.id, event.target.value)
                        }
                        placeholder="Add a note for this session"
                        maxLength={80}
                      />
                    </label>
                  </div>
                  <button
                    type="button"
                    className="bookmarks-remove"
                    onClick={() => remove("produce", item.id)}
                    aria-label={`Remove ${item.name} from bookmarks`}
                  >
                    <CloseIcon />
                  </button>
                </article>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
