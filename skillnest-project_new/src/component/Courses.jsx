import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/Css/Courses.css";

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // ====================================================
  // Load Courses (with images)
  // ====================================================
  const loadCourses = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/admin/courses");
      setCourses(response.data.data || []);
    } catch (error) {
      console.error("Error loading courses:", error);
    }
  }, []);

  // ====================================================
  // useEffect
  // ====================================================
  useEffect(() => {
    setTimeout(() => {
      loadCourses();
    }, 0);
  }, [loadCourses]);

  return (
    <div className="courses-section">
      <Container>
        <h2 className="text-center course-title">
          Popular <span className="highlight">Courses</span>
        </h2>

        <Row className="mt-4">
          {courses.map((course) => (
            <Col key={course.id} lg={3} md={6} sm={12} className="mb-4">
              <Card className="course-card">

                {/* Course Image */}
                <Card.Img
                  variant="top"
                  src={
                    course.imageUrl ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  className="course-img"
                />

                <Card.Body>
                  <Card.Title className="course-name">{course.title}</Card.Title>
                  <Card.Text className="course-desc">{course.description}</Card.Text>

                  <p className="course-price">
                    <strong>Price: ₹{course.price}</strong>
                  </p>

                  <Button
                    variant="info"
                    className="course-btn"
                    onClick={() => setSelectedCourse(course)}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {courses.length === 0 && (
            <p className="text-center text-muted mt-4">
              No courses added by admin yet.
            </p>
          )}
        </Row>

        {/* Course Modal */}
        {selectedCourse && (
          <Modal show onHide={() => setSelectedCourse(null)}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedCourse.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {/* Safe image loading */}
              <img
                src={
                  selectedCourse.imageUrl ||
                  "https://via.placeholder.com/500x300?text=No+Image"
                }
                alt="Course"
                className="modal-img"
              />

              <p className="mt-3">{selectedCourse.description}</p>

              <p>
                <strong>Price:</strong> ₹{selectedCourse.price}
              </p>

              <h5 className="mt-3">What You Will Learn:</h5>
              <ul>
                <li>Step-by-step training</li>
                <li>Live project practice</li>
                <li>Interview preparation</li>
                <li>Certificate on completion</li>
              </ul>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setSelectedCourse(null)}>
                Close
              </Button>

              <Button
                variant="success"
                onClick={() =>
                  navigate("/payment", { state: { course: selectedCourse } })
                }
              >
                Proceed to Payment
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </div>
  );
};

export default Courses;
