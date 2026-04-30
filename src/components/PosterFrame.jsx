import { getAnimeImage } from "../utils/anime.js";

function PosterFrame({ anime, height = 300, decorations = true, fill = false }) {
  const image = getAnimeImage(anime);
  const titleJp = anime.title_japanese || anime.title || "";
  const firstChar = titleJp.charAt(0);
  const kanjiSize = fill ? 220 : Math.min(height * 0.7, 220);

  return (
    <div
      className="poster-frame"
      style={fill ? { width: "100%", height: "100%" } : { width: "100%", height }}
    >
      <img src={image} alt={`Poster de ${anime.title}`} loading="lazy" />
      {decorations && (
        <>
          <div className="poster-stripe" aria-hidden="true" />
          {firstChar && (
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                right: -10,
                bottom: -22,
                fontFamily: "var(--font-jp)",
                fontSize: kanjiSize,
                fontWeight: 800,
                color: "rgba(255,255,255,.4)",
                lineHeight: 0.85,
                letterSpacing: "-.05em",
                pointerEvents: "none",
                textShadow: "0 2px 8px rgba(42,21,48,.25)",
              }}
            >
              {firstChar}
            </div>
          )}
          {anime.type && (
            <div
              style={{
                position: "absolute",
                top: 12,
                left: 16,
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 10px",
                background: "rgba(42,21,48,.75)",
                backdropFilter: "blur(8px)",
                borderRadius: 999,
                color: "white",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: ".08em",
                textTransform: "uppercase",
              }}
            >
              ✦ {anime.type}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PosterFrame;
