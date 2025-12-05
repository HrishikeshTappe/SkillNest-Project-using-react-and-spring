import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import axios from "axios";
import "../assets/Css/Auth.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // ================================
  // State
  // ================================
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ================================
  // Handle Input Change
  // ================================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================================
  // Handle Login Submit
  // ================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      if (res.data && res.data.data) {
        const user = res.data.data;
        localStorage.setItem("user", JSON.stringify(user));

        // redirect based on role
        if (user.role && user.role.toUpperCase() === "ADMIN") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Invalid Email or Password!");
    }
  };

  // ================================
  // JSX
  // ================================
  return (
    <div className="auth-page">
      <Container className="d-flex justify-content-center">
        <Card className="auth-card">
          <h2 className="auth-title">Login</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="auth-label">Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                className="auth-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="auth-label">Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Enter password"
                className="auth-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button className="auth-btn" type="submit">
              Login
            </Button>
          </Form>

          <p className="auth-footer">
            Don’t have an account? <a href="/signup">Sign Up</a>
          </p>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
