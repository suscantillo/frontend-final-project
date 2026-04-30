import Icon from "./Icon.jsx";

function buildPageWindow(currentPage, lastPage) {
  if (lastPage <= 5) {
    return Array.from({ length: lastPage }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, lastPage];
  }

  if (currentPage >= lastPage - 2) {
    return [1, lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
  }

  return [1, currentPage - 1, currentPage, currentPage + 1, lastPage];
}

function PageButton({ active = false, children, disabled = false, onClick }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-pressed={active}
      className={[
        "inline-flex h-[42px] min-w-[42px] items-center justify-center gap-1.5 rounded-full border-[1.5px] border-[var(--ink)] text-[13px] font-bold [font-family:var(--font-display)]",
        active
          ? "bg-[var(--ink)] text-[var(--paper)]"
          : "bg-[var(--paper)] text-[var(--ink)]",
        disabled ? "cursor-not-allowed opacity-45" : "cursor-pointer",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function PaginationControls({
  currentPage,
  hasNextPage,
  lastPage,
  onPageChange,
  pageEnd,
  pageStart,
  total,
}) {
  const pages = buildPageWindow(currentPage, lastPage);

  return (
    <section
      className="panel-ink mb-10 flex flex-wrap items-center justify-between gap-4 bg-[var(--paper)] p-3.5 sm:p-4"
      aria-label="Paginacion de resultados"
    >
      <div>
        <div
          className="mono mb-1 text-[10.5px] tracking-[.12em] text-[var(--ink-mute)]"
        >
          PAGINA {currentPage} DE {lastPage}
        </div>
        <div className="serif text-[14px] text-[var(--ink)]">
          Mostrando <strong>{pageStart}</strong>–<strong>{pageEnd}</strong> de{" "}
          <strong>{total}</strong> resultados
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <PageButton
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <Icon name="arrow-left" size={14} />
          Ant
        </PageButton>

        {pages.map((page) => (
          <PageButton
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </PageButton>
        ))}

        <PageButton
          disabled={!hasNextPage}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Sig
          <Icon name="arrow-right" size={14} />
        </PageButton>
      </div>
    </section>
  );
}

export default PaginationControls;
