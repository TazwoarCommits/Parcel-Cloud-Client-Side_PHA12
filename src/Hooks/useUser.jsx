import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from './useAxiosSecure';

const useUser = () => {
    const {user} = useAuth() ;
    const axiosSecure = useAxiosSecure() ;

    const {data : userDb , refetch , isPending} = useQuery({
        queryKey : ["userDb" , user?.email] ,
        queryFn : async () => {
            const {data : userData} = await axiosSecure(`/users/${user?.email}`)
            if(!userData){
               const {data : deliverymanData} = await axiosSecure(`/delivery-man/${user?.email}`)
                return deliverymanData
            }
            return userData ;
        }
    })
    return [userDb , refetch , isPending] ;
};

export default useUser;