import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useParcel = () => {
    const {user} = useAuth() ;
    const axiosSecure = useAxiosSecure() ;
    const { data : parcel = [] , refetch } = useQuery({
        queryKey : ["parcel" , user?.email ] , 
        queryFn : async () => {
            const {data} = await axiosSecure(`/parcels/user?email=${user.email}`)
            return data ;
        }
    }) ; 

    return [parcel , refetch] ;
};

export default useParcel;