import "./Logo.css";

// Logo da GXM AUTO PARTS em SVG: símbolo de mola de suspensão + assinatura.
export default function Logo() {
  return (
    <span className="logo">
      <svg className="logo__mark" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: "var(--primary)" }} />
            <stop offset="1" style={{ stopColor: "var(--secondary)" }} />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="12" fill="url(#logo-grad)" />
        <g fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 10h22M13 38h22" />
          <path d="M24 10v5l9 4-18 6 18 6-9 4v3" />
        </g>
      </svg>
      <span className="logo__text">
        <b>GXM</b>
        <small>AUTO PARTS</small>
      </span>
    </span>
  );
}
