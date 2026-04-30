const API_URL = "https://api.jikan.moe/v4";

export const ROMANCE_GENRE_ID = 22;

export const STATUS_FILTERS = [
  { value: "", label: "Todos los estados" },
  { value: "airing", label: "En emision" },
  { value: "complete", label: "Finalizados" },
  { value: "upcoming", label: "Por estrenar" },
];

async function requestJson(url, signal) {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`Jikan respondio con estado ${response.status}`);
  }

  return response.json();
}

export function fetchRomanceAnime(
  {
    query = "",
    status = "",
    type = "",
    orderBy = "score",
    sort = "desc",
    limit = 24,
    page = 1,
  } = {},
  signal,
) {
  const params = new URLSearchParams({
    genres: ROMANCE_GENRE_ID.toString(),
    order_by: orderBy,
    sort,
    limit: String(limit),
    page: String(page),
    sfw: "true",
  });

  if (query.trim()) params.set("q", query.trim());
  if (status) params.set("status", status);
  if (type) params.set("type", type);

  return requestJson(`${API_URL}/anime?${params.toString()}`, signal);
}

export function fetchTopRomance(limit = 8, signal) {
  return fetchRomanceAnime({ orderBy: "score", sort: "desc", limit }, signal);
}

export function fetchAnimeById(id, signal) {
  return requestJson(`${API_URL}/anime/${id}/full`, signal);
}
