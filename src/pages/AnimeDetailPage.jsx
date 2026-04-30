import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchAnimeById, fetchTopRomance } from "../api/jikan.js";
import AnimeCard from "../components/AnimeCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import Icon from "../components/Icon.jsx";
import LoadingGrid from "../components/LoadingGrid.jsx";
import PosterFrame from "../components/PosterFrame.jsx";
import { compactNumber, joinNames } from "../utils/anime.js";

function statusDotClass(status) {
  const s = (status || "").toLowerCase();
  if (s.includes("airing") || s.includes("currently")) return "dot-airing";
  if (s.includes("not yet") || s.includes("upcoming")) return "dot-upcoming";
  return "dot-finished";
}

function FactRow({ label, jp, children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        gap: 8,
        padding: "7px 0",
        borderTop: "1px dashed rgba(42,21,48,.18)",
        fontSize: 12.5,
      }}
    >
      <div style={{ color: "var(--ink-mute)", display: "flex", gap: 6, alignItems: "baseline" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            textTransform: "uppercase",
            letterSpacing: ".08em",
            fontSize: 10.5,
          }}
        >
          {label}
        </span>
        <span style={{ fontFamily: "var(--font-jp)", fontSize: 11, color: "var(--rose-400)" }}>
          {jp}
        </span>
      </div>
      <div style={{ color: "var(--ink)", fontWeight: 500 }}>{children}</div>
    </div>
  );
}

