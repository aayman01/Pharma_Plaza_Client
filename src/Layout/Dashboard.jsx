import { NavLink, Outlet } from "react-router-dom";
import img from '../assets/white-logo.png';
import { FaCoins, FaHome, FaUserAlt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import useRole from "../Hooks/useRole";
import { RiAdvertisementLine } from "react-icons/ri";
import { MdPayment } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import { AiFillMedicineBox } from "react-icons/ai";

const Dashboard = () => {
    const [ role, isPending] = useRole();
    // console.log(role)
    // const isPending = false;
    // const role = 'admin'
    if (isPending) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <ClipLoader color="#076cec" size={50} />
        </div>
      );
    }
    return (
      <div className="flex ">
        <div className="w-64 min-h-screen bg-[#076cec] pt-12">
          <div>
            <img className="ml-2 w-[120px] lg:w-[240px]"  src={img} alt="logo" />
            <ul className="menu space-y-1 mt-3 text-base font-medium">
              {role === "Admin" && (
                <>
                  <li className="">
                    <NavLink to="/dashboard/adminHome">
                      <FaUserAlt />
                      Admin Home
                    </NavLink>
                  </li>
                  <li className="">
                    <NavLink to="/dashboard/manageUser">
                      <FaUserAlt />
                      Manage users
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manageCategory">
                      <BiCategory />
                      Manage Category
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/managePayment">
                      <FaCoins /> Payment Management
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/sellsReport">
                      <HiOutlineDocumentReport />
                      Sales Report
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink to="/dashboard/manageAdvertise">
                      <RiAdvertisementLine /> Manage banner advertise
                    </NavLink>
                  </li>
                </>
              )}
              {role === "Seller" && (
                <>
                  <li>
                    <NavLink to="/dashboard/sellerHome">
                      <AiFillMedicineBox />
                      Seller Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manageMedicine">
                      <AiFillMedicineBox />
                      Manage Medicines
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/paymentHistory">
                      <MdPayment />
                      Payment history
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink to="/dashboard/requestAdvertise">
                      <RiAdvertisementLine /> Manage banner advertise
                    </NavLink>
                  </li>
                </>
              )}
              {role === "User" && (
                <>
                  <li className="mb-2">
                    <NavLink to="/dashboard/payment">
                      <MdPayment />
                      Payment history
                    </NavLink>
                  </li>
                </>
              )}
              <hr />
              <li>
                <NavLink to="/">
                  <FaHome /> Home
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-1 p-4 lg:p-8">
          <Outlet />
        </div>
      </div>
    );
};

export default Dashboard;