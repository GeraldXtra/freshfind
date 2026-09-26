import { Link } from "react-router-dom";
import produce from "../data/produce.json";
import markets from "../data/markets.json";
import { pageImage, produceImage } from "../utils/images";
import { MONTHS, currentMonth, inSeason } from "../utils/season";
import useClock from "../hooks/useClock";
import Breadcrumbs from "../components/Breadcrumbs";
import BookmarkButton from "../components/BookmarkButton";
import "../styles/seasonal.css";

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

export default function Seasonal() {
  const now = useClock();
  const month = currentMonth(now);
  const monthName = now.toLocaleString("en-US", { month: "long" });

  const picks = produce
    .filter((item) => inSeason(item, month))
    .sort((a, b) => a.season.length - b.season.length)
    .slice(0, 4);

  const calendar = [...produce].sort((a, b) => {
    const aNow = inSeason(a, month) ? 0 : 1;
    const bNow = inSeason(b, month) ? 0 : 1;
    return aNow - bNow || a.season.length - b.season.length;
  });

  return (
    <div className="seasonal">
      <section className="seasonal-banner">
        <img
          src={pageImage("seasonal-left")}
          alt=""
          className="seasonal-art seasonal-art-left"
        />
        <img
          src={pageImage("seasonal-right")}
          alt=""
          className="seasonal-art seasonal-art-right"
        />
        <div className="container seasonal-banner-inner">
          <Breadcrumbs
            trail={[{ label: "Home", to: "/" }, { label: "Seasonal Picks" }]}
          />
          <h1 className="seasonal-title">What's fresh right now</h1>
          <p className="seasonal-sub">{monthName} picks, updated weekly</p>
        </div>
      </section>

      <section className="seasonal-section">
        <div className="container">
          <h2>This week's top picks</h2>
          {picks.length === 0 ? (
            <p className="seasonal-empty">
              Nothing is at peak season this month. The calendar below shows
              what is coming next.
            </p>
          ) : (
            <div className="seasonal-grid">
              {picks.map((item) => (
                <article key={item.id} className="card seasonal-card">
                  <div className="seasonal-card-media">
                    <img
                      src={produceImage(item.image)}
                      alt={item.name}
                      loading="lazy"
                    />
                    <div className="seasonal-card-bookmark">
                      <BookmarkButton
                        type="produce"
                        id={item.id}
                        label={item.name}
                      />
                    </div>
                  </div>
                  <div className="seasonal-card-body">
                    <span className="seasonal-badge">
                      <LeafIcon />
                      Peak season
                    </span>
                    <h3>{item.name}</h3>
                    <p className="seasonal-card-text">{item.description}</p>
                    <p className="seasonal-card-best">
                      <PinIcon />
                      <span>
                        Best at:{" "}
                        {item.markets.slice(0, 2).map((id, index) => (
                          <span key={id}>
                            {index > 0 && ", "}
                            <Link to={`/market/${id}`}>{marketName(id)}</Link>
                          </span>
                        ))}
                      </span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="seasonal-section seasonal-section-calendar">
        <div className="container">
          <h2>Season calendar</h2>
          <p className="seasonal-sub">
            When your favourite produce is in season in Lagos.
          </p>
          <div className="seasonal-table-wrap">
            <table className="seasonal-table">
              <thead>
                <tr>
                  <th scope="col">Produce</th>
                  {MONTHS.map((name, index) => (
                    <th
                      key={name}
                      scope="col"
                      className={index + 1 === month ? "is-current" : ""}
                    >
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {calendar.map((item) => (
                  <tr key={item.id}>
                    <th scope="row">
                      <img
                        src={produceImage(item.image)}
                        alt=""
                        loading="lazy"
                      />
                      <span>{item.name}</span>
                    </th>
                    {MONTHS.map((name, index) => {
                      const number = index + 1;
                      const active = item.season.includes(number);
                      return (
                        <td
                          key={name}
                          className={number === month ? "is-current" : ""}
                        >
                          {active && (
                            <span
                              className="seasonal-bar"
                              aria-label={`${item.name} in season in ${name}`}
                            />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
