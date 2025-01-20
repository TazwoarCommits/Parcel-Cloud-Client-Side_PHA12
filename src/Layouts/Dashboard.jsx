import { BsBoxFill } from 'react-icons/bs';
import { MdAddCard } from 'react-icons/md';
import { RiAccountCircleLine } from 'react-icons/ri';
import { NavLink, Outlet } from 'react-router-dom';
import useParcel from '../Hooks/useParcel';
import { FaHome } from 'react-icons/fa';
// import useAuth from '../Hooks/useAuth';
import useUser from '../Hooks/useUser';
// import useUser from './../Hooks/useUser';

const Dashboard = () => {
    const [parcel] = useParcel([]);
    // const { logOut } = useAuth();
    const [userDb] = useUser();
    // console.log(userDb);

    // const handleLogOut = () => {
    //     logOut();
    // }


    return (
        <div className="flex flex-col md:flex-row gap-6">
            <div className='w-full md:w-48 bg-amber-500 text-black h-[30vh] md:h-[100vh] md:rounded-t-lg'>
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
                                    Stats
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allParcels">
                                    All Parcels
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allUsers">
                                    All Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allDeliveryMan">
                                    All Delivery Man
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
                                My Deliveries
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/myReview">
                                My Review
                            </NavLink>
                        </li>
                    </>
                    }

                    {/* <li onClick={handleLogOut}> Log-Out </li> */}
                </ul>
            </div>
            <div className='w-11/12 mx-auto'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;