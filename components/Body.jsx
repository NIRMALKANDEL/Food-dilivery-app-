import RestrauntCard from "./RestrauntCard";
import useOnlineStatus from "../Utils/useOnlineStatus";
import { useEffect, useMemo, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchJson } from "../Utils/api";
import { mockRestaurants } from "../Utils/mockData";
import { DEFAULT_COORDS } from "../Utils/Constants";

const MAX_CUISINE_CHIPS = 8;

const FilterPill = ({ active, onClick, children }) => (
  <button
    className={`px-4 py-2 rounded-full font-medium border transition-colors active:scale-95 ${
      active
        ? "bg-brand text-white border-brand"
        : "border-gray-300 text-ink hover:border-brand hover:text-brand"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Body = () => {
  const [listOfRestraunt, setlistOfRestraunt] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [usingFallbackData, setUsingFallbackData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [topRatedOnly, setTopRatedOnly] = useState(false);
  const [vegOnly, setVegOnly] = useState(false);
  const [fastDeliveryOnly, setFastDeliveryOnly] = useState(false);
  const [sortByRating, setSortByRating] = useState(false);
  const [sortByCost, setSortByCost] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState(null);

  const location = useSelector((store) => store.location);
  const recentlyViewed = useSelector((store) => store.favorites.recentlyViewed);

  useEffect(() => {
    fetchData();
    // Re-fetch when the visitor picks a different delivery location, same
    // way a real delivery app would refresh the restaurant list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.lat, location.lng]);

  const fetchData = async () => {
    setLoading(true);
    let restaurants = [];
    const lat = location.lat ?? DEFAULT_COORDS.lat;
    const lng = location.lng ?? DEFAULT_COORDS.lng;

    try {
      const json = await fetchJson(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      );

      const restaurantCard = json?.data?.cards?.find(
        (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );
      restaurants =
        restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
        [];

      if (restaurants.length === 0) throw new Error("Empty restaurant list");
      setUsingFallbackData(false);
    } catch (err) {
      restaurants = mockRestaurants;
      setUsingFallbackData(true);
    }

    setlistOfRestraunt(restaurants);
    setLoading(false);
  };

  const resetFilters = () => {
    setSearchText("");
    setTopRatedOnly(false);
    setVegOnly(false);
    setFastDeliveryOnly(false);
    setSortByRating(false);
    setSortByCost(false);
    setSelectedCuisine(null);
  };

  const cuisineChips = useMemo(() => {
    const counts = new Map();
    listOfRestraunt.forEach((res) => {
      (res.info.cuisines || []).forEach((c) => {
        counts.set(c, (counts.get(c) || 0) + 1);
      });
    });
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, MAX_CUISINE_CHIPS)
      .map(([cuisine]) => cuisine);
  }, [listOfRestraunt]);

  const costForTwoValue = (res) => {
    const match = /\d+/.exec(res.info.costForTwo || "");
    return match ? Number(match[0]) : Infinity;
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-2">
        <h1 className="text-3xl">📡</h1>
        <h1 className="text-xl font-bold text-ink">
          Looks like you're offline!
        </h1>
        <p className="text-gray-500">Please check your internet connection.</p>
      </div>
    );
  }

  if (loading) {
    return <Shimmer />;
  }

  const displayedRestaurants = listOfRestraunt
    .filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((res) => !topRatedOnly || Number(res.info.avgRating) >= 4)
    .filter((res) => !vegOnly || res.info.veg)
    .filter(
      (res) => !fastDeliveryOnly || (res.info.sla?.deliveryTime ?? 99) <= 30
    )
    .filter(
      (res) => !selectedCuisine || (res.info.cuisines || []).includes(selectedCuisine)
    )
    .sort((a, b) => {
      if (sortByRating) return Number(b.info.avgRating || 0) - Number(a.info.avgRating || 0);
      if (sortByCost) return costForTwoValue(a) - costForTwoValue(b);
      return 0;
    });

  const filtersActive =
    searchText ||
    topRatedOnly ||
    vegOnly ||
    fastDeliveryOnly ||
    sortByRating ||
    sortByCost ||
    selectedCuisine;

  return (
    <>
      {usingFallbackData && (
        <div className="bg-accent-light text-accent-dark text-center text-sm py-2 px-4 border-b border-[#fcd9a8]">
          Live restaurant data is unreachable right now, so we're showing
          sample restaurant data.
        </div>
      )}

      {recentlyViewed.length > 0 && (
        <div className="max-w-[1280px] mx-auto px-4 pt-6">
          <h2 className="text-lg font-bold text-ink mb-3">Recently viewed</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {recentlyViewed.map((info) => (
              <Link
                to={`/restraunt/${info.id}`}
                key={info.id}
                className="w-40 shrink-0"
              >
                <RestrauntCard resData={{ info }} />
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap mt-6 mb-2 px-4 justify-center gap-3">
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search for restaurants and food"
            className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          {searchText && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchText("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-3 px-4">
        <FilterPill
          active={topRatedOnly}
          onClick={() => setTopRatedOnly((v) => !v)}
        >
          Rating 4.0+
        </FilterPill>
        <FilterPill active={vegOnly} onClick={() => setVegOnly((v) => !v)}>
          Pure Veg
        </FilterPill>
        <FilterPill
          active={fastDeliveryOnly}
          onClick={() => setFastDeliveryOnly((v) => !v)}
        >
          Fast Delivery
        </FilterPill>
        <FilterPill
          active={sortByRating}
          onClick={() => {
            setSortByRating((v) => !v);
            setSortByCost(false);
          }}
        >
          Sort: Rating
        </FilterPill>
        <FilterPill
          active={sortByCost}
          onClick={() => {
            setSortByCost((v) => !v);
            setSortByRating(false);
          }}
        >
          Sort: Price
        </FilterPill>
        {filtersActive && (
          <FilterPill active={false} onClick={resetFilters}>
            Reset
          </FilterPill>
        )}
      </div>

      {cuisineChips.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-6 px-4">
          {cuisineChips.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() =>
                setSelectedCuisine((c) => (c === cuisine ? null : cuisine))
              }
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                selectedCuisine === cuisine
                  ? "bg-accent text-white border-accent"
                  : "border-gray-200 text-gray-500 hover:border-accent hover:text-accent-dark"
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      )}

      {displayedRestaurants.length === 0 ? (
        <p className="text-center text-gray-500 py-16">
          No restaurants match your search/filters.
        </p>
      ) : (
        <div className="resContainer mx-auto max-w-[1280px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center px-4 pb-12">
          {displayedRestaurants.map((currentVal, index) => (
            <Link
              to={"restraunt/" + currentVal.info.id}
              key={currentVal.info.id}
              style={{ animationDelay: `${Math.min(index, 10) * 40}ms` }}
              className="animate-[fadeIn_0.35s_ease-in-out_backwards]"
            >
              <RestrauntCard resData={currentVal} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
export default Body;
