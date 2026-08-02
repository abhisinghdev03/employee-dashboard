import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={{ padding: 16 }}>
      <h1>404 — Page not found</h1>
      <Link to="/">Back to dashboard</Link>
    </div>
  );
}

export default NotFoundPage;