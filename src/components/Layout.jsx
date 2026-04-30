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
      <header className="ik-header">
        <nav className="ik-nav" aria-label="Navegación principal">
          <Link to="/" className="ik-nav-brand" aria-label="Ir al inicio">
            <Logo />
          </Link>

          <div className="ik-nav-links">
            {navItems.map((item) => (
              <NavLink
                end={item.end}
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `ik-nav-link${isActive ? " is-active" : ""}`
                }
              >
                <span className="ik-nav-jp" aria-hidden="true">
                  {item.jp}
                </span>
                <span className="ik-nav-label">{item.label}</span>
                {item.to === "/favoritos" && favoritesCount > 0 && (
                  <span
                    className="ik-nav-badge"
                    aria-label={`${favoritesCount} favoritos guardados`}
                  >
                    {favoritesCount}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          <div className="ik-nav-meta">
            <span className="mono ik-nav-meta-est">EST. 2026</span>
            <Link to="/explorar" className="btn btn-sm btn-primary ik-nav-cta">
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
          <span>生き甲斐</span>
          <span>IKIGAI</span>
          <span>♡ 探す</span>
          <span>since 2026</span>
          <span>discover · save · adore</span>
          <span>生き甲斐</span>
          <span>IKIGAI</span>
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
            IKIGAI es tu razón de ser hecha repisa: las historias de amor más suaves del mundo,
            curadas a mano para que descubras, guardes y revisites los animes de romance que te
            rompieron el corazón en el mejor sentido.
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
          title="Ikigai"
          jp="道"
          items={[
            { label: "Acerca", to: "/" },
            { label: "Prensa", to: "/contacto" },
            { label: "API", to: "/" },
            { label: "Privacidad", to: "/" },
          ]}
        />
      </div>
      <div className="footer-bottom">
        <span className="mono">© 2026 IKIGAI · ALL HEARTS RESERVED</span>
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
