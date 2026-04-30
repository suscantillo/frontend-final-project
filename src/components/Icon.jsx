function Icon({ name, size = 18, stroke = 1.8, ...rest }) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    ...rest,
  };

  switch (name) {
    case "heart":
      return (
        <svg {...props}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case "heart-fill":
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case "search":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      );
    case "home":
      return (
        <svg {...props}>
          <path d="m3 12 9-9 9 9" />
          <path d="M5 10v10h14V10" />
        </svg>
      );
    case "compass":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="m16 8-2 6-6 2 2-6 6-2z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "star":
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    case "play":
      return (
        <svg {...props} fill="currentColor" stroke="none">
          <path d="M6 4v16l14-8L6 4z" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg {...props}>
          <path d="M5 12h14" />
          <path d="m13 5 7 7-7 7" />
        </svg>
      );
    case "arrow-left":
      return (
        <svg {...props}>
          <path d="M19 12H5" />
          <path d="m11 5-7 7 7 7" />
        </svg>
      );
    case "arrow-up-right":
      return (
        <svg {...props}>
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      );
    case "x":
      return (
        <svg {...props}>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    case "alert":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4" />
          <circle cx="12" cy="16" r=".5" fill="currentColor" />
        </svg>
      );
    case "info":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <circle cx="12" cy="8" r=".5" fill="currentColor" />
        </svg>
      );
    case "grid":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "list":
      return (
        <svg {...props}>
          <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
      );
    case "tv":
      return (
        <svg {...props}>
          <rect x="2" y="6" width="20" height="13" rx="2" />
          <path d="m8 22 4-3 4 3" />
        </svg>
      );
    default:
      return null;
  }
}

export default Icon;
