import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import 'animate.css';

const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <p className="bg-gray-700 px-4 pt-3 pb-2 rounded-lg text-3xl animate__animated animate__lightSpeedInLeft font-Logo special text-amber-300">
                    <Link to="/">Parcel Cloud</Link></p>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                        <IoMdNotificationsOutline className="text-xl font-bold" />
                            <span className="badge badge-sm indicator-item">8</span>
                        </div>
                    </div>
                    {/* <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                        <div className="card-body">
                            <span className="text-lg font-bold">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block">View cart</button>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                           <p className="">User Name</p>
                        </li>
                        <li><Link to="">Dashboard</Link></li>
                        <li><p>Logout</p></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;