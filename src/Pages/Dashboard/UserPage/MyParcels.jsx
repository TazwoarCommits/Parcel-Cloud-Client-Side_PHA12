import { useState } from "react";
import SectionTitle from "../../../Components/SectionTitle";
import useParcel from "../../../Hooks/useParcel";
import { format } from 'date-fns';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import ReactStars from 'react-stars'
import useAuth from "../../../Hooks/useAuth";

const MyParcels = () => {
    const {user} = useAuth() ;
    const [parcel, refetch] = useParcel();
    const axiosSecure = useAxiosSecure();
    const [filterBy, setFilterBy] = useState("");
    const [review , setReview] = useState("") ; 
    const [rating , setRating] = useState(0) ; 
    const [ id , setId] = useState("") ; 

    // set Rating in a state 
    const ratingChanged = (newRating) => {
        setRating(newRating) ;
    }

    // set rev in a state 
    const handleReview = e => {
        setReview(e.target.value) ;
    }

    // posting a new Review

    const handleNewRev = async () => {
        const newRev = {
            review : review ,
            rating : rating,
            deliveryManId : id ,
            reviewersEmail : user.email ,
            reviewersName : user.displayName , 
            reviewersPhoto : user.photoURL ,
            createdAt : new Date() ,
        }

      if(newRev.review !== ""){
        const {data} = await axiosSecure.post("/reviews" , newRev)
        if(data.insertedId){
          setRating(0);
          setId("") ;
          setReview("");
          refetch() ;
          Swal.fire({
             position: "center",
             icon: "success",
             title: "Thanks for your feedback",
             showConfirmButton: false,
             timer: 1500
           });
           
        }
      }

      else{
        setRating(0);
          setId("") ;
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Please write your experience",
            showConfirmButton: false,
            timer: 1500
          });
      }

    }


    //  filter parcels according to previously set state if nothing found return all

    const filteredParcels = parcel.filter((item) => {
        if (!filterBy) {
            return true
        };
        return item.status.toLowerCase() === filterBy.toLowerCase();
    });


    // cancelling a parcel before when it is in pending status 

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.delete(`/parcels/${id}`)
                if (data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Parcel has been removed.",
                        icon: "success"
                    });
                }

            }
        });
    }


    return (
        <div>
            <Helmet>
                <title>Parcel Cloud | My Parcels</title>
            </Helmet>
            <SectionTitle title="My Parcel"></SectionTitle>
            <div className="my-8 md:my-16">
                <select name="" id="" onChange={(e)=>setFilterBy(e.target.value)} className="p-4 text-semibold border-2 border-amber-400 rounded-xl">
                    <option value="">Filter By</option>
                    <option value="">All</option>
                    <option className="hover:bg-amber-400" value="delivered">Delivered</option>
                    <option value="pending">pending</option>
                    <option value="in-transit">In-transit</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="table text-sm">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl. No</th>
                            <th>Parcel Type</th>
                            <th>Req. Delivery Date</th>
                            <th>Approx. Delivery Date</th>
                            <th>Booking Date</th>
                            <th>Deliver Man&apos;s Id</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Give Review</th>
                            <th>Pay</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {
                            filteredParcels.map((item, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{item.parcel_type}</td>
                                <td>{item.requested_date}</td>
                                <td>{item?.approximateDeliveryDate ? format(new Date(item?.approximateDeliveryDate), "MM/dd/yyyy") : "pending"}</td>
                                <td>{format(new Date(item.createdAt), "MM/dd/yyyy")}</td>
                                <td>{item?.deliveryManId ? item?.deliveryManId : "yet to assign"}</td>
                                <td>{item.status}</td>
                                <td>{item.status === "pending" ?
                                    <div className="flex gap-1">
                                        <Link to={`/dashboard/updateParcel/${item._id}`}>
                                            <button
                                                className="my-4 text-[10px] mx-1 px-2 py-1 bg-amber-600 rounded-md text-white font-medium">Update</button>
                                        </Link>
                                        <button onClick={() => handleDelete(item._id)}
                                            className="my-4 text-[10px] mx-1 px-2 py-1 rounded-md bg-red-700 text-white font-medium">Cancel</button>
                                    </div> :
                                    <div className="flex gap-1">
                                        <button disabled className="text-[10px] mx-1 px-2 py-1 bg-gray-700 rounded-md text-white font-medium">Update</button>

                                        <button disabled className="text-[10px] mx-1 px-2 py-1 rounded-md bg-gray-700 text-white font-medium">Cancel</button>
                                    </div>}</td>
                                <td>{item.status === "delivered" ?
                                    <button onClick={() => {setId(item.deliveryManId) ; document.getElementById('my_modal_5').showModal()}}
                                     className="text-[10px] mx-1 px-2 py-1 bg-amber-600 rounded-md text-white font-medium"
                                    >Review</button>
                                    // <Link to={`/dashboard/addReview/${item._id}`}>
                                    //     <button className="text-[10px] mx-1 px-2 py-1 bg-amber-600 rounded-md text-white font-medium">Review</button>
                                    // </Link>
                                    :
                                    <button disabled className="text-[10px] mx-1 px-2 py-1 bg-gray-700 rounded-md text-white font-medium">Review</button>}
                                </td>
                                <td>
                                    <button className="text-[10px] mx-1 px-2 py-1  bg-amber-600 rounded-md text-white font-medium">Pay</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {/* -----------Review Modal---------- */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className="mt-2">
                        <ReactStars
                            count={5}
                            value={rating}
                            onChange={ratingChanged}
                            size={24}
                            color2={'#ffd700'} />
                        <textarea onChange={handleReview}
                         className="p-4 border-2 rounded-xl w-full h-[200px] resize-none" placeholder="write your review" name="review"
                        ></textarea>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn" onClick={()=>handleNewRev()}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyParcels;