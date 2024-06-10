import { Navigate, useLocation } from "react-router-dom";
import useRole from "../Hooks/useRole";
import useAuth from "../Hooks/useAuth";
import { ClipLoader } from "react-spinners";

const SellerRoute = ({children}) => {
    const { user, loading } = useAuth();
    const [role] = useRole();
    const location = useLocation();

    if (loading || role === "Seller") {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <ClipLoader color="#076cec" size={50} />
        </div>
      );
    }

    if (user && role === "Seller") {
      return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;