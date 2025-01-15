import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import parcel from "../../assets/Loties/parcel.json"
import { Helmet } from "react-helmet-async";

const Register = () => {
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
                        <form className="card-body max-w[550px]">
                            <h2 className="text-3xl font-semibold">Streamline Your Deliveries</h2>
                            <div className="md:flex gap-4">
                                <div className="form-control md:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" placeholder="Username" className="input input-bordered" required />
                                </div>
                                <label className="form-control md:w-1/2 max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Register As</span>
                                    </div>
                                    <select defaultValue="default" className="select select-bordered">
                                        <option disabled value="default">Pick one</option>
                                        <option>User</option>
                                        <option>Delivery Man</option>
                                    </select>
                                </label>
                            </div>
                            <div className="md:flex gap-4">
                                <div className="form-control md:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control md:w-1/2">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="password" className="input input-bordered" required />
                                </div>
                            </div>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Your Photo</span>
                                </div>
                                <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
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