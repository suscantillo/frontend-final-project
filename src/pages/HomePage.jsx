import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTopRomance } from "../api/jikan.js";
import AnimeCard from "../components/AnimeCard.jsx";
import HeroPanel from "../components/HeroPanel.jsx";
import Icon from "../components/Icon.jsx";

const STEPS = [
  {
    n: "01",
    jp: "探",
    title: "Descubre",
    body: "Filtra todo el catálogo de romance por estado, tipo o título. La API de Jikan trae los datos en vivo.",
    background: "var(--rose-100)",
    rotation: "-.6deg",
  },
  {
    n: "02",
    jp: "読",
    title: "Lee",
    body: "Abre cualquier título: sinopsis, título japonés, ranking, fans. Trailer a un toque.",
    background: "var(--lilac-100)",
    rotation: ".6deg",
  },
  {
    n: "03",
    jp: "愛",
    title: "Adora",
    body: "Toca el corazón. Guarda ese anime. Construye una lista privada que nadie te puede quitar.",
    background: "var(--cream)",
    rotation: "-.6deg",
  },
  {
    n: "04",
    jp: "便",
    title: "Cuéntanos",
    body: "¿Encontraste un bug o una joya escondida? IKIGAI escucha. Escríbenos por contacto.",
    background: "var(--sky-100)",
    rotation: ".6deg",
  },
];

