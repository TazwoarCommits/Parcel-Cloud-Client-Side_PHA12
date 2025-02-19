import FeaturedCard from "../../../Components/FeaturedCard";
import SectionTitle from "../../../Components/SectionTitle";
import Banner from "../Banner/Banner";
import feature1 from "../../../assets/feature1.jpg"
import feature2 from "../../../assets/feature2.png"
import feature3 from "../../../assets/feature3.png"
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxios";
import StatCard from "../../../Components/StatCard";
import parcel from "../../../assets/Parcels.jpg"
import customer from "../../../assets/customer.jpg"
import delivered from "../../../assets/delivered.jpeg"
import TopDeliveryManCard from "../TopDeliveryMan/TopDeliveryManCard";


const Home = () => {
    const axiosPublic = useAxiosPublic();

    // fetching stats
    const { data: stats = {} } = useQuery({
        queryKey: ["stats"],
        queryFn: async () => {
            const { data } = await axiosPublic("/home/stats");
            return data;
        }
    });

    // fetching top Deliveryman 

    const {data : deliveryMen = [] } = useQuery({
        queryKey : ["top-deliverymen"],
        queryFn : async () => {
            const {data} = await axiosPublic("/top-deliveryman") ;
            return data
        }

    }) ;

    return (
        <div>
            <Helmet>
                <title>Parcel Cloud | Home</title>
            </Helmet>
            <Banner></Banner>
            <SectionTitle title="Our Features"></SectionTitle>

            <section className="dark:text-gray-700 mt-8 mb-24 md:mb-4 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeaturedCard icon={feature1}
                    title="Parcel Safety"
                    animate="fade-up-right"
                    bg="feature1"
                    description="We prioritizes parcel safety by ensuring secure packaging, careful handling, and real-time tracking to prevent loss or damage"
                ></FeaturedCard>

                <FeaturedCard icon={feature3}
                    title="Customer Satisfaction"
                    bg="feature3"
                    animate="fade-up"
                    description="Customer satisfaction is at the heart of everything we do, offering transparent communication, reliable service, and dedicated support"
                ></FeaturedCard>

                <FeaturedCard icon={feature2}
                    title="Fast Delivery"
                    animate="fade-up-left"
                    bg="feature2"
                    description="With our fast delivery services, we guarantee timely dispatch and arrival, meeting your urgent needs"
                ></FeaturedCard>

            </section>
            <section className="dark:text-gray-700 mt-8 mb-24 md:mb-4 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard bg={"stat1"} data={stats.parcels} image={parcel}
                    title={"Orders"}
                ></StatCard>

                <StatCard bg={"stat3"} data={stats.users} image={customer}
                    title={"Users"}
                ></StatCard>

                <StatCard bg={"stat2"} data={stats.delivered} image={delivered}
                    title={"Deliveries"}
                    description={"We successfully deliver the parcels to their destinations without any damage"}
                ></StatCard>
            </section>

            <SectionTitle title="Our Top Delivery Men"></SectionTitle>

            <section className="mt-8 mb-24 md:mb-48 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    deliveryMen.map((man , idx) => <TopDeliveryManCard key={man._id} deliveryman={man} idx={idx}></TopDeliveryManCard>)
                }
            </section>

        </div>
    );
};

export default Home;