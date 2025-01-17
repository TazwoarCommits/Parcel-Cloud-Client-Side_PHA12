import SectionTitle from "../../../Components/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useParcel from "../../../Hooks/useParcel";


const MyProfile = () => {
    const { user } = useAuth() ;
    const [parcel] = useParcel([]) ;
//  console.log(user);

    return (
        <div>
            <SectionTitle title="My Profile"></SectionTitle>
            <div className=" md:w-10/12 lg:w-7/12 mx-auto border-2 md:rounded-t-3xl border-red-500">
                <div className="bg-amber-600/80 md:rounded-t-3xl p-3 md:p-6">
                   <img className="ml-8 h-52 w-52 mx-auto rounded-full"
                   src={user?.photoURL}  />
                </div>
                <div>
                    <p className="ml-2 md:ml-4 text-xl md:text-3xl font-medium"
                    >User name : {user.displayName}</p>
                    <p className="ml-2 md:ml-4 ">Email : {user.email}</p>
                    <p className="ml-2 md:ml-4 ">My Total Parcel : {parcel.length}</p>
                </div>
                
            </div>
        </div>
    );
};

export default MyProfile;