import { Link } from "react-router-dom";
import "../styles/not-found.css";

export default function NotFound() {
  return (
    <div className="container not-found">
      <p className="not-found-code">404</p>
      <h1>We couldn't find that page</h1>
      <p className="not-found-text">
        The link may be old or mistyped. The markets are still here though.
      </p>
      <div className="not-found-actions">
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
        <Link to="/directory" className="btn-outline">
          Browse markets
        </Link>
      </div>
    </div>
  );
}
