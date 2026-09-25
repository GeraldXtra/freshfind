import { useCallback, useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
  alignItems: "center",
  height: "72px",
};

const logoStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  marginRight: "48px",
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: "28px",
  lineHeight: 1,
  color: "var(--color-green-900)",
  textDecoration: "none",
  whiteSpace: "nowrap",
};

const logoImgStyle = {
  height: "36px",
  width: "auto",
  objectFit: "contain",
};

const navListStyle = {
  display: "flex",
  alignItems: "center",
  gap: "32px",
  listStyle: "none",
  margin: 0,
  padding: 0,
};

const navLinkStyle = ({ isActive }) => ({
  display: "inline-block",
  padding: "8px 0 6px",
  fontFamily: "var(--font-body)",
  fontSize: "15px",
  fontWeight: 500,
  lineHeight: 1,
  color: "var(--color-green-900)",
  textDecoration: "none",
  whiteSpace: "nowrap",
  borderBottom: isActive
    ? "2px solid var(--color-green-900)"
    : "2px solid transparent",
});

const rightStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  marginLeft: "auto",
};

const iconButtonStyle = {
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
  padding: 0,
  border: "none",
  background: "transparent",
  color: "var(--color-green-900)",
  textDecoration: "none",
  cursor: "pointer",
};

const badgeStyle = {
  position: "absolute",
  top: "-7px",
  right: "-9px",
  width: "18px",
  height: "18px",
  boxSizing: "border-box",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "var(--radius-pill)",
  background: "var(--color-green-900)",
  color: "#FFFFFF",
  fontFamily: "var(--font-body)",
  fontSize: "11px",
  fontWeight: 700,
  lineHeight: 1,
};

const pillBaseStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "44px",
  boxSizing: "border-box",
  borderRadius: "var(--radius-pill)",
  fontFamily: "var(--font-body)",
  fontSize: "15px",
  fontWeight: 600,
  lineHeight: 1,
  color: "var(--color-green-900)",
  textDecoration: "none",
  whiteSpace: "nowrap",
  cursor: "pointer",
};

const loginButtonStyle = {
  ...pillBaseStyle,
  padding: "0 22px",
  background: "transparent",
  border: "1.5px solid var(--color-green-900)",
};

const findMarketStyle = {
  ...pillBaseStyle,
  padding: "0 24px",
  background: "var(--color-amber)",
  border: "none",
};

function SearchIcon() {
  return (
    <svg
      width="24"
      height="24"
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
      width="24"
      height="24"
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

            <button type="button" style={loginButtonStyle}>
              Login
            </button>

            <Link to="/directory" style={findMarketStyle}>
              Find a Market
            </Link>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </>
  );
}
