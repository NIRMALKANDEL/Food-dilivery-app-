// Swiggy's public API sends no CORS headers for browser requests, and its
// menu endpoint additionally runs bot-detection that blocks most third-party
// traffic outright. A direct fetch is tried first (works in some setups/
// extensions), then a couple of public CORS proxies raced against each other
// as a best-effort fallback (racing, rather than trying them one after the
// other, roughly halves the worst-case wait before the caller's own mock
// fallback kicks in). Each attempt is capped with a timeout so one flaky
// proxy can't hang the UI.

const DIRECT_TIMEOUT_MS = 6000;
const PROXY_TIMEOUT_MS = 6000;

const fetchWithTimeout = async (url, ms) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
};

// r.jina.ai proxies the response as text, prefixed with some metadata lines
// before the actual body — pull out just the JSON payload.
const parseJinaResponse = (text) => {
  const start = text.indexOf("{");
  if (start === -1) throw new Error("No JSON found in jina.ai response");
  return JSON.parse(text.slice(start));
};

const viaJina = async (url) => {
  const response = await fetchWithTimeout(`https://r.jina.ai/${url}`, PROXY_TIMEOUT_MS);
  if (!response.ok) throw new Error("jina.ai proxy failed");
  return parseJinaResponse(await response.text());
};

const viaAllorigins = async (url) => {
  const response = await fetchWithTimeout(
    `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    PROXY_TIMEOUT_MS
  );
  if (!response.ok) throw new Error("allorigins proxy failed");
  return await response.json();
};

export const fetchJson = async (url) => {
  try {
    const response = await fetchWithTimeout(url, DIRECT_TIMEOUT_MS);
    if (!response.ok) throw new Error("Direct request failed");
    return await response.json();
  } catch (directErr) {
    // fall through to proxies
  }

  return Promise.any([viaJina(url), viaAllorigins(url)]);
};
