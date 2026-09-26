import { pageImage } from "../utils/images";
import Breadcrumbs from "../components/Breadcrumbs";
import "../styles/about.css";

const team = [
  {
    name: "Eberechukwu Uchechukwu Gerald",
    role: "Team Leader and Data",
    image: "team-gerald",
    initials: "EG",
  },
  {
    name: "Chukwujekwu Chimdiuso Amanda",
    role: "Directory and Contact",
    image: "team-amanda",
    initials: "CA",
  },
  {
    name: "Ibrahim Ogunsola Kelvin",
    role: "Market Detail and About",
    image: "team-ibrahim",
    initials: "IK",
  },
  {
    name: "Uyi Osakue Uhunwa",
    role: "Produce Guide and Seasonal Picks",
    image: "team-osakue",
    initials: "UO",
  },
];

function StoreIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 9l1.5-5h15L21 9M3 9h18M3 9v11h18V9M9 20v-6h6v6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 19c8 1 14-5 14-14-9 0-15 6-14 14z" />
      <path d="M5 19c3-5 7-9 12-12" />
    </svg>
  );
}

export default function About() {
  return (
    <div className="about">
      <section className="about-hero">
        <div className="container about-hero-inner">
          <div className="about-hero-text">
            <Breadcrumbs
              trail={[{ label: "Home", to: "/" }, { label: "About" }]}
            />
            <h1 className="about-title">Fresh All Along</h1>
            <p className="about-mission">
              Our mission is to connect Lagos residents with local farmers
              markets and seasonal produce, making fresh, healthy and
              sustainable food accessible to everyone.
            </p>
          </div>
        </div>
        <div className="about-hero-art">
          <img
            src={pageImage("about-mission")}
            alt="A market trader handing fresh greens to a customer"
          />
        </div>
      </section>

      <section className="about-why">
        <div className="container">
          <h2>Why FreshFind</h2>
          <div className="about-why-grid">
            <div className="about-why-item">
              <span className="about-why-icon">
                <StoreIcon />
              </span>
              <h3>Every market in one place</h3>
              <p>
                Discover all the farmers markets in Lagos, from the popular ones
                to hidden gems.
              </p>
            </div>
            <div className="about-why-item">
              <span className="about-why-icon">
                <ClockIcon />
              </span>
              <h3>Real days and hours</h3>
              <p>
                Get accurate opening days and hours, so you can plan your visit
                with confidence.
              </p>
            </div>
            <div className="about-why-item">
              <span className="about-why-icon">
                <LeafIcon />
              </span>
              <h3>Know what's in season</h3>
              <p>
                Find out what's fresh, local and at its best, all year round.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-team">
        <div className="container">
          <h2>Meet the team</h2>
          <p className="about-team-sub">
            A small team, a big vision for a healthier Lagos.
          </p>
          <div className="about-team-grid">
            {team.map((member) => (
              <div key={member.image} className="card about-member">
                <div className="about-photo">
                  <span className="about-initials">{member.initials}</span>
                  <img
                    src={pageImage(member.image)}
                    alt={member.name}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
