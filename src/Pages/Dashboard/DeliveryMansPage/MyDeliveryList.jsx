import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";
import useUser from "../../../Hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { format } from "date-fns";
import { MdCancel, MdCloudDone } from "react-icons/md";
import Swal from "sweetalert2";

const MyDeliveryList = () => {
    const [userDb] = useUser();
    const axiosSecure = useAxiosSecure();
    // const [status, setStatus] = useState("");
    // console.log(status);

    const { data: deliveries = [] , refetch } = useQuery({
        queryKey: ["deliveries", userDb?._id],
        queryFn: async () => {
            const { data } = await axiosSecure(`/parcels/myList/${userDb?._id}`)
            return data;
        }
    });

    const handleStatus = async (newStatus, id) => {
        try {

            const status = {newStatus , deliverymanId : userDb._id};

            if (newStatus === "cancelled") {
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Cancel this Parcel!"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const { data } = await axiosSecure.patch(`/parcels/delivery/${id}`, status) ; 
                        console.log(data);
                        if (data.modifiedCount > 0) {
                            refetch() ;
                            Swal.fire({
                                title: "Cancelled!",
                                text: "This Parcel has been Cancelled.",
                                icon: "success"
                            });
                        }
                    }
                });
            }

            else{
                const { data } = await axiosSecure.patch(`/parcels/delivery/${id}`, status) ;
                console.log(data);
                if(data.modifiedCount > 0){
                    refetch()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Parcel has been delivered",
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
            <Helmet><title>Parcel Cloud | My Deliveries</title></Helmet>
            <SectionTitle title="My Deliveries"></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>User&apos; Phone</th>
                            <th>Requested Delivery Date</th>
                            <th>Approximate Delivery Date</th>
                            <th>Receivers phone </th>
                            <th>Receivers Address</th>
                            <th>View Location Button</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            deliveries.map((delivery, idx) => <tr key={delivery._id}>
                                <th>{idx + 1}</th>
                                <td>{delivery.name}</td>
                                <td>{delivery.phone}</td>
                                <td>{format(new Date(delivery.requested_date), "MM/dd/yyyy")}</td>
                                <td>{format(new Date(delivery.approximateDeliveryDate), "MM/dd/yyyy")}</td>
                                <td>{delivery.receivers_phone}</td>
                                <td>{delivery.delivery_address}</td>
                                <td><button>See Location</button></td>
                                <td>{delivery?.status === "delivered" || delivery?.status === "cancelled" ?
                                    <button className="text-xs rounded-lg py-2 px-4 font-medium bg-green-600 text-white">{delivery.status}</button> :
                                    <button onClick={() => handleStatus("delivered", delivery._id)}
                                        className="flex items-center text-xs rounded-lg py-2 px-4 font-medium bg-amber-600 hover:bg-amber-600/80 text-white">Delivered <span><MdCloudDone /></span></button>
                                }</td>
                                <td>{delivery?.status === "cancelled" || delivery?.status === "delivered" ?
                                    <button className="text-xs rounded-lg py-2 px-4 font-medium bg-gray-700 text-white">{delivery.status}</button> :
                                    <button onClick={() => handleStatus("cancelled", delivery._id)}
                                        className="flex items-center text-xs rounded-lg py-2 px-4 font-medium bg-red-700 hover:bg-red-700/80 text-white">Cancel <span><MdCancel /></span></button>
                                }</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDeliveryList;