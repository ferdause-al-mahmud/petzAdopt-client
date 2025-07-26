/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const PaymentForm = ({ setShowModal, campaign, refetch }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  // console.log(amount)
  useEffect(() => {
    if (amount > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: amount })
        .then((res) => {
          // console.log(res.data.clientSecret)
          setClientSecret(res.data.clientSecret);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log('[error]', error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
    const { paymentIntent, error: confirmErr } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmErr) {
      console.log("confirm error ", confirmErr);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // console.log("transaction id ", paymentIntent.id);

        const payment = {
          email: user.email,
          amount: amount,
          date: new Date().toLocaleDateString(),
          campaignId: campaign._id,
        };
        const res = await axiosSecure.post("/payments", payment);
        console.log("payment sent", res);
        toast.success("You payment is successfull");
        refetch();
        setShowModal(false);
      }
    }
  };
  return (
    <div>
      <form className="p-8" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",

                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="sm:w-1/2">
          <label className="block mt-4 text-sm">amount</label>
          <input
            type="number"
            name="amount"
            required
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#ff946b] bg-gray-200 text-gray-900"
          />
        </div>
        <button
          className="btn bg-rose-100 !text-rose-900 mt-10"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Donate
        </button>
        <div className="flex justify-end">
          <button
            onClick={() => setShowModal(false)}
            className="btn bg-blue-500"
          >
            Cancel
          </button>
        </div>
        <p className="text-red-500">{error}</p>
      </form>
    </div>
  );
};

export default PaymentForm;
