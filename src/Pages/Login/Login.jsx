import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import Lottie from "lottie-react";
import login from "../../assets/Loties/login.json"
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const Login = () => {

   useEffect( () => {
    loadCaptchaEnginge(5)
   } , []) ; 

   const handleLogin = (e) => {
    e.preventDefault();

     const form = new FormData(e.target) ;
     const email = form.get('email') ;
     const password = form.get('password') ;
     const captcha = form.get("captcha") ;
     
    if(validateCaptcha(captcha)){
        toast.success("Matched")
        Swal.fire({
            icon: "success",
            title: `${email} , ${password}`,
            text: "Captcha Did not Match",
          });
    }
     else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Captcha Did not Match",
          });
     }
   
   }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie animationData={login} className="max-w-96"></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <h2 className="text-3xl font-semibold">Streamline Your Deliveries, One Login Away!</h2>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;