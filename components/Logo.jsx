import { useId } from "react";
import { BRAND_NAME } from "../Utils/Constants";

// Inline SVG mark (a circle with a "bite" taken out, plus a stray crumb) so
// it can inherit text color via currentColor and scale crisply anywhere —
// Header, Footer, favicon-style previews, etc. useId() keeps the <mask> id
// collision-free when the logo is rendered more than once on a page.
const Logo = ({ showWordmark = true, className = "" }) => {
  const maskId = `nibblr-bite-${useId()}`;

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        role="img"
        aria-label={`${BRAND_NAME} logo`}
        className="shrink-0"
      >
        <defs>
          <mask id={maskId}>
            <rect width="24" height="24" fill="white" />
            <circle cx="18.5" cy="6.5" r="4.5" fill="black" />
          </mask>
        </defs>
        <circle cx="12" cy="13" r="9" fill="currentColor" mask={`url(#${maskId})`} />
        <circle cx="8.5" cy="12" r="1.15" fill="currentColor" />
      </svg>
      {showWordmark && (
        <span className="text-xl font-extrabold tracking-tight text-brand">
          {BRAND_NAME}
        </span>
      )}
    </span>
  );
};

export default Logo;
