import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import Lottie from "lottie-react";
import login from "../../assets/Loties/login.json"
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import GoogleLogin from '../../Components/SocialLogin/GoogleLogin';

const Login = () => {
    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const credentials = {
        Admin: { email: "admin1@gmail.com", pass: "Aa1234" },
        DeliveryMan: { email: "deliverman3@gmail.com", pass: "Aa1234" },
        User: { email: "user2025@email.com", pass: "Aa1234" }
    }

    const handleCredentials = role => {
        setEmail(credentials[role].email);
        setPass(credentials[role].pass);
        console.log(email, pass);
    }

    const from = location?.state?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(5)
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);
        const email = form.get('email');
        const password = form.get('password');
        const captcha = form.get("captcha");

        if (validateCaptcha(captcha)) {
            loginUser(email, password)
                .then(res => {
                    if (res?.user) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "",
                            showConfirmButton: false,
                            timer: 1500
                        });

                        navigate(from, { replace: true });
                    }
                })
                .catch(err => {
                    toast.error(`${err.message}`)
                })
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Captcha did not match , try again",
            });
        }

    }

    return (
        <div>
            <Helmet>
                <title>Parcel Cloud | Login</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center w-11/12 lg:w-1/2 lg:text-left">
                        <Lottie animationData={login} className="max-w-80"></Lottie>
                        <div>
                            <h3 className='text-xl md:text-2xl text-center underline font-semibold my-4'>Login With existing credentials </h3>
                            <div className='w-9/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
                                <button onClick={() => handleCredentials("Admin")}
                                    className='py-1 px-2 justify-items-center bg-amber-300 dark:bg-amber-200 font-medium text-gray-800 rounded-2xl'>Admin</button>
                                <button onClick={() => handleCredentials("DeliveryMan")}
                                    className='py-1 px-2 justify-items-center bg-amber-300 dark:bg-amber-200 font-medium text-gray-800 rounded-2xl'>Delivery-Man</button>
                                <button onClick={() => handleCredentials("User")}
                                    className='py-1 px-2 justify-items-center bg-amber-300 dark:bg-amber-200 font-medium text-gray-800 rounded-2xl'>Regular User</button>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-base-100 w-11/12 lg:w-1/2 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">Streamline Your Deliveries, One Login Away!</h2>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="email" name='email' className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input onChange={(e) => setPass(e.target.value)} value={pass} type="password" placeholder="password" name='password' className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <LoadCanvasTemplate />
                                <label className="label">
                                    <span className="label-text">Captcha</span>
                                </label>
                                <input type="text" placeholder="recaptcha" name='captcha' className="input input-bordered" required />
                                <label className="label">
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="w-full py-3 bg-amber-300 hover:bg-amber-300/80 rounded-lg font-semibold text-gray-800 hover:text-black"
                                >Login</button>
                            </div>
                            <div>
                                <p>Don&apos;t Have an Account ? <span className="text-amber-600"><Link to="/register">Register Now</Link></span></p>
                            </div>
                            <div className="my-3 py-4 border-t-2 border-amber-600 mx-auto w-11/12">
                                <div className="md:w-11/12 mx-auto">
                                    <GoogleLogin></GoogleLogin>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;