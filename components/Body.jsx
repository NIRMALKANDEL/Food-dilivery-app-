import RestrauntCard from "./RestrauntCard";
import useOnlineStatus from "../Utils/useOnlineStatus";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { fetchJson } from "../Utils/api";
import { mockRestaurants } from "../Utils/mockData";

const FilterPill = ({ active, onClick, children }) => (
  <button
    className={`px-4 py-2 rounded-full font-medium border transition-colors active:scale-95 ${
      active
        ? "bg-[#fc8019] text-white border-[#fc8019]"
        : "border-gray-300 text-[#3d4152] hover:border-[#fc8019] hover:text-[#fc8019]"
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let restaurants = [];

    try {
      const json = await fetchJson(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.671406264655456&lng=75.87452753433992&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
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
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-2">
        <h1 className="text-3xl">📡</h1>
        <h1 className="text-xl font-bold text-[#3d4152]">
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
    .sort((a, b) =>
      sortByRating
        ? Number(b.info.avgRating || 0) - Number(a.info.avgRating || 0)
        : 0
    );

  const filtersActive =
    searchText || topRatedOnly || vegOnly || fastDeliveryOnly || sortByRating;

  return (
    <>
      {usingFallbackData && (
        <div className="bg-[#fff4e8] text-[#b45309] text-center text-sm py-2 px-4 border-b border-[#fcd9a8]">
          Swiggy's live servers are unreachable right now, so we're showing
          sample restaurant data.
        </div>
      )}

      <div className="flex flex-wrap mt-6 mb-2 px-4 justify-center gap-3">
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search for restaurants and food"
            className="w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#fc8019] focus:border-[#fc8019]"
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

      <div className="flex flex-wrap justify-center gap-2 mb-6 px-4">
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
          onClick={() => setSortByRating((v) => !v)}
        >
          Sort: Rating
        </FilterPill>
        {filtersActive && (
          <FilterPill active={false} onClick={resetFilters}>
            Reset
          </FilterPill>
        )}
      </div>

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
