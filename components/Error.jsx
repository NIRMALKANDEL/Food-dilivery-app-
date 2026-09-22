import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();
  const isNotFound = error?.status === 404;

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 px-4 text-center">
      <h1 className="text-6xl">{isNotFound ? "🍽️" : "😕"}</h1>
      <h1 className="text-2xl font-bold text-ink">
        {isNotFound ? "404 — Page not found" : "Oops!"}
      </h1>
      <h2 className="text-gray-500">
        {isNotFound
          ? "The page you're looking for doesn't exist, or may have moved."
          : "Something went wrong."}
      </h2>
      {error && !isNotFound && (
        <h2 className="text-gray-400 text-sm">
          {error.status} {error.statusText}
        </h2>
      )}
      <Link
        to="/"
        className="mt-4 px-5 py-2 bg-brand text-white font-semibold rounded-full hover:bg-brand-dark transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Error;
