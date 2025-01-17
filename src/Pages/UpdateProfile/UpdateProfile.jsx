import { useForm } from "react-hook-form";
import SectionTitle from "../../Components/SectionTitle";
import useAuth from "../../Hooks/useAuth";

const UpdateProfile = () => {
    const { handleSubmit, register } = useForm();
    const{user} = useAuth() ;

    const onSubmit = data => {
        console.log(data);
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