import { BsBoxFill } from 'react-icons/bs';
import { MdAddCard, MdOutlineDeliveryDining, MdPlaylistAddCheck, MdRateReview } from 'react-icons/md';
import { RiAccountCircleLine } from 'react-icons/ri';
import { NavLink, Outlet } from 'react-router-dom';
import useParcel from '../Hooks/useParcel';
import { FaBoxes, FaHome, FaUsers } from 'react-icons/fa';
import { IoStatsChartOutline } from "react-icons/io5";
import useUser from '../Hooks/useUser';

const Dashboard = () => {
    const [parcel] = useParcel([]);
    const [userDb] = useUser();

    return (
        <div className="flex flex-col md:flex-row gap-6">
            <div className='w-full md:w-48 bg-amber-500 text-black md:h-screen md:rounded-t-lg'>
                <ul className='menu p-4'>
                    <li>
                        <NavLink to="/">
                            <span><FaHome /></span>Home
                        </NavLink>
                    </li>
                    {userDb?.role === "admin" && (
                        <>

                            <li>
                                <NavLink to="/dashboard/stats">
                                   <span className='text-lg'><IoStatsChartOutline /></span> Statistics
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allParcels">
                                   <span className='text-lg'><FaBoxes /></span> Parcels
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allUsers">
                                   <span className='text-lg'><FaUsers /></span> Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allDeliveryMan">
                                  <span className='text-base'><MdOutlineDeliveryDining /></span> Delivery-Men
                                </NavLink>
                            </li>

                        </>
                    )}

                    {userDb?.role === "user" && <>

                        <li>
                            <NavLink to="/dashboard/myParcel">
                                <span><BsBoxFill /></span> My Parcel<span className='text-xs'>{parcel.length}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/bookParcel">
                                <span className='text-lg'><MdAddCard /></span> Book Parcel
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/profile">
                                <span className='text-lg'><RiAccountCircleLine /></span> Profile
                            </NavLink>
                        </li>
                    </>}
                    {userDb?.role === "delivery man" && <>
                        <li>
                            <NavLink to="/dashboard/deliveryList">
                               <span className='text-lg'><MdPlaylistAddCheck /></span> My Deliveries
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/myReview">
                               <span className='text-lg'><MdRateReview /></span> My Review
                            </NavLink>
                        </li>
                    </>
                    }

                </ul>
            </div>
            <div className='w-11/12 mx-auto'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;