import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import '../assets/Css/Navbar.css';
import logo from "../assets/Images/skillnest-logo.png";

const Navigation = () => {

  const navigate = useNavigate();

  const raw = localStorage.getItem("user");
  const user = raw ? JSON.parse(raw) : null;

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Extract role properly (because login stores user in different formats)
  const role = user?.role || user?.data?.role;

  return (
    <Navbar expand="lg" className="custom-navbar" variant="dark">

      <Navbar.Brand as={Link} to="/" className="brand-logo d-flex align-items-center">
        <img src={logo} alt="SkillNest Logo" className="nav-logo" />
        <span className="ms-2">SkillNest</span>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto align-items-center">

          <Nav.Link as={Link} to="/" className="nav-item">Home</Nav.Link>
          <Nav.Link as={Link} to="/about-us" className="nav-item">About Us</Nav.Link>
          <Nav.Link as={Link} to="/courses" className="nav-item">Courses</Nav.Link>
          <Nav.Link as={Link} to="/contact" className="nav-item">Contact Us</Nav.Link>
          <Nav.Link as={Link} to="/blogs" className="nav-item">Blogs</Nav.Link>

          {/* ================================
                LOGGED-IN USER NAV OPTIONS
             ================================ */}
          {user ? (
            <>
              {/* Show My Courses ONLY for normal USER */}
              {role === "USER" && (
                <Nav.Link as={Link} to="/my-courses" className="nav-item ms-3">
                  My Courses
                </Nav.Link>
              )}

              {/* Admin Dashboard for ADMIN */}
              {role === "ADMIN" && (
                <Nav.Link as={Link} to="/admin-dashboard" className="nav-item ms-3">
                  Admin Dashboard
                </Nav.Link>
              )}

              {/* USER DASHBOARD */}
              {role === "USER" && (
                <Nav.Link as={Link} to="/user-dashboard" className="nav-item ms-3">
                  Profile
                </Nav.Link>
              )}

              <Button onClick={logout} className="nav-btn-login ms-3">
                Logout
              </Button>
            </>
          ) : (
            <Button as={Link} to="/login" className="nav-btn-login ms-3">
              Sign In
            </Button>
          )}

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
