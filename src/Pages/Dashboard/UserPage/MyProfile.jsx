import { Link } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useParcel from "../../../Hooks/useParcel";
import { Helmet } from "react-helmet-async";
import useUser from "../../../Hooks/useUser";


const MyProfile = () => {
    const { user } = useAuth() ;
    const [userDb] = useUser() ;
    const [parcel] = useParcel([]) ;
//  console.log(user);

    return (
        <div>
            <Helmet>
                <title>Parcel Cloud | My Profile</title>
            </Helmet>
            <SectionTitle title="My Profile"></SectionTitle>
            <div className=" md:w-10/12 lg:w-7/12 mx-auto border-2 md:rounded-t-3xl border-amber-600/80">
                <div className="bg-amber-600/80 md:rounded-t-3xl p-3 md:p-6">
                   <img className="ml-8 h-52 w-52 mx-auto rounded-full"
                   src={user?.photoURL}  />
                </div>
                <div className="mt-8 mb-12">
                    <p className="ml-2 md:ml-4 text-xl md:text-3xl font-medium"
                    >User name : {user.displayName}</p>
                    <p className="ml-2 md:ml-4 ">Email : {user?.email}</p>
                    <p className="ml-2 md:ml-4 ">Phone : {userDb?.phone}</p>
                    <p className="ml-2 md:ml-4 ">My Total Parcel : {parcel?.length}</p>
                </div>
                 <div className="my-6">
                      <Link to="/dashboard/updateProfile">
                      <button 
                      className="ml-2 md:ml-4 py-2 px-6 bg-amber-400 hover:bg-amber-500 rounded-2xl"
                      >Update Profile</button>
                      </Link>
                 </div>
            </div>
        </div>
    );
};

export default MyProfile;