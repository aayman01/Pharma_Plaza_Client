import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import Main from "../Layout/Main";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    errorElement : <ErrorPage/>,
    children : [
        {
            path : '/',
            element : <Home/>
        },
        {
          path: '/register',
          element : <Register/>
        },
        {
          path : '/login',
          element: <Login/>
        },
    ]
  },
]);
