import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_paymentpk);

const Payment = () => {
    const params = useParams() ;
    const axiosSecure = useAxiosSecure() ;
    
    const {data : parcel = {} } = useQuery({
        queryKey : ["parcel"] ,
        queryFn : async () => {
            const {data} = await axiosSecure(`/parcels/${params.id}`) ;
            return data
        }
    }) ;

    return (
        <div>
            <Helmet>
                <title>Parcel Cloud | Payment</title>
            </Helmet>
            <SectionTitle title="Payment"></SectionTitle>
            <div>
                <div className="flex justify-around">
                    <h3 className="text-xl md:text-2xl">Pay Now</h3>
                    <h3 className="text-xl md:text-2xl">Cost : {parcel.cost}</h3>
                </div>
            </div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm price={parcel.cost}></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;