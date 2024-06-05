import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    
    if(loading){
        return (
          <div className="min-h-screen flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
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