import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card, Badge } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div style={{ backgroundColor: "#1a1d20", minHeight: "100vh", color: "white" }}>
      
      {/* --- HERO SECTION --- */}
      <div className="text-center p-5" style={{ background: "linear-gradient(180deg, #212529 0%, #1a1d20 100%)" }}>
        <Container style={{ maxWidth: "800px", padding: "60px 20px" }}>
          <Badge bg="info" className="mb-3 px-3 py-2 rounded-pill">CMJD 111 Coursework</Badge>
          <h1 className="display-3 fw-bold mb-4">Research<span className="text-primary">Tracker</span></h1>
          <p className="lead text-secondary mb-5" style={{ fontSize: "1.25rem" }}>
            The all-in-one workspace for academic research. Manage your projects, 
            track milestones, and organize documents in a secure, role-based environment.
          </p>

          <div className="d-flex gap-3 justify-content-center">
            {isAuthenticated ? (
              <Button variant="success" size="lg" className="px-5 py-3 fw-bold" onClick={() => navigate("/dashboard")}>
                Go to Dashboard →
              </Button>
            ) : (
              <>
                <Button variant="primary" size="lg" className="px-5 py-3 fw-bold" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button variant="outline-light" size="lg" className="px-5 py-3 fw-bold" onClick={() => navigate("/register")}>
                  Create Account
                </Button>
              </>
            )}
          </div>
        </Container>
      </div>

      {/* --- FEATURES SECTION --- */}
      <Container className="py-5">
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 bg-dark text-light border-secondary shadow-sm p-3">
              <Card.Body>
                <div className="display-4 mb-3">📂</div>
                <Card.Title as="h3">Project Management</Card.Title>
                <Card.Text className="text-muted">
                  Create new research initiatives, assign tags, and manage status from Planning to Completion.
                  Strict role-based access ensures data security.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 bg-dark text-light border-secondary shadow-sm p-3">
              <Card.Body>
                <div className="display-4 mb-3">🚀</div>
                <Card.Title as="h3">Milestone Tracking</Card.Title>
                <Card.Text className="text-muted">
                  Never miss a deadline. Set clear milestones with due dates and mark them as completed 
                  to visualize your progress.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 bg-dark text-light border-secondary shadow-sm p-3">
              <Card.Body>
                <div className="display-4 mb-3">🔐</div>
                <Card.Title as="h3">Secure Documents</Card.Title>
                <Card.Text className="text-muted">
                  Link your Google Drive or OneDrive resources directly to specific projects. 
                  Keep your research papers and data organized.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* --- FOOTER --- */}
      <footer className="text-center py-4 border-top border-secondary mt-5">
        <small className="text-muted">
          © 2025 Research Institute Tracker | Designed for Assignment 2
        </small>
      </footer>
    </div>
  );
};

export default Home;
