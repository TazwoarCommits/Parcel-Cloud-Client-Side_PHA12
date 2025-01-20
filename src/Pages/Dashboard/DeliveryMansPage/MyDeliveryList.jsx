import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";


const MyDeliveryList = () => {
    return (
        <div>
            <Helmet><title>Parcel Cloud | My Deliveries</title></Helmet>
            <SectionTitle title="My Deliveries"></SectionTitle>
        </div>
    );
};

export default MyDeliveryList;