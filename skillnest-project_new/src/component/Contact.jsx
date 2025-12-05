import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/contact/send", formData);
      setAlertMessage("Message sent successfully! We'll get back to you soon.");
      setShowAlert(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setAlertMessage("Failed to send message. Please try again.");
      setShowAlert(true);
    }
  };

  return (
    <div className="py-5">
      <Container>
        <Row>
          <Col lg={8} className="mx-auto">
            <h2 className="text-center mb-4">Contact Us</h2>
            
            {showAlert && (
              <Alert variant="info" onClose={() => setShowAlert(false)} dismissible>
                {alertMessage}
              </Alert>
            )}

            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  
                  <Button type="submit" variant="primary" size="lg" className="w-100">
                    Send Message
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={4} className="text-center">
            <h5>Address</h5>
            <p>123 Tech Street<br />Mumbai, Maharashtra 400001</p>
          </Col>
          <Col md={4} className="text-center">
            <h5>Phone</h5>
            <p>+91 98765 43210</p>
          </Col>
          <Col md={4} className="text-center">
            <h5>Email</h5>
            <p>info@skillnest.com</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;