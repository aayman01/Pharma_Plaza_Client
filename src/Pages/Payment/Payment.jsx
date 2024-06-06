import { loadStripe } from "@stripe/stripe-js";
import Footer from "../Shared/Footer/Footer";
import NavBar from "../Shared/NavBar/NavBar";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);
const Payment = () => {
    return (
      <div>
        <NavBar />
        <div className="max-w-6xl mx-auto px-4">
          <div>
            <div>
              <h2 className="text-3xl font-bold text-center my-10 underline">
                Payments
              </h2>
            </div>
            <div className="h-[350px]">
              <Elements stripe={stripePromise}>
                <CheckOutForm />
              </Elements>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
};

export default Payment;