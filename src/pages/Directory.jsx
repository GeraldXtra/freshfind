import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import markets from "../data/markets.json";
import produce from "../data/produce.json";
import { DAY_KEYS, isOpenNow } from "../utils/schedule";
import { distanceKm } from "../utils/geo";
import useClock from "../hooks/useClock";
import useGeolocation from "../hooks/useGeolocation";
import Breadcrumbs from "../components/Breadcrumbs";
import MarketCard from "../components/MarketCard";
import "../styles/directory.css";

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

function daysUntilOpen(schedule, now) {
  for (let offset = 0; offset < 7; offset += 1) {
    const key = DAY_KEYS[(now.getDay() + offset) % 7];
    if (schedule[key]) return offset;
  }
  return 7;
}

function locationLabel(status) {
  if (status === "granted") return "Location on";
  if (status === "loading") return "Finding you...";
  if (status === "denied") return "Location blocked";
  if (status === "unsupported") return "Location unavailable";
  return "Use my location";
}

export default function Directory() {
  const [searchParams] = useSearchParams();
  const now = useClock();
  const { status, coords, request } = useGeolocation();

  const [area, setArea] = useState("");
  const [day, setDay] = useState("");
  const [item, setItem] = useState("");
  const [openOnly, setOpenOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("name");

  useEffect(() => {
    setArea(searchParams.get("area") || "");
    setDay(searchParams.get("day") || "");
    setItem(searchParams.get("produce") || "");
    setOpenOnly(searchParams.get("open") === "1");
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const hasLocation = status === "granted" && coords;
  const text = query.trim().toLowerCase();

  const filtered = markets.filter((market) => {
    if (area && market.area !== area) return false;
    if (day && !market.schedule[day]) return false;
    if (item && !market.produce.includes(item)) return false;
    if (openOnly && !isOpenNow(market.schedule, now)) return false;
    if (text) {
      const inName = market.name.toLowerCase().includes(text);
      const inArea = market.area.toLowerCase().includes(text);
      if (!inName && !inArea) return false;
    }
    return true;
  });

  const withDistance = filtered.map((market) => ({
    market,
    distance: hasLocation
      ? distanceKm(coords.lat, coords.lng, market.lat, market.lng)
      : undefined,
  }));

  const sorted = [...withDistance];
  if (sort === "name") {
    sorted.sort((a, b) => a.market.name.localeCompare(b.market.name));
  }
  if (sort === "next") {
    sorted.sort(
      (a, b) =>
        daysUntilOpen(a.market.schedule, now) -
        daysUntilOpen(b.market.schedule, now),
    );
  }
  if (sort === "distance" && hasLocation) {
    sorted.sort((a, b) => a.distance - b.distance);
  }

  const hasFilters = Boolean(area || day || item || openOnly || text);

  function clearFilters() {
    setArea("");
    setDay("");
    setItem("");
    setOpenOnly(false);
    setQuery("");
  }

  return (
    <div className="directory">
      <div className="container">
        <Breadcrumbs
          trail={[{ label: "Home", to: "/" }, { label: "Market Directory" }]}
        />

        <div className="directory-head">
          <h1>All Farmers Markets</h1>
          <p className="directory-sub">{markets.length} markets across Lagos</p>
        </div>

        <div className="directory-filters">
          <select
            value={area}
            onChange={(event) => setArea(event.target.value)}
            aria-label="Area"
            className="directory-select"
          >
            <option value="">All areas</option>
            {areas.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          <select
            value={day}
            onChange={(event) => setDay(event.target.value)}
            aria-label="Day of week"
            className="directory-select"
          >
            <option value="">Any day of week</option>
            {days.map((entry) => (
              <option key={entry.value} value={entry.value}>
                {entry.label}
              </option>
            ))}
          </select>

          <select
            value={item}
            onChange={(event) => setItem(event.target.value)}
            aria-label="Produce type"
            className="directory-select"
          >
            <option value="">Produce type</option>
            {produceOptions.map((entry) => (
              <option key={entry.id} value={entry.id}>
                {entry.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            className={openOnly ? "directory-toggle is-on" : "directory-toggle"}
            onClick={() => setOpenOnly(!openOnly)}
            aria-pressed={openOnly}
          >
            <span className="directory-toggle-knob" />
            Open now
          </button>

          <div className="directory-filters-right">
            <button
              type="button"
              className="directory-location"
              onClick={request}
              disabled={status === "loading" || status === "granted"}
            >
              {locationLabel(status)}
            </button>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort markets"
              className="directory-select"
            >
              <option value="name">Sort: Name</option>
              <option value="next">Sort: Next open day</option>
              {hasLocation && <option value="distance">Sort: Distance</option>}
            </select>
          </div>
        </div>

        <div className="directory-results">
          <p className="directory-count">
            {text ? `Results for "${query.trim()}": ` : ""}
            {sorted.length} {sorted.length === 1 ? "market" : "markets"}
          </p>
          {hasFilters && (
            <button
              type="button"
              className="directory-clear"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          )}
        </div>

        {sorted.length === 0 ? (
          <div className="directory-empty">
            <p>No market matches those filters right now.</p>
            <button
              type="button"
              className="btn-primary"
              onClick={clearFilters}
            >
              Show all markets
            </button>
          </div>
        ) : (
          <div className="directory-grid">
            {sorted.map(({ market, distance }) => (
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
    </div>
  );
}
