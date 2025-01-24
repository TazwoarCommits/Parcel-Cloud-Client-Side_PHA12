import { format } from "date-fns";
import { BsTwitterX } from "react-icons/bs";
import { FaGlobe, FaInstagramSquare } from "react-icons/fa";


const Footer = () => {
    const date = new Date();
    return (
        <footer className="bg-gray-700 py-8">
            <h3 className="special text-4xl text-amber-400 text-center "
            >Parcel Cloud</h3>
            <div className="w-8/12 mx-auto">
                <div className="flex flex-col md:flex-row gap-4 justify-around my-8">
                    <a href="#" className="text-base-100/70">About Us</a>
                    <a href="#" className="text-base-100/70">Cantact Us</a>
                    <a href="#" className="text-base-100/70">Career</a>
                    <a href="#" className="text-base-100/70">Suggest</a>
                </div>
                <div>
                    <p className="special text-base-100/70 text-3xl border-b-2 text-center w-1/6 mx-auto">Socials</p>
                    <div className="flex justify-around md:w-5/12 mx-auto my-6">
                        <a href=""><BsTwitterX className="text-white text-2xl" /></a>
                        <a href=""><FaGlobe className="text-white text-2xl" /></a>
                        <a href=""><FaInstagramSquare className="text-white text-2xl" /></a>
                    </div>
                </div>
                <p className="mt-2 text-center text-sm text-base-100/60 ">Copyright &copy; {format(new Date(date), "yyyy")} - All right reserved 
                by <span className="special text-amber-400 text-xl">  Parcel Cloud</span></p>
            </div>
        </footer>
    );
};

export default Footer;