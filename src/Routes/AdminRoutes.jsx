import { Navigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useUser from "../Hooks/useUser";
import PropTypes from "prop-types";

const AdminRoutes = ({children}) => {
    const [userDb , , isPending ] = useUser() ;
    const {user , loading} = useAuth() ; 

    if(isPending || loading){
        return (
            <div className="h-[50vh] flex text-center items-center justify-center">
                    <span className="loading loading-bars loading-xs"></span>
                    <span className="loading loading-bars loading-sm"></span>
                    <span className="loading loading-bars loading-md"></span>
                    <span className="loading loading-bars loading-lg"></span>
                </div>
        )
    } ;

    if(user && userDb?.role === "admin"){
        return children ;
    } 

    else {
      return  <Navigate to="/login"></Navigate>
    }



};

AdminRoutes.propTypes = {
    children : PropTypes.node ,
}

export default AdminRoutes;