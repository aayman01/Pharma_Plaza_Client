import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import { ClipLoader } from "react-spinners";

const AdminRoute = ({ children }) => {
  const {  loading } = useAuth();
  const [role] = useRole();
  const location = useLocation();

  if (loading || role === 'Admin') {
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
