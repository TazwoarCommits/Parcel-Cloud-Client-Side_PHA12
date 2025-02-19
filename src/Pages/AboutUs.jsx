import parcels from "../assets/Parcels.jpg"
import customer from "../assets/customer.jpg"
import feature from "../assets/feature1.jpg"
import SectionTitle from "../Components/SectionTitle";

const AboutUs = () => {
    return (
        <div>
            <div className="bg-amber-200 flex flex-col md:flex-row justify-between items-center">
                <div className="md:w-1/2"><h1 className="special text-gray-800 text-7xl text-center ml-4">About Parcel-Cloud</h1></div>
                <img className="md:w-1/2 h-[350px]" src={customer} alt="" />
            </div>
            <SectionTitle title="who we are">
            </SectionTitle>
            <div className="flex flex-col-reverse md:flex-row justify-between gap-6">
                <div className="ml-2 md:w-1/2 mt-6">
                    <p className="text-xl">Parcel Cloud is a cutting-edge parcel management platform designed to simplify and streamline the entire delivery process. From booking and tracking to secure deliveries, we ensure a hassle-free experience for individuals, businesses, and logistics providers. Whether you&apos;re shipping a single package or managing bulk deliveries, Parcel Cloud offers real-time tracking, automated updates, and a user-friendly dashboard to keep you in control.</p>
                    <ul className="ml-3 md:ml-6 my-6 md:my-8 list-inside list-disc">
                        <li>15+ Deliveries Completed</li>
                        <li>Serving Nationwide / Internationally</li>
                        <li>Trusted by Customers</li>
                    </ul>
                </div>
                <img className="md:w-1/2 h-[350px]" src={parcels} alt="" />
            </div>
            <SectionTitle title="Why Choose Us?">
            </SectionTitle>
            <div className="flex flex-col md:flex-row items-center gap-8">
                <img className="md:w-1/2 h-[350px]" src={feature} alt="" />
                <div>
                    <h3 className="text-lg md:text-xl">There are Multiple reason to choose us. Here are some key element why you can trust us with your valuable belongings</h3>
                    <ul className="ml-3 md:ml-6 my-6 md:my-8 list-inside list-disc">
                        <li>Seamless Booking & Management – Book parcels in just a few clicks.</li>
                        <li>Fast & Reliable Deliveries – Your parcels, delivered safely and on time.</li>
                        <li>Business-Friendly Solutions – Scalable options for e-commerce & enterprises.</li>
                        <li>24/7 Support – We&apos;re here to assist you whenever you need us.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;