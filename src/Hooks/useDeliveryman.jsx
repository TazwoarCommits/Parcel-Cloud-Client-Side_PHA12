import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

 
 const useDeliveryman = () => {
     const axiosSecure = useAxiosSecure() ;

     const {data : deliveryman = [] , refetch} = useQuery({
        queryKey : ["delivery-man"] ,
        queryFn : async () => {
            const {data} = await axiosSecure("/delivery-man") ;
            return data
        }
     }) ; 
    return [deliveryman , refetch] ; 
 };
 
 export default useDeliveryman;