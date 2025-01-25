import { GoogleAuthProvider } from "firebase/auth";
import useAuth from "../../Hooks/useAuth";
import { FaGoogle } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const GoogleLogin = () => {
    const { googleLogin } = useAuth();
    const provider = new GoogleAuthProvider;
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {

            const res = await googleLogin(provider);
            if (res?.user) {
                const newUser = {
                    email: res?.user?.email,
                    name: res?.user?.displayName,
                    photo: res?.user?.photoURL,
                    role: "user",
                    totalSpent: 0,
                    totalBookedParcel: 0,
                }

                const { data } = await axiosPublic.post("/users", newUser);
                if (data.message || data.insertedId) {
                    toast.success("Successfully Signed In");
                    navigate("/");
                }
            }

        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="w-full">
            <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center font-semibold gap-1 md:gap-2 mx-auto bg-amber-300 hover:bg-amber-300/80 rounded-lg py-3">
                <FaGoogle className="text-blue-600"></FaGoogle>
                <span className="text-gray-600">Continue with Google</span>
            </button>
        </div>
    );
};

export default GoogleLogin;