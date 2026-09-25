import { Link } from "react-router-dom";
import { marketImage } from "../utils/images";
import { hoursLabel, openBadge } from "../utils/schedule";
import BookmarkButton from "./BookmarkButton";
import "../styles/market-card.css";

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

function ClockIcon() {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export default function MarketCard({ market, distance, now }) {
  const badge = openBadge(market.schedule, now);
  const href = `/market/${market.id}`;

  return (
    <article className="card market-card">
      <div className="market-card-media">
        <Link to={href} className="market-card-image-link">
          <img
            src={marketImage(market.image)}
            alt={market.name}
            loading="lazy"
          />
        </Link>
        <span
          className={
            badge.open ? "market-card-badge is-open" : "market-card-badge"
          }
        >
          {badge.text}
        </span>
        <div className="market-card-bookmark">
          <BookmarkButton type="market" id={market.id} label={market.name} />
        </div>
      </div>
      <div className="market-card-body">
        <h3 className="market-card-title">
          <Link to={href}>{market.name}</Link>
        </h3>
        <p className="market-card-meta">
          <PinIcon />
          <span>{market.area}</span>
          {distance !== undefined && (
            <span className="market-card-distance">· {distance} km away</span>
          )}
        </p>
        <p className="market-card-meta">
          <ClockIcon />
          <span>{hoursLabel(market.schedule)}</span>
        </p>
        <p className="market-card-text">{market.description}</p>
      </div>
    </article>
  );
}
