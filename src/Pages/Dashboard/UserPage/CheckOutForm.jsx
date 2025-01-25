import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import useAuth from './../../../Hooks/useAuth';
import Swal from "sweetalert2";

const CheckOutForm = ({price}) => {
    const [clientSecret , setClientSecret] = useState() ;
    const {user} = useAuth() ;
    const stripe = useStripe();
    const elements = useElements();
    const [error , setError] = useState("") ;
    const axioSecure = useAxiosSecure() ;

    const {data : paymentData} = useQuery({
        queryKey : ["create-payment-intent",{amount : price}] , 
        queryFn : async ( ) => {
           const {data} = await axioSecure.post("/create-payment-intent", {amount : price}) ;
           setClientSecret(data.clientSecret) ;
           return data
        }
    })

    console.log(paymentData);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return
        }

        const {error , paymentMethod } = await stripe.createPaymentMethod({
            type : "card" ,
            card
        }) ;

        if(error){
            console.log("Payment Error ",error);
            setError(error.message) ;
        }

        else{
            console.log("Payment Method" , paymentMethod);
            setError("") ;
        }

        // confirm payment

        const {paymentIntent , error : confirmError} = await stripe.confirmCardPayment(clientSecret , {
            payment_method : {
                card : card ,
                billing_details : {
                    email : user?.email || "anonymous",
                    name : user?.displayName || "anonymous"
                }
            }
        })
        
        if(confirmError){
            console.log("Confirm error",confirmError) ;
        }

        else{ 
            console.log("payment Intent",paymentIntent);
            if(paymentIntent.status === "succeeded"){
                // console.log("transaction ID",paymentIntent.id);
                Swal.fire({
                    title: "Payment Complete",
                    text: `Transaction Id : ${paymentIntent.id}`,
                    icon: "success"
                  });
            }
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn bg-amber-500 btn-sm m-4" type="submit" disabled={!stripe || !clientSecret} >
                    Pay
                </button>
                <p className="ml-6 text-red-800">{error} </p>
            </form>
        </div>
    );
};

CheckOutForm.propTypes = {
    price : PropTypes.number,
}

export default CheckOutForm;
