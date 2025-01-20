import { Helmet } from "react-helmet-async";
import SectionTitle from './../../../Components/SectionTitle';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUser from "../../../Hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import ReviewCard from "../../../Components/ReviewCard";

const MyReviews = () => {
    const axiosSecure = useAxiosSecure() ;
    const [userDb] = useUser() ; 
    console.log(userDb);

    const {data : reviews =[]} = useQuery({
        queryKey : ["reviews" , userDb?._id] ,
        queryFn : async () => {
            const {data} = axiosSecure(`/reviews/${userDb._id}`)
            return data ;
        }
    })

    return (
        <div>
            <Helmet>
                <title>Parcel Cloud | Reviews</title>
            </Helmet>
            <SectionTitle title="Reviews"></SectionTitle>
            <div className="w-10/12 md:w-full mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                       reviews === null || reviews === false ?
                       reviews.map((rev , idx) => <ReviewCard key={idx} singleReview={rev}></ReviewCard> )
                       :
                       <h2 className="text-2xl md:text-4xl text-center font-semibold">No Reviews Yet</h2>
                    }
                </div>
            </div>
        </div>
    );
};

export default MyReviews;