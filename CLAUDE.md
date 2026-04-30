# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — production build into `dist/`
- `npm run preview` — preview the built bundle

There is no test runner, linter, or formatter configured.

## Stack

React 19 + Vite 7 SPA, styled with Tailwind v4 (loaded via `@tailwindcss/vite` and a single `@import "tailwindcss"` in `src/styles.css`). Routing via `react-router-dom` v7. Deployed to Vercel; `vercel.json` rewrites all paths to `/` so client-side routing works on refresh.

## Architecture

The app is a single-genre anime browser (hardcoded to Jikan's *Romance* genre, id `22`) backed by the public Jikan v4 API. UI strings are in Spanish — preserve language when editing.

**Cross-cutting state lives in `src/App.jsx`**, not in a context or store. `App` owns three pieces of global UX state and threads them into pages as props:

- `favorites` (array) + derived `favoriteIds` (Set of `mal_id`) — favorites are **in-memory only**; there is no localStorage or backend persistence, so they reset on reload. Favorite items are normalized through `toFavoriteAnime()` in `src/utils/anime.js` to keep only the fields pages render.
- `toasts` — `notify(type, message)` pushes a toast that auto-dismisses after 3.8s; rendered by `ToastStack`.
- `confirmRequest` — destructive/irreversible actions (removing a favorite, sending the contact form) call `requestRemove…` / `requestSend…` to open `ConfirmDialog` rather than acting immediately. The dialog runs the stored `onConfirm` callback only on user confirmation.

When adding a feature that needs to mutate favorites, show a toast, or guard an action, wire the new handler through `App.jsx` and pass it down — don't introduce parallel state.

**Routes** (all nested under the `Layout` route which renders the shared header/nav with a favorites count badge):
- `/` → `HomePage`
- `/explorar` → `ExplorePage` (search + status filter against Jikan)
- `/anime/:id` → `AnimeDetailPage`
- `/favoritos` → `FavoritesPage`
- `/contacto` → `ContactPage`
- `*` → `NotFoundPage`

**Data layer (`src/api/jikan.js`)** exposes `fetchRomanceAnime({ query, status }, signal)` and `fetchAnimeById(id, signal)`. Both accept an `AbortSignal` — call sites should pass one from a `useEffect` cleanup to cancel stale requests, especially on the search page where `useDebouncedValue` (450ms default) drives requeries on each keystroke. The genre filter is fixed; if you need a different genre, change `ROMANCE_GENRE_ID` rather than parameterizing per-call (and update the Spanish copy that references "romance").

**Image handling** lives in `getAnimeImage()` (`src/utils/anime.js`), which walks Jikan's `images.{webp,jpg}.{large_image_url,image_url}` chain and falls back to an inline SVG poster (`POSTER_FALLBACK`). Always use this helper rather than reading `images.*` directly so missing-poster cases stay consistent.
