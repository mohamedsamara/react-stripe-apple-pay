import React, { FC } from "react";
import { Link } from "react-router-dom";

import PALNET_BANNER from "images/planet.jpg";

const Login: FC = () => {
  return (
    <div className="h-100 d-flex flex-column flex-md-row align-items-center justify-content-between login-page">
      <div className="w-50 d-none d-md-block left-column">
        <img src={PALNET_BANNER} alt="planet logo" className="login-banner" />
      </div>
      <div className="h-100 d-flex flex-column justify-content-center right-column">
        <form className="login-form">
          <h1 className="mb-5 font-weight-light fs-4">
            Log in to React Apple Pay
          </h1>

          <div className="mb-4">
            <label className="mb-2">Email</label>
            <input type="text" />
          </div>

          <div className="mb-4">
            <label className="mb-2">Password</label>
            <input type="password" />
          </div>

          <div className="mb-4">
            <Link to="/login" className="fw-bolder">
              Forgot your password?
            </Link>
          </div>

          <div className="mt-5">
            <div className="mb-4">
              <Link
                to="/checkout"
                className="d-flex justify-content-center align-items-center rounded-pill p-4 text-decoration-none bg-black text-white text-center button-link"
              >
                Checkout
              </Link>
            </div>

            <div className="mb-4 d-flex flex-row align-items-center">
              <span className="me-2">Not on React Apple Pay?</span>
              <Link to="/login" className="fw-bolder">
                Create an account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
