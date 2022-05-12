import React, { useEffect, useState, useMemo, FC } from "react";
import { Link } from "react-router-dom";
import {
  useStripe,
  useElements,
  CardElement,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import axios from "axios";

import { API_URL } from "@/constants";

const useOptions = () => {
  const options = useMemo(
    () => ({
      hidePostalCode: true,
      iconStyle: "solid" as any,
      style: {
        iconColor: "#718096",
        base: {
          color: "#718096",
          height: "40px",
          "::placeholder": {
            color: "#718096",
          },
        },
        invalid: {
          color: "#eb1c26",
        },
      },
    }),
    []
  );

  return options;
};

const Checkout: FC = () => {
  const stripe = useStripe() as any;
  const elements = useElements();
  const options = useOptions();
  const [paymentRequest, setPaymentRequest] = useState<any>(null);

  const [product, setProduct] = useState<any>();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const response = await axios.get(`${API_URL}/checkout/plans`);
    const product = response.data?.prices?.[0];
    setProduct(product);
    const amount = product?.unit_amount;
    const price = amount / 100;
    setPrice(price);
  };

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Membership",
          amount: price,
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
  }, [stripe, price]);

  const onPaymentSubmit = () => {
    paymentRequest.on("paymentmethod", handlePaymentRequest);
  };

  const handlePaymentRequest = async (event: any) => {
    const email = event.payerEmail;

    const result = await axios.post(`${API_URL}/checkout`, {
      price: product.id,
      paymentMethodType: "card",
      currency: "usd",
      email,
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

    // const res = await axios.post(`${API_URL}/checkout`, {
    //   email,
    //   name,
    //   customerData,
    //   platform: "ios",
    // });

    // if (res.status === 200) {
    //   const { authenticated, user } = res.data;
    // }
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
