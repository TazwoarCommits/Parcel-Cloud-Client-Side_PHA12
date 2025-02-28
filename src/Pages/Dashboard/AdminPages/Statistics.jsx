import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from './../../../Components/SectionTitle';
import ApexCharts from 'react-apexcharts';

const Statistics = () => {
    const axiosSecure = useAxiosSecure();
    const { data: parcels = [] } = useQuery({
        queryKey: ["parcels"],
        queryFn: async () => {
            const { data } = await axiosSecure("/admin/statistic")
            return data;
        }
    })

    const dates = parcels.map(item => item._id);
    const bookings = parcels.map(item => item.totalBooked) ;
    const delivered = parcels.map(item => item.totalDelivered) ; 

    const series = [
        {
            name: "Total Booked Parcels",
            data: bookings, // Data for bars
        },
    ];
    const options = {
        chart: {
            type: "bar",
            width: '100%' ,
            redrawOnParentResize: true,
        },
        xaxis: {
            categories: dates, // Set dates for x-axis
        },
        title: {
            text: "Parcels: Booked vs Delivered",
            align: "center",
        },
    };


    //  line chart

    const options2 = {
        chart: {
            type: "line",
            width: '100%' ,
            redrawOnParentResize: true,
        },
        xaxis: {
            categories: dates, // Set dates for x-axis
        },
        title: {
            text: "Parcels: Booked vs Delivered",
            align: "center",
        },
    };

    const series2 = [
        {
            name: "Total Booked Parcels",
            data: bookings, // Data for first line
        },
        {
            name: "Total Delivered Parcels",
            data: delivered, // Data for second line
        },
    ];


    return (
        <div>
            <SectionTitle title="Statistics"></SectionTitle>
            <div>
                <div className="my-8 md:my-16 lg:w-[60%] overflow-hidden">
                    <ApexCharts options={options} series={series} type="bar" height={250} />
                </div>
                <div className="my-8 md:my-16 lg:w-[60%] overflow-hidden">
                    <ApexCharts options={options2} series={series2} type="line"   height={250} />
                </div>
            </div>
        </div>
    );
};

export default Statistics;