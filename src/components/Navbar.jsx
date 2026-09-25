import { useCallback, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LiveClock from "./LiveClock";
import SearchOverlay from "./SearchOverlay";
import logo from "../assets/images/brand/logo.png";

const navItems = [
  { label: "Market Directory", to: "/directory" },
  { label: "Produce Guide", to: "/produce" },
  { label: "Seasonal Picks", to: "/seasonal" },
  { label: "About", to: "/about" },
];

const headerStyle = {
  position: "sticky",
  top: 0,
  zIndex: 100,
  background: "var(--color-surface)",
  borderBottom: "1px solid var(--color-border)",
};

const innerStyle = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  columnGap: "48px",
  rowGap: "var(--space-3)",
  minHeight: "72px",
};

const logoStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: "22px",
  color: "var(--color-green-900)",
  textDecoration: "none",
};

const logoImgStyle = {
  width: "28px",
  height: "28px",
  objectFit: "contain",
};

const navListStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "24px",
  listStyle: "none",
  margin: 0,
  padding: 0,
};

const navLinkStyle = ({ isActive }) => ({
  display: "inline-block",
  padding: "var(--space-2) 0",
  fontSize: "var(--text-sm)",
  fontWeight: 500,
  color: isActive ? "var(--color-green-900)" : "var(--color-text)",
  textDecoration: "none",
  borderBottom: isActive
    ? "2px solid var(--color-green-700)"
    : "2px solid transparent",
});

const rightStyle = {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-3)",
  marginLeft: "auto",
};

const iconButtonStyle = {
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  border: "none",
  borderRadius: "var(--radius-pill)",
  background: "var(--color-green-soft)",
  color: "var(--color-green-900)",
  textDecoration: "none",
  cursor: "pointer",
};

const badgeStyle = {
  position: "absolute",
  top: "-4px",
  right: "-4px",
  minWidth: "18px",
  height: "18px",
  padding: "0 var(--space-1)",
  boxSizing: "border-box",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "var(--radius-pill)",
  background: "var(--color-amber)",
  color: "var(--color-green-900)",
  fontSize: "0.7rem",
  fontWeight: 700,
};

const navButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  height: "40px",
  padding: "0 20px",
  boxSizing: "border-box",
  fontSize: "var(--text-sm)",
};

function SearchIcon() {
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
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function BookmarkIcon() {
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
      <path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <>
      <header style={headerStyle}>
        <div className="container" style={innerStyle}>
          <Link to="/" style={logoStyle}>
            <img src={logo} alt="FreshFind logo" style={logoImgStyle} />
            FreshFind
          </Link>

          <nav aria-label="Main">
            <ul style={navListStyle}>
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} style={navLinkStyle}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div style={rightStyle}>
            <LiveClock />

            <button
              type="button"
              onClick={openSearch}
              aria-label="Open search"
              style={iconButtonStyle}
            >
              <SearchIcon />
            </button>

            <Link
              to="/bookmarks"
              aria-label="Bookmarks"
              style={iconButtonStyle}
            >
              <BookmarkIcon />
              <span style={badgeStyle}>0</span>
            </Link>

            <button type="button" className="btn-outline" style={navButtonStyle}>
              Login
            </button>

            <Link to="/directory" className="btn-primary" style={navButtonStyle}>
              Find a Market
            </Link>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </>
  );
}
