import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import markets from "../data/markets.json";
import produce from "../data/produce.json";
import { pageImage, produceImage } from "../utils/images";
import { currentMonth, inSeason } from "../utils/season";
import { distanceKm } from "../utils/geo";
import useClock from "../hooks/useClock";
import useGeolocation from "../hooks/useGeolocation";
import MarketCard from "../components/MarketCard";
import logoOnDark from "../assets/images/brand/logo-on-dark.webp";
import "../styles/home.css";

const days = [
  { value: "mon", label: "Monday" },
  { value: "tue", label: "Tuesday" },
  { value: "wed", label: "Wednesday" },
  { value: "thu", label: "Thursday" },
  { value: "fri", label: "Friday" },
  { value: "sat", label: "Saturday" },
  { value: "sun", label: "Sunday" },
];

const areas = [...new Set(markets.map((market) => market.area))].sort();
const produceOptions = [...produce].sort((a, b) =>
  a.name.localeCompare(b.name),
);

function PinIcon() {
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
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function CalendarIcon() {
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
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </svg>
  );
}

function LeafIcon() {
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
      <path d="M5 19c8 1 14-5 14-14-9 0-15 6-14 14z" />
      <path d="M5 19c3-5 7-9 12-12" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

function ArrowIcon() {
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
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function locationLabel(status) {
  if (status === "granted") return "Sorted by distance";
  if (status === "loading") return "Finding you...";
  if (status === "denied") return "Location blocked";
  if (status === "unsupported") return "Location unavailable";
  return "Use my location";
}

export default function Home() {
  const navigate = useNavigate();
  const now = useClock();
  const { status, coords, request } = useGeolocation();
  const [area, setArea] = useState("");
  const [day, setDay] = useState("");
  const [item, setItem] = useState("");

  const month = currentMonth(now);
  const seasonal = produce
    .filter((entry) => inSeason(entry, month))
    .sort((a, b) => a.season.length - b.season.length)
    .slice(0, 4);

  const nearby =
    status === "granted" && coords
      ? markets
          .map((market) => ({
            market,
            distance: distanceKm(
              coords.lat,
              coords.lng,
              market.lat,
              market.lng,
            ),
          }))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 4)
      : markets
          .filter((market) => market.featured)
          .map((market) => ({ market }));

  const hasFilters = Boolean(area || day || item);
  const matches = markets.filter((market) => {
    if (area && market.area !== area) return false;
    if (day && !market.schedule[day]) return false;
    if (item && !market.produce.includes(item)) return false;
    return true;
  });
  const shown = hasFilters ? matches.map((market) => ({ market })) : nearby;

  function clearFilters() {
    setArea("");
    setDay("");
    setItem("");
  }

  function handleSearch(event) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (area) params.set("area", area);
    if (day) params.set("day", day);
    if (item) params.set("produce", item);
    const query = params.toString();
    navigate(query ? `/directory?${query}` : "/directory");
  }

  return (
    <div className="home">
      <section
        className="home-hero"
        style={{ backgroundImage: `url(${pageImage("hero")})` }}
      >
        <div className="home-hero-inner">
          <div className="home-hero-logo">
            <img src={logoOnDark} alt="" />
            <span>FreshFind</span>
          </div>
          <h1 className="home-hero-title">
            Discover Lagos&apos; farmers markets
          </h1>
          <p className="home-hero-subtitle">
            Fresh produce. Local farmers. Healthy communities.
          </p>

          <form className="home-search" onSubmit={handleSearch}>
            <div className="home-search-field">
              <span className="home-search-icon">
                <PinIcon />
              </span>
              <span className="home-search-text">
                <span className="home-search-label">Where</span>
                <select
                  value={area}
                  onChange={(event) => setArea(event.target.value)}
                  aria-label="Area"
                >
                  <option value="">Select area</option>
                  {areas.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </span>
            </div>

            <div className="home-search-field">
              <span className="home-search-icon">
                <CalendarIcon />
              </span>
              <span className="home-search-text">
                <span className="home-search-label">When</span>
                <select
                  value={day}
                  onChange={(event) => setDay(event.target.value)}
                  aria-label="Day of week"
                >
                  <option value="">Select day of week</option>
                  {days.map((entry) => (
                    <option key={entry.value} value={entry.value}>
                      {entry.label}
                    </option>
                  ))}
                </select>
              </span>
            </div>

            <div className="home-search-field">
              <span className="home-search-icon">
                <LeafIcon />
              </span>
              <span className="home-search-text">
                <span className="home-search-label">What</span>
                <select
                  value={item}
                  onChange={(event) => setItem(event.target.value)}
                  aria-label="Produce type"
                >
                  <option value="">Select produce type</option>
                  {produceOptions.map((entry) => (
                    <option key={entry.id} value={entry.id}>
                      {entry.name}
                    </option>
                  ))}
                </select>
              </span>
            </div>

            <button
              type="submit"
              className="home-search-button"
              aria-label="Search markets"
            >
              <SearchIcon />
            </button>
          </form>
        </div>
      </section>

      <section className="home-section home-section-markets">
        <div className="container">
          <div className="home-section-head">
            <div>
              <h2>
                {hasFilters
                  ? `${matches.length} matching ${matches.length === 1 ? "market" : "markets"}`
                  : "Markets near you"}
              </h2>
              <p className="home-section-sub">
                {hasFilters
                  ? "Results update as you change the search above"
                  : "Fresh produce, local farmers, and great vibes"}
              </p>
            </div>
            <div className="home-section-actions">
              {hasFilters ? (
                <button
                  type="button"
                  className="home-location"
                  onClick={clearFilters}
                >
                  Clear search
                </button>
              ) : (
                <button
                  type="button"
                  className="home-location"
                  onClick={request}
                  disabled={status === "loading" || status === "granted"}
                >
                  {locationLabel(status)}
                </button>
              )}
              <Link to="/directory" className="home-link">
                View all markets <ArrowIcon />
              </Link>
            </div>
          </div>

          {shown.length === 0 ? (
            <p className="home-empty">
              No market matches that search yet. Try another day or produce, or
              clear the search.
            </p>
          ) : (
            <div className="home-market-grid">
              {shown.map(({ market, distance }) => (
                <MarketCard
                  key={market.id}
                  market={market}
                  distance={distance}
                  now={now}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="home-section home-section-season">
        <div className="container">
          <div className="home-section-head">
            <div>
              <h2>In season this week</h2>
              <p className="home-section-sub">
                Fresh, local and full of flavour
              </p>
            </div>
            <Link to="/seasonal" className="home-link">
              See all seasonal picks <ArrowIcon />
            </Link>
          </div>

          {seasonal.length === 0 ? (
            <p className="home-empty">
              Nothing is at peak season this month. Check the Produce Guide for
              what is available all year.
            </p>
          ) : (
            <div className="home-season-grid">
              {seasonal.map((entry) => (
                <Link key={entry.id} to="/produce" className="home-season-item">
                  <img
                    src={produceImage(entry.image)}
                    alt={entry.name}
                    loading="lazy"
                  />
                  <h3 className="home-season-name">{entry.name}</h3>
                  <p className="home-season-text">{entry.description}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
