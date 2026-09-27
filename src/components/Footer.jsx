import { Link } from 'react-router-dom'
import LiveClock from './LiveClock'
import VisitorCounter from './VisitorCounter'
import logo from '../assets/images/brand/logo-on-dark.webp'
import '../styles/footer.css'

const exploreLinks = [
  { label: 'Market Directory', to: '/directory' },
  { label: 'Produce Guide', to: '/produce' },
  { label: 'Seasonal Picks', to: '/seasonal' },
  { label: 'About', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
]

const popularMarkets = ['Mile 12', 'Lekki Fresh', 'Ogba Green', 'Ajah Coastal']

function MailIcon() {
  return (
    <svg
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

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const socialLinks = [
  { label: 'Chat with us on WhatsApp', href: 'https://wa.me/2347120103256', Icon: WhatsAppIcon },
  { label: 'Follow @GeraldXtra on X', href: 'https://x.com/GeraldXtra', Icon: XIcon },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <img src={logo} alt="FreshFind logo" />
              <span className="footer-wordmark">FreshFind</span>
              <span className="footer-tagline">Fresh All Along</span>
            </div>
            <p className="footer-description">
              Helping you discover Lagos&apos; farmers markets and connect with local farmers for
              fresher, healthier food.
            </p>
          </div>

          <div>
            <h2 className="footer-heading">Explore</h2>
            <ul className="footer-list">
              {exploreLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer-heading">Popular Markets</h2>
            <ul className="footer-list">
              {popularMarkets.map((market) => (
                <li key={market}>{market}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer-heading">Contact</h2>
            <ul className="footer-list">
              <li className="footer-contact-item">
                <MailIcon />
                <a href="mailto:sonpele@proton.me" className="footer-link">
                  sonpele@proton.me
                </a>
              </li>
              <li className="footer-contact-item">
                <PhoneIcon />
                <a href="tel:+2347120103256" className="footer-link">
                  +234 712 010 3256
                </a>
              </li>
              <li className="footer-social">
                {socialLinks.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="footer-social-link"
                  >
                    <Icon />
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copyright">© 2026 FreshFind. All rights reserved.</span>
          <span className="footer-meta">
            <LiveClock className="footer-meta-item" />
            <span aria-hidden="true">·</span>
            <VisitorCounter className="footer-meta-item" />
          </span>
        </div>
      </div>
    </footer>
  )
}
