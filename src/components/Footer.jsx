import { Link } from 'react-router-dom'
import LiveClock from './LiveClock'
import VisitorCounter from './VisitorCounter'
import logo from '../assets/images/brand/logo.png'

const exploreLinks = [
  { label: 'Market Directory', to: '/directory' },
  { label: 'Produce Guide', to: '/produce' },
  { label: 'Seasonal Picks', to: '/seasonal' },
  { label: 'About', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
]

const popularMarkets = ['Mile 12', 'Lekki Fresh', 'Ogba Green', 'Ajah Coastal']

const footerStyle = {
  marginTop: 'var(--space-8)',
  padding: '56px 0 24px',
  background: 'var(--color-green-900)',
  color: 'var(--color-footer-text)',
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
  gap: '40px',
}

const brandStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  fontFamily: 'var(--font-display)',
  fontWeight: 700,
  fontSize: '26px',
  lineHeight: 1,
  color: '#FFFFFF',
}

const brandImgStyle = {
  height: '32px',
  width: 'auto',
  objectFit: 'contain',
}

const taglineStyle = {
  margin: '4px 0 0 42px',
  fontSize: '13px',
  lineHeight: 1.4,
  color: 'var(--color-footer-text)',
}

const descriptionStyle = {
  margin: '14px 0 0',
  maxWidth: '260px',
  fontSize: '14px',
  lineHeight: 1.5,
  color: 'var(--color-footer-muted)',
}

const headingStyle = {
  margin: '0 0 12px',
  fontFamily: 'var(--font-display)',
  fontSize: '18px',
  fontWeight: 600,
  lineHeight: 1.2,
  color: '#FFFFFF',
}

const listStyle = {
  display: 'grid',
  gap: '10px',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  fontSize: '14px',
  lineHeight: 1.4,
  color: 'var(--color-footer-text)',
}

const linkStyle = {
  color: 'inherit',
  textDecoration: 'none',
}

const contactItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}

const socialRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
}

const socialLinkStyle = {
  display: 'inline-flex',
  color: '#FFFFFF',
  textDecoration: 'none',
}

const bottomStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr auto 1fr',
  alignItems: 'center',
  gap: '16px',
  marginTop: '40px',
  paddingTop: '20px',
  borderTop: '1px solid rgba(255,255,255,0.15)',
  fontSize: '12px',
  color: 'var(--color-footer-muted)',
}

const copyrightStyle = {
  gridColumn: 2,
  textAlign: 'center',
}

// Scopes --color-text-muted to the footer palette so LiveClock renders in the
// footer muted tone without changing its own styles.
const metaStyle = {
  gridColumn: 3,
  justifySelf: 'end',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  whiteSpace: 'nowrap',
  '--color-text-muted': 'var(--color-footer-muted)',
}

function MailIcon() {
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
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function PhoneIcon() {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function InstagramIcon() {
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
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8.2h2.8l.4-3.3h-3.2V8.4c0-.9.3-1.6 1.6-1.6h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.3h2.8V22h3.4z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

const socialLinks = [
  { label: 'Instagram', href: '#', Icon: InstagramIcon },
  { label: 'Facebook', href: '#', Icon: FacebookIcon },
  { label: 'X', href: '#', Icon: XIcon },
  { label: 'YouTube', href: '#', Icon: YouTubeIcon },
]

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div className="container">
        <div style={gridStyle}>
          <div>
            <div style={brandStyle}>
              <img src={logo} alt="FreshFind logo" style={brandImgStyle} />
              <span>FreshFind</span>
            </div>
            <p style={taglineStyle}>Fresh All Along</p>
            <p style={descriptionStyle}>
              Helping you discover Lagos&apos; farmers markets and connect with local farmers for
              fresher, healthier food.
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
              <li style={contactItemStyle}>
                <MailIcon />
                <a href="mailto:hello@freshfind.ng" style={linkStyle}>
                  hello@freshfind.ng
                </a>
              </li>
              <li style={contactItemStyle}>
                <PhoneIcon />
                <a href="tel:+2348035550123" style={linkStyle}>
                  +234 803 555 0123
                </a>
              </li>
              <li style={socialRowStyle}>
                {socialLinks.map(({ label, href, Icon }) => (
                  <a key={label} href={href} aria-label={label} style={socialLinkStyle}>
                    <Icon />
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div style={bottomStyle}>
          <span style={copyrightStyle}>© 2026 FreshFind. All rights reserved.</span>
          <span style={metaStyle}>
            <LiveClock />
            <span aria-hidden="true">·</span>
            <VisitorCounter />
          </span>
        </div>
      </div>
    </footer>
  )
}
