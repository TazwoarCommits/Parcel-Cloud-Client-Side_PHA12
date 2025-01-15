import useAuth from "../Hooks/useAuth";

const PrivateRoutes = ({children}) => {
    const {user , loading} = useAuth() ; 

    if(loading){
        return (
            <div className="h-[50vh] flex text-center items-center justify-center">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        )
    }

    if(user){
       
    }
};

export default PrivateRoutes;