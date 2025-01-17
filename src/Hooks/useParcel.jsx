import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";


const useParcel = () => {
    const {user} = useAuth() ;
    const axiosSecure = useAxiosSecure() ;
    const { data : parcel = [] , refetch } = useQuery({
        queryKey : ["parcel" , user?.email ] , 
        queryFn : async () => {
            const {data} = await axiosSecure(`/parcels?email=${user.email}`)
            return data ;
        }
    }) ; 

    return [parcel , refetch] ;
};

export default useParcel;