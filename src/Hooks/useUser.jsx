import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from './useAxiosSecure';

const useUser = () => {
    const {user} = useAuth() ;
    const axiosSecure = useAxiosSecure() ;

    const {data : userDb , refetch} = useQuery({
        queryKey : ["userDb" , user.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure(`/users/${user.email}`)
            return data ;
        }
    })
    return [userDb , refetch] ;
};

export default useUser;