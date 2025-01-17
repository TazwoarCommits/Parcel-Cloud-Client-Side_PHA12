import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router-dom";
import parcel from "../../assets/Loties/parcel.json"
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxios";


const Register = () => {
    const { createUser, updateUsersProfile, user } = useAuth();
    const { handleSubmit, register, formState: { errors } , reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();


    const image_hosting_key = import.meta.env.VITE_image_hosting_API_key;
    const image_hosting_API = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const onSubmit = async form => {
        try {
            console.log("form", form, "photo", form.photo[0]);
            const imageFile = { image: form.photo[0] };
            const { data } = await axiosPublic.post(image_hosting_API, imageFile, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            console.log(data)

            const newUser = {
                name: form.name,
                email: form.email,
                photo: data.data.display_url,
                role: form.role.toLowerCase(),
            }

            const userRes = await createUser(form.email, form.password);
            if (userRes.user) {

                const profileRes = await updateUsersProfile(newUser.name, newUser.photo);
                console.log(profileRes);

                if(newUser.role === "delivery man"){
                    newUser.reviewCount = 0 ,
                    newUser.delivered = 0 ,
                    newUser.review = parseFloat(0).toFixed(1)

                    const {data} = await axiosPublic.post("/delivery-man" , newUser) ;
                    console.log(data);
                } 
                else{
                    const {data} = await axiosPublic.post("/users" , newUser) ;
                    console.log(data);
                }

                

                toast.success("Successfully Logged In")
                navigate("/")
                console.log(user);
            }
        }

        catch(err){
            console.log(err.message);
            reset() ;
        }

    }

    return (
        <div>
            <Helmet>
                <title>Parcel Cloud | Register</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content w-full flex-col lg:flex-row-reverse lg:gap-16">
                    <div className="text-center lg:text-left md:w-1/2">
                        <Lottie animationData={parcel} className="max-w-96"></Lottie>
                    </div>
                    <div className="card bg-base-100 md:w-1/2 shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)}
                            className="card-body max-w[550px]">
                            <h2 className="text-3xl font-semibold">Streamline Your Deliveries</h2>
                            <div className="md:flex gap-4">
                                <div className="form-control md:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" {...register("name", { required: true })} placeholder="username" className="input input-bordered" />
                                    {errors.name && <span className="text-red-700 text-sm">Name is Required</span>}
                                </div>
                                <label className="form-control md:w-1/2 max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Register As</span>
                                    </div>
                                    <select defaultValue="default" {...register("role", { required: true })} className="select select-bordered">
                                        <option disabled value="default">Pick one</option>
                                        <option>User</option>
                                        <option>Delivery Man</option>
                                    </select>
                                    {errors.role && <span className="text-red-700 text-sm">Role is Required</span>}
                                </label>
                            </div>
                            <div className="md:flex gap-4">
                                <div className="form-control md:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                    {errors.email && <span className="text-red-700 text-sm">Email is Required</span>}
                                </div>
                                <div className="form-control md:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" {...register("password",
                                        {
                                            required: true,
                                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
                                        })} placeholder="password" className="input input-bordered" />
                                    {errors.password?.type === "required" && <span>Password is required</span>}
                                    {errors.password?.type === "pattern" && <span className="text-red-700">Need 6 characters with one lowercase and uppercase character</span>}
                                </div>
                            </div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Your Photo</span>
                                </div>
                                <input type="file"  {...register("photo", { required: true })} className="file-input file-input-bordered w-full max-w-xs" />
                                {errors.photo && <span className="text-red-700 text-sm">Photo is Required</span>}
                            </label>
                            <div className="form-control mt-6">
                                <button className="w-full py-3 bg-amber-300 hover:bg-amber-300/80 rounded-lg font-semibold text-gray-800 hover:text-black"
                                >Register</button>
                            </div>
                            <div>
                                <p>Already Have an Account ? <span className="text-amber-600"><Link to="/login">Login</Link></span></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;