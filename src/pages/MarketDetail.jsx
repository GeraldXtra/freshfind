import { Link, useParams } from "react-router-dom";
import markets from "../data/markets.json";
import produce from "../data/produce.json";
import { marketImage, produceImage } from "../utils/images";
import { DAY_KEYS, formatTime, openBadge } from "../utils/schedule";
import { mapEmbedUrl, directionsUrl } from "../utils/links";
import useClock from "../hooks/useClock";
import useBookmarks from "../hooks/useBookmarks";
import Breadcrumbs from "../components/Breadcrumbs";
import NotFound from "./NotFound";
import "../styles/market-detail.css";

const weekDays = [
  { key: "mon", label: "Monday" },
  { key: "tue", label: "Tuesday" },
  { key: "wed", label: "Wednesday" },
  { key: "thu", label: "Thursday" },
  { key: "fri", label: "Friday" },
  { key: "sat", label: "Saturday" },
  { key: "sun", label: "Sunday" },
];

const dayNames = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

function toMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function nextOpenLabel(schedule, now) {
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  for (let offset = 0; offset < 8; offset += 1) {
    const key = DAY_KEYS[(now.getDay() + offset) % 7];
    const entry = schedule[key];
    if (!entry) continue;
    if (offset === 0 && toMinutes(entry.open) <= nowMinutes) continue;
    if (offset === 0) return `Today at ${formatTime(entry.open)}`;
    if (offset === 1) return `Tomorrow at ${formatTime(entry.open)}`;
    return `${dayNames[key]} at ${formatTime(entry.open)}`;
  }
  return "No opening days listed";
}

function BookmarkIcon({ filled }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function PinIcon() {
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
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function AreaIcon() {
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
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />
    </svg>
  );
}

function ClockIcon() {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function DirectionsIcon() {
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
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
    </svg>
  );
}

export default function MarketDetail() {
  const { id } = useParams();
  const now = useClock();
  const { isSaved, toggle } = useBookmarks();
  const market = markets.find((entry) => entry.id === id);

  if (!market) return <NotFound />;

  const badge = openBadge(market.schedule, now);
  const todayKey = DAY_KEYS[now.getDay()];
  const saved = isSaved("market", market.id);
  const items = market.produce
    .map((produceId) => produce.find((entry) => entry.id === produceId))
    .filter(Boolean);

  return (
    <div className="detail">
      <div className="container">
        <Breadcrumbs
          trail={[
            { label: "Home", to: "/" },
            { label: "Market Directory", to: "/directory" },
            { label: market.name },
          ]}
        />

        <section
          className="detail-banner"
          style={{ backgroundImage: `url(${marketImage(market.image)})` }}
        >
          <span
            className={badge.open ? "detail-badge is-open" : "detail-badge"}
          >
            {badge.text}
          </span>
          <button
            type="button"
            className={saved ? "detail-save is-saved" : "detail-save"}
            onClick={() => toggle("market", market.id)}
          >
            <BookmarkIcon filled={saved} />
            {saved ? "Saved" : "Save this market"}
          </button>
          <h1 className="detail-title">{market.name}</h1>
        </section>

        <div className="detail-grid">
          <div className="card detail-main">
            <section className="detail-section">
              <h2>About this market</h2>
              <p className="detail-about">{market.about}</p>
            </section>

            <section className="detail-section">
              <h2>Weekly Schedule</h2>
              <table className="detail-schedule">
                <tbody>
                  {weekDays.map((day) => {
                    const entry = market.schedule[day.key];
                    const isToday = day.key === todayKey;
                    return (
                      <tr key={day.key} className={isToday ? "is-today" : ""}>
                        <th scope="row">{day.label}</th>
                        <td>
                          {entry
                            ? `${formatTime(entry.open)} – ${formatTime(entry.close)}`
                            : "Closed"}
                        </td>
                        <td className="detail-schedule-tag">
                          {isToday && <span>Today</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>

            <section className="detail-section">
              <h2>Typical Produce</h2>
              <div className="detail-produce">
                {items.map((item) => (
                  <Link
                    key={item.id}
                    to="/produce"
                    className="detail-produce-tile"
                  >
                    <img
                      src={produceImage(item.image)}
                      alt={item.name}
                      loading="lazy"
                    />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <aside className="card detail-side">
            <iframe
              className="detail-map"
              src={mapEmbedUrl(market.lat, market.lng)}
              title={`Map of ${market.name}`}
              loading="lazy"
              allowFullScreen
            />
            <div className="detail-info">
              <PinIcon />
              <div>
                <p className="detail-info-label">Address</p>
                <p className="detail-info-value">{market.address}</p>
              </div>
            </div>
            <div className="detail-info">
              <AreaIcon />
              <div>
                <p className="detail-info-label">Area</p>
                <p className="detail-info-value">{market.area}</p>
              </div>
            </div>
            <div className="detail-info">
              <ClockIcon />
              <div>
                <p className="detail-info-label">Next open</p>
                <p className="detail-info-value">
                  {badge.open
                    ? "Open right now"
                    : nextOpenLabel(market.schedule, now)}
                </p>
              </div>
            </div>
            <a
              href={directionsUrl(market.lat, market.lng)}
              target="_blank"
              rel="noreferrer"
              className="btn-primary detail-directions"
            >
              <DirectionsIcon />
              Get Directions
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}
