import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../assets/Css/Footer.css';

const Footer = () => {
  
  const raw = localStorage.getItem("user");
  const user = raw ? JSON.parse(raw) : null;
  const role = user?.role || user?.data?.role;

  return (
    <footer className="footer-section">
      <Container>
        <Row>
          
          <Col md={4} className="mb-3">
            <h5>&lt;SkillNest /&gt;</h5>
            <p className="small">Your learning companion</p>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-3">
            <h6>Quick Links</h6>
            <ul className="list-unstyled footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </Col>

          {/* User / Admin Links */}
          <Col md={4} className="mb-3">
            <h6>Account</h6>
            <ul className="list-unstyled footer-links">
              {!user && (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/signup">Register</Link></li>
                </>
              )}

              {user && role === "USER" && (
                <>
                  <li><Link to="/my-courses">My Courses</Link></li>
                  <li><Link to="/user-dashboard">Profile</Link></li>
                </>
              )}

              {user && role === "ADMIN" && (
                <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
              )}

              {user && (
                <li><Link to="/logout">Logout</Link></li>
              )}
            </ul>
          </Col>

        </Row>

        <hr className="footer-divider" />

        <div className="text-center small">
          © {new Date().getFullYear()} SkillNest. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
