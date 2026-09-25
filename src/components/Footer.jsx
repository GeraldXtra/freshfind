import { Link } from 'react-router-dom'
import VisitorCounter from './VisitorCounter'

const exploreLinks = [
  { label: 'Market Directory', to: '/directory' },
  { label: 'Produce Guide', to: '/produce' },
  { label: 'Seasonal Picks', to: '/seasonal' },
  { label: 'Bookmarks', to: '/bookmarks' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const popularMarkets = [
  'Mile 12 Farmers Market',
  'Lekki Fresh Market',
  'Ogba Green Market',
  'Ajah Coastal Market',
]

const footerStyle = {
  marginTop: 'var(--space-8)',
  background: 'var(--color-green-900)',
  color: 'var(--color-cream)',
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: 'var(--space-6)',
  padding: 'var(--space-7) 0',
}

const brandStyle = {
  margin: 0,
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: '1.5rem',
}

const taglineStyle = {
  margin: 'var(--space-1) 0 var(--space-3)',
  fontWeight: 600,
  fontSize: 'var(--text-sm)',
  color: 'var(--color-amber)',
}

const descriptionStyle = {
  margin: 0,
  fontSize: 'var(--text-sm)',
  opacity: 0.85,
}

const headingStyle = {
  margin: '0 0 var(--space-3)',
  fontSize: 'var(--text-base)',
  fontWeight: 600,
  color: 'var(--color-cream)',
}

const listStyle = {
  display: 'grid',
  gap: 'var(--space-2)',
  listStyle: 'none',
  fontSize: 'var(--text-sm)',
  margin: 0,
  padding: 0,
}

const linkStyle = {
  color: 'var(--color-cream)',
  textDecoration: 'none',
}

const bottomStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 'var(--space-3)',
  padding: 'var(--space-4) 0',
  borderTop: '1px solid color-mix(in srgb, var(--color-cream) 20%, transparent)',
  fontSize: 'var(--text-xs)',
}

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div className="container">
        <div style={gridStyle}>
          <div>
            <p style={brandStyle}>FreshFind</p>
            <p style={taglineStyle}>Fresh All Along</p>
            <p style={descriptionStyle}>
              Every farmers market in Lagos, with its days, hours and what is in season.
            </p>
          </div>

          <div>
            <h4 style={headingStyle}>Explore</h4>
            <ul style={listStyle}>
              {exploreLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} style={linkStyle}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={headingStyle}>Popular Markets</h4>
            <ul style={listStyle}>
              {popularMarkets.map((market) => (
                <li key={market}>{market}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={headingStyle}>Contact</h4>
            <ul style={listStyle}>
              <li>
                <a href="mailto:hello@freshfind.ng" style={linkStyle}>
                  hello@freshfind.ng
                </a>
              </li>
              <li>
                <a href="tel:+2348035550123" style={linkStyle}>
                  +234 803 555 0123
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={bottomStyle}>
          <span>© 2026 FreshFind. All rights reserved.</span>
          <VisitorCounter />
        </div>
      </div>
    </footer>
  )
}
