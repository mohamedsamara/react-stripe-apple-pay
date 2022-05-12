import React, { useEffect, useState, useMemo, FC } from "react";
import { Link } from "react-router-dom";
import {
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import axios from "axios";

import { API_URL } from "@/constants";
import { useStore } from "@/store";

const Checkout: FC = () => {
  const stripe = useStripe() as any;
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState<any>(null);

  const subscriptionPlan = useStore((state) => state.subscriptionPlan);
  const amount = subscriptionPlan?.unit_amount;
  const PRICE = amount / 100;

  // if (!elements || !stripe) return <div>Loading...</div>;

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Membership",
          amount: PRICE,
        },
        requestPayerName: true,
        requestPayerEmail: true,
        disableWallets: ["googlePay", "browserCard"],
      });

      pr.canMakePayment().then((result: any) => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [stripe]);

  const onPaymentSubmit = () => {
    paymentRequest.on("paymentmethod", handlePaymentRequest);
  };

  const handlePaymentRequest = async (event: any) => {
    const email = event.payerEmail;
    const name = event.payerName;

    const result = await axios.post(`${API_URL}/checkout`, {
      price: subscriptionPlan.id,
      paymentMethodType: "card",
      currency: "usd",
      email,
      name,
    });

    const { success } = result.data;

    if (!success) {
      event.complete("fail");
    }

    const { clientSecret } = result.data;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: event.paymentMethod.id,
      },
      {
        handleActions: false,
      }
    );

    if (error) {
      event.complete("fail");
    }

    if (paymentIntent.status === "requires_action") {
      stripe.confirmCardPayment(clientSecret);
    }

    event.complete("success");
  };

  return (
    <div className="h-100 d-flex flex-column flex-md-row align-items-center justify-content-between checkout-page">
      <div className="w-50 h-100 d-none d-md-block left-column">
        <div className="h-100 banner" />
      </div>
      <div className="w-50 h-100 px-0 px-md-5 d-flex flex-column justify-content-center right-column">
        <form className="checkout-form">
          <h1 className="mb-4 font-weight-light fs-4">React Secure Checkout</h1>

          {paymentRequest && (
            <div className="mt-4">
              <PaymentRequestButtonElement
                options={{ paymentRequest }}
                onClick={onPaymentSubmit}
              />
            </div>
          )}

          <div className="my-4">
            <Link to="/login" className="fw-bolder">
              Back?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