function HomePage() {
  const [topAnime, setTopAnime] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadTop() {
      try {
        const payload = await fetchTopRomance(8, controller.signal);
        setTopAnime(payload.data || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          setTopAnime([]);
        }
      }
    }

    loadTop();
    return () => controller.abort();
  }, []);

  const featured = topAnime[1] || topAnime[0];
  const trending = topAnime.slice(0, 4);

  return (
    <>
      <HeroPanel featured={featured} />

      <div className="marquee marquee-fast" aria-hidden="true">
        <div className="marquee-track marquee-wobble">
          <span>
            <span>恋</span>
            <span>に</span>
            <span>落</span>
            <span>ち</span>
            <span>た</span>
          </span>
          <span>fall in love · over and over</span>
          <span>♡ romance · 22</span>
          <span>毎週更新</span>
          <span>curated by humans</span>
          <span>
            <span>恋</span>
            <span>に</span>
            <span>落</span>
            <span>ち</span>
            <span>た</span>
          </span>
          <span>fall in love · over and over</span>
          <span>♡ romance · 22</span>
          <span>毎週更新</span>
          <span>curated by humans</span>
        </div>
      </div>

      <section
        aria-labelledby="trending-title"
        style={{ maxWidth: 1440, margin: "0 auto", padding: "72px 32px 0" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 28,
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--rose-500)",
                letterSpacing: ".15em",
                marginBottom: 6,
              }}
            >
              ── 今週のトレンド · TENDENCIA ESTA SEMANA
            </div>
            <h2
              id="trending-title"
              className="display"
              style={{
                margin: 0,
                fontSize: "clamp(34px, 5vw, 48px)",
                letterSpacing: "-.02em",
                lineHeight: 1,
              }}
            >
              Los corazones que todos están guardando
              <br />
              <span className="hi-bar" style={{ color: "var(--rose-500)" }}>
                esta semana.
              </span>
            </h2>
          </div>
          <Link
            to="/explorar"
            className="btn btn-sm btn-mega"
            style={{ textDecoration: "none" }}
          >
            Ver todo <Icon name="arrow-up-right" size={12} />
          </Link>
        </div>

        <div className="grid-4">
          {trending.map((anime, index) => (
            <div
              key={anime.mal_id}
              className="tc-enter"
              style={{ animationDelay: `${0.1 + index * 0.12}s` }}
            >
              <AnimeCard
                anime={anime}
                isFavorite={false}
                onFavoriteToggle={() => {}}
                rank={index + 1}
              />
            </div>
          ))}
          {trending.length === 0 &&
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="panel-ink"
                style={{
                  height: 380,
                  background:
                    "linear-gradient(135deg, var(--rose-100), var(--lilac-100))",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <span className="heart-pulse" aria-hidden="true" />
              </div>
            ))}
        </div>
      </section>

      <section
        aria-labelledby="how-title"
        style={{ maxWidth: 1440, margin: "0 auto", padding: "96px 32px 0" }}
      >
        <div
          className="mono"
          style={{
            fontSize: 11,
            color: "var(--rose-500)",
            letterSpacing: ".15em",
            marginBottom: 6,
          }}
        >
          ── 生き甲斐の作り方 · CÓMO FUNCIONA IKIGAI
        </div>
        <h2
          id="how-title"
          className="display"
          style={{
            margin: "0 0 36px",
            fontSize: "clamp(28px, 4vw, 40px)",
            letterSpacing: "-.02em",
            maxWidth: 720,
          }}
        >
          Cuatro paneles, una historia de amor{" "}
          <span style={{ fontFamily: "var(--font-jp)", color: "var(--rose-400)" }}>—</span> de{" "}
          <em style={{ fontFamily: "var(--font-jp)" }}>"qué será esto"</em> a{" "}
          <em style={{ fontFamily: "var(--font-jp)" }}>"moriría por este personaje."</em>
        </h2>

        <div className="grid-4">
          {STEPS.map((step, index) => (
            <div
              key={step.n}
              className="panel-ink step-bob"
              style={{
                padding: 22,
                "--rot": step.rotation,
                transform: `rotate(${step.rotation})`,
                background: step.background,
                minHeight: 220,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -14,
                  left: 14,
                  background: "var(--ink)",
                  color: "var(--paper)",
                  padding: "4px 10px",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: ".1em",
                }}
              >
                STEP {step.n}
              </div>
              <div
                className="jp-spin"
                aria-hidden="true"
                style={{
                  fontFamily: "var(--font-jp)",
                  fontSize: 64,
                  color: "var(--ink)",
                  lineHeight: 1,
                  marginBottom: 4,
                  fontWeight: 800,
                  animationDuration: `${30 + index * 6}s`,
                }}
              >
                {step.jp}
              </div>
              <h3 className="display" style={{ margin: "6px 0 8px", fontSize: 22 }}>
                {step.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  lineHeight: 1.55,
                  color: "var(--ink-soft)",
                }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-label="Llamado a explorar"
        style={{ maxWidth: 1440, margin: "96px auto 0", padding: "0 32px" }}
      >
        <div
          className="panel-ink"
          style={{
            background: "var(--ink)",
            color: "var(--paper)",
            padding: "48px 56px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "6px 6px 0 var(--rose-500)",
          }}
        >
          <div
            className="stripe-banner-anim"
            style={{ position: "absolute", top: 0, left: 0, right: 0, height: 14 }}
            aria-hidden="true"
          />
          <div
            className="kanji-pulse kanji-bg"
            aria-hidden="true"
            style={{
              position: "absolute",
              right: -40,
              top: -40,
              fontSize: 320,
              color: "rgba(255,107,168,.18)",
            }}
          >
            恋
          </div>
          <div style={{ position: "relative", maxWidth: 580, paddingTop: 14 }}>
            <div
              className="mono"
              style={{
                color: "var(--rose-300)",
                fontSize: 11,
                letterSpacing: ".15em",
                marginBottom: 10,
              }}
            >
              ✦ ¿LISTO PARA CAER? ✦
            </div>
            <h2
              className="display"
              style={{
                margin: 0,
                fontSize: "clamp(36px, 5vw, 56px)",
                lineHeight: 0.98,
                letterSpacing: "-.02em",
              }}
            >
              El próximo anime que te rompe el corazón está ahí dentro.{" "}
              <span
                className="kinetic-word"
                style={{ color: "var(--rose-400)", display: "inline-block" }}
              >
                Promesa.
              </span>
            </h2>
            <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link
                to="/explorar"
                className="btn btn-primary btn-mega"
                style={{ textDecoration: "none" }}
              >
                Abrir IKIGAI <Icon name="arrow-right" size={16} />
              </Link>
              <Link
                to="/contacto"
                className="btn btn-mega"
                style={{
                  background: "transparent",
                  color: "var(--paper)",
                  borderColor: "var(--paper)",
                  boxShadow: "3px 3px 0 var(--rose-500)",
                  textDecoration: "none",
                }}
              >
                Saluda al equipo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
