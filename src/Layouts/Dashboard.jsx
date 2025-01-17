import { BsBoxFill } from 'react-icons/bs';
import { MdAddCard } from 'react-icons/md';
import { RiAccountCircleLine } from 'react-icons/ri';
import { NavLink, Outlet } from 'react-router-dom';
const Dashboard = () => {

    // const isAdmin = false;

    return (
        <div className="flex flex-col md:flex-row gap-6">
            <div className='w-full md:w-48 bg-amber-500 text-black h-[30vh] md:h-[100vh] md:rounded-t-lg'>
                <ul className='menu p-4'>
                    {
                        // isAdmin ?
                        //     <>
                        //     </>
                        //     :
                            <>
                                <li>
                                    <NavLink to="/dashboard/myParcel">
                                        <BsBoxFill /> <span>My Parcel</span>
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