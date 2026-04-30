export const POSTER_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 800'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%23881337'/%3E%3Cstop offset='1' stop-color='%23fb7185'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='600' height='800' rx='48' fill='url(%23g)'/%3E%3Ccircle cx='462' cy='148' r='86' fill='%23fde68a' opacity='.86'/%3E%3Ctext x='56' y='414' fill='%23fff7ed' font-family='Georgia' font-size='60' font-weight='700'%3EAnime%3C/text%3E%3Ctext x='56' y='484' fill='%23fff7ed' font-family='Trebuchet MS' font-size='28'%3ESin poster%3C/text%3E%3C/svg%3E";

export function getAnimeImage(anime) {
  return (
    anime?.images?.webp?.large_image_url ||
    anime?.images?.jpg?.large_image_url ||
    anime?.images?.webp?.image_url ||
    anime?.images?.jpg?.image_url ||
    POSTER_FALLBACK
  );
}

export function compactNumber(value) {
  return new Intl.NumberFormat("es", {
    maximumFractionDigits: 1,
    notation: "compact",
  }).format(value || 0);
}

export function joinNames(items = []) {
  if (!items.length) {
    return "No disponible";
  }

  return items.map((item) => item.name).join(", ");
}

export function toFavoriteAnime(anime) {
  return {
    episodes: anime.episodes,
    genres: anime.genres,
    images: anime.images,
    mal_id: anime.mal_id,
    members: anime.members,
    score: anime.score,
    status: anime.status,
    synopsis: anime.synopsis,
    title: anime.title,
    type: anime.type,
    year: anime.year,
  };
}
