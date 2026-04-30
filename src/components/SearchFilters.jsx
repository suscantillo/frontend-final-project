import { STATUS_FILTERS } from "../api/jikan.js";
import Icon from "./Icon.jsx";

const TYPE_OPTIONS = [
  { value: "", label: "Todos" },
  { value: "tv", label: "TV" },
  { value: "movie", label: "Movie" },
  { value: "ova", label: "OVA" },
  { value: "special", label: "Special" },
];

function Segmented({ label, value, options, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span
        className="mono"
        style={{ fontSize: 10, color: "var(--ink-mute)", letterSpacing: ".1em" }}
      >
        {label.toUpperCase()}
      </span>
      <div
        role="radiogroup"
        aria-label={label}
        style={{
          display: "inline-flex",
          border: "1.5px solid var(--ink)",
          borderRadius: 999,
          overflow: "hidden",
          background: "var(--paper)",
        }}
      >
        {options.map((option, index) => {
          const active = value === option.value;
          return (
            <button
              key={option.value || option.label}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option.value)}
              style={{
                appearance: "none",
                border: 0,
                padding: "6px 12px",
                background: active ? "var(--ink)" : "transparent",
                color: active ? "var(--paper)" : "var(--ink)",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 12,
                cursor: "pointer",
                borderLeft: index > 0 ? "1.5px solid var(--ink)" : "none",
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ViewToggle({ active, onClick, icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      style={{
        width: 34,
        height: 34,
        borderRadius: 8,
        border: "1.5px solid var(--ink)",
        background: active ? "var(--ink)" : "var(--paper)",
        color: active ? "var(--paper)" : "var(--ink)",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon name={icon} size={16} />
    </button>
  );
}

function SearchFilters({
  search,
  status,
  type,
  sort,
  view,
  onSearchChange,
  onStatusChange,
  onTypeChange,
  onSortChange,
  onViewChange,
  onReset,
}) {
  return (
    <section
      className="panel-ink atlas-input"
      aria-label="Filtros de búsqueda"
      style={{
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        flexWrap: "wrap",
        background: "var(--paper)",
        marginBottom: 22,
      }}
    >
      <label
        htmlFor="search"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flex: "1 1 280px",
          minWidth: 220,
          background: "var(--cream)",
          border: "1.5px solid var(--ink)",
          borderRadius: 999,
          padding: "8px 14px",
          color: "var(--ink)",
        }}
      >
        <Icon name="search" size={16} />
        <span className="sr-only">Buscar anime</span>
        <input
          id="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar por título o 日本語…"
          type="search"
          style={{
            flex: 1,
            border: 0,
            outline: 0,
            background: "transparent",
            fontFamily: "var(--font-body)",
            fontSize: 14,
            color: "var(--ink)",
          }}
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Limpiar búsqueda"
            style={{
              border: 0,
              background: "transparent",
              cursor: "pointer",
              color: "var(--ink-mute)",
            }}
          >
            <Icon name="x" size={14} />
          </button>
        )}
      </label>

      <Segmented
        label="Estado"
        value={status}
        options={STATUS_FILTERS.map((s) => ({ value: s.value, label: s.label }))}
        onChange={onStatusChange}
      />
      <Segmented label="Tipo" value={type} options={TYPE_OPTIONS} onChange={onTypeChange} />

      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span
          className="mono"
          style={{ fontSize: 10, color: "var(--ink-mute)", letterSpacing: ".1em" }}
        >
          ORDEN
        </span>
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          aria-label="Ordenar resultados"
          style={{
            border: "1.5px solid var(--ink)",
            borderRadius: 999,
            padding: "6px 12px",
            background: "var(--paper)",
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 12,
            cursor: "pointer",
            color: "var(--ink)",
          }}
        >
          <option value="score">Score</option>
          <option value="popularity">Popularidad</option>
          <option value="title">A → Z</option>
          <option value="start_date">Más reciente</option>
        </select>
      </div>

      <button
        type="button"
        className="btn btn-sm"
        onClick={onReset}
        aria-label="Limpiar filtros"
      >
        <Icon name="x" size={12} /> Limpiar
      </button>

      <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
        <ViewToggle
          active={view === "grid"}
          onClick={() => onViewChange("grid")}
          icon="grid"
          label="Vista en cuadrícula"
        />
        <ViewToggle
          active={view === "list"}
          onClick={() => onViewChange("list")}
          icon="list"
          label="Vista en lista"
        />
      </div>
    </section>
  );
}

export default SearchFilters;
