import { Link } from "react-router-dom";
import { compactNumber } from "../utils/anime.js";
import Icon from "./Icon.jsx";
import PosterFrame from "./PosterFrame.jsx";

function statusDotClass(status) {
  const s = (status || "").toLowerCase();
  if (s.includes("airing") || s.includes("currently")) return "dot-airing";
  if (s.includes("not yet") || s.includes("upcoming")) return "dot-upcoming";
  return "dot-finished";
}

function AnimeCard({ anime, isFavorite, onFavoriteToggle, rank }) {
  const titleJp = anime.title_japanese || "";
  const status = anime.status || "Sin estado";
  const dot = statusDotClass(status);

  return (
    <article
      className="panel-ink tc-shake"
      style={{
        overflow: "hidden",
        background: "var(--paper)",
        transition: "transform .15s, box-shadow .15s",
      }}
    >
      <div style={{ position: "relative" }}>
        <Link
          to={`/anime/${anime.mal_id}`}
          aria-label={`Ver detalle de ${anime.title}`}
          style={{ display: "block", textDecoration: "none", color: "inherit" }}
        >
          <PosterFrame anime={anime} height={300} />
        </Link>

        {rank && (
          <div
            className="stat-pop"
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "var(--paper)",
              border: "2px solid var(--ink)",
              width: 36,
              height: 36,
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 14,
              boxShadow: "2px 2px 0 var(--ink)",
            }}
          >
            #{rank}
          </div>
        )}

        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            background: "var(--paper)",
            border: "1.5px solid var(--ink)",
            padding: "3px 9px",
            borderRadius: 999,
            fontSize: 10.5,
            fontFamily: "var(--font-mono)",
            letterSpacing: ".08em",
            textTransform: "uppercase",
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            maxWidth: "60%",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          <span className={`dot ${dot}`} aria-hidden="true" /> {status}
        </div>

        <button
          className={`fav-btn ${isFavorite ? "is-fav" : ""}`}
          style={{ position: "absolute", bottom: 10, right: 10 }}
          onClick={() => onFavoriteToggle(anime)}
          type="button"
          aria-label={
            isFavorite
              ? `Quitar ${anime.title} de favoritos`
              : `Agregar ${anime.title} a favoritos`
          }
        >
          <Icon name={isFavorite ? "heart-fill" : "heart"} size={15} />
        </button>
      </div>

      <div style={{ padding: "14px 16px 16px", borderTop: "2px solid var(--ink)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
            flexWrap: "wrap",
          }}
        >
          <span className="score-pill">
            <Icon name="star" size={9} /> {anime.score ?? "—"}
          </span>
          <span className="chip chip-cream" style={{ padding: "2px 8px", fontSize: 10 }}>
            {anime.type || "Anime"}
          </span>
          {anime.episodes != null && (
            <span className="chip chip-cream" style={{ padding: "2px 8px", fontSize: 10 }}>
              <Icon name="tv" size={9} /> {anime.episodes} ep
            </span>
          )}
          <span style={{ marginLeft: "auto", fontSize: 10.5, color: "var(--ink-mute)" }}>
            ♡ {compactNumber(anime.members)}
          </span>
        </div>

        <Link
          to={`/anime/${anime.mal_id}`}
          className="display"
          style={{
            display: "block",
            fontSize: 17,
            lineHeight: 1.15,
            color: "var(--ink)",
            textDecoration: "none",
          }}
        >
          {anime.title}
        </Link>

        {titleJp && (
          <div
            style={{
              fontFamily: "var(--font-jp)",
              fontSize: 12.5,
              color: "var(--rose-500)",
              marginTop: 2,
            }}
          >
            {titleJp}
          </div>
        )}

        <p
          className="line-clamp-2"
          style={{
            margin: "10px 0 0",
            fontSize: 12.5,
            color: "var(--ink-soft)",
            lineHeight: 1.5,
          }}
        >
          {anime.synopsis || "Sin sinopsis disponible."}
        </p>
      </div>
    </article>
  );
}

export default AnimeCard;
