import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";
import { format } from "date-fns";
import useDeliveryman from "../../../Hooks/useDeliveryman";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";

const AllParcels = () => {
    const [deliveryman] = useDeliveryman();
    const axiosSecure = useAxiosSecure();
    const [startDate, setStartDate] = useState("");
    const [parcelID, setParcelID] = useState("");
    const [selectedDeliveryMan, setSelectedDeliveryMan] = useState("");
    const [startSortDate, setStartSortDate] = useState("");
    const [endtSortDate, setEndSortDate] = useState("");


    const { data: parcels = [], refetch: reload } = useQuery({
        queryKey: ["parcels" , startSortDate , endtSortDate ],
        queryFn: async () => {
            const { data } = await axiosSecure(`/parcels?sortStart=${startSortDate}&sortEnd=${endtSortDate}`)
            return data
        }
    });

    const updatedParcel = async () => {
        if (startDate && selectedDeliveryMan !== "") {
            const deliveryManObj = deliveryman.find(del => del.name === selectedDeliveryMan)

            const parcelToUpdate = {
                deliveryManId: deliveryManObj._id,
                approx_del_date: startDate,
            }

            try {
                const { data } = await axiosSecure.patch(`/parcels/admin/${parcelID}`, parcelToUpdate)
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    setParcelID("");
                    setSelectedDeliveryMan("");
                    reload();
                }
            }
            catch (err) {
                console.log(err);
            }

        }

    }



    return (
        <div>
            <Helmet><title>Parcel Cloud | </title></Helmet>
            <SectionTitle title="All Parcels"></SectionTitle>
            <div className="mb-3">
                <p className="text-gray-700 font-light my-2 ">Search By Date Range : </p>
                <div className="flex flex-col md:flex-row gap-4">
                    <DatePicker placeholderText="Starting Date Range" className="p-1 select-bordered border-2 w-full rounded-md" selected={startSortDate} onChange={(date) => setStartSortDate(date)} />
                    <DatePicker placeholderText="Ending Date Range" className="p-1 select-bordered border-2 w-full rounded-md" selected={endtSortDate} onChange={(date) => setEndSortDate(date)} />
                </div>
            </div>
            <div className="overflow-x-auto mb-48">
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
                                <td>{
                                    parcel?.status === "delivered" || parcel?.status === "in-transit" ?
                                        <button disabled
                                            className=" text-xs py-2 px-4 font-medium bg-gray-700 text-white rounded-lg">Manage</button>
                                        :
                                        <button onClick={() => { document.getElementById('my_modal_4').showModal(); setParcelID(parcel._id) }}
                                            className="text-xs text-white py-2 px-4 font-medium bg-amber-600 hover:bg-amber-600/80 rounded-lg">Manage</button>
                                }</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

            {/*---------------- modal------------- */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Manage Parcel</h3>
                    <div className="h-[250px]" >
                        <div className="flex flex-col md:flex-row lg:gap-6 justify-center items-center">
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text">Approximate Delivery Date</span>
                                </div>
                                <div>
                                    <DatePicker className="p-2 select-bordered border-2 w-full rounded-md" selected={startDate} onChange={(date) => setStartDate(date)} />
                                </div>
                            </label>
                            <label className="form-control w-full md:w-1/2 ">
                                <div className="label">
                                    <span className="label-text">Select A Deliveryman</span>
                                </div>
                                <select name="deliveryMan" value={selectedDeliveryMan}
                                    onChange={(e) => setSelectedDeliveryMan(e.target.value)}
                                    className="select select-bordered">
                                    <option value="">Pick A DeliveryMan</option>
                                    {
                                        deliveryman.map((man) => <option key={man._id} value={man?.name}>{man?.name}</option>)
                                    }
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button onClick={updatedParcel} className="btn">Done</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AllParcels;