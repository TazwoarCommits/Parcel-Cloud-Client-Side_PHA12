import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";
import { FaStar } from "react-icons/fa";

const AllDeliveryMan = () => {
    const axiosSecure = useAxiosSecure();
    const { data: deliverymen = [] } = useQuery({
        queryKey: ["deliverymen"],
        queryFn: async () => {
            const { data } = await axiosSecure("/delivery-man");
            return data;
        }
    });
    
    // console.log(deliverymen);
    return (
        <div>
            <Helmet><title>Parcel Cloud | All Delivery Men</title></Helmet>
            <SectionTitle title="All Delivery-men"></SectionTitle>
            <div className="overflow-x-auto mb-48">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Parcel Delivered</th>
                            <th>Average Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            deliverymen.map((man , idx) =>  <tr key={idx}>
                            <th>{idx+1}</th>
                            <td>{man.name}</td>
                            <td>{man?.phone ? man?.phone: "N/A"}</td>
                            <td>{man?.delivered}</td>
                            <td className="flex gap-1 items-center ">{man?.review} <span className="text-amber-400"><FaStar /></span></td>
                        </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllDeliveryMan;