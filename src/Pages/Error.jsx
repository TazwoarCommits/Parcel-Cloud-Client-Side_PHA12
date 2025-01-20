import Lottie from "lottie-react";
import error from "../assets/Loties/Error.json"

const Error = () => {
    return (
        <div className="w-9/12 mx-auto mt-[10vh]">
            <Lottie animationData={error} className="w-9/12 mx-auto"></Lottie>
        </div>
    );
};

export default Error;