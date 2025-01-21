import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";
import Swal from "sweetalert2";


const AllUSers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await axiosSecure("/users");
            return data
        }
    })

    const makeAdmin = (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You want to make him Admin",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes , I'm sure"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const { data } = await axiosSecure.patch(`/users/admin/${id}`)
                    if (data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Succefully",
                            text: "Upgraded to Admin",
                            icon: "success"
                        });
                    }
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    }


    const makeDeliveryman = async id => {
        try {
            const desiredUser = users.find(user => user._id === id)

            const newDeliveryMan = {
                name: desiredUser.name,
                email: desiredUser.email,
                photo: desiredUser.photo,
                phone: desiredUser.phone,
                role: "delivery man",
                reviewCount: 0,
                delivered: 0,
                review: parseFloat(0).toFixed(1)
            }

            const { data } = await axiosSecure.post("/delivery-man/admin", newDeliveryMan)
            console.log(data);
            if (data.insertedId) {
                const { data } = await axiosSecure.delete(`/users/admin/${id}`)
                console.log(data);
                if (data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "User is a delivery-man now",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            }
        }
        catch (err) {
            console.log(err);
        }
    }


    return (
        <div>
            <Helmet><title>Parcel Cloud | All Users</title></Helmet>
            <SectionTitle title="All Users"></SectionTitle>
            <div className="overflow-x-auto w-10/12 mx-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Number Of Bookings</th>
                            <th>Current Role</th>
                            <th>Assign A Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => <tr key={idx}>
                            <th>{idx + 1}</th>
                            <td>{user?.name}</td>
                            <td>{user?.phone ? user?.phone : "N/A"}</td>
                            <td>{user?.totalBookedParcel ? user?.totalBookedParcel : "N/A"}</td>
                            <td>{user?.role}</td>
                            <td>{user?.role === "admin" ?
                                <div className="flex gap-2">
                                    <button
                                        className="text-xs text-white py-2 px-4 font-medium bg-gray-700 rounded-lg">Admin+</button>
                                    <button
                                        className="text-xs text-white py-2 px-4 font-medium bg-gray-700 rounded-lg">DeliveryMan+</button>
                                </div>
                                :
                                <div className="flex gap-2">
                                    <button onClick={() => makeAdmin(user._id)}
                                        className="text-xs text-white py-2 px-4 font-medium bg-amber-600 hover:bg-amber-600/80 rounded-lg">Admin+</button>
                                    <button onClick={() => makeDeliveryman(user._id)}
                                        className="text-xs text-white py-2 px-4 font-medium bg-amber-600 hover:bg-amber-600/80 rounded-lg">DeliveryMan+</button>
                                </div>
                            }</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllUSers;