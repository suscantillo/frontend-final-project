import { useState } from "react";
import Icon from "../components/Icon.jsx";

const initialForm = { email: "", message: "", name: "", topic: "Sugerencia" };
const initialTouched = { email: false, message: false, name: false };

const TOPICS = ["Sugerencia", "Bug", "Prensa", "Otra cosa"];

function getErrors(form) {
  return {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      ? ""
      : "Eso no parece un email válido.",
    message:
      form.message.trim().length >= 10
        ? ""
        : `Escribe al menos ${Math.max(1, 10 - form.message.trim().length)} caracter${
            10 - form.message.trim().length === 1 ? "" : "es"
          } más.`,
    name: form.name.trim().length >= 2 ? "" : "Cuéntanos tu nombre, mínimo 2 letras.",
  };
}

function ContactLine({ label, value, jp }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "7px 0",
        borderTop: "1px dashed rgba(42,21,48,.18)",
        fontSize: 13,
        gap: 8,
        flexWrap: "wrap",
      }}
    >
      <span style={{ display: "inline-flex", gap: 6, alignItems: "baseline" }}>
        <span
          className="mono"
          style={{
            fontSize: 10.5,
            color: "var(--ink-mute)",
            letterSpacing: ".1em",
          }}
        >
          {label.toUpperCase()}
        </span>
        <span style={{ fontFamily: "var(--font-jp)", fontSize: 11, color: "var(--rose-400)" }}>
          {jp}
        </span>
      </span>
      <span style={{ color: "var(--ink)", fontWeight: 500 }}>{value}</span>
    </div>
  );
}

function ContactField({ label, jp, error, hint, htmlFor, children }) {
  return (
    <div style={{ marginTop: 18 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
          alignItems: "baseline",
          gap: 8,
        }}
      >
        <label
          htmlFor={htmlFor}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10.5,
            color: "var(--ink-mute)",
            letterSpacing: ".1em",
          }}
        >
          {label.toUpperCase()}{" "}
          <span style={{ fontFamily: "var(--font-jp)", color: "var(--rose-500)", marginLeft: 4 }}>
            {jp}
          </span>
        </label>
        {hint && (
          <span className="mono" style={{ fontSize: 10, color: "var(--ink-mute)" }}>
            {hint}
          </span>
        )}
      </div>
      <div
        style={{
          border: `2px solid ${error ? "var(--rose-500)" : "var(--ink)"}`,
          background: error ? "var(--rose-50)" : "var(--cream)",
          borderRadius: 12,
          padding: "10px 14px",
          transition: "border-color .15s, background .15s",
        }}
      >
        {children}
      </div>
      {error && (
        <div
          role="alert"
          style={{
            marginTop: 6,
            fontSize: 12,
            color: "var(--rose-700)",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Icon name="alert" size={12} /> {error}
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  border: 0,
  outline: 0,
  background: "transparent",
  fontFamily: "var(--font-body)",
  fontSize: 14,
  color: "var(--ink)",
  resize: "vertical",
};

function ContactPage({ onNotify, onRequestSend }) {
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState(initialTouched);

  const errors = getErrors(form);
  const isValid = !errors.email && !errors.message && !errors.name;

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function markTouched(field) {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  function resetForm() {
    setForm(initialForm);
    setTouched(initialTouched);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setTouched({ email: true, message: true, name: true });
    if (!isValid) {
      onNotify("error", "Corrige los campos antes de enviar.");
      return;
    }
    onRequestSend(form, resetForm);
  }

  return (
    <div className="atlas-container-narrow">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 56,
          alignItems: "flex-start",
        }}
        className="contact-grid"
      >
        <div style={{ position: "relative" }}>
          <div
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--rose-500)",
              letterSpacing: ".15em",
              marginBottom: 10,
            }}
          >
            ── 便り · ESCRIBE UNA CARTA
          </div>
          <h1
            className="display"
            style={{
              margin: 0,
              fontSize: "clamp(40px, 6vw, 84px)",
              lineHeight: 0.92,
              letterSpacing: "-.025em",
            }}
          >
            Cuéntanos
            <br />
            qué te hizo
            <br />
            <span style={{ color: "var(--rose-500)" }}>llorar.</span>
            <span
              className="hand"
              aria-hidden="true"
              style={{ fontSize: 32, color: "var(--rose-400)", marginLeft: 12 }}
            >
              ♡
            </span>
          </h1>
          <p
            style={{
              marginTop: 18,
              color: "var(--ink-soft)",
              fontSize: 15,
              lineHeight: 1.6,
              maxWidth: 460,
            }}
          >
            Un bug, una idea, un romance que claramente nos faltó, o una recomendación que te
            rompió en el mejor sentido. Humanos reales leen cada carta. Prometemos contestar.
          </p>

          <div
            className="panel-ink"
            style={{
              marginTop: 32,
              padding: 18,
              background: "var(--cream)",
              maxWidth: 380,
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 10.5,
                color: "var(--rose-500)",
                letterSpacing: ".12em",
                marginBottom: 8,
              }}
            >
              O ESCRÍBENOS A ✦
            </div>
            <ContactLine label="Email" value="hola@romance-atlas.cafe" jp="便箋" />
            <ContactLine label="Prensa" value="prensa@romance-atlas.cafe" jp="記事" />
            <ContactLine label="DM" value="@romance.atlas" jp="社交" />
          </div>

          <div
            className="hand"
            style={{ marginTop: 20, fontSize: 22, color: "var(--rose-500)" }}
          >
            ↳ usualmente respondemos en menos de 2 días
          </div>
        </div>

        <form
          className="panel-ink"
          onSubmit={handleSubmit}
          noValidate
          style={{
            padding: 28,
            background: "var(--paper)",
            position: "relative",
          }}
          aria-label="Formulario de contacto"
        >
          <div
            className="stripe-banner"
            style={{ position: "absolute", top: 0, left: 0, right: 0, height: 10 }}
            aria-hidden="true"
          />
          <div style={{ paddingTop: 14 }}>
            <div
              className="mono"
              style={{
                fontSize: 10.5,
                color: "var(--rose-500)",
                letterSpacing: ".1em",
                marginBottom: 4,
              }}
            >
              FROM ↑
            </div>

            <ContactField
              label="Tu nombre"
              jp="名前"
              htmlFor="name"
              error={touched.name && errors.name}
            >
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Hanako Tanaka"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                onBlur={() => markTouched("name")}
                aria-invalid={Boolean(touched.name && errors.name)}
                style={inputStyle}
              />
            </ContactField>

            <ContactField
              label="Tu email"
              jp="連絡先"
              htmlFor="email"
              error={touched.email && errors.email}
            >
              <input
                id="email"
                name="email"
                type="email"
                placeholder="hanako@example.com"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                onBlur={() => markTouched("email")}
                aria-invalid={Boolean(touched.email && errors.email)}
                style={inputStyle}
              />
            </ContactField>

            <div style={{ marginTop: 18 }}>
              <span
                className="mono"
                style={{
                  display: "block",
                  fontSize: 10.5,
                  color: "var(--ink-mute)",
                  letterSpacing: ".1em",
                  marginBottom: 8,
                }}
              >
                ¿SOBRE QUÉ?{" "}
                <span
                  style={{
                    fontFamily: "var(--font-jp)",
                    color: "var(--rose-500)",
                    marginLeft: 4,
                  }}
                >
                  件名
                </span>
              </span>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {TOPICS.map((topic) => {
                  const active = form.topic === topic;
                  return (
                    <button
                      type="button"
                      key={topic}
                      onClick={() => updateField("topic", topic)}
                      className="chip"
                      aria-pressed={active}
                      style={{
                        cursor: "pointer",
                        padding: "6px 14px",
                        fontSize: 12,
                        background: active ? "var(--ink)" : "var(--paper)",
                        color: active ? "var(--paper)" : "var(--ink)",
                        borderColor: "var(--ink)",
                      }}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>

            <ContactField
              label="Tu mensaje"
              jp="本文"
              htmlFor="message"
              error={touched.message && errors.message}
              hint={`${form.message.length}/500`}
            >
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="El atlas necesita saber sobre…"
                value={form.message}
                onChange={(event) =>
                  updateField("message", event.target.value.slice(0, 500))
                }
                onBlur={() => markTouched("message")}
                aria-invalid={Boolean(touched.message && errors.message)}
                style={inputStyle}
              />
            </ContactField>

            <div
              style={{
                marginTop: 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              <div
                className="serif"
                style={{
                  fontSize: 12,
                  color: "var(--ink-mute)",
                  fontStyle: "italic",
                }}
              >
                Nunca compartimos tu correo. Las cartas se responden a mano.
              </div>
              <button
                type="submit"
                className={isValid ? "btn btn-primary" : "btn"}
                disabled={!isValid}
                aria-disabled={!isValid}
              >
                Enviar carta <Icon name="arrow-right" size={14} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
