import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import axios from "axios";
import "../assets/Css/Auth.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "USER"   // hidden, fixed
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      });

      alert("Registered Successfully!");
      console.log("User Registered:", res.data);

    } catch (error) {
      console.error("Registration Error:", error);
      alert("Registration Failed!");
    }
  };

  return (
    <div className="auth-page">
      <Container className="d-flex justify-content-center">
        <Card className="auth-card">
          <h2 className="auth-title">Create Account</h2>

          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
              <Form.Label className="auth-label">Full Name</Form.Label>
              <Form.Control
                name="fullName"
                type="text"
                placeholder="Enter your name"
                className="auth-input"
                value={formData.fullName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="auth-label">Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                className="auth-input"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="auth-label">Phone Number</Form.Label>
              <Form.Control
                name="phoneNumber"
                type="text"
                placeholder="Enter phone number"
                className="auth-input"
                value={formData.phoneNumber}
                onChange={handleChange}
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
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="auth-label">Confirm Password</Form.Label>
              <Form.Control
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                className="auth-input"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>

            <Button className="auth-btn" type="submit">
              Sign Up
            </Button>
          </Form>

          <p className="auth-footer">
            Already have an account? <a href="/login">Login</a>
          </p>
        </Card>
      </Container>
    </div>
  );
};

export default Signup;
