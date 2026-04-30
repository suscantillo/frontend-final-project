import { useState } from "react";
import { Link } from "react-router-dom";
import { getAnimeImage } from "../utils/anime.js";
import Icon from "./Icon.jsx";
import PosterFrame from "./PosterFrame.jsx";

function SakuraLayer({ count = 10 }) {
  const [petals] = useState(() =>
    Array.from({ length: count }).map((_, index) => ({
      left: Math.random() * 100,
      delay: Math.random() * 11,
      dur: 14 + Math.random() * 10,
      sway: 4.2 + Math.random() * 2.2,
      scale: 0.55 + Math.random() * 0.6,
      hue: ["var(--rose-200)", "var(--rose-300)", "var(--rose-400)", "var(--lilac-200)"][
        index % 4
      ],
    })),
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
            opacity: 0.58,
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
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: "30%",
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,107,168,.55), transparent 60%)",
            opacity: 0.5,
          }}
        />
      </div>

      <SakuraLayer />

      <div
        className="kanji-bg"
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
        className="hero-shell"
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
            ── IKIGAI №.001 · GENRE ROMANCE
          </span>
          <span
            className="hand"
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
                fontSize: "clamp(40px, 8vw, 104px)",
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
                className="slam-in-r"
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
                  className="hand"
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
              IKIGAI es un catálogo curado a mano del shelf de romance de MyAnimeList . Datos en vivo desde la API pública de Jikan.
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
                Explorar IKIGAI <Icon name="arrow-right" size={16} />
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
                ↳ <span style={{ display: "inline-block" }}>codeado con ❤️ por j.cantillo</span>
              </span>
            </div>

            <div
              className="slam-in-up hero-stats"
              style={{
                marginTop: 48,
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

          <div className="hero-side" style={{ position: "relative", paddingTop: 12 }}>
            {featured ? (
              <>
                <div
                  className="panel-ink slam-in-r"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    aspectRatio: "4/5",
                    animationDelay: ".3s",
                  }}
                >
                  <PosterFrame anime={featured} fill />
                  <div
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
                  className="panel-rose slam-in-r"
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
                  <img
                    src={getAnimeImage(featured)}
                    alt=""
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: 110,
                      borderRadius: 10,
                      marginBottom: 8,
                      objectFit: "cover",
                      border: "1.5px solid var(--ink)",
                      display: "block",
                    }}
                  />
                  <div
                    className="hand"
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
                  className="slam-in-up"
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
                    animationDelay: ".7s",
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
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "18%",
                    top: "42%",
                    fontSize: 18,
                    color: "var(--rose-400)",
                    opacity: 0.6,
                  }}
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

      <div
        style={{
          height: 52,
          marginTop: 60,
          background:
            "repeating-linear-gradient(90deg, transparent 0 14px, rgba(42,21,48,.12) 14px 15px, transparent 15px 28px)",
          opacity: 0.7,
        }}
        aria-hidden="true"
      />
    </section>
  );
}

export default HeroPanel;
