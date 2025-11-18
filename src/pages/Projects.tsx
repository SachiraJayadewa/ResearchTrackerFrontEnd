import React, { useEffect, useState, useContext } from 'react';
import { Container, Card, Badge, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../services/projectService';
import { AuthContext } from '../context/AuthContext';
import { Project, ProjectStatus } from '../types';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const { role } = useContext(AuthContext); // We use this to hide/show Admin buttons
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const data = await projectService.getAllProjects();
      setProjects(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load projects. You might not have permission.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await projectService.deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      alert("Failed to delete. Only Admins can delete projects.");
    }
  };

  const getStatusVariant = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.ACTIVE: return 'success';
      case ProjectStatus.PLANNING: return 'primary';
      case ProjectStatus.ON_HOLD: return 'warning';
      case ProjectStatus.COMPLETED: return 'info';
      default: return 'secondary';
    }
  };

  if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Research Projects</h2>
        {/* According to your backend, ONLY ADMIN can create projects */}
        {role === 'ADMIN' && (
          <Button variant="primary" onClick={() => navigate('/projects/new')}>
            + New Project
          </Button>
        )}
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row xs={1} md={2} lg={3} className="g-4">
        {projects.map((project) => (
          <Col key={project.id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <Badge bg={getStatusVariant(project.status)}>{project.status}</Badge>
                  {project.startDate && <small className="text-muted">{project.startDate}</small>}
                </div>
                <Card.Title>{project.title}</Card.Title>
                <Card.Text className="text-truncate" title={project.summary}>
                  {project.summary}
                </Card.Text>
                <div className="mt-3 d-flex gap-2">
                  <Button variant="outline-primary" size="sm" onClick={() => navigate(`/projects/${project.id}`)}>
                    Details
                  </Button>
                  {role === 'ADMIN' && (
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(project.id)}>
                      Delete
                    </Button>
                  )}
                </div>
              </Card.Body>
              <Card.Footer className="text-muted" style={{ fontSize: '0.8rem' }}>
                 PI: {project.pi?.username || "Unassigned"}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      
      {!loading && projects.length === 0 && <p className="text-center mt-4">No projects found.</p>}
    </Container>
  );
};

export default Projects;
