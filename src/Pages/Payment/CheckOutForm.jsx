import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useCart from "../../Hooks/useCart";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import moment from "moment";

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { carts } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  
  const totalPrice = carts.reduce(
    (total, item) => total + item.pricePerUnit,
    0
  );
  // console.log("Total Price:", totalPrice);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          // console.log(res.data.clientSecret);
          setClientSecret(res?.data?.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log("payment error", error);
      setError(error?.message);
    } else {
      // console.log("payment method", paymentMethod);
      setError("");
    }

    // payment conform
    const { paymentIntent, err } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      }
    );
    if (err) {
      // console.log(err);
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const payment = {
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          productIds: carts.map((item) => item.productId),
          status: "pending",
        };

        const invoiceData = {
          email: user.email,
          name: user.displayName,
          price: totalPrice,
          transactionId: paymentIntent.id,
          cartIds: carts.map((item) => item._id),
          items: carts.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.pricePerUnit,
            productName : item.name,
          })),
          date: moment().format("MMM Do YYYY"),
        };
        const res = await axiosSecure.post("/payments", payment);
        // console.log("payment saved", res.data);
        if (res.data) {
          axiosSecure.post("/invoice", invoiceData).then((result) => {
            if (result.data) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Payment Successful",
                showConfirmButton: false,
                timer: 1500,
              });
              setTimeout(() => {
                navigate("/invoice");
              }, 1200);
            }
          });
        }
      }
    }
  };

  return (
    <>
      <h3 className="text-3xl font-bold mb-6">Total Payment: {totalPrice}$</h3>
      <form onSubmit={handleSubmit}>
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
        <button
          disabled={!stripe || !clientSecret}
          type="submit"
          className="btn btn-primary btn-sm my-4"
        >
          Pay
        </button>
        <p className="text-red-500">{error}</p>
        {transactionId && (
          <p className="text-green-500">Your Transaction Id: {transactionId}</p>
        )}
      </form>
    </>
  );
};

export default CheckOutForm;
