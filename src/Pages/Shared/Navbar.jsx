import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import 'animate.css';
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
    const {user , logOut} = useAuth() ;

    const handleLogOut = () => {
        logOut() ;
    } ;

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
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                src={user?.photoURL? user?.photoURL : "https://i.ibb.co.com/3z773GB/avatar.png"} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                           <p className="">{user? user?.displayName : ""}</p>
                        </li>
                        <li>{user? <Link to="">Dashboard</Link> : <Link to="/login">Login</Link>}</li>
                        <li>{user? <p onClick={handleLogOut}>Logout</p> : <Link to="/register">Register</Link>}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;