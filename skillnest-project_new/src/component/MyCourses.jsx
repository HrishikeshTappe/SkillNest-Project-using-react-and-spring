import React, { useEffect, useState } from "react";
import axios from "axios";

const MyCourses = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      if (!user) return;

      const userId = user.data ? user.data.id : user.id;

      try {
        const res = await axios.get(
          `http://localhost:8080/api/user/purchases/${userId}`
        );

        // Backend returns APIResponse → data inside res.data.data
        setCourses(res.data.data || []);
      } catch (err) {
        console.error("Failed to load courses:", err);
      }
    };

    loadCourses();
  }, [user]);

  return (
    <div className="container py-4">
      <h2>My Courses</h2>

      <div className="row mt-4">
        {courses.length === 0 && (
          <p>You have not purchased any courses yet.</p>
        )}

        {courses.map((c) => (
          <div className="col-md-4 mb-3" key={c.id}>
            <div className="card p-3 shadow-sm">
              <h5>{c.courseName}</h5>
              <p>
                <strong>Amount Paid:</strong> {c.amount}
              </p>
              <p>
                <strong>Status:</strong> {c.paymentStatus}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(c.purchaseDate).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
