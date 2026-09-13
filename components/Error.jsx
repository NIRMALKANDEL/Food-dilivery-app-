import { Link, useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 px-4 text-center">
      <h1 className="text-6xl">😕</h1>
      <h1 className="text-2xl font-bold text-[#3d4152]">Oops!</h1>
      <h2 className="text-gray-500">Something went wrong.</h2>
      {error && (
        <h2 className="text-gray-400 text-sm">
          {error.status} {error.statusText}
        </h2>
      )}
      <Link
        to="/"
        className="mt-4 px-5 py-2 bg-[#fc8019] text-white font-semibold rounded-full hover:bg-[#e0721a] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default Error;
