import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImageUrl } from "../Utils/Constants";
import { toggleFavorite } from "../Utils/favoritesSlice";

const RestrauntCard = ({ resData }) => {
  const { id, name, cuisines, costForTwo, avgRating, sla, cloudinaryImageId, veg } =
    resData.info;

  const dispatch = useDispatch();
  const [imgFailed, setImgFailed] = useState(false);
  const isFavorite = useSelector((store) =>
    store.favorites.restaurants.some((r) => r.id === id)
  );

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(resData.info));
  };

  const rating = Number(avgRating);
  const ratingColor =
    !rating ? "text-gray-500 bg-gray-100" :
    rating >= 4 ? "text-[#1a7a3a] bg-[#e8f5e9]" : "text-accent-dark bg-accent-light";

  return (
    <div className="resCard group rounded-2xl w-full h-auto shadow-md bg-white overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer">
      <div className="foodImg relative overflow-hidden bg-gray-100">
        {cloudinaryImageId && !imgFailed ? (
          <img
            className="h-[140px] w-full object-cover transition-transform duration-300 group-hover:scale-110"
            src={ImageUrl + cloudinaryImageId}
            alt={name}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="h-[140px] w-full flex items-center justify-center text-3xl text-gray-300">
            🍽️
          </div>
        )}
        {veg && (
          <span
            className="absolute top-2 left-2 w-4 h-4 bg-white rounded-sm border border-green-600 flex items-center justify-center"
            title="Pure Veg"
          >
            <span className="w-2 h-2 rounded-full bg-green-600" />
          </span>
        )}
        <button
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 shadow flex items-center justify-center active:scale-90 transition-transform"
        >
          <span className={isFavorite ? "text-red-500" : "text-gray-400"}>
            {isFavorite ? "♥" : "♡"}
          </span>
        </button>
      </div>
      <div className="cardDetails flex flex-col gap-1 py-3 px-3">
        <h2 className="font-bold text-ink truncate">{name}</h2>

        <h4 className="text-sm text-gray-500 truncate">
          {(cuisines || []).join(", ")}
        </h4>

        <div className="flex items-center justify-between text-sm mt-1">
          <span
            className={`flex items-center gap-1 font-semibold px-1.5 py-0.5 rounded ${ratingColor}`}
          >
            {rating ? `★ ${avgRating}` : "New"}
          </span>
          <span className="text-gray-500">{sla?.slaString}</span>
        </div>

        <h4 className="text-sm text-gray-500">{costForTwo}</h4>
      </div>
    </div>
  );
};
export default RestrauntCard;
