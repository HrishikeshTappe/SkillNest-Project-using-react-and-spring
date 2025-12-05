import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import "../assets/Css/Blogs.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    id : "",
    title: "",
    content: ""
  });

  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;

  // ====================================================
  // Load Blogs
  // ====================================================
  const loadBlogs = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/blogs");
      setBlogs(response.data.data || []);
    } catch (error) {
      console.error("Error loading blogs:", error);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      loadBlogs();
    }, 0);
  }, [loadBlogs]);

  // ====================================================
  // Handle Submit (Add Blog)
  // ====================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/blogs", {
      // Use correct field for backend
        id : user.id,
        title: formData.title,
        content: formData.content,
      });

      alert("Blog added successfully!");

      setShowAddModal(false);      // Close modal after submit
      setFormData({ title: "", content: "" }); // Reset form
      loadBlogs();                // Reload blogs

    } catch (error) {
      alert("Failed to add blog!");
    }
  };

  return (
    <div className="blogs-section">
      <Container>
        <h2 className="text-center blog-title">
          Latest <span className="highlight">Blogs</span>
        </h2>

        {/* ADD BLOG BUTTON */}
        {user && (
          <Button 
            variant="success" 
            onClick={() => setShowAddModal(true)}
            style={{ marginBottom: "20px" }}
          >
            Add Blogs
          </Button>
        )}

        <Row className="mt-4">
          {blogs.map((blog) => (
            <Col key={blog.id} lg={3} md={6} sm={12} className="mb-4">
              <Card className="blog-card">
                <Card.Body>
                  <Card.Title className="blog-name">{blog.title}</Card.Title>

                  <Button
                    variant="info"
                    className="blog-btn"
                    onClick={() => setSelectedBlog(blog)}
                  >
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {blogs.length === 0 && (
            <p className="text-center text-muted mt-4">
              No blogs added yet.
            </p>
          )}
        </Row>

        {/* ===========================
            VIEW BLOG MODAL
           =========================== */}
        {selectedBlog && (
          <Modal show onHide={() => setSelectedBlog(null)}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedBlog.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>{selectedBlog.content}</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setSelectedBlog(null)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        {/* ===========================
            ADD BLOG MODAL
           =========================== */}
        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Blog</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              {/* Title */}
              <Form.Group className="mb-3">
                <Form.Label>Blog Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter blog title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </Form.Group>

              {/* Content */}
              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter blog content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Button variant="success" type="submit" style={{ width: "100%" }}>
                Submit Blog
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default Blogs;
