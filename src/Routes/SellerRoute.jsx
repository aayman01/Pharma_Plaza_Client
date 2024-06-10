import { Navigate, useLocation } from "react-router-dom";
import useRole from "../Hooks/useRole";
import { ClipLoader } from "react-spinners";

const SellerRoute = ({children}) => {
    const [role, isLoading] = useRole();
    const location = useLocation();

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <ClipLoader color="#076cec" size={50} />
        </div>
      );
    }

    if ( role === "Seller") {
      return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;