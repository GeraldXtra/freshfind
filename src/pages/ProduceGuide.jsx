<<<<<<< HEAD
=======
import { useState } from "react";
import { Link } from "react-router-dom";
import produce from "../data/produce.json";
import markets from "../data/markets.json";
import { produceImage } from "../utils/images";
import { currentMonth, inSeason, seasonLabel } from "../utils/season";
import useClock from "../hooks/useClock";
import Breadcrumbs from "../components/Breadcrumbs";
import BookmarkButton from "../components/BookmarkButton";
import "../styles/produce-guide.css";

const categories = [
  { id: "all", label: "All" },
  { id: "fruits", label: "Fruits" },
  { id: "vegetables", label: "Vegetables" },
  { id: "herbs-spices", label: "Herbs & Spices" },
  { id: "grains-tubers", label: "Grains & Tubers" },
  { id: "dairy-protein", label: "Dairy & Protein" },
];

function LeafIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 19c8 1 14-5 14-14-9 0-15 6-14 14z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      width="14"
      height="14"
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

function marketName(id) {
  const market = markets.find((entry) => entry.id === id);
  return market
    ? market.name.replace(" Farmers Market", "").replace(" Market", "")
    : id;
}

export default function ProduceGuide() {
  const now = useClock();
  const month = currentMonth(now);
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const text = query.trim().toLowerCase();
  const items = produce.filter((item) => {
    if (category !== "all" && item.category !== category) return false;
    if (text && !item.name.toLowerCase().includes(text)) return false;
    return true;
  });

  return (
    <div className="guide">
      <div className="container">
        <Breadcrumbs
          trail={[{ label: "Home", to: "/" }, { label: "Produce Guide" }]}
        />

        <div className="guide-head">
          <div>
            <h1>Produce Guide</h1>
            <p className="guide-sub">
              Know what's fresh, when it's in season, and where to find it.
            </p>
          </div>
          <input
            type="search"
            className="guide-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search produce"
            aria-label="Search produce"
          />
        </div>

        <div className="guide-tabs" role="tablist">
          {categories.map((entry) => (
            <button
              key={entry.id}
              type="button"
              role="tab"
              aria-selected={category === entry.id}
              className={
                category === entry.id ? "guide-tab is-active" : "guide-tab"
              }
              onClick={() => setCategory(entry.id)}
            >
              {entry.label}
            </button>
          ))}
        </div>

        {items.length === 0 ? (
          <p className="guide-empty">
            Nothing matches that search in this category.
          </p>
        ) : (
          <div className="guide-grid">
            {items.map((item) => {
              const found = item.markets.map(marketName);
              const shown = found.slice(0, 2);
              const more = found.length - shown.length;
              const inSeasonNow = inSeason(item, month);
              return (
                <article key={item.id} className="card guide-card">
                  <div className="guide-card-bookmark">
                    <BookmarkButton
                      type="produce"
                      id={item.id}
                      label={item.name}
                    />
                  </div>
                  <img
                    src={produceImage(item.image)}
                    alt={item.name}
                    className="guide-card-image"
                    loading="lazy"
                  />
                  <h2 className="guide-card-title">{item.name}</h2>
                  <span
                    className={
                      inSeasonNow ? "guide-badge is-now" : "guide-badge"
                    }
                  >
                    <LeafIcon />
                    In season: {seasonLabel(item.season)}
                  </span>
                  <p className="guide-card-text">{item.description}</p>
                  <div className="guide-card-found">
                    <p className="guide-card-found-label">
                      <PinIcon />
                      Found at:
                    </p>
                    <p className="guide-card-found-list">
                      {item.markets.slice(0, 2).map((id, index) => (
                        <span key={id}>
                          {index > 0 && ", "}
                          <Link to={`/market/${id}`}>{marketName(id)}</Link>
                        </span>
                      ))}
                      {more > 0 && (
                        <Link to={`/directory?produce=${item.id}`}>
                          {" "}
                          +{more} more
                        </Link>
                      )}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
>>>>>>> 4ed7ca5b975d32e15184de95b23af7ea7d18dde5
