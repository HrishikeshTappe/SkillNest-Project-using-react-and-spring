import { Container, Row, Col, Card } from "react-bootstrap";

const AboutUs = () => {
  return (
    <div className="py-5">
      <Container>
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-4">About SkillNest</h2>
            <p className="lead text-center">
              Empowering learners with cutting-edge technology skills for the digital future.
            </p>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={6}>
            <h3>Our Mission</h3>
            <p>
              To provide high-quality, accessible technology education that bridges the gap 
              between academic learning and industry requirements. We believe in practical, 
              hands-on learning that prepares students for real-world challenges.
            </p>
          </Col>
          <Col md={6}>
            <h3>Our Vision</h3>
            <p>
              To become the leading platform for technology education, creating a community 
              of skilled professionals who drive innovation and digital transformation across industries.
            </p>
          </Col>
        </Row>

        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <h5>Expert Instructors</h5>
                <p>Learn from industry professionals with years of experience</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <h5>Practical Learning</h5>
                <p>Hands-on projects and real-world applications</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <h5>Career Support</h5>
                <p>Job placement assistance and career guidance</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <h3 className="text-center mb-4">Meet Our Team</h3>
          </Col>
        </Row>

        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Img 
                variant="top" 
                src="https://via.placeholder.com/200x200?text=Rahul+Sharma" 
                style={{width: "200px", height: "200px", objectFit: "cover", margin: "20px auto"}} 
              />
              <Card.Body>
                <h5>Rahul Sharma</h5>
                <p className="text-muted">Full Stack Developer & Lead Instructor</p>
                <p>Expert in Java, React, and Spring Boot with 8+ years experience</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Img 
                variant="top" 
                src="https://via.placeholder.com/200x200?text=Priya+Patel" 
                style={{width: "200px", height: "200px", objectFit: "cover", margin: "20px auto"}} 
              />
              <Card.Body>
                <h5>Priya Patel</h5>
                <p className="text-muted">Data Science & AI Specialist</p>
                <p>Python expert specializing in Machine Learning and Data Analytics</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Img 
                variant="top" 
                src="https://via.placeholder.com/200x200?text=Amit+Kumar" 
                style={{width: "200px", height: "200px", objectFit: "cover", margin: "20px auto"}} 
              />
              <Card.Body>
                <h5>Amit Kumar</h5>
                <p className="text-muted">DevOps & Cloud Architect</p>
                <p>AWS certified professional with expertise in Docker and Kubernetes</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;