import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BookAParcel = () => {
    const { user } = useAuth();
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure() ;

    watch("weight", "");

    const handleCost = e => {
        const weightValue = e.target.value;

        let price = 0;

        if (weightValue <= 1) {
            price = 50;
        } else if (weightValue > 1 && weightValue <= 2) {
            price = 100;
        } else if (weightValue > 2) {
            price = 150;
        }

        setValue("cost", price)
    }

    const handleBookedParcel = async data => {
        const parcel = {...data,status : "pending"}
       
       try{

        const {data} = await axiosSecure.post("/parcels" , parcel)
        if(data.insertedId){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });
        }

        else(console.log(data))

       }
       catch(err){
          console.log(err.message);
       }

    }

    return (
        <div>
            <Helmet>
                <title>Parcel Cloud | Book Parcel</title>
            </Helmet>
            <SectionTitle title="Book A parcel"></SectionTitle>
            <form onSubmit={handleSubmit(handleBookedParcel)} className="w-11/12 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
                    <label className="justify-self-center  form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Name</span>
                        </div>
                        <input type="text" placeholder="Type here" {...register("name", { required: true })} value={user.displayName} className="input input-bordered w-full max-w-xs" />
                    </label>
                    <label className="justify-self-center form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input type="text" placeholder="Type here"  {...register("email", { required: true })} value={user.email} className="input input-bordered w-full max-w-xs" />
                    </label>
                    <label className="justify-self-center form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Phone</span>
                        </div>
                        <input type="text" placeholder="015XXXXXXXX"  {...register("phone", { required: true , 
                            pattern : /^\d+$/})} className="input input-bordered w-full max-w-xs" />
                           {errors.phone?.type === "pattern" && <span className="text-red-800 text-sm">Only digits are allowed</span>}
                           {errors.phone?.type === "required" && <span className="text-red-800 text-sm">Required</span>}
                    </label>
                    <label className="justify-self-center form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Parcel Type</span>
                        </div>
                        <input type="text" placeholder=""  {...register("parcel_type", { required: true })} className="input input-bordered w-full max-w-xs" />

                        {/* error handling */}

                        {errors.parcel_type?.type === "required" && <span className="text-red-800 text-sm">Required</span>}
                    </label>
                    <label className="justify-self-center form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Weight in Kg</span>
                        </div>
                        <input type="text" placeholder="1"  {...register("weight", { required: true , 
                             pattern : /^\d+$/
                        })} onChange={handleCost} className="input input-bordered w-full max-w-xs" />
                         {errors.weight?.type === "pattern" && <span className="text-red-800 text-sm">only numbers are allowed</span>}
                         {errors.weight?.type === "required" && <span className="text-red-800 text-sm">Required</span>}
                    </label>
                    <label className="justify-self-center form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Receiver&apos;s Name</span>
                        </div>
                        <input type="text" placeholder="Receivers Name"  {...register("receivers_name", { required: true })} className="input input-bordered w-full max-w-xs" />
                        {errors.receivers_name?.type === "required" && <span className="text-red-800 text-sm">Required</span>}
                    </label>
                    <label className="justify-self-center form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Receiver&apos;s Phone</span>
                        </div>
                        <input type="text" placeholder="Receivers Phone" {...register("receivers_phone", { required: true ,
                            pattern : /^\d+$/
                        })} className="input input-bordered w-full max-w-xs" />
 
                         {/* error handling */}
                        
                         {errors.receivers_phone?.type === "pattern" && <span className="text-red-800 text-sm">only numbers are allowed</span>}
                         {errors.receivers_phone?.type === "required" && <span className="text-red-800 text-sm">Required</span>}

                    </label>
                    <label className="justify-self-center form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Delivery Address</span>
                        </div>
                        <input type="text" placeholder="house,road,area,district,division" {...register("delivery_address", { required: true })} className="input input-bordered w-full max-w-xs" />

                         {/* error handling */}

                         {errors.delivery_address?.type === "required" && <span className="text-red-800 text-sm">Required</span>}

                    </label>
                    <label className="justify-self-center form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Requested Delivery Date</span>
                        </div>
                        <input type="text" placeholder="MM/DD/YYYY"  {...register("requested_date", { required: true ,
                            pattern : /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/
                        })} className="input input-bordered w-full max-w-xs" />

                         {/* error handling */}

                         {errors.requested_date?.type === "pattern" && <span className="text-red-800 text-sm">Invalid Date Format</span>}
                         {errors.requested_date?.type === "required" && <span className="text-red-800 text-sm">Required</span>}

                    </label>
                    <label className="justify-self-center form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Delivery Address&apos;s Latitude</span>
                        </div>
                        <input type="text" placeholder="21.121365496"  {...register("delivery_latitude", {
                            required: true,
                            pattern: /^\d+(\.\d+)?$/,
                        })} className="input input-bordered w-full max-w-xs" />

                         {/* error handling */}

                        {errors.delivery_latitude?.type === "pattern" && <span className="text-red-800 text-sm">only numbers are allowed</span>}
                        {errors.delivery_latitude?.type === "required" && <span className="text-red-800 text-sm">Required</span>}

                    </label>
                    <label className="justify-self-center form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Delivery Address&apos;s Longitude</span>
                        </div>
                        <input type="text" placeholder="21.121365496"  {...register("delivery_longitude", {
                            required: true,
                            pattern: /^\d+(\.\d+)?$/,
                        })} className="input input-bordered w-full max-w-xs" />

                         {/* error handling */}

                        {errors.delivery_longitude?.type === "pattern" && <span className="text-red-800 text-sm">only numbers are allowed</span>}
                        {errors.delivery_longitude?.type === "required" && <span className="text-red-800 text-sm">Required</span>}

                    </label>
                    <label className="justify-self-center form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Cost</span>
                        </div>
                        <input type="text" {...register("cost", { required: true })} className="input input-bordered w-full max-w-xs" />
                    </label>
                </div>
                <div className="max-w-xs mx-auto my-6 md:my-12">
                    <button className="mx-auto w-full bg-amber-400 py-3 px-12 font-semibold text-lg rounded-2xl">Add Parcel</button>
                </div>
            </form>
        </div>
    );
};

export default BookAParcel;