import { Helmet } from "react-helmet-async";
import ReactStars from "react-rating-stars-component";
import SectionTitle from "../../../Components/SectionTitle";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddReview = () => {
    const [rating, setRating] = useState();
    const parcel = useLoaderData();
    const axiosSecure = useAxiosSecure() ;
    const navigate = useNavigate() ;

    const ratingChanged = (newRating) => {
        setRating(newRating);
    };

    const handleReview = async e => {
        e.preventDefault() ;
        const form = new FormData(e.target) ; 
        const userReview = form.get("review")
        console.log(userReview);

        const newReview = {
            rating : rating ,
            review : userReview,
        }

        console.log(newReview);

       const {data} =await axiosSecure.post("/reviews" , newReview) ;
       console.log(data);
       if(data.insertedId){
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          navigate("/dashboard/myParcel")
       }
    }

    return (
        <div>
            <Helmet>
                <title>Parcel Cloud | Review</title>
            </Helmet>
            <div>
                <SectionTitle title="Write a review"></SectionTitle>
                <div className="w-11/12 md:9/12 mx-auto bg-gray-500">
                    <div className="flex flex-col-reverse md:flex-row gap-16">
                        <form onSubmit={handleReview}
                        className="bg-amber-100 p-4 md:w-1/2">
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                activeColor="#d68910"
                            />
                            <textarea name="review" className="resize-none w-full h-96" placeholder="write your thoughts" ></textarea>
                            <button className="my-6 py-3 px-6 bg-amber-500/80 hover:bg-amber-500 rounded-lg">Post</button>
                        </form>
                        <div className="text-base-100 bg-gray-500 mx-3">
                            <h3 className="mt-6 md:mt-20 text-xl md:text-2xl ">Parcel : {parcel.parcel_type}</h3>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddReview;