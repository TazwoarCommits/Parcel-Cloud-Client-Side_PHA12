import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import PropTypes from "prop-types";

const PrivateRoutes = ({children}) => {
    const {user , loading} = useAuth() ; 
    const location = useLocation() ;

    if(loading){
        return (
            <div className="h-[50vh] flex text-center items-center justify-center">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        )
    }

    if(user){
       return(
        {children}
       )
    }

    else{
       return <Navigate to="/login" state={{from : location}} replace></Navigate>
    }
};

PrivateRoutes.propTypes = {
    children : PropTypes.object,
}

export default PrivateRoutes;