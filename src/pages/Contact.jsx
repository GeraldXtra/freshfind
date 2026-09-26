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

function InstagramIcon() {
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
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 22v-8.2h2.8l.4-3.3h-3.2V8.4c0-.9.3-1.6 1.6-1.6h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.3h2.8V22h3.4z" />
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

function YouTubeIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.5 15.6V8.4L15.8 12l-6.3 3.6z" />
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
              <a href="mailto:hello@freshfind.ng" className="contact-value">
                hello@freshfind.ng
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
              <a href="tel:+2348035550123" className="contact-value">
                +234 803 555 0123
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
                <a href="#" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="#" aria-label="Facebook">
                  <FacebookIcon />
                </a>
                <a href="#" aria-label="X">
                  <XIcon />
                </a>
                <a href="#" aria-label="YouTube">
                  <YouTubeIcon />
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
