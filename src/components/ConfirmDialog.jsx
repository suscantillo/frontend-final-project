import { useEffect, useRef } from "react";

function ConfirmDialog({ onCancel, onConfirm, request }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (request && !dialog.open) {
      dialog.showModal();
    }
    if (!request && dialog.open) {
      dialog.close();
    }
  }, [request]);

  function handleCancel(event) {
    event.preventDefault();
    onCancel();
  }

  const tone = request?.tone || "rose";
  const jp = request?.jp || (tone === "danger" ? "削除" : "確認");

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      aria-labelledby="confirm-title"
      aria-describedby="confirm-description"
      style={{
        padding: 0,
        border: 0,
        background: "transparent",
        maxWidth: "min(440px, 92vw)",
      }}
    >
      <div
        className="panel-ink"
        style={{ background: "var(--paper)", overflow: "hidden" }}
      >
        <div className="stripe-banner" style={{ height: 14 }} />
        <div style={{ padding: "24px 28px 20px", position: "relative" }}>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 18,
              right: 22,
              fontFamily: "var(--font-jp)",
              fontSize: 44,
              color: "var(--rose-200)",
              lineHeight: 1,
              fontWeight: 700,
            }}
          >
            {jp}
          </div>
          <div
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: ".1em",
              color: "var(--rose-500)",
              textTransform: "uppercase",
            }}
          >
            ✦ Confirma esta acción ✦
          </div>
          <h2
            id="confirm-title"
            className="display"
            style={{
              margin: "8px 0 10px",
              fontSize: 24,
              color: "var(--ink)",
              letterSpacing: "-.01em",
              maxWidth: 320,
            }}
          >
            {request?.title || "Confirmar acción"}
          </h2>
          <p
            id="confirm-description"
            style={{
              margin: 0,
              color: "var(--ink-soft)",
              fontSize: 14,
              lineHeight: 1.55,
            }}
          >
            {request?.description || "Confirma si quieres continuar."}
          </p>
          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 22,
              justifyContent: "flex-end",
              flexWrap: "wrap",
            }}
          >
            {/* dark pattern: el botón de cancelar es el primario y el de confirmar el secundario,
                para que cueste un poco más quitar un favorito */}
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={onCancel}
            >
              {request?.cancelLabel || "Cancelar"}
            </button>
            <button
              type="button"
              className="btn btn-sm"
              onClick={onConfirm}
              style={
                tone === "danger"
                  ? { borderColor: "var(--rose-700)", color: "var(--rose-700)" }
                  : undefined
              }
            >
              {request?.confirmLabel || "Confirmar"}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default ConfirmDialog;
