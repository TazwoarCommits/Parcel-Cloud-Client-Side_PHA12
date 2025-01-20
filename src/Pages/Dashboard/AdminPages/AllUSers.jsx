import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";


const AllUSers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await axiosSecure("/users");
            return data
        }
    })

    // console.log(users);
    return (
        <div>
            <Helmet><title>Parcel Cloud | All Users</title></Helmet>
            <SectionTitle title="All Users"></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Number Of Bookings</th>
                            <th>Assign A Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => <tr key={idx}>
                            <th>{idx+1}</th>
                            <td>{user?.name}</td>
                            <td>{user?.phone ? user?.phone : "N/A"}</td>
                            <td>{user?.numberOfBookings ? user?.numberOfBookings : "N/A"}</td>
                            <td><div className="flex gap-2">
                            <button className="text-xs py-2 px-4 font-medium bg-amber-600 hover:bg-amber-600/80 rounded-lg">Admin+</button>
                            <button className="text-xs py-2 px-4 font-medium bg-amber-600 hover:bg-amber-600/80 rounded-lg">DeliveryMan+</button>
                                </div></td>
                        </tr>)}
                    </tbody>
                </table>
            </div> 

        </div>
    );
};

export default AllUSers;