import { Navigate, useLocation } from "react-router-dom";
import useRole from "../Hooks/useRole";
import { ClipLoader } from "react-spinners";

const AdminRoute = ({ children }) => {
  const [role, isPending] = useRole();
  const location = useLocation();

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ClipLoader color="#076cec" size={50} />
      </div>
    );
  }

  if ( role === 'Admin') {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
