function Logo({ size = 28 }) {
  return (
    <span
      style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
      aria-label="IKIGAI"
    >
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" role="img">
        <circle cx="20" cy="20" r="18" fill="var(--rose-500)" />
        <path
          d="M20 30 C 11 23, 11 14, 16 14 C 18.5 14, 20 16, 20 16 C 20 16, 21.5 14, 24 14 C 29 14, 29 23, 20 30 Z"
          fill="white"
        />
        <circle cx="14" cy="11" r="1.5" fill="var(--gold)" />
        <circle cx="29" cy="14" r="1" fill="var(--gold)" />
        <circle cx="31" cy="26" r="1.2" fill="var(--gold)" />
      </svg>
      <span
        className="display"
        style={{ fontSize: 17, letterSpacing: "-.01em", color: "var(--ink)" }}
      >
        IKI<span style={{ color: "var(--rose-500)" }}>GAI</span>
      </span>
    </span>
  );
}

export default Logo;
