import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookAParcel = () => {
    const { user } = useAuth();
    const { register, handleSubmit, setValue, watch , formState: { errors },} = useForm();

    watch("weight" , "") ;

    const handleCost = e => {
        const weightValue = e.target.value ; 
      
        let price = 0 ;

        if (weightValue <= 1) {
            price = 50;
        } else if (weightValue > 1 && weightValue <= 2) {
            price = 100; 
        } else if (weightValue > 2) {
            price = 150; 
        }

        setValue("cost" , price)
    }
  
    const handleBookedParcel = data => {
        console.log(data);
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
                        <input type="text" placeholder="015XXXXXXXX"  {...register("phone", { required: true })} className="input input-bordered w-full max-w-xs" />
                    </label>
                    <label className="justify-self-center form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Parcel Type</span>
                        </div>
                        <input type="text" placeholder="EZ/BP"  {...register("weight", { required: true })} className="input input-bordered w-full max-w-xs" />
                    </label>
                    <label className="justify-self-center form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Weight in Kg</span>
                        </div>
                        <input type="text" placeholder="1"  {...register("weight", { required: true })} onChange={handleCost} className="input input-bordered w-full max-w-xs" />
                    </label>
                    <label className="justify-self-center form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Receiver&apos;s Name</span>
                        </div>
                        <input type="text" placeholder="Receivers Name"  {...register("receivers name", { required: true })} className="input input-bordered w-full max-w-xs" />
                    </label>
                    <label className="justify-self-center form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Receiver&apos;s Phone</span>
                        </div>
                        <input type="text" placeholder="Receivers Phone" {...register("receivers phone", { required: true })} className="input input-bordered w-full max-w-xs" />
                    </label>
                    <label className="justify-self-center form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Delivery Address</span>
                        </div>
                        <input type="text" placeholder="house,road,area,district,division" {...register("receivers phone", { required: true })} className="input input-bordered w-full max-w-xs" />
                    </label>
                    <label className="justify-self-center form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Requested Delivery Date</span>
                        </div>
                        <input type="text" placeholder="Type here"  {...register("requested_date", { required: true })} className="input input-bordered w-full max-w-xs" />
                    </label>
                    <label className="justify-self-center form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Delivery Address&apos;s Latitude</span>
                        </div>
                        <input type="text" placeholder="21.121365496"  {...register("delivery_latitude", { required: true , 
                            pattern : /^\d+(\.\d+)?$/ , 
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.delivery_latitude?.type === "pattern" && <span  className="text-red-800 text-sm">only numbers are allowed</span>}
                        {errors.delivery_latitude?.type === "required" && <span className="text-red-800 text-sm">Required</span>}
                    </label>
                    <label className="justify-self-center form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Delivery Address&apos;s Longitude</span>
                        </div>
                        <input type="text" placeholder="21.121365496"  {...register("delivery_longitude", { required: true , 
                            pattern : /^\d+(\.\d+)?$/ ,
                        })} className="input input-bordered w-full max-w-xs" />
                        {errors.delivery_longitude?.type === "pattern" && <span  className="text-red-800 text-sm">only numbers are allowed</span>}
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