import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import 'animate.css';
import useAuth from "../../Hooks/useAuth";
import useUser from "../../Hooks/useUser";
import { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [userDb] = useUser();
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        if (theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
      }, [theme]);
    
      const handleToggle = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
      };

    const handleLogOut = () => {
        logOut();
    };

    return (
        <div className="navbar w-11/12 mx-auto px-0">
            <div className="flex-1">
                <p className="bg-gray-700 px-4 pt-3 pb-2 rounded-lg text-3xl animate__animated animate__lightSpeedInLeft font-Logo special text-amber-300">
                    <Link to="/">Parcel Cloud</Link></p>
            </div>
            <div className="flex-none dark:text-white ">
                <NavLink to="/"><p className="text-sm mx-2 hidden md:flex">Home</p></NavLink>
                <NavLink to="/about-us"><p className="text-sm mx-2 hidden md:flex">About Us</p></NavLink>
                <NavLink to="/contact-Us"><p className="text-sm mx-2 hidden md:flex">Contact Us</p></NavLink>
                <div className="dropdown dropdown-end">
                <button
                        onClick={()=>handleToggle()}
                        className="px-2 py-2 bg-gray-800 dark:bg-gray-300 text-white dark:text-gray-800 rounded-full "
                    >
                        {theme === "dark" ? <MdSunny /> : <FaMoon />}
                    </button>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <IoMdNotificationsOutline className="text-xl font-bold" />
                        </div>
                    </div>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                src={user?.photoURL ? user?.photoURL : "https://i.ibb.co.com/3z773GB/avatar.png"} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <p className="">{user ? user?.displayName : ""}</p>
                        </li>
                        {
                            user && userDb?.role === "user" && <li>
                                <Link to="/dashboard/myParcel">Dashboard</Link>
                            </li>
                        }
                        {
                            user && userDb?.role === "admin" && <li>
                                <Link to="/dashboard/stats">Dashboard</Link>
                            </li>

                        }
                        {
                            user && userDb?.role === "delivery man" && <li>
                                <Link to="/dashboard/deliveryList">Dashboard</Link>
                            </li>

                        }
                        <li className="md:hidden"><Link to="/">Home</Link></li>
                        <li className="md:hidden"><Link to="/about-us">About Us</Link></li>
                        <li className="md:hidden"><Link to="/contact-Us">Contact Us</Link></li>
                        <li>{user ? <p onClick={handleLogOut}>Logout</p> : <Link to="/register">Register</Link>}</li>
                        <li>{user ? "" : <Link to="/login">Login</Link>}</li>

                    </ul>
                </div>
            </div>
        </div>
    );
};



export default Navbar;