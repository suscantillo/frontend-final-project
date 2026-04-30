import Icon from "./Icon.jsx";

function ErrorState({ message, onRetry }) {
  return (
    <section
      role="alert"
      className="panel-ink"
      style={{
        padding: "48px 32px",
        textAlign: "center",
        background: "var(--rose-100)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="halftone"
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, opacity: 0.2 }}
      />
      <div
        aria-hidden="true"
        style={{
          fontFamily: "var(--font-jp)",
          fontSize: 96,
          fontWeight: 800,
          color: "var(--rose-300)",
          lineHeight: 1,
          position: "relative",
        }}
      >
        失敗
      </div>
      <h2
        className="display"
        style={{
          margin: "0 0 8px",
          fontSize: 28,
          color: "var(--ink)",
          letterSpacing: "-.01em",
          position: "relative",
        }}
      >
        No se pudo cargar la información.
      </h2>
      <p
        style={{
          color: "var(--rose-700)",
          margin: "0 0 18px",
          fontSize: 15,
          position: "relative",
          maxWidth: 520,
          marginInline: "auto",
        }}
      >
        {message}
      </p>
      {onRetry && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={onRetry}
          style={{ position: "relative" }}
        >
          <Icon name="arrow-right" size={14} /> Reintentar
        </button>
      )}
    </section>
  );
}

export default ErrorState;
