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
    <div className="flex items-center gap-1.5">
      <span
        className="mono text-[10px] tracking-[.1em] text-[var(--ink-mute)]"
      >
        {label.toUpperCase()}
      </span>
      <div
        role="radiogroup"
        aria-label={label}
        className="inline-flex overflow-hidden rounded-full border-[1.5px] border-[var(--ink)] bg-[var(--paper)]"
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
              className={[
                "cursor-pointer border-0 px-3 py-1.5 text-[12px] font-semibold [font-family:var(--font-display)]",
                active
                  ? "bg-[var(--ink)] text-[var(--paper)]"
                  : "bg-transparent text-[var(--ink)]",
                index > 0 ? "border-l-[1.5px] border-[var(--ink)]" : "",
              ].join(" ")}
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
      className={[
        "inline-flex h-[34px] w-[34px] items-center justify-center rounded-[8px] border-[1.5px] border-[var(--ink)]",
        active
          ? "bg-[var(--ink)] text-[var(--paper)]"
          : "bg-[var(--paper)] text-[var(--ink)]",
      ].join(" ")}
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
      className="panel-ink form-shell mb-[22px] flex flex-wrap items-center gap-3.5 bg-[var(--paper)] px-[18px] py-[14px]"
      aria-label="Filtros de búsqueda"
    >
      <label
        htmlFor="search"
        className="flex min-w-[220px] flex-[1_1_280px] items-center gap-2 rounded-full border-[1.5px] border-[var(--ink)] bg-[var(--cream)] px-[14px] py-2 text-[var(--ink)]"
      >
        <Icon name="search" size={16} />
        <span className="sr-only">Buscar anime</span>
        <input
          id="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar por título o 日本語…"
          type="search"
          className="flex-1 border-0 bg-transparent text-[14px] text-[var(--ink)] outline-0 [font-family:var(--font-body)]"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Limpiar búsqueda"
            className="cursor-pointer border-0 bg-transparent text-[var(--ink-mute)]"
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

      <div className="flex items-center gap-1.5">
        <span
          className="mono text-[10px] tracking-[.1em] text-[var(--ink-mute)]"
        >
          ORDEN
        </span>
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          aria-label="Ordenar resultados"
          className="cursor-pointer rounded-full border-[1.5px] border-[var(--ink)] bg-[var(--paper)] px-3 py-1.5 text-[12px] font-semibold text-[var(--ink)] [font-family:var(--font-display)]"
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

      <div className="ml-auto flex gap-1.5">
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
