import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "../assets/Css/AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [purchases, setPurchases] = useState([]);

  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
  });

  const [editUser, setEditUser] = useState(null);
  const [editCourse, setEditCourse] = useState(null);
  const [editPurchase, setEditPurchase] = useState(null);

  // =============================
  // FETCH USERS
  // =============================
  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/users");
      setUsers(res.data.data || []);
    } catch (err) {
      console.error("Fetch Users Error:", err);
    }
  }, []);

  // =============================
  // FETCH COURSES
  // =============================
  const fetchCourses = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/courses");
      setCourses(res.data.data || []);
    } catch (err) {
      console.error("Fetch Courses Error:", err);
    }
  }, []);

  // =============================
  // FETCH PURCHASES
  // =============================
  const fetchPurchases = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/purchases");
      setPurchases(res.data.data || []);
    } catch (err) {
      console.error("Fetch Purchases Error:", err);
    }
  }, []);

  // =============================
  // INITIAL LOAD
  // =============================
  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw) {
      window.location.href = "/login";
      return;
    }

    const u = JSON.parse(raw);
    if (!u.role || u.role.toUpperCase() !== "ADMIN") {
      alert("Access denied");
      window.location.href = "/";
      return;
    }

    const loadAll = async () => {
      await fetchUsers();
      await fetchCourses();
      await fetchPurchases();
    };

    loadAll();
  }, [fetchUsers, fetchCourses, fetchPurchases]);

  // =============================
  // DELETE USER
  // =============================
  const deleteUser = async (id) => {
    if (!window.confirm("Delete user?")) return;
    await axios.delete(`http://localhost:8080/api/admin/user/${id}`);
    fetchUsers();
  };

  // =============================
  // UPDATE USER
  // =============================
  const updateUser = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/user/${editUser.id}`,
        editUser
      );
      alert("User updated");
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // =============================
  // DELETE COURSE
  // =============================
  const removeCourse = async (id) => {
    if (!window.confirm("Delete course?")) return;
    await axios.delete(`http://localhost:8080/api/admin/course/${id}`);
    fetchCourses();
  };

  // =============================
  // UPDATE COURSE
  // =============================
  const updateCourse = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/course/${editCourse.id}`,
        editCourse
      );
      alert("Course updated");
      setEditCourse(null);
      fetchCourses();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // =============================
  // ADD COURSE
  // =============================
  const addCourse = async () => {
    if (!newCourse.image) {
      alert("Select an image!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", newCourse.title);
      formData.append("description", newCourse.description);
      formData.append("price", newCourse.price);
      formData.append("image", newCourse.image);

      await axios.post("http://localhost:8080/api/admin/course", formData);

      alert("Course added");
      setNewCourse({ title: "", description: "", price: "", image: null });
      fetchCourses();
    } catch (err) {
      console.error("Add course error:", err);
    }
  };

  // =============================
  // DELETE PURCHASE
  // =============================
  const deletePurchase = async (id) => {
    if (!window.confirm("Delete this purchase?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/admin/purchase/${id}`);
      alert("Purchase deleted");
      fetchPurchases();
    } catch (err) {
      console.error("Delete purchase error:", err);
    }
  };

  // =============================
  // UPDATE PURCHASE
  // =============================
  const updatePurchase = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/purchase/${editPurchase.id}`,
        editPurchase
      );
      alert("Purchase updated");
      setEditPurchase(null);
      fetchPurchases();
    } catch (err) {
      console.error("Update purchase error:", err);
      alert("Update failed");
    }
  };

  return (
    <div className="container py-4">
      <h2>Admin Dashboard</h2>

      <div className="row">
        {/* USERS */}
        <div className="col-md-6">
          <div className="card p-3 mb-3">
            <h5>Users</h5>

            <table className="table">
              <thead>
                <tr>
                  <th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u, index) => (
                  <tr key={u.id}>
                    <td>{index + 1}</td>
                    <td>{u.fullName}</td>
                    <td>{u.email}</td>
                    <td>{u.phoneNumber}</td>
                    <td>{u.role}</td>

                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => setEditUser({ ...u })}
                      >
                        Update
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteUser(u.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>

        {/* COURSES */}
        <div className="col-md-6">
          <div className="card p-3 mb-3">
            <h5>Courses</h5>

            <ul className="list-unstyled">
              {courses.map((c, index) => (
                <li key={c.id} className="mb-3 d-flex align-items-center">

                  <span className="serial-circle">{index + 1}</span>

                  <img src={c.imageUrl} className="course-img" alt="" />

                  <b className="ms-2">{c.title}</b> — ₹{c.price}

                  <button
                    className="btn btn-warning btn-sm ms-2"
                    onClick={() => setEditCourse({ ...c })}
                  >
                    Update
                  </button>

                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => removeCourse(c.id)}
                  >
                    Delete
                  </button>

                </li>
              ))}
            </ul>

            {/* ADD COURSE */}
            <h6 className="mt-3">Add Course</h6>

            <input
              className="form-control mb-2"
              placeholder="Title"
              value={newCourse.title}
              onChange={(e) =>
                setNewCourse({ ...newCourse, title: e.target.value })
              }
            />

            <textarea
              className="form-control mb-2"
              placeholder="Description"
              value={newCourse.description}
              onChange={(e) =>
                setNewCourse({ ...newCourse, description: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              placeholder="Price"
              value={newCourse.price}
              onChange={(e) =>
                setNewCourse({ ...newCourse, price: e.target.value })
              }
            />

            <input
              type="file"
              className="form-control mb-2"
              onChange={(e) =>
                setNewCourse({ ...newCourse, image: e.target.files[0] })
              }
            />

            <button className="btn btn-primary" onClick={addCourse}>
              Add Course
            </button>

          </div>
        </div>
      </div>

      {/* PURCHASE LIST */}
      <div className="card p-3 mt-4">
        <h5>Purchased Courses</h5>

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Course</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {purchases.map((p, index) => (
              <tr key={p.id}>
                <td>{index + 1}</td>
                <td>{p.userName}</td>
                <td>{p.courseName}</td>
                <td>{p.amount}</td>
                <td>{new Date(p.purchaseDate).toLocaleString()}</td>
                <td>{p.paymentStatus}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => setEditPurchase({ ...p })}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deletePurchase(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* USER EDIT MODAL */}
      {editUser && (
        <div className="modalOverlay">
          <div className="modalBox">
            <h4>Edit User</h4>

            <input
              className="form-control mb-2"
              value={editUser.fullName}
              onChange={(e) =>
                setEditUser({ ...editUser, fullName: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              value={editUser.email}
              onChange={(e) =>
                setEditUser({ ...editUser, email: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              value={editUser.phoneNumber}
              onChange={(e) =>
                setEditUser({ ...editUser, phoneNumber: e.target.value })
              }
            />

            <select
              className="form-control mb-2"
              value={editUser.role}
              onChange={(e) =>
                setEditUser({ ...editUser, role: e.target.value })
              }
            >
              <option value="USER">USER</option>
            </select>

            <button className="btn btn-success me-2" onClick={updateUser}>
              Save
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setEditUser(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* COURSE EDIT MODAL */}
      {editCourse && (
        <div className="modalOverlay">
          <div className="modalBox">
            <h4>Edit Course</h4>

            <input
              className="form-control mb-2"
              value={editCourse.title}
              onChange={(e) =>
                setEditCourse({ ...editCourse, title: e.target.value })
              }
            />

            <textarea
              className="form-control mb-2"
              value={editCourse.description}
              onChange={(e) =>
                setEditCourse({ ...editCourse, description: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              value={editCourse.price}
              onChange={(e) =>
                setEditCourse({ ...editCourse, price: e.target.value })
              }
            />

            <button className="btn btn-success me-2" onClick={updateCourse}>
              Save
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setEditCourse(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* PURCHASE EDIT MODAL */}
      {editPurchase && (
        <div className="modalOverlay">
          <div className="modalBox">
            <h4>Edit Purchase</h4>

            <label>User</label>
            <input className="form-control mb-2" value={editPurchase.userName} disabled />

            <label>Course</label>
            <input
              className="form-control mb-2"
              value={editPurchase.courseName}
              onChange={(e) =>
                setEditPurchase({ ...editPurchase, courseName: e.target.value })
              }
            />

            <label>Amount</label>
            <input
              className="form-control mb-2"
              value={editPurchase.amount.replace("₹", "")}
              onChange={(e) =>
                setEditPurchase({
                  ...editPurchase,
                  amount: "₹" + e.target.value,
                })
              }
            />

            <label>Status</label>
            <select
              className="form-control mb-2"
              value={editPurchase.paymentStatus}
              onChange={(e) =>
                setEditPurchase({
                  ...editPurchase,
                  paymentStatus: e.target.value,
                })
              }
            >
              <option value="SUCCESS">SUCCESS</option>
              <option value="FAILED">FAILED</option>
              <option value="PENDING">PENDING</option>
            </select>

            <button className="btn btn-success me-2" onClick={updatePurchase}>
              Save
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setEditPurchase(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
