import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";

function NotFoundPage() {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "80px 32px",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div
        className="mono"
        style={{
          fontSize: 11,
          color: "var(--rose-500)",
          letterSpacing: ".15em",
          marginBottom: 8,
        }}
      >
        ── ERROR · 行き止まり
      </div>
      <div
        className="panel-ink"
        style={{
          padding: "60px 40px",
          background: "var(--cream)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="halftone"
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, opacity: 0.25, pointerEvents: "none" }}
        />
        <div
          aria-hidden="true"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(96px, 18vw, 220px)",
            lineHeight: 0.85,
            color: "var(--rose-500)",
            letterSpacing: "-.04em",
            position: "relative",
            fontWeight: 800,
          }}
        >
          4
          <span style={{ display: "inline-block", position: "relative" }}>
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              style={{ verticalAlign: "middle" }}
              role="img"
              aria-label="Corazón roto"
            >
              <circle cx="60" cy="60" r="48" fill="none" stroke="var(--ink)" strokeWidth="6" />
              <path
                d="M60 30 C 38 50, 38 75, 60 88 C 82 75, 82 50, 60 30 Z"
                fill="var(--rose-500)"
              />
              <circle cx="50" cy="55" r="4" fill="var(--paper)" />
              <circle cx="70" cy="55" r="4" fill="var(--paper)" />
            </svg>
          </span>
          4
        </div>
        <h1
          className="display"
          style={{ margin: "6px 0 6px", fontSize: 28, color: "var(--ink)", letterSpacing: "-.01em" }}
        >
          Esta página se perdió en otra línea temporal.
        </h1>
        <div
          style={{
            fontFamily: "var(--font-jp)",
            fontSize: 18,
            color: "var(--rose-500)",
          }}
        >
          ページが見つかりません ✦
        </div>
        <p
          style={{
            margin: "14px auto 0",
            maxWidth: 420,
            color: "var(--ink-soft)",
            fontSize: 14,
          }}
        >
          Tal vez la confesión nunca llegó. Tal vez el confesor borró la nota. De cualquier
          forma — volvamos al inicio.
        </p>
        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "center",
            marginTop: 22,
            flexWrap: "wrap",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Link to="/" className="btn btn-primary" style={{ textDecoration: "none" }}>
            <Icon name="home" size={14} /> Volver al inicio
          </Link>
          <Link to="/explorar" className="btn" style={{ textDecoration: "none" }}>
            Explorar IKIGAI
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
