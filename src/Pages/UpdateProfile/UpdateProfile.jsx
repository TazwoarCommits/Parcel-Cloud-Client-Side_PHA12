import { useForm } from "react-hook-form";
import SectionTitle from "../../Components/SectionTitle";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxios";


const UpdateProfile = () => {
    const { handleSubmit, register } = useForm();
    const { user, updateUsersProfile } = useAuth();
    const axiosPublic = useAxiosPublic();

    const image_hosting_key = import.meta.env.VITE_image_hosting_API_key;
    const image_hosting_API = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const onSubmit = async form => {
        try {

            const imageFile = { image: form?.photo[0] }

            if (imageFile) {
                const { data } = await axiosPublic.post(image_hosting_API, imageFile, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                const name = form?.name ? form.name : user.displayName;
                const photo = data?.data?.display_url ? data?.data?.display_url : user.photoURL

                updateUsersProfile(name, photo);

            }

            else{

                 const name = form?.name ? form.name : user.displayName;
                 const photo = user.photoURL ;

                 updateUsersProfile(name, photo);
            }






        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <SectionTitle title="update Profile"></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)}
                className="card-body w-full md:w-6/12 mx-auto mb-16">
                <div className="gap-4">
                    <div className="form-control full">
                        <label className="label">
                            <span className="label-text">Update UserName</span>
                        </label>
                        <input type="text" {...register("name")} placeholder={`${user.displayName}`} className="input input-bordered" />
                    </div>
                </div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Update Photo</span>
                    </div>
                    <input type="file"  {...register("photo")} className="file-input file-input-bordered w-full max-w-xs" />
                </label>
                <div className="form-control mt-6">
                    <button className="py-3 bg-amber-300 hover:bg-amber-300/80 rounded-lg font-semibold text-gray-800 hover:text-black"
                    >Update</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;