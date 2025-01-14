import { IoIosSearch } from "react-icons/io";
import "./Banner.css"
import 'animate.css';

const Banner = () => {
    return (
        <div className="bg lg:rounded-t-3xl lg:rounded-l-3xl flex flex-col items-center justify-center">
            <div className="md:p-6 bg-base-200/25 backdrop-blur-lg w-10/12 md:w-9/12 lg:w-7/12 mx-auto rounded-2xl">
                <label className="input input-bordered flex items-center gap-2 ">
                    <input type="text" className="grow" placeholder="Search" />
                    <IoIosSearch />
                </label>
            </div>
            <div className="mt-6 text-center">
                <h1 className="text-amber-300 text-3xl md:text-5xl special animate__animated animate__lightSpeedInLeft"
                >Connecting Parcels to Their Destination, Seamlessly</h1>
                <p className="text-amber-300 text-xl md:text-3xl special animate__animated animate__lightSpeedInLeft"
                >Your best parcel partner</p>
            </div>
        </div>
    );
};

export default Banner;