import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { ClipLoader } from "react-spinners";

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    
    if(loading){
        return (
          <div className="min-h-screen flex items-center justify-center">
            <ClipLoader color="#076cec" size={50} />
          </div>
        );
    }

    if(user){
        return children;
    }
    
    return (
      <Navigate
        state={location.pathname}
        to="/login"
        replace
      ></Navigate>
    );
};

export default PrivateRoute;