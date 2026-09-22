import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../Utils/locationSlice";
import { getCurrentPosition, reverseGeocode, searchLocation } from "../Utils/geoService";

const LocationPicker = () => {
  const dispatch = useDispatch();
  const location = useSelector((store) => store.location);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const applyLocation = (label, lat, lng) => {
    dispatch(setLocation({ label, lat, lng }));
    setOpen(false);
    setQuery("");
    setError("");
  };

  const handleUseMyLocation = async () => {
    setBusy(true);
    setError("");
    try {
      const { lat, lng } = await getCurrentPosition();
      const label = await reverseGeocode({ lat, lng });
      applyLocation(label, lat, lng);
    } catch (err) {
      setError("Couldn't access your location. Try searching a city instead.");
    } finally {
      setBusy(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setBusy(true);
    setError("");
    const result = await searchLocation(query);
    setBusy(false);
    if (!result) {
      setError("Couldn't find that place. Try a different search.");
      return;
    }
    applyLocation(result.label, result.lat, result.lng);
  };

  const shortLabel = location.label
    ? location.label.split(",").slice(0, 2).join(",")
    : "Set delivery location";

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-sm font-medium text-ink hover:text-brand transition-colors max-w-[160px]"
        title={location.label || "Set delivery location"}
      >
        📍 <span className="truncate">{shortLabel}</span>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 p-4 z-50">
          <button
            onClick={handleUseMyLocation}
            disabled={busy}
            className="w-full text-left text-sm font-semibold text-brand hover:text-brand-dark disabled:opacity-50 mb-3"
          >
            {busy ? "Locating…" : "📍 Use my current location"}
          </button>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Search city or area"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
            <button
              type="submit"
              disabled={busy || !query.trim()}
              className="px-3 py-1.5 text-sm font-semibold text-white bg-brand rounded-lg hover:bg-brand-dark disabled:opacity-40"
            >
              Go
            </button>
          </form>
          {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
