import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Badge, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../assets/Css/Home.css";
import introVideo from "../assets/Images/video1.mp4";

const Home = () => {
  const navigate = useNavigate();

  // State for Modal
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Course List
  const courses = [
    {
      title: "React Masterclass",
      level: "Intermediate",
      icon: "bi bi-journal-code",
      desc: "Master React, Hooks, Context API, Redux Toolkit and build real-world projects."
    },
    {
      title: "Python for Data Science",
      level: "Beginner",
      icon: "bi bi-graph-up",
      desc: "Learn Python, NumPy, Pandas, Matplotlib and start your data science journey."
    },
    {
      title: "Full Stack DevOps",
      level: "Advanced",
      icon: "bi bi-cloud-check",
      desc: "Hands-on DevOps with Docker, Kubernetes, Jenkins, AWS, CI/CD pipelines and automation."
    },
    {
      title: "AI & Machine Learning",
      level: "Advanced",
      icon: "bi bi-robot",
      desc: "Machine Learning, Deep Learning, Neural Networks, TensorFlow & practical AI projects."
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Rohit Sharma",
      role: "Frontend Developer",
      text: "React Masterclass helped me get a job!",
      rating: 5,
    },
    {
      name: "Priya Singh",
      role: "Data Analyst",
      text: "Perfect course to learn Python & Data Science.",
      rating: 4.8,
    },
  ];

  return (
    <div className="home-page">

      {/* -------------------- HERO SECTION -------------------- */}
      <section className="home-pagebanner">
        <div className="hero-content text-center text-white">
          <h1 className="home-title">
            Level Up Your <span className="highlight-text">Skills</span>
          </h1>
          <p className="home-subtitle">
            Learn the latest tech skills with SkillNest
          </p>
          <Button
            variant="primary"
            size="lg"
            className="home-btn"
            onClick={() => navigate("/courses")}
          >
            Explore Courses
          </Button>
        </div>
      </section>

      {/* -------------------- COURSE SECTION -------------------- */}
      <Container className="course-section py-5">
        <h2 className="section-heading text-center mb-5">Trending Skills</h2>

        <Row>
          {courses.map((c, index) => (
            <Col md={3} key={index} className="mb-4">
              <Card className="course-card shadow-lg h-100 border-0 rounded-4">
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between mb-3">
                    <Badge bg="info">{c.level}</Badge>
                    <i className={`${c.icon} course-icon`} />
                  </div>

                  <Card.Title className="course-title">{c.title}</Card.Title>
                  <Card.Text className="course-desc text-muted flex-grow-1">
                    {c.desc.substring(0, 50)}...
                  </Card.Text>

                  <Button
                    className="btn-white mt-3"
                    onClick={() => setSelectedCourse(c)}
                  >
                    Description about course
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* -------------------- VIDEO SECTION -------------------- */}
      <Container className="video-section py-5">
        <h2 className="section-heading text-center mb-4">Online learning helps you</h2>

        <Row className="justify-content-center">
          <Col md={8}>
            <div
              className="video-wrapper shadow-lg rounded-4 overflow-hidden"
              onMouseEnter={() => document.getElementById("previewVideo").play()}
              onMouseLeave={() => document.getElementById("previewVideo").pause()}
            >
              <video
                id="previewVideo"
                muted
                width="100%"
                height="auto"
                className="rounded-4"
              >
                <source src={introVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </Col>
        </Row>
      </Container>

      {/* -------------------- TESTIMONIAL SECTION -------------------- */}
      <section className="testimonial-section py-5">
        <Container>
          <h2 className="section-heading text-center mb-5">What Students Say</h2>

          <Row className="justify-content-center">
            {testimonials.map((t, index) => (
              <Col md={5} key={index} className="mb-4">
                <Card className="testimonial-card shadow-sm border-0 p-3 rounded-3">
                  <p className="testimonial-text fst-italic">"{t.text}"</p>

                  <div className="d-flex justify-content-between mt-3">
                    <div>
                      <h6 className="testimonial-name fw-bold mb-0">{t.name}</h6>
                      <small className="text-muted">{t.role}</small>
                    </div>

                    <div className="testimonial-rating text-warning fw-bold">
                      <i className="bi bi-star-fill"></i> {t.rating}
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* -------------------- CTA SECTION -------------------- */}
      <section className="cta-section text-center text-white py-5">
        <Container>
          <h2 className="cta-title fw-bold mb-3">Ready to Start Your Journey?</h2>
          <p className="cta-description mb-4">
            Join thousands of learners and grow your skills today.
          </p>
          <Button variant="light" size="lg">View Courses</Button>
        </Container>
      </section>

      {/* -------------------- COURSE DESCRIPTION MODAL -------------------- */}
      <Modal
        show={selectedCourse !== null}
        onHide={() => setSelectedCourse(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedCourse?.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{selectedCourse?.desc}</p>
          <Badge bg="info">{selectedCourse?.level}</Badge>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedCourse(null)}>
            Close
          </Button>

          <Button variant="primary" onClick={() => navigate("/courses")}>
            Visit Course Page
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default Home;