function AnimeDetailPage({ favoriteIds, onAddFavorite, onNotify, onRequestRemoveFavorite }) {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [related, setRelated] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadAnimeDetail() {
      setIsLoading(true);
      setError("");
      try {
        const payload = await fetchAnimeById(id, controller.signal);
        setAnime(payload.data || null);
      } catch (caughtError) {
        if (caughtError.name !== "AbortError") {
          const message = "No se pudo cargar el detalle de este anime.";
          setAnime(null);
          setError(message);
          onNotify("error", message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadAnimeDetail();
    return () => controller.abort();
  }, [id, reloadKey]);

  useEffect(() => {
    const controller = new AbortController();
    async function loadRelated() {
      try {
        const payload = await fetchTopRomance(8, controller.signal);
        setRelated(
          (payload.data || []).filter((item) => item.mal_id !== Number(id)).slice(0, 4),
        );
      } catch (caughtError) {
        if (caughtError.name !== "AbortError") setRelated([]);
      }
    }
    loadRelated();
    return () => controller.abort();
  }, [id]);

  if (isLoading) {
    return (
      <div className="page-shell">
        <LoadingGrid count={3} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-shell">
        <ErrorState
          message={error}
          onRetry={() => setReloadKey((current) => current + 1)}
        />
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="page-shell">
        <EmptyState
          title="Detalle no disponible."
          description="Jikan no devolvió información para este ID."
          actionLabel="Volver a explorar"
          actionTo="/explorar"
        />
      </div>
    );
  }

  const isFavorite = favoriteIds.has(anime.mal_id);

  function handleFavoriteToggle() {
    if (isFavorite) {
      onRequestRemoveFavorite(anime);
    } else {
      onAddFavorite(anime);
    }
  }

  return (
    <article>
      <div className="detail-ribbon">
        <div className="detail-ribbon-inner">
          <Link
            to="/explorar"
            style={{
              color: "var(--paper)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: 13,
              textDecoration: "none",
            }}
          >
            <Icon name="arrow-left" size={14} /> Volver a IKIGAI
          </Link>
          <div
            className="mono detail-ribbon-id"
            style={{
              fontSize: 11,
              letterSpacing: ".12em",
              color: "rgba(255,253,248,.6)",
            }}
          >
            IKIGAI · ID #{String(anime.mal_id).padStart(4, "0")} · GENRE 22 ✦
          </div>
        </div>
      </div>

      <div className="page-shell">
        <div className="split-detail">
          <div className="detail-poster-col">
            <div className="panel-ink" style={{ overflow: "hidden", background: "var(--paper)" }}>
              <PosterFrame anime={anime} height={560} />
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap" }}>
              <button
                type="button"
                className={isFavorite ? "btn btn-primary" : "btn"}
                style={{ flex: 1, justifyContent: "center" }}
                onClick={handleFavoriteToggle}
              >
                <Icon name={isFavorite ? "heart-fill" : "heart"} size={15} />
                {isFavorite ? "En tu ikigai" : "Guardar en ikigai"}
              </button>
              {anime.trailer?.url && (
                <a
                  href={anime.trailer.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                  style={{ flex: 1, justifyContent: "center", textDecoration: "none" }}
                >
                  <Icon name="play" size={13} /> Ver trailer
                </a>
              )}
            </div>

            <div
              className="panel-ink"
              style={{ marginTop: 16, padding: 16, background: "var(--cream)" }}
            >
              <div
                className="mono"
                style={{
                  fontSize: 10,
                  color: "var(--rose-500)",
                  letterSpacing: ".12em",
                  marginBottom: 10,
                }}
              >
                FACTS ✦ 事実
              </div>
              <FactRow label="Estado" jp="状態">
                <span
                  className={`dot ${statusDotClass(anime.status)}`}
                  style={{ marginRight: 6 }}
                  aria-hidden="true"
                />
                {anime.status || "—"}
              </FactRow>
              <FactRow label="Tipo" jp="形式">
                {anime.type || "—"}
              </FactRow>
              <FactRow label="Episodios" jp="話数">
                {anime.episodes ?? "?"}
              </FactRow>
              <FactRow label="Duración" jp="時間">
                {anime.duration || "—"}
              </FactRow>
              <FactRow label="Clasificación" jp="区分">
                {anime.rating || "—"}
              </FactRow>
              <FactRow label="Emisión" jp="放送">
                {anime.season ? `${anime.season} ` : ""}
                {anime.year || ""}
                {!anime.season && !anime.year && "—"}
              </FactRow>
              <FactRow label="Estudios" jp="制作">
                {joinNames(anime.studios)}
              </FactRow>
            </div>
          </div>

          <div className="detail-content-col">
            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                marginBottom: 14,
              }}
            >
              {(anime.genres || []).map((genre, index) => (
                <span
                  key={genre.mal_id}
                  className={index === 0 ? "chip" : "chip chip-lilac"}
                >
                  {genre.name}
                </span>
              ))}
              {(anime.themes || []).map((theme) => (
                <span key={theme.mal_id} className="chip chip-cream">
                  ✦ {theme.name}
                </span>
              ))}
            </div>

            {anime.title_japanese && (
              <div
                style={{
                  fontFamily: "var(--font-jp)",
                  fontSize: "clamp(15px, 3.6vw, 22px)",
                  color: "var(--rose-500)",
                  fontWeight: 600,
                  marginBottom: 4,
                  lineHeight: 1.25,
                  wordBreak: "break-word",
                }}
              >
                {anime.title_japanese}
              </div>
            )}
            <h1
              className="display"
              style={{
                margin: 0,
                fontSize: "clamp(28px, 6vw, 68px)",
                lineHeight: 1.05,
                letterSpacing: "-.02em",
                wordBreak: "break-word",
              }}
            >
              {anime.title}
            </h1>
            {anime.title_english && anime.title_english !== anime.title && (
              <div
                style={{
                  marginTop: 6,
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--ink-mute)",
                  letterSpacing: ".08em",
                }}
              >
                {anime.title_english.toUpperCase()}
              </div>
            )}

            <div className="panel-ink detail-score-grid">
              {[
                {
                  label: "Score",
                  jp: "評価",
                  value: anime.score ?? "—",
                  sub: "/ 10",
                  color: "var(--gold)",
                },
                {
                  label: "Ranking",
                  jp: "順位",
                  value: anime.rank ? `#${anime.rank}` : "—",
                  sub: "global romance",
                  color: "var(--rose-500)",
                },
                {
                  label: "Fans",
                  jp: "ファン",
                  value: compactNumber(anime.members),
                  sub: "en MAL",
                  color: "var(--lilac-400)",
                },
              ].map((stat) => (
                <div key={stat.label} className="detail-score-cell">
                  <div
                    className="mono"
                    style={{
                      fontSize: 10,
                      color: "var(--ink-mute)",
                      letterSpacing: ".1em",
                      marginBottom: 4,
                    }}
                  >
                    {stat.label.toUpperCase()} ·{" "}
                    <span className="serif" style={{ color: stat.color }}>
                      {stat.jp}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span
                      className="display"
                      style={{ fontSize: 32, color: "var(--ink)", lineHeight: 1 }}
                    >
                      {stat.value}
                    </span>
                    <span style={{ fontSize: 12, color: "var(--ink-mute)" }}>{stat.sub}</span>
                  </div>
                </div>
              ))}
            </div>

            <section style={{ marginTop: 32 }} aria-labelledby="synopsis-title">
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  color: "var(--rose-500)",
                  letterSpacing: ".12em",
                  marginBottom: 8,
                }}
              >
                ── あらすじ · SINOPSIS
              </div>
              <h2 id="synopsis-title" className="sr-only">
                Sinopsis
              </h2>
              <p
                className="serif"
                style={{
                  margin: 0,
                  fontSize: 18,
                  lineHeight: 1.55,
                  color: "var(--ink)",
                  maxWidth: 640,
                }}
              >
                {anime.synopsis || "Sin sinopsis disponible."}
              </p>
              <div
                className="hand"
                style={{ marginTop: 10, fontSize: 18, color: "var(--rose-500)" }}
              >
                ↳ saca un pañuelo, lo vas a necesitar
              </div>
            </section>

            {related.length > 0 && (
              <section style={{ marginTop: 56 }} aria-label="Relacionados">
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: "var(--rose-500)",
                    letterSpacing: ".12em",
                    marginBottom: 6,
                  }}
                >
                  ── 関連 · SI TE GUSTÓ ESTE
                </div>
                <h3 className="display" style={{ margin: "0 0 16px", fontSize: 24 }}>
                  IKIGAI cree que también caerás por…
                </h3>
                <div className="grid-4">
                  {related.map((item) => (
                    <AnimeCard
                      key={item.mal_id}
                      anime={item}
                      isFavorite={favoriteIds.has(item.mal_id)}
                      onFavoriteToggle={(target) =>
                        favoriteIds.has(target.mal_id)
                          ? onRequestRemoveFavorite(target)
                          : onAddFavorite(target)
                      }
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default AnimeDetailPage;
