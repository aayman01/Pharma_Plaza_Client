import { TiShoppingCart } from "react-icons/ti";
import { Link, NavLink } from "react-router-dom";
import logo from '../../../assets/icon.png'
import useAuth from "../../../Hooks/useAuth";

const NavBar = () => {
  // sky #dbf4fc
  // blue #076cec
  const {user, logOut} = useAuth();
  console.log(user)
  const handleLogOut = () => {
    logOut()
    .then()
    .catch()
  }
  const navOptions = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-medium text-lg p-2 hover:text-black text-[#076cec] hover:bg-none"
              : "text-black text-lg font-medium"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive
              ? "font-medium text-lg p-2 hover:text-black text-[#076cec] hover:bg-none"
              : "text-black text-lg font-medium"
          }
        >
          Shop
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive
              ? "font-medium text-lg p-2 hover:text-black text-[#076cec] hover:bg-none"
              : "text-black text-lg font-medium"
          }
        >
          <TiShoppingCart className="text-3xl" />
        </NavLink>
      </li>
      <li>
        <button className="text-black text-lg font-medium">
          Languages
        </button>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-[#dbf4fc] px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <Link to="/">
            <div className="">
              <img
                className="w-[250px] h-[30px] text-blue"
                src={logo}
                alt="logo.png"
              />
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end mr-4">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="User Photo" src={user?.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <button className="font-semibold p-2 hover:bg-[#076cec] text-black hover:text-white">
                    Update Profile
                  </button>
                </li>
                <li>
                  <button className="font-semibold p-2 hover:bg-[#076cec] text-black hover:text-white">
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="font-semibold p-2 hover:bg-[#076cec] text-black hover:text-white"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn text-white bg-[#076cec] hover:bg-[#0072CE] ">
                Join US
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;