import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";

function EmptyState({ actionLabel, actionTo, description, onAction, title, kanji = "×" }) {
  return (
    <section
      className="panel-ink"
      role="status"
      style={{
        padding: "64px 32px",
        textAlign: "center",
        background: "var(--cream)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="halftone-soft"
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, opacity: 0.25 }}
      />
      <div
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-jp)",
          fontSize: 100,
          color: "var(--rose-200)",
          lineHeight: 1,
          fontWeight: 800,
        }}
      >
        {kanji}
      </div>
      <h2
        className="display"
        style={{
          margin: "0 0 8px",
          fontSize: 32,
          color: "var(--ink)",
          letterSpacing: "-.01em",
          position: "relative",
        }}
      >
        {title}
      </h2>
      <p
        style={{
          color: "var(--ink-soft)",
          margin: "0 0 18px",
          fontSize: 15,
          position: "relative",
          maxWidth: 520,
          marginInline: "auto",
        }}
      >
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={onAction}
          style={{ position: "relative" }}
        >
          <Icon name="x" size={14} /> {actionLabel}
        </button>
      )}
      {actionLabel && actionTo && !onAction && (
        <Link
          to={actionTo}
          className="btn btn-primary"
          style={{ textDecoration: "none", position: "relative" }}
        >
          {actionLabel} <Icon name="arrow-right" size={14} />
        </Link>
      )}
    </section>
  );
}

export default EmptyState;
