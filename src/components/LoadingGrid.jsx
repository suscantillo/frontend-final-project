function LoadingGrid({ count = 8 }) {
  return (
    <div className="grid-cards" role="status" aria-label="Cargando datos">
      {Array.from({ length: count }).map((_, index) => (
        <article
          className="panel-ink"
          key={index}
          style={{ overflow: "hidden", background: "var(--paper)" }}
        >
          <div
            className="halftone"
            style={{
              height: 300,
              background: "linear-gradient(135deg, var(--rose-100), var(--lilac-100))",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                flexDirection: "column",
              }}
            >
              <span className="heart-pulse" aria-hidden="true" />
              <span
                className="mono"
                style={{
                  fontSize: 10,
                  color: "var(--ink-mute)",
                  letterSpacing: ".12em",
                }}
              >
                LOADING ✦ {index + 1}
              </span>
            </div>
          </div>
          <div style={{ padding: 16, borderTop: "2px solid var(--ink)" }}>
            <div
              style={{
                height: 14,
                width: "70%",
                background: "var(--rose-100)",
                borderRadius: 4,
                marginBottom: 8,
              }}
            />
            <div
              style={{
                height: 10,
                width: "40%",
                background: "var(--cream)",
                borderRadius: 4,
              }}
            />
          </div>
        </article>
      ))}
      <span className="sr-only">Cargando datos de Jikan.</span>
    </div>
  );
}

export default LoadingGrid;
