import "./src/index.css";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import NotFound from "./components/NotFound";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import RestrauntMenu from "./components/RestrauntMenu";
import { useEffect } from "react";
import { UserProvider } from "./Utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./Utils/appStore";
import Cart from "./components/Cart";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import Orders from "./components/Orders";
import Favorites from "./components/Favorites";

// Scrolls to the top on every route change and fades the new page in, so
// navigating between pages feels like a single smooth flow instead of a
// hard cut (this also covers browser back/forward, since those trigger the
// same location change).
const PageTransition = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div
      key={location.pathname}
      className="animate-[fadeIn_0.25s_ease-in-out] min-h-[60vh]"
    >
      <Outlet />
    </div>
  );
};

const App = () => {
  return (
    <Provider store={appStore}>
      <UserProvider>
        <Header />
        <PageTransition />
        <Footer />
      </UserProvider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restraunt/:resId",
        element: <RestrauntMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/checkout", element: <Checkout /> },
          { path: "/order/:orderId", element: <OrderConfirmation /> },
          { path: "/orders", element: <Orders /> },
          { path: "/favorites", element: <Favorites /> },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
