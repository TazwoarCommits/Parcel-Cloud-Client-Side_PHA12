import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxios";



const useParcel = () => {
    const {user} = useAuth() ;
    const axiosPublic = useAxiosPublic() ;
    const { data : parcel = [] , refetch } = useQuery({
        queryKey : ["parcel" , user?.email ] , 
        queryFn : async () => {
            const {data} = await axiosPublic(`/parcels/user?email=${user.email}`)
            return data ;
        }
    }) ; 

    return [parcel , refetch] ;
};

export default useParcel;