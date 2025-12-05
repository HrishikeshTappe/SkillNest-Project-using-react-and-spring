import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const course = location.state?.course;
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      alert("Please login to continue");
      navigate("/login");
    }

    if (!course) {
      alert("Invalid course");
      navigate("/courses");
    }
  }, [user, course, navigate]);

  const payNow = async () => {
    setLoading(true);

    try {
      await axios.post("http://localhost:8080/api/payment/fake-success", {
        userId: user.data ? user.data.id : user.id,
        courseId: course.id,
        courseName: course.title,
        amount: course.price,
      });

      navigate("/success", { state: { course } });
    } catch (err) {
      console.error(err);
      alert("Payment failed!");
    }

    setLoading(false);
  };

  return (
    <div className="container py-5 text-center">
      <h2 className="mb-4">Fake Payment Gateway</h2>

      <div
        className="shadow p-4 mx-auto"
        style={{ maxWidth: "400px", borderRadius: "12px" }}
      >
        <h4>{course?.title}</h4>
        <p className="text-muted">Amount: ₹{course?.price}</p>

        <button
          className="btn btn-success w-100"
          disabled={loading}
          onClick={payNow}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        <button
          className="btn btn-secondary w-100 mt-2"
          onClick={() => navigate("/courses")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Payment;
