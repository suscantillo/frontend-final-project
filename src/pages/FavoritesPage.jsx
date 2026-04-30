import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTopRomance } from "../api/jikan.js";
import AnimeCard from "../components/AnimeCard.jsx";
import Icon from "../components/Icon.jsx";
import PosterFrame from "../components/PosterFrame.jsx";

function FavoritesPage({ favoriteIds, favorites, onAddFavorite, onRequestRemoveFavorite }) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (favorites.length > 0) return undefined;
    const controller = new AbortController();
    async function load() {
      try {
        const payload = await fetchTopRomance(4, controller.signal);
        setSuggestions(payload.data || []);
      } catch (caughtError) {
        if (caughtError.name !== "AbortError") setSuggestions([]);
      }
    }
    load();
    return () => controller.abort();
  }, [favorites.length]);

  function handleFavoriteToggle(anime) {
    if (favoriteIds.has(anime.mal_id)) {
      onRequestRemoveFavorite(anime);
      return;
    }
    onAddFavorite(anime);
  }

  if (favorites.length === 0) {
    return (
      <div className="page-shell" style={{ maxWidth: 1100 }}>
        <div
          className="mono"
          style={{
            fontSize: 11,
            color: "var(--rose-500)",
            letterSpacing: ".15em",
            marginBottom: 8,
          }}
        >
          ── お気に入り · TU IKIGAI PRIVADO
        </div>
        <h1
          className="display"
          style={{
            margin: 0,
            fontSize: "clamp(40px, 6vw, 80px)",
            lineHeight: 0.94,
            letterSpacing: "-.02em",
          }}
        >
          Tu ikigai está
          <br />
          <span style={{ color: "var(--rose-500)" }}>todavía vacío.</span>
          <span
            className="hand"
            aria-hidden="true"
            style={{ fontSize: 32, color: "var(--rose-400)", marginLeft: 14 }}
          >
            ♡
          </span>
        </h1>

        <div
          className="panel-ink"
          style={{
            marginTop: 36,
            padding: "48px 40px",
            background: "var(--rose-100)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="halftone-soft"
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, opacity: 0.4 }}
          />
          <div
            aria-hidden="true"
            className="kanji-bg"
            style={{
              position: "absolute",
              right: -30,
              top: -40,
              fontSize: 220,
              color: "rgba(255,107,168,.18)",
            }}
          >
            愛
          </div>
          <div style={{ position: "relative", maxWidth: 560 }}>
            <p
              className="serif"
              style={{
                fontSize: 22,
                fontStyle: "italic",
                color: "var(--ink)",
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              "Tu ikigai es la lista privada de las cosas que te dan razón de ser.
              <br />
              El tuyo está esperando su primer pin."
            </p>
            <div
              className="hand"
              style={{ marginTop: 12, fontSize: 22, color: "var(--rose-700)" }}
            >
              — empieza con una serie ↓
            </div>
            <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link
                to="/explorar"
                className="btn btn-primary"
                style={{ textDecoration: "none" }}
              >
                Explorar IKIGAI <Icon name="arrow-right" size={14} />
              </Link>
              <Link to="/" className="btn" style={{ textDecoration: "none" }}>
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>

        {suggestions.length > 0 && (
          <section style={{ marginTop: 56 }} aria-label="Sugerencias para empezar">
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: "var(--ink-mute)",
                letterSpacing: ".12em",
                marginBottom: 14,
              }}
            >
              ── ¿NO SABES POR DÓNDE EMPEZAR? PRUEBA ESTAS ✦
            </div>
            <div className="grid-4">
              {suggestions.map((anime) => (
                <AnimeCard
                  key={anime.mal_id}
                  anime={anime}
                  isFavorite={favoriteIds.has(anime.mal_id)}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  return (
    <div className="page-shell">
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
              marginBottom: 8,
            }}
          >
            ── 私の生き甲斐 · TU IKIGAI PRIVADO
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
            {favorites.length} {favorites.length === 1 ? "anime" : "animes"}
            <br />
            <span style={{ color: "var(--rose-500)" }}>que adoras.</span>
          </h1>
          <p
            style={{
              marginTop: 10,
              color: "var(--ink-soft)",
              fontSize: 15,
              maxWidth: 480,
            }}
          >
            Una repisa pinneada a mano en el orden en que tu corazón los encontró. Quita un
            corazón para borrar lo que ya no encaja.
          </p>
        </div>
        <div
          className="panel-ink"
          style={{ padding: "14px 18px", background: "var(--cream)" }}
        >
          <div className="hand" style={{ fontSize: 20, color: "var(--rose-500)" }}>
            guardado desde
          </div>
          <div className="display" style={{ fontSize: 22, color: "var(--ink)" }}>
            {new Date().toLocaleDateString("es", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 22,
          paddingBottom: 40,
        }}
      >
        {favorites.map((anime, index) => (
          <PolaroidCard
            key={anime.mal_id}
            anime={anime}
            index={index}
            onRemove={() => onRequestRemoveFavorite(anime)}
          />
        ))}
      </div>
    </div>
  );
}

function PolaroidCard({ anime, index, onRemove }) {
  const tilt = ((index % 5) - 2) * 0.7;

  return (
    <div
      style={{
        background: "var(--paper)",
        padding: 12,
        paddingBottom: 22,
        boxShadow: "0 12px 28px rgba(42,21,48,.18), 0 1px 3px rgba(42,21,48,.12)",
        transform: `rotate(${tilt}deg)`,
        borderRadius: 4,
        transition: "transform .25s, box-shadow .25s",
        position: "relative",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform = "rotate(0deg) translateY(-4px)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = `rotate(${tilt}deg)`;
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -8,
          left: "50%",
          transform: "translateX(-50%) rotate(-4deg)",
          width: 60,
          height: 18,
          background: "rgba(255,209,102,.6)",
          borderLeft: "1px dashed rgba(0,0,0,.1)",
          borderRight: "1px dashed rgba(0,0,0,.1)",
        }}
      />
      <Link
        to={`/anime/${anime.mal_id}`}
        aria-label={`Ver detalle de ${anime.title}`}
        style={{ display: "block", textDecoration: "none", color: "inherit" }}
      >
        <PosterFrame anime={anime} height={240} />
      </Link>
      <div style={{ paddingTop: 14, paddingInline: 4 }}>
        <Link
          to={`/anime/${anime.mal_id}`}
          className="hand"
          style={{
            display: "block",
            fontSize: 22,
            lineHeight: 1,
            color: "var(--ink)",
            textDecoration: "none",
          }}
        >
          {anime.title}
        </Link>
        <div
          className="mono"
          style={{
            fontSize: 10,
            color: "var(--ink-mute)",
            marginTop: 6,
            letterSpacing: ".08em",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>★ {anime.score ?? "—"} · {anime.type || "Anime"}</span>
          <span>♡ pinned</span>
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="fav-btn is-fav"
        style={{ position: "absolute", top: 18, right: 18 }}
        aria-label={`Quitar ${anime.title} de tu ikigai`}
      >
        <Icon name="x" size={14} />
      </button>
    </div>
  );
}

export default FavoritesPage;
