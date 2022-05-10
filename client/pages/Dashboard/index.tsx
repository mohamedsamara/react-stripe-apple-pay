import React, { FC } from "react";
import { Link } from "react-router-dom";

const Dashboard: FC = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center pt-4 min-vh-100 dashboard-page">
      <h1>React Apple Pay</h1>

      <Link
        to="/login"
        className="d-flex justify-content-center align-items-center rounded-pill p-3 text-decoration-none bg-black text-white text-center mt-3 button-link"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Dashboard;
