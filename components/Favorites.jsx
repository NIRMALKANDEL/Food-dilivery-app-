import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RestrauntCard from "./RestrauntCard";

const Favorites = () => {
  const favorites = useSelector((store) => store.favorites.restaurants);

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-center px-4">
        <span className="text-5xl">🤍</span>
        <h1 className="text-xl font-bold text-ink">No favorites yet</h1>
        <p className="text-gray-500">
          Tap the heart on a restaurant card to save it here.
        </p>
        <Link
          to="/"
          className="mt-2 px-5 py-2 bg-brand text-white font-semibold rounded-full hover:bg-brand-dark active:scale-95 transition-all"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto p-4 sm:p-6 animate-[fadeIn_0.3s_ease-in-out]">
      <h1 className="font-bold text-2xl text-ink mb-6">Your Favorites</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {favorites.map((info) => (
          <Link to={`/restraunt/${info.id}`} key={info.id}>
            <RestrauntCard resData={{ info }} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
