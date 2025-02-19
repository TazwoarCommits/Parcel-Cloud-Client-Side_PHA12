import Lottie from "lottie-react";
import error from "../assets/Loties/Error.json"
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="w-9/12 mx-auto mt-[10vh]">
             <Link to="/">
             <button className="px-4 py-2 bg-amber-300 text-gray-800 rounded-3xl font-bold">Return To Home</button>
             </Link>
            <Lottie animationData={error} className="w-9/12 mx-auto"></Lottie>
        </div>
    );
};

export default Error;