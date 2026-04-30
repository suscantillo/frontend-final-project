import { Link, NavLink, Outlet } from "react-router-dom";
import Icon from "./Icon.jsx";
import Logo from "./Logo.jsx";

const navItems = [
  { to: "/", label: "Inicio", jp: "家", end: true },
  { to: "/explorar", label: "Explorar", jp: "探" },
  { to: "/favoritos", label: "Favoritos", jp: "愛" },
  { to: "/contacto", label: "Contacto", jp: "便" },
];

function Layout({ favoritesCount }) {
  return (
    <div className="app-shell app-scroll">
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(255,253,248,.85)",
          backdropFilter: "blur(16px) saturate(160%)",
          WebkitBackdropFilter: "blur(16px) saturate(160%)",
          borderBottom: "2px solid var(--ink)",
        }}
      >
        <nav
          aria-label="Navegación principal"
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "14px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }} aria-label="Ir al inicio">
            <Logo />
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
            {navItems.map((item) => (
              <NavLink
                end={item.end}
                key={item.to}
                to={item.to}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  background: isActive ? "var(--ink)" : "transparent",
                  color: isActive ? "var(--paper)" : "var(--ink)",
                  padding: "10px 16px",
                  borderRadius: 999,
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 13.5,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  transition: "background .15s, color .15s",
                })}
              >
                {({ isActive }) => (
                  <>
                    <span style={{ fontFamily: "var(--font-jp)", fontSize: 11, opacity: 0.6 }}>
                      {item.jp}
                    </span>
                    {item.label}
                    {item.to === "/favoritos" && favoritesCount > 0 && (
                      <span
                        aria-label={`${favoritesCount} favoritos guardados`}
                        style={{
                          minWidth: 18,
                          height: 18,
                          padding: "0 5px",
                          background: isActive ? "var(--rose-300)" : "var(--rose-500)",
                          color: isActive ? "var(--ink)" : "white",
                          borderRadius: 999,
                          fontSize: 10,
                          fontWeight: 700,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {favoritesCount}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              className="mono"
              style={{ fontSize: 11, color: "var(--ink-mute)", letterSpacing: ".05em" }}
            >
              EST. 2026
            </span>
            <Link
              to="/explorar"
              className="btn btn-sm btn-primary"
              style={{ textDecoration: "none" }}
            >
              <Icon name="search" size={14} /> Explorar
            </Link>
          </div>
        </nav>
      </header>

      <main className="fade-up">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer
      style={{
        marginTop: 80,
        borderTop: "2px solid var(--ink)",
        background: "var(--ink)",
        color: "var(--paper)",
      }}
    >
      <div
        className="marquee"
        style={{ borderTop: 0, borderBottom: "2px solid var(--rose-500)", background: "var(--rose-500)" }}
      >
        <div className="marquee-track" style={{ color: "white" }}>
          <span>恋のアトラス</span>
          <span>ROMANCE ATLAS</span>
          <span>♡ 探す</span>
          <span>since 2026</span>
          <span>discover · save · adore</span>
          <span>恋のアトラス</span>
          <span>ROMANCE ATLAS</span>
          <span>♡ 探す</span>
          <span>since 2026</span>
          <span>discover · save · adore</span>
        </div>
      </div>

      <div className="footer-grid">
        <div>
          <Logo />
          <p
            style={{
              marginTop: 14,
              color: "rgba(255,253,248,.7)",
              maxWidth: 360,
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            Un atlas curado a mano para las historias de amor más suaves del mundo. Descubre,
            guarda y revisita los animes de romance que te rompieron el corazón en el mejor sentido.
          </p>
          <p
            className="mono"
            style={{
              fontSize: 11,
              color: "rgba(255,253,248,.45)",
              letterSpacing: ".08em",
              marginTop: 18,
            }}
          >
            POWERED BY JIKAN · GENRE 22 · MADE WITH ♡
          </p>
        </div>
        <FooterCol
          title="Navegar"
          jp="案内"
          items={[
            { label: "Inicio", to: "/" },
            { label: "Explorar", to: "/explorar" },
            { label: "Favoritos", to: "/favoritos" },
            { label: "Contacto", to: "/contacto" },
          ]}
        />
        <FooterCol
          title="Géneros"
          jp="部門"
          items={[
            { label: "Romance", to: "/explorar" },
            { label: "Slice of Life", to: "/explorar" },
            { label: "Drama", to: "/explorar" },
            { label: "Comedy", to: "/explorar" },
          ]}
        />
        <FooterCol
          title="Atlas"
          jp="地図"
          items={[
            { label: "Acerca", to: "/" },
            { label: "Prensa", to: "/contacto" },
            { label: "API", to: "/" },
            { label: "Privacidad", to: "/" },
          ]}
        />
      </div>
      <div
        style={{
          borderTop: "1px solid rgba(255,253,248,.15)",
          padding: "18px 32px",
          display: "flex",
          justifyContent: "space-between",
          maxWidth: 1440,
          margin: "0 auto",
          fontSize: 12,
          color: "rgba(255,253,248,.55)",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span className="mono">© 2026 ROMANCE ATLAS · ALL HEARTS RESERVED</span>
        <span style={{ fontFamily: "var(--font-jp)" }}>恋を見つけよう ♡</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, jp, items }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
        <h4 className="display" style={{ margin: 0, fontSize: 14, color: "var(--paper)" }}>
          {title}
        </h4>
        <span style={{ fontFamily: "var(--font-jp)", fontSize: 12, color: "var(--rose-300)" }}>
          {jp}
        </span>
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {items.map((it) => (
          <li key={it.label}>
            <Link to={it.to} style={{ color: "rgba(255,253,248,.7)", textDecoration: "none", fontSize: 13.5 }}>
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Layout;
