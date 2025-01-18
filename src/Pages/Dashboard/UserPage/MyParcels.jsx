import { useState } from "react";
import SectionTitle from "../../../Components/SectionTitle";
import useParcel from "../../../Hooks/useParcel";
import { format } from 'date-fns';

const MyParcels = () => {
    const [parcel] = useParcel();
    const [filterBy, setFilterBy] = useState("");

    const handleFilter = (e) => {
        setFilterBy(e.target.value);
        console.log(filterBy);

    }

    const filteredParcels = parcel.filter((item) => {
        if (!filterBy) {return true}; 
        return item.status.toLowerCase() === filterBy.toLowerCase(); 
    })


    return (
        <div>
            <SectionTitle title="My Parcel"></SectionTitle>
            <div className="my-8 md:my-16">
                <select name="" id="" onChange={handleFilter} className="p-4 text-semibold border-2 border-amber-400 rounded-xl">
                    <option value="">Filter By</option>
                    <option value="">All</option>
                    <option className="hover:bg-amber-400" value="delivered">Delivered</option>
                    <option value="pending">pending</option>
                    <option value="in-transit">In-transit</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="table text-sm">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl. No</th>
                            <th>Parcel Type</th>
                            <th>Req. Delivery Date</th>
                            <th>Approx. Delivery Date</th>
                            <th>Booking Date</th>
                            <th>Deliver Man&apos;s Id</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Give Review</th>
                            <th>Pay</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {
                            filteredParcels.map((item, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{item.parcel_type}</td>
                                <td>{item.requested_date}</td>
                                <td>{item?.approx_del_date ? item?.approx_del_date : "pending"}</td>
                                <td>{format(new Date(item.createdAt), "MM/dd/yyyy")}</td>
                                <td>{item?.deliveryMen_id ? item?.deliveryMen_id : "yet to assign"}</td>
                                <td>{item.status}</td>
                                <td>{item.status === "pending" ?
                                    <div>
                                        <button className="text-[10px] mx-1 px-2 py-1 bg-amber-600 rounded-md text-white font-medium">Update</button><button className="text-[10px] mx-1 px-2 py-1 rounded-md bg-red-700 text-white font-medium">Cancel</button>
                                    </div> :
                                    <div>
                                        <button disabled className="text-[10px] mx-1 px-2 py-1 bg-gray-700 rounded-md text-white font-medium">Update</button><button disabled className="text-[10px] mx-1 px-2 py-1 rounded-md bg-gray-700 text-white font-medium">Cancel</button>
                                    </div>}</td>
                                <td>{item.status === "delivered" ?
                                    <button className="text-[10px] mx-1 px-2 py-1 bg-amber-600 rounded-md text-white font-medium">Review</button>
                                    :
                                    <button disabled className="text-[10px] mx-1 px-2 py-1 bg-gray-700 rounded-md text-white font-medium">Review</button>}</td>
                                <td><button className="text-[10px] mx-1 px-2 py-1  bg-amber-600 rounded-md text-white font-medium">Pay</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;