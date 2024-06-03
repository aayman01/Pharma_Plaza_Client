import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import Main from "../Layout/Main";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Shop from "../Pages/Shop/Shop";
import SpecificCategoryList from "../Pages/SpecificCategoryList/SpecificCategoryList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "signup",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "/category/:name",
        element: <SpecificCategoryList></SpecificCategoryList>,
        loader: ({params}) =>
          fetch(`http://localhost:5000/category/${params.name}`),
      },
    ],
  },
]);
