import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  // Fetch purchases (must be above useEffect)
  const fetchPurchases = useCallback(async (userId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/user/purchases/${userId}`);
      setPurchases(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Fixed useEffect
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) {
      window.location.href = "/login";
      return;
    }

    const u = JSON.parse(raw);

    // FIX: Defer all setState calls
    setTimeout(() => {
      setUser(u);
      setForm({
        fullName: u.fullName,
        email: u.email,
        phoneNumber: u.phoneNumber,
      });

      fetchPurchases(u.id);
    }, 0);

  }, [fetchPurchases]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const saveProfile = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/user/update/${user.id}`,
        form
      );

      alert(res.data.message);

      if (res.data.data) {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        setUser(res.data.data);
        setEditing(false);
      }
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container py-4">
      <h2>Welcome, {user.fullName}</h2>

      <div className="card my-3 p-3">
        <h5>Profile</h5>

        {!editing ? (
          <div>
            <p><b>Name:</b> {user.fullName}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Phone:</b> {user.phoneNumber}</p>

            <button className="btn btn-primary" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          </div>
        ) : (
          <div>
            <input
              name="fullName"
              className="form-control mb-2"
              value={form.fullName}
              onChange={handleChange}
            />

            <input
              name="email"
              className="form-control mb-2"
              value={form.email}
              onChange={handleChange}
            />

            <input
              name="phoneNumber"
              className="form-control mb-2"
              value={form.phoneNumber}
              onChange={handleChange}
            />

            <button className="btn btn-success me-2" onClick={saveProfile}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="card p-3">
        <h5>Purchased Courses</h5>
        {purchases.length === 0 ? (
          <p>No purchases yet.</p>
        ) : (
          <ul>
            {purchases.map((p) => (
              <li key={p.id}>
                <b>{p.courseName}</b> (Course ID: {p.courseId})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
