// Browser geolocation + free OpenStreetMap (Nominatim) reverse geocoding.
// No API key needed. Every network call is timeout-guarded the same way
// Utils/api.js guards its own fetches, so a slow/unreachable geocoder can
// never hang the checkout/location UI.

const FETCH_TIMEOUT_MS = 6000;

const fetchWithTimeout = async (url, ms) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal, headers: { Accept: "application/json" } });
  } finally {
    clearTimeout(timer);
  }
};

// Only ever called from an explicit user action (a button click) — never on
// mount — so the browser's permission prompt only appears when the visitor
// asked for it.
export const getCurrentPosition = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation isn't supported in this browser."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  });

// Forward geocoding — turns a typed place/city name into {lat, lng, label}.
// Used by the header's manual "Deliver to" entry when the visitor doesn't
// want to grant geolocation. Returns null if nothing matched or the request
// failed, so callers can show a friendly "not found" message.
export const searchLocation = async (query) => {
  const trimmed = query.trim();
  if (!trimmed) return null;
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(trimmed)}`;
    const res = await fetchWithTimeout(url, FETCH_TIMEOUT_MS);
    if (!res.ok) throw new Error("Location search failed");
    const results = await res.json();
    const first = results?.[0];
    if (!first) return null;
    return {
      lat: Number(first.lat),
      lng: Number(first.lon),
      label: first.display_name,
    };
  } catch (err) {
    return null;
  }
};

// Turns {lat, lng} into a human label. Falls back to raw coordinates if the
// reverse-geocode call fails for any reason.
export const reverseGeocode = async ({ lat, lng }) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
    const res = await fetchWithTimeout(url, FETCH_TIMEOUT_MS);
    if (!res.ok) throw new Error("Reverse geocoding failed");
    const json = await res.json();
    return json?.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  } catch (err) {
    return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  }
};
