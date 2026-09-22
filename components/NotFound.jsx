import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 px-4 text-center animate-[fadeIn_0.3s_ease-in-out]">
      <h1 className="text-6xl">🍽️</h1>
      <h1 className="text-2xl font-bold text-ink">404 — Page not found</h1>
      <p className="text-gray-500 max-w-sm">
        The page you're looking for doesn't exist, or may have moved.
      </p>
      <Link
        to="/"
        className="mt-4 px-5 py-2 bg-brand text-white font-semibold rounded-full hover:bg-brand-dark transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
