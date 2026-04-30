import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ConfirmDialog from "./components/ConfirmDialog.jsx";
import Layout from "./components/Layout.jsx";
import ToastStack from "./components/ToastStack.jsx";
import AnimeDetailPage from "./pages/AnimeDetailPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ExplorePage from "./pages/ExplorePage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { toFavoriteAnime } from "./utils/anime.js";

function App() {
  const [favorites, setFavorites] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [confirmRequest, setConfirmRequest] = useState(null);

  const favoriteIds = new Set(favorites.map((anime) => anime.mal_id));

  function dismissToast(id) {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }

  function notify(type, message) {
    const id = `${Date.now()}-${Math.random()}`;

    setToasts((currentToasts) => [...currentToasts, { id, type, message }]);
    window.setTimeout(() => dismissToast(id), 3800);
  }

  function addFavorite(anime) {
    if (favoriteIds.has(anime.mal_id)) {
      notify("info", "Ese anime ya esta guardado en tus favoritos.");
      return;
    }

    setFavorites((currentFavorites) => [...currentFavorites, toFavoriteAnime(anime)]);
    notify("success", `${anime.title} agregado a favoritos.`);
  }

  function requestRemoveFavorite(anime) {
    setConfirmRequest({
      title: "Quitar de favoritos?",
      description: `Estas seguro de que quieres quitar ${anime.title} de tu ikigai?`,
      confirmLabel: "Quitar",
      cancelLabel: "No, conservarlo",
      tone: "danger",
      onConfirm: () => {
        setFavorites((currentFavorites) =>
          currentFavorites.filter((favorite) => favorite.mal_id !== anime.mal_id),
        );
        notify("info", `${anime.title} salio de tus favoritos.`);
      },
    });
  }

  function requestSendMessage(message, resetForm) {
    setConfirmRequest({
      title: "Enviar mensaje?",
      description: `Confirmas que quieres enviar este mensaje como ${message.name}?`,
      confirmLabel: "Enviar",
      cancelLabel: "Seguir editando",
      tone: "info",
      onConfirm: () => {
        resetForm();
        notify("success", "Mensaje enviado. Gracias por escribir.");
      },
    });
  }

  function handleConfirm() {
    const action = confirmRequest?.onConfirm;
    setConfirmRequest(null);
    action?.();
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout favoritesCount={favorites.length} />}>
          <Route index element={<HomePage />} />
          <Route
            path="explorar"
            element={
              <ExplorePage
                favoriteIds={favoriteIds}
                onAddFavorite={addFavorite}
                onNotify={notify}
                onRequestRemoveFavorite={requestRemoveFavorite}
              />
            }
          />
          <Route
            path="anime/:id"
            element={
              <AnimeDetailPage
                favoriteIds={favoriteIds}
                onAddFavorite={addFavorite}
                onNotify={notify}
                onRequestRemoveFavorite={requestRemoveFavorite}
              />
            }
          />
          <Route
            path="favoritos"
            element={
              <FavoritesPage
                favoriteIds={favoriteIds}
                favorites={favorites}
                onAddFavorite={addFavorite}
                onRequestRemoveFavorite={requestRemoveFavorite}
              />
            }
          />
          <Route
            path="contacto"
            element={<ContactPage onNotify={notify} onRequestSend={requestSendMessage} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      <ToastStack onDismiss={dismissToast} toasts={toasts} />
      <ConfirmDialog
        onCancel={() => setConfirmRequest(null)}
        onConfirm={handleConfirm}
        request={confirmRequest}
      />
    </BrowserRouter>
  );
}

export default App;
