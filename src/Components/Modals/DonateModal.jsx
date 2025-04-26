/* eslint-disable react/prop-types */
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import PaymentForm from "../Forms/PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK)
const DonateModal = ({ setShowModal, campaign, refetch }) => {
    return (
        <div className="bg-black  p-6 sm:p-0 z-1 bg-opacity-60 fixed top-0 left-0 w-[100vw]  h-[100vh] flex items-center  justify-center">
            <div className="flex flex-col w-[100vw] sm:w-[50vw] bg-white">
                <Elements stripe={stripePromise}>
                    {/* <PaymentForm refetch={refetch} campaign={campaign} setShowModal={setShowModal}></PaymentForm> */}
                </Elements>
            </div>
        </div>

    );
};

export default DonateModal;