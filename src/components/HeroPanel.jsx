import { useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import PosterFrame from "./PosterFrame.jsx";

function SakuraLayer({ count = 18 }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, index) => ({
        left: Math.random() * 100,
        delay: Math.random() * 11,
        dur: 9 + Math.random() * 8,
        sway: 2.4 + Math.random() * 2.6,
        scale: 0.6 + Math.random() * 0.9,
        hue: ["var(--rose-200)", "var(--rose-300)", "var(--rose-400)", "var(--lilac-200)"][
          index % 4
        ],
      })),
    [count],
  );

  return (
    <div className="sakura-layer" aria-hidden="true">
      {petals.map((petal, index) => (
        <span
          className="sakura"
          key={index}
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s, ${petal.delay}s`,
            animationDuration: `${petal.dur}s, ${petal.sway}s`,
            transform: `scale(${petal.scale})`,
            background: `radial-gradient(ellipse at 30% 30%, var(--rose-100), ${petal.hue})`,
          }}
        />
      ))}
    </div>
  );
}

function HeroPanel({ featured }) {
  return (
    <section style={{ position: "relative", overflow: "hidden", minHeight: 720 }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: 80,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "var(--rose-100)",
            filter: "blur(8px)",
            animation: "panelSway 7s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "var(--lilac-100)",
            filter: "blur(12px)",
            animation: "panelSway 9s ease-in-out infinite reverse",
          }}
        />
        <div className="burst" style={{ top: 120, right: "40%" }} />
        <div
          className="burst"
          style={{
            bottom: 60,
            left: "30%",
            background: "radial-gradient(circle, rgba(255,107,168,.55), transparent 60%)",
          }}
        />
      </div>

      <SakuraLayer />

      <div
        className="kanji-pulse kanji-bg"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-4%",
          top: "8%",
          fontSize: "clamp(220px, 32vw, 520px)",
          color: "var(--rose-200)",
          zIndex: 0,
        }}
      >
        恋
      </div>

      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "40px 32px 0",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          className="slam-in-up"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 22,
            flexWrap: "wrap",
            animationDelay: ".1s",
          }}
        >
          <span className="chip chip-ink" style={{ padding: "6px 14px" }}>
            <span style={{ fontFamily: "var(--font-jp)" }}>新作</span> Spring 2026 lineup
          </span>
          <span
            className="mono hide-on-mobile"
            style={{ fontSize: 11, color: "var(--ink-mute)", letterSpacing: ".12em" }}
          >
            ── ATLAS №.001 · GENRE ROMANCE
          </span>
          <span
            className="hand heart-bounce"
            style={{ fontSize: 22, color: "var(--rose-500)" }}
            aria-hidden="true"
          >
            ♡
          </span>
        </div>

        <div className="split-2">
          <div style={{ position: "relative" }}>
            <h1
              className="display"
              style={{
                margin: 0,
                fontSize: "clamp(48px, 7vw, 104px)",
                lineHeight: 0.92,
                letterSpacing: "-.025em",
                color: "var(--ink)",
              }}
            >
              <span className="slam-in" style={{ display: "inline-block", animationDelay: ".05s" }}>
                Encuentra el
              </span>
              <br />
              <span
                className="slam-in-r kinetic-word"
                style={{
                  color: "var(--rose-500)",
                  fontFamily: "var(--font-jp)",
                  fontWeight: 700,
                  animationDelay: ".25s, 1.4s",
                }}
              >
                romance
              </span>
              <br />
              <span className="slam-in" style={{ display: "inline-block", animationDelay: ".45s" }}>
                que no sabías
              </span>
              <br />
              <span
                className="slam-in-r"
                style={{ display: "inline-block", animationDelay: ".65s", position: "relative" }}
              >
                que <span className="hi-bar">necesitabas</span>
                <span
                  className="heart-bounce"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    right: -32,
                    top: -8,
                    fontFamily: "var(--font-hand)",
                    fontSize: 32,
                    color: "var(--rose-400)",
                    display: "inline-block",
                  }}
                >
                  ♡
                </span>
              </span>
            </h1>

            <p
              className="slam-in-up"
              style={{
                marginTop: 26,
                maxWidth: 480,
                fontSize: 16,
                lineHeight: 1.6,
                color: "var(--ink-soft)",
                animationDelay: ".9s",
              }}
            >
              Un atlas curado a mano del catálogo de romance de MyAnimeList — ordenado por la
              forma en que te aprietan el pecho. Datos en vivo desde la API pública de Jikan.
            </p>

            <div
              className="slam-in-up"
              style={{
                display: "flex",
                gap: 12,
                marginTop: 28,
                alignItems: "center",
                flexWrap: "wrap",
                animationDelay: "1.05s",
              }}
            >
              <Link
                to="/explorar"
                className="btn btn-primary btn-mega"
                style={{ textDecoration: "none" }}
              >
                Explorar el atlas <Icon name="arrow-right" size={16} />
              </Link>
              <Link
                to="/favoritos"
                className="btn btn-mega"
                style={{ textDecoration: "none" }}
              >
                <Icon name="heart" size={14} /> Mis favoritos
              </Link>
              <span
                className="hand"
                style={{ fontSize: 18, color: "var(--ink-mute)", marginLeft: 4 }}
              >
                ↳ <span className="kinetic-word" style={{ display: "inline-block" }}>start here</span>
              </span>
            </div>

            <div
              className="slam-in-up"
              style={{
                marginTop: 48,
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                border: "2px solid var(--ink)",
                borderRadius: "var(--r-md)",
                overflow: "hidden",
                background: "var(--paper)",
                boxShadow: "4px 4px 0 var(--ink)",
                maxWidth: 540,
                animationDelay: "1.25s",
              }}
            >
              {[
                { n: "12,408", l: "títulos", jp: "作品" },
                { n: "94", l: "estudios", jp: "制作" },
                { n: "6.2M", l: "fans", jp: "ファン" },
                { n: "1985", l: "since", jp: "昭和" },
              ].map((stat, index) => (
                <div
                  key={stat.l}
                  style={{
                    padding: "14px 12px",
                    borderRight: index < 3 ? "1.5px solid var(--ink)" : "none",
                  }}
                >
                  <div
                    className="display stat-pop"
                    style={{
                      fontSize: 22,
                      color: "var(--ink)",
                      lineHeight: 1,
                      animationDelay: `${1.4 + index * 0.1}s`,
                    }}
                  >
                    {stat.n}
                  </div>
                  <div
                    style={{
                      fontSize: 10.5,
                      color: "var(--ink-mute)",
                      textTransform: "uppercase",
                      letterSpacing: ".08em",
                      marginTop: 4,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {stat.l}{" "}
                    <span
                      style={{
                        fontFamily: "var(--font-jp)",
                        color: "var(--rose-400)",
                        marginLeft: 4,
                      }}
                    >
                      {stat.jp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "relative", paddingTop: 12 }}>
            {featured ? (
              <>
                <div
                  className="panel-ink panel-sway slam-in-r"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    aspectRatio: "4/5",
                    animationDelay: ".3s",
                  }}
                >
                  <PosterFrame anime={featured} height={520} />
                  <div
                    className="float-caption"
                    style={{
                      position: "absolute",
                      left: 14,
                      bottom: 14,
                      right: 14,
                      background: "var(--paper)",
                      border: "2px solid var(--ink)",
                      borderRadius: 14,
                      padding: "12px 14px",
                      boxShadow: "3px 3px 0 var(--ink)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        gap: 10,
                      }}
                    >
                      <span
                        className="mono"
                        style={{
                          fontSize: 10,
                          color: "var(--rose-500)",
                          letterSpacing: ".1em",
                        }}
                      >
                        FEATURED ✦ #{featured.rank ?? "?"} RANKED
                      </span>
                      <span className="serif" style={{ fontSize: 12, color: "var(--ink-mute)" }}>
                        {featured.year || ""}
                      </span>
                    </div>
                    <Link
                      to={`/anime/${featured.mal_id}`}
                      className="display"
                      style={{
                        display: "block",
                        margin: "4px 0 2px",
                        fontSize: 20,
                        lineHeight: 1.1,
                        color: "var(--ink)",
                        textDecoration: "none",
                      }}
                    >
                      {featured.title}
                    </Link>
                    {featured.title_japanese && (
                      <div
                        style={{
                          fontFamily: "var(--font-jp)",
                          fontSize: 13,
                          color: "var(--rose-500)",
                        }}
                      >
                        {featured.title_japanese}
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className="panel-rose note-flap slam-in-r"
                  style={{
                    position: "absolute",
                    top: -14,
                    right: -22,
                    width: 168,
                    padding: 12,
                    background: "var(--rose-100)",
                    animationDelay: ".5s, 0s",
                    zIndex: 3,
                  }}
                  aria-hidden="true"
                >
                  <div
                    className="halftone"
                    style={{
                      width: "100%",
                      height: 110,
                      borderRadius: 10,
                      marginBottom: 8,
                      background: "linear-gradient(135deg, var(--rose-200), var(--lilac-200))",
                    }}
                  />
                  <div
                    className="hand bubble-jiggle"
                    style={{ fontSize: 19, color: "var(--ink)", lineHeight: 1.1 }}
                  >
                    "Lo vería 100×"
                  </div>
                  <div
                    className="mono"
                    style={{
                      fontSize: 9,
                      color: "var(--ink-mute)",
                      marginTop: 6,
                      letterSpacing: ".1em",
                    }}
                  >
                    ─ MAL · {featured.score ?? "—"}
                  </div>
                </div>

                <Link
                  to={`/anime/${featured.mal_id}`}
                  className="badge-spin glow-pulse"
                  aria-label={`Ver detalle de ${featured.title}`}
                  style={{
                    position: "absolute",
                    bottom: -20,
                    left: -20,
                    width: 88,
                    height: 88,
                    borderRadius: "50%",
                    background: "var(--ink)",
                    color: "var(--paper)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "4px 4px 0 var(--rose-500)",
                    zIndex: 3,
                    textDecoration: "none",
                  }}
                >
                  <span>
                    <Icon name="play" size={22} />
                    <span
                      className="mono"
                      style={{ fontSize: 8.5, letterSpacing: ".1em", display: "block" }}
                    >
                      VER DETALLE
                    </span>
                  </span>
                </Link>

                <span
                  className="drift-sparkle"
                  style={{ left: "20%", top: "40%", animationDelay: "0s" }}
                  aria-hidden="true"
                >
                  ✦
                </span>
                <span
                  className="drift-sparkle"
                  style={{ left: "60%", top: "70%", animationDelay: "1.6s" }}
                  aria-hidden="true"
                >
                  ♡
                </span>
                <span
                  className="drift-sparkle"
                  style={{ left: "80%", top: "20%", animationDelay: "3s" }}
                  aria-hidden="true"
                >
                  ✦
                </span>
              </>
            ) : (
              <div
                className="panel-ink"
                style={{
                  aspectRatio: "4/5",
                  background: "linear-gradient(135deg, var(--rose-100), var(--lilac-100))",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <span className="heart-pulse" aria-hidden="true" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="speed-lines-anim" style={{ height: 60, marginTop: 60 }} aria-hidden="true" />
    </section>
  );
}

export default HeroPanel;
