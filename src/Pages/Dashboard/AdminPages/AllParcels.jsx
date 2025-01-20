import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";
import { format } from "date-fns";

const AllParcels = () => {
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ["parcels"],
        queryFn: async () => {
            const { data } = await axiosSecure("/parcels")
            return data
        }
    });

    // console.log(parcels);
    return (
        <div>
            <Helmet><title>Parcel Cloud | </title></Helmet>
            <SectionTitle title="All Parcels"></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Booking Date</th>
                            <th>Requested Date</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{parcel.name}</td>
                                <td>{parcel?.phone ? parcel?.phone : "N/A"}</td>
                                <td>{format(new Date(parcel.createdAt), "MM/dd/yyyy")}</td>
                                <td>{parcel?.requested_date}</td>
                                <td>{parcel?.cost}</td>
                                <td>{parcel?.status}</td>
                                <td><button className="text-xs py-2 px-4 font-medium bg-amber-600 hover:bg-amber-600/80 rounded-lg">Manage</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllParcels;