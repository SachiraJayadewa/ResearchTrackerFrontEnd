import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Badge, Button, Form, Spinner, Row, Col, Alert } from 'react-bootstrap';
import { projectService } from '../services/projectService';
import { AuthContext } from '../context/AuthContext';
import { Project, ProjectStatus } from '../types';

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      loadProject(id);
    }
  }, [id]);

  const loadProject = async (projectId: string) => {
    try {
      const data = await projectService.getProjectById(projectId);
      setProject(data);
    } catch (err) {
      setError("Failed to load project. It may not exist.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!project || !id) return;
    setUpdating(true);
    try {
      await projectService.updateStatus(id, newStatus);
      setProject({ ...project, status: newStatus as ProjectStatus });
      alert(`Status updated to ${newStatus}`);
    } catch (err) {
      alert("Failed to update status. Ensure you are an Admin or the PI.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Container className="mt-5 text-center"><Spinner animation="border" /></Container>;
  if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert><Button onClick={() => navigate('/projects')}>Back</Button></Container>;
  if (!project) return <Container className="mt-5"><h3>Project not found</h3></Container>;

  return (
    <Container className="mt-5">
      <Button variant="outline-secondary" className="mb-4" onClick={() => navigate('/projects')}>
        ← Back to Projects
      </Button>

      {/* Main Project Info Card */}
      <Card className="shadow-sm mb-4">
        <Card.Header as="h4" className="d-flex justify-content-between align-items-center bg-light">
          {project.title}
          <Badge bg="info">{project.status}</Badge>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={8}>
              <h5 className="text-primary">Summary</h5>
              <p className="text-muted" style={{ whiteSpace: 'pre-line' }}>{project.summary}</p>
              
              <Row className="mb-3 mt-4">
                <Col><strong>Start Date:</strong> {project.startDate}</Col>
                <Col><strong>End Date:</strong> {project.endDate}</Col>
              </Row>

              <div className="mt-3">
                <strong>Tags: </strong> 
                {project.tags ? project.tags.split(',').map((tag, i) => (
                    <Badge bg="secondary" className="me-1" key={i}>{tag.trim()}</Badge>
                )) : <span className="text-muted">No tags</span>}
              </div>
            </Col>
            
            {/* Sidebar Actions */}
            <Col md={4} className="border-start">
               <div className="mb-4">
                 <h6 className="text-secondary">Principal Investigator</h6>
                 <p className="fw-bold">{project.pi?.username || "Unassigned"}</p>
               </div>

               {/* Status Updater - Protected */}
               {(role === 'ADMIN' || role === 'PI') && (
                 <div className="p-3 bg-light rounded border">
                   <Form.Label className="fw-bold text-dark">Update Status</Form.Label>
                   <Form.Select 
                     value={project.status} 
                     disabled={updating}
                     onChange={(e) => handleStatusChange(e.target.value)}
                     className="mb-2"
                   >
                     {Object.values(ProjectStatus).map(s => (
                       <option key={s} value={s}>{s}</option>
                     ))}
                   </Form.Select>
                   {updating && <small className="text-primary">Saving...</small>}
                 </div>
               )}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Quick Action Cards */}
      <Row className="g-4">
        <Col md={6}>
          <Card className="h-100 border-primary">
            <Card.Body className="text-center">
                <h3 className="mb-3">📌</h3>
                <Card.Title>Milestones</Card.Title>
                <Card.Text>Track specific deadlines for this project.</Card.Text>
                <Button variant="outline-primary" onClick={() => navigate('/milestones')}>View Milestones</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 border-success">
            <Card.Body className="text-center">
                <h3 className="mb-3">📄</h3>
                <Card.Title>Documents</Card.Title>
                <Card.Text>Access files uploaded to this project.</Card.Text>
                <Button variant="outline-success" onClick={() => navigate('/documents')}>View Documents</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectDetails;