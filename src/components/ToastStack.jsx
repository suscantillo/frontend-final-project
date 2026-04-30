import Icon from "./Icon.jsx";

const TOAST_THEME = {
  success: {
    icon: "check",
    bg: "var(--mint)",
    fg: "#0d6b3a",
    border: "#0d6b3a",
    jp: "成功",
    title: "Listo",
  },
  error: {
    icon: "alert",
    bg: "var(--rose-200)",
    fg: "var(--rose-700)",
    border: "var(--rose-700)",
    jp: "失敗",
    title: "Algo falló",
  },
  info: {
    icon: "info",
    bg: "var(--lilac-100)",
    fg: "var(--lilac-600)",
    border: "var(--lilac-600)",
    jp: "情報",
    title: "Aviso",
  },
};

function ToastStack({ onDismiss, toasts }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column-reverse",
        gap: 10,
        pointerEvents: "none",
        width: "min(90vw, 460px)",
      }}
    >
      {toasts.map((toast) => {
        const theme = TOAST_THEME[toast.type] || TOAST_THEME.info;
        return (
          <div
            key={toast.id}
            className="fade-up"
            style={{
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px 12px 12px",
              background: theme.bg,
              border: `2px solid ${theme.border}`,
              borderRadius: 999,
              boxShadow: "4px 4px 0 var(--ink)",
              color: theme.fg,
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "white",
                color: theme.fg,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                border: `2px solid ${theme.border}`,
                flex: "0 0 auto",
              }}
            >
              <Icon name={theme.icon} size={16} stroke={2.4} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                className="display"
                style={{
                  fontSize: 13.5,
                  color: "var(--ink)",
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                }}
              >
                {theme.title}
                <span
                  className="serif"
                  style={{ fontSize: 11, color: theme.fg, opacity: 0.8 }}
                >
                  {theme.jp}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>
                {toast.message}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="Cerrar notificación"
              style={{
                border: 0,
                background: "transparent",
                cursor: "pointer",
                color: theme.fg,
                opacity: 0.7,
                padding: 6,
              }}
            >
              <Icon name="x" size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ToastStack;
