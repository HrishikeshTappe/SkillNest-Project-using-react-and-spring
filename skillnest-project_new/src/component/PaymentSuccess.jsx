import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;

  return (
    <div className="container text-center py-5">
      <h2 className="text-success">Payment Successful!</h2>

      <p className="mt-3">You have purchased:</p>
      <h4>{course?.title}</h4>
      <p>Amount Paid: ₹{course?.price}</p>

      <button
        className="btn btn-primary mt-3"
        onClick={() => navigate("/my-courses")}
      >
        Go to My Courses
      </button>
    </div>
  );
};

export default PaymentSuccess;
