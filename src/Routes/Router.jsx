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
import AskForAdvertisement from "../Pages/Dashboard/Seller/AskForAdvertisement";
import ManageAdvertisement from "../Pages/Dashboard/Admin/ManageAdvertisement";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import ManagePayment from "../Pages/Dashboard/Admin/ManagePayment";
import ManageCategory from "../Pages/Dashboard/Admin/ManageCategory";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";

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
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "manageAdvertise",
        element: (
          <AdminRoute>
            <ManageAdvertisement />
          </AdminRoute>
        ),
      },
      {
        path: "manageUser",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "managePayment",
        element: (
          <AdminRoute>
            <ManagePayment />
          </AdminRoute>
        ),
      },
      {
        path: "manageCategory",
        element: (
          <AdminRoute>
            <ManageCategory />
          </AdminRoute>
        ),
      },
      // seller route
      {
        path: "manageMedicine",
        element: (
          <SellerRoute>
            <ManageMedicines />
          </SellerRoute>
        ),
      },
      {
        path: "paymentHistory",
        element: (
          <SellerRoute>
            <SellerPaymentHistory />
          </SellerRoute>
        ),
      },
      {
        path: "requestAdvertise",
        element: (
          <SellerRoute>
            <AskForAdvertisement />
          </SellerRoute>
        ),
      },
      // user route
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <UserPayment />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
