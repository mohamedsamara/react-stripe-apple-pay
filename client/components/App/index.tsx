import React, { FC } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { STRIPE_PUBLISHABLE_KEY } from "@/constants";
import Login from "@pages/Login";
import Dashboard from "@pages/Dashboard";
import Checkout from "@pages/Checkout";
import NoMatch from "@components/NoMatch";
import RequireAuth from "@components/RequireAuth";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
};

const App: FC = () => {
  return (
    <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </Elements>
  );
};

export default App;
