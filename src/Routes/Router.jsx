import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import Main from "../Layout/Main";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Shop from "../Pages/Shop/Shop";
import SpecificCategoryList from "../Pages/SpecificCategoryList/SpecificCategoryList";
import Cart from "../Pages/Cart/Cart";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "../Pages/Shared/NavBar/UpdateProfile";
import Payment from "../Pages/Payment/Payment";
import Invoice from "../Pages/Invoice/Invoice";
import Dashboard from "../Layout/Dashboard";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import ManageMedicines from "../Pages/Dashboard/Seller/ManageMedicines";
import SellerPaymentHistory from "../Pages/Dashboard/Seller/SellerPaymentHistory";
import UserPayment from "../Pages/Dashboard/User/UserPayment";

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
        loader: ({ params }) =>
          fetch(`http://localhost:5000/category/${params.name}`),
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "updateProfile",
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "invoice",
        element: (
          <PrivateRoute>
            <Invoice />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      // admin route
      {
        path: "adminHome",
        element: <AdminHome></AdminHome>,
      },
      // seller route
      {
        path: "manageMedicine",
        element: <ManageMedicines />,
      },
      {
        path: "paymentHistory",
        element: <SellerPaymentHistory />,
      },
      // user route
      {
        path: "payment",
        element: <UserPayment/>
      },
    ],
  },
]);
