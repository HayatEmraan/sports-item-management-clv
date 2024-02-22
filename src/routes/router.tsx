import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/notfound";
import { Auth } from "../pages/auth/auth";
import AddSports from "../pages/sports/addsports";
import ManageSports from "../pages/sports/managesports";
import ViewHistory from "../pages/sales/viewsales";
import SellSports from "../pages/sales/sellsports";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AddSports />,
      },
      {
        path: "/add-sports",
        element: <AddSports />,
      },
      {
        path: "/manage-sports",
        element: <ManageSports />,
      },
      {
        path: "/sale-sports",
        element: <SellSports />,
      },
      {
        path: "/sales-history",
        element: <ViewHistory />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
