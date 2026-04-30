import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRomanceAnime } from "../api/jikan.js";
import AnimeCard from "../components/AnimeCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import Icon from "../components/Icon.jsx";
import LoadingGrid from "../components/LoadingGrid.jsx";
import PosterFrame from "../components/PosterFrame.jsx";
import SearchFilters from "../components/SearchFilters.jsx";
import { compactNumber } from "../utils/anime.js";
import { useDebouncedValue } from "../hooks/useDebouncedValue.js";

function ExplorePage({ favoriteIds, onAddFavorite, onNotify, onRequestRemoveFavorite }) {
  const [animeList, setAnimeList] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [resultTotal, setResultTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("score");
  const [view, setView] = useState("grid");

  const debouncedSearch = useDebouncedValue(search);

  useEffect(() => {
    const controller = new AbortController();

    async function loadAnime() {
      setIsLoading(true);
      setError("");
      try {
        const payload = await fetchRomanceAnime(
          { query: debouncedSearch, status, type, orderBy: sort, sort: "desc" },
          controller.signal,
        );
        setAnimeList(payload.data || []);
        setResultTotal(
          payload.pagination?.items?.total || (payload.data?.length ?? 0),
        );
      } catch (caughtError) {
        if (caughtError.name !== "AbortError") {
          const message = "La API no respondió. Revisa tu conexión o intenta de nuevo.";
          setError(message);
          setAnimeList([]);
          setResultTotal(0);
          onNotify("error", message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadAnime();
    return () => controller.abort();
  }, [debouncedSearch, status, type, sort, reloadKey]);

  function handleFavoriteToggle(anime) {
    if (favoriteIds.has(anime.mal_id)) {
      onRequestRemoveFavorite(anime);
      return;
    }
    onAddFavorite(anime);
  }

  function resetFilters() {
    setSearch("");
    setStatus("");
    setType("");
    setSort("score");
  }

  const sortLabel = useMemo(() => {
    switch (sort) {
      case "popularity":
        return "popularidad";
      case "title":
        return "A → Z";
      case "start_date":
        return "más reciente";
      default:
        return "score";
    }
  }, [sort]);

  return (
    <div className="atlas-container">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 32,
          alignItems: "flex-end",
          marginBottom: 28,
        }}
        className="explore-header"
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
            ── 探索 · EXPLORA EL ATLAS
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
            Cada romance,
            <br />
            <span style={{ color: "var(--rose-500)" }}>catalogado.</span>
            <span
              className="hand"
              aria-hidden="true"
              style={{
                fontSize: 32,
                color: "var(--rose-400)",
                marginLeft: 10,
                display: "inline-block",
                transform: "rotate(-6deg)",
              }}
            >
              ♡
            </span>
          </h1>
        </div>
        <aside
          className="panel-ink"
          style={{ padding: 18, background: "var(--rose-100)" }}
          aria-label="Nota editorial"
        >
          <div
            className="mono"
            style={{
              fontSize: 10.5,
              color: "var(--rose-700)",
              letterSpacing: ".1em",
              marginBottom: 4,
            }}
          >
            DESDE LA REDACCIÓN ✦
          </div>
          <p
            className="serif"
            style={{
              margin: 0,
              fontSize: 14.5,
              lineHeight: 1.5,
              color: "var(--ink)",
              fontStyle: "italic",
            }}
          >
            "Probamos cada serie leyendo en voz alta sus tres primeras sinopsis a medianoche.
            Si nos sale una lágrima, entra al atlas."
          </p>
          <div
            className="hand"
            style={{ marginTop: 6, fontSize: 18, color: "var(--rose-700)" }}
          >
            — el equipo del atlas
          </div>
        </aside>
      </div>

      <SearchFilters
        search={search}
        status={status}
        type={type}
        sort={sort}
        view={view}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onTypeChange={setType}
        onSortChange={setSort}
        onViewChange={setView}
        onReset={resetFilters}
      />

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: 18,
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <span className="display" style={{ fontSize: 22, color: "var(--ink)" }}>
            {isLoading ? "—" : animeList.length}
          </span>
          <span
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--ink-mute)",
              marginLeft: 10,
              letterSpacing: ".1em",
            }}
          >
            DE {compactNumber(resultTotal)} TÍTULOS DE ROMANCE
            {debouncedSearch ? ` QUE COINCIDEN CON "${debouncedSearch.toUpperCase()}"` : ""}
          </span>
        </div>
        <div className="serif" style={{ fontSize: 12, color: "var(--rose-500)" }}>
          {status && `· ${status} `}
          {type && `· ${type} `}· ordenado por {sortLabel}
        </div>
      </div>

      {isLoading && <LoadingGrid count={6} />}

      {!isLoading && error && (
        <ErrorState
          message={error}
          onRetry={() => setReloadKey((current) => current + 1)}
        />
      )}

      {!isLoading && !error && animeList.length === 0 && (
        <EmptyState
          title="Nada en el atlas coincide con eso."
          description="Prueba con otro nombre o limpia los filtros para volver al top de romance."
          actionLabel="Limpiar filtros"
          onAction={resetFilters}
        />
      )}

      {!isLoading && !error && animeList.length > 0 && view === "grid" && (
        <section
          aria-label="Resultados en cuadrícula"
          className="grid-cards"
          style={{ paddingBottom: 40 }}
        >
          {animeList.map((anime) => (
            <AnimeCard
              anime={anime}
              isFavorite={favoriteIds.has(anime.mal_id)}
              key={anime.mal_id}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </section>
      )}

      {!isLoading && !error && animeList.length > 0 && view === "list" && (
        <section
          aria-label="Resultados en lista"
          style={{ display: "flex", flexDirection: "column", gap: 12, paddingBottom: 40 }}
        >
          {animeList.map((anime) => (
            <ListRow
              key={anime.mal_id}
              anime={anime}
              isFavorite={favoriteIds.has(anime.mal_id)}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </section>
      )}
    </div>
  );
}

function ListRow({ anime, isFavorite, onFavoriteToggle }) {
  return (
    <article
      className="panel-ink"
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr auto",
        gap: 18,
        padding: 12,
        alignItems: "center",
        background: "var(--paper)",
      }}
    >
      <Link
        to={`/anime/${anime.mal_id}`}
        aria-label={`Ver detalle de ${anime.title}`}
        style={{
          width: 120,
          height: 120,
          overflow: "hidden",
          borderRadius: 10,
          border: "1.5px solid var(--ink)",
          display: "block",
        }}
      >
        <PosterFrame anime={anime} height={120} decorations={false} />
      </Link>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 4,
            flexWrap: "wrap",
          }}
        >
          <span className="score-pill">
            <Icon name="star" size={9} /> {anime.score ?? "—"}
          </span>
          <span className="chip chip-cream" style={{ padding: "2px 8px", fontSize: 10 }}>
            {anime.type || "Anime"}
          </span>
          <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>
            {anime.status || "—"} · {anime.episodes ?? "?"} ep
          </span>
        </div>
        <Link
          to={`/anime/${anime.mal_id}`}
          className="display"
          style={{
            margin: 0,
            fontSize: 18,
            color: "var(--ink)",
            textDecoration: "none",
          }}
        >
          {anime.title}{" "}
          {anime.title_japanese && (
            <span
              style={{
                fontFamily: "var(--font-jp)",
                fontSize: 13,
                color: "var(--rose-500)",
                fontWeight: 500,
                marginLeft: 6,
              }}
            >
              {anime.title_japanese}
            </span>
          )}
        </Link>
        <p
          className="line-clamp-2"
          style={{
            margin: "4px 0 0",
            fontSize: 13,
            color: "var(--ink-soft)",
            lineHeight: 1.5,
            maxWidth: 720,
          }}
        >
          {anime.synopsis || "Sin sinopsis disponible."}
        </p>
      </div>
      <button
        type="button"
        className={`fav-btn ${isFavorite ? "is-fav" : ""}`}
        onClick={() => onFavoriteToggle(anime)}
        aria-label={
          isFavorite
            ? `Quitar ${anime.title} de favoritos`
            : `Agregar ${anime.title} a favoritos`
        }
      >
        <Icon name={isFavorite ? "heart-fill" : "heart"} size={15} />
      </button>
    </article>
  );
}

export default ExplorePage;
