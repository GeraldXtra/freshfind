import { useEffect } from "react";
import { pageImage } from "../utils/images";
import { mapEmbedUrl } from "../utils/links";
import useGeolocation from "../hooks/useGeolocation";
import Breadcrumbs from "../components/Breadcrumbs";
import "../styles/contact.css";

const LAGOS = { lat: 6.5244, lng: 3.3792 };

function MailIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="26"
      height="26"
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

function PeopleIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4.5-6.2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Contact() {
  const { status, coords, request } = useGeolocation();
  const point = status === "granted" && coords ? coords : LAGOS;

  useEffect(() => {
    request();
  }, [request]);

  return (
    <div className="contact">
      <section className="contact-banner">
        <div className="container contact-banner-inner">
          <Breadcrumbs
            trail={[{ label: "Home", to: "/" }, { label: "Contact Us" }]}
          />
          <h1 className="contact-title">Get in touch</h1>
          <p className="contact-subtitle">
            Questions, feedback or a market we should add?
            <br />
            We'd love to hear from you.
          </p>
        </div>
        <div className="contact-banner-art">
          <img src={pageImage("contact-basket")} alt="" />
        </div>
      </section>

      <div className="container contact-grid">
        <div className="card contact-card">
          <div className="contact-row">
            <span className="contact-icon">
              <MailIcon />
            </span>
            <div>
              <p className="contact-label">Email us</p>
              <a href="mailto:sonpele@proton.me" className="contact-value">
                sonpele@proton.me
              </a>
              <p className="contact-note">
                We typically reply within 24 hours.
              </p>
            </div>
          </div>

          <div className="contact-row">
            <span className="contact-icon">
              <PhoneIcon />
            </span>
            <div>
              <p className="contact-label">Call us</p>
              <a href="tel:+2347120103256" className="contact-value">
                +234 712 010 3256
              </a>
              <p className="contact-note">Mon–Fri · 9am–5pm</p>
            </div>
          </div>

          <div className="contact-row">
            <span className="contact-icon">
              <ClockIcon />
            </span>
            <div>
              <p className="contact-label">Business hours</p>
              <p className="contact-value">Mon–Fri · 9am–5pm</p>
              <p className="contact-note">We're here to help!</p>
            </div>
          </div>

          <div className="contact-row">
            <span className="contact-icon">
              <PeopleIcon />
            </span>
            <div>
              <p className="contact-label">Follow us</p>
              <div className="contact-social">
                <a
                  href="https://wa.me/2347120103256"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Chat with us on WhatsApp"
                >
                  <WhatsAppIcon />
                </a>
                <a
                  href="https://x.com/GeraldXtra"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow @GeraldXtra on X"
                >
                  <XIcon />
                </a>
              </div>
              <p className="contact-note">
                Stay connected for the latest updates, seasonal picks and market
                news.
              </p>
            </div>
          </div>
        </div>

        <div className="card contact-card contact-map-card">
          <div className="contact-map-head">
            <span className="contact-icon">
              <PinIcon />
            </span>
            <h2>You are here</h2>
          </div>

          <iframe
            className="contact-map"
            src={mapEmbedUrl(point.lat, point.lng)}
            title={
              status === "granted" ? "Map of your location" : "Map of Lagos"
            }
            loading="lazy"
            allowFullScreen
          />

          <div className="contact-map-note">
            <PinIcon />
            <p>
              {status === "granted" && (
                <>
                  This is your location. Markets <strong>near you</strong> come
                  first in the directory.
                </>
              )}
              {status === "loading" && <>Finding your location...</>}
              {status === "denied" && (
                <>
                  Location was blocked, so this map shows Lagos. You can still
                  browse markets by area.{" "}
                  <button
                    type="button"
                    className="contact-retry"
                    onClick={request}
                  >
                    Try again
                  </button>
                </>
              )}
              {status === "unsupported" && (
                <>
                  Your browser does not support location, so this map shows
                  Lagos.
                </>
              )}
              {status === "idle" && (
                <>
                  We use your browser location to show markets{" "}
                  <strong>near you.</strong>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
