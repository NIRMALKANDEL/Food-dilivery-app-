import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getCurrentPosition, reverseGeocode } from "../Utils/geoService";
import { DEFAULT_COORDS } from "../Utils/Constants";

// A custom inline-SVG pin instead of Leaflet's default marker images —
// those default images resolve via relative paths that break under Parcel's
// bundling, so a divIcon sidesteps the asset-path problem entirely.
const pinIcon = L.divIcon({
  className: "",
  html: `<svg width="30" height="40" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 11 16 26 16 26s16-15 16-26C32 7.163 24.837 0 16 0z" fill="#7C3AED"/>
      <circle cx="16" cy="16" r="6" fill="white"/>
    </svg>`,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
});

// value: { lat, lng, label } | null
// onSelect: ({ lat, lng, label }) => void
const AddressMap = ({ value, onSelect }) => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState("");

  const applyPoint = async (lat, lng) => {
    markerRef.current.setLatLng([lat, lng]);
    mapRef.current.panTo([lat, lng]);
    const label = await reverseGeocode({ lat, lng });
    onSelect({ lat, lng, label });
  };

  useEffect(() => {
    const start = value?.lat ? value : DEFAULT_COORDS;
    const map = L.map(containerRef.current, {
      zoomControl: true,
    }).setView([start.lat, start.lng], 15);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    const marker = L.marker([start.lat, start.lng], {
      icon: pinIcon,
      draggable: true,
    }).addTo(map);
    markerRef.current = marker;

    marker.on("dragend", () => {
      const { lat, lng } = marker.getLatLng();
      applyPoint(lat, lng);
    });
    map.on("click", (e) => {
      applyPoint(e.latlng.lat, e.latlng.lng);
    });

    // Fixes Leaflet rendering at the wrong size when its container was
    // hidden/animated-in (e.g. behind the checkout page's fade-in) at the
    // moment the map was created.
    setTimeout(() => map.invalidateSize(), 200);

    return () => map.remove();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLocateMe = async () => {
    setLocating(true);
    setLocateError("");
    try {
      const { lat, lng } = await getCurrentPosition();
      await applyPoint(lat, lng);
    } catch (err) {
      setLocateError(
        "Couldn't get your location. You can also drag the pin or tap the map."
      );
    } finally {
      setLocating(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-500">
          Drag the pin or tap the map to set your delivery spot.
        </p>
        <button
          type="button"
          onClick={handleLocateMe}
          disabled={locating}
          className="text-xs font-semibold text-brand hover:text-brand-dark disabled:opacity-50 whitespace-nowrap"
        >
          {locating ? "Locating…" : "📍 Use my location"}
        </button>
      </div>
      <div
        ref={containerRef}
        className="w-full h-64 rounded-xl overflow-hidden border border-gray-200"
      />
      {locateError && (
        <p className="text-xs text-red-500 mt-2">{locateError}</p>
      )}
      {value?.label && (
        <p className="text-xs text-gray-500 mt-2 truncate">📍 {value.label}</p>
      )}
    </div>
  );
};

export default AddressMap;
