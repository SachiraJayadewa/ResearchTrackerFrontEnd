import React, { useEffect, useState, useContext } from 'react';
import { Container, Table, Button, Form, Modal, Alert, Badge, Row, Col } from 'react-bootstrap';
import { milestoneService } from '../services/milestoneService';
import { projectService } from '../services/projectService'; // Needed for the dropdown
import { AuthContext } from '../context/AuthContext';
import { Milestone, Project } from '../types';

const Milestones: React.FC = () => {
  const { role, token } = useContext(AuthContext);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    projectId: ''
  });

  // 1. Fetch Data
  const fetchData = async () => {
    try {
      const data = await milestoneService.getAllMilestones();
      setMilestones(data);
    } catch (err) {
      setError('Failed to load milestones.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Load Projects when opening the Modal (so user can pick which project the milestone belongs to)
  const handleOpenModal = async () => {
    setShowModal(true);
    if (projects.length === 0) {
        try {
            const projs = await projectService.getAllProjects();
            setProjects(projs);
        } catch (e) {
            console.error("Failed to load projects list");
        }
    }
  };

  // 3. Submit New Milestone
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.projectId) {
        alert("Please select a project.");
        return;
    }

    try {
        // Decode User ID from token (same logic as Documents page)
        const payload = JSON.parse(atob(token!.split('.')[1])); 
        const userId = payload.id || payload.sub;

        await milestoneService.createMilestone(
            { 
                title: formData.title, 
                description: formData.description, 
                dueDate: formData.dueDate 
            }, 
            formData.projectId, 
            userId
        );

        alert("Milestone created!");
        setShowModal(false);
        setFormData({ title: '', description: '', dueDate: '', projectId: '' });
        fetchData(); // Refresh table
    } catch (err) {
        alert("Failed to create milestone. Check permissions.");
    }
  };

  // 4. Mark as Complete
  const handleComplete = async (id: string) => {
    try {
        await milestoneService.markAsCompleted(id);
        // Update UI locally to feel faster
        setMilestones(milestones.map(m => 
            m.id === id ? { ...m, isCompleted: true } : m
        ));
    } catch (err) {
        alert("Failed to update status.");
    }
  };

  // 5. Delete (Admin Only)
  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this milestone?")) return;
    try {
        await milestoneService.deleteMilestone(id);
        setMilestones(milestones.filter(m => m.id !== id));
    } catch (err) {
        alert("Delete failed. Admin access required.");
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Project Milestones</h2>
        {(role === 'ADMIN' || role === 'PI') && (
            <Button variant="primary" onClick={handleOpenModal}>+ New Milestone</Button>
        )}
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive className="align-middle">
        <thead>
          <tr>
            <th>Status</th>
            <th>Title</th>
            <th>Project</th>
            <th>Due Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {milestones.map((m) => (
            <tr key={m.id}>
              <td style={{ width: '100px', textAlign: 'center' }}>
                {m.isCompleted ? (
                    <Badge bg="success">Completed</Badge>
                ) : (
                    <Badge bg="warning" text="dark">Pending</Badge>
                )}
              </td>
              <td className="fw-bold">{m.title}</td>
              <td>{m.project?.title}</td>
              <td>{m.dueDate}</td>
              <td><small className="text-muted">{m.description}</small></td>
              <td>
                <div className="d-flex gap-2">
                    {/* Show Complete button if not completed AND user is Admin/PI */}
                    {!m.isCompleted && (role === 'ADMIN' || role === 'PI') && (
                        <Button variant="outline-success" size="sm" onClick={() => handleComplete(m.id)}>
                            ✓ Done
                        </Button>
                    )}
                    {role === 'ADMIN' && (
                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(m.id)}>
                            Delete
                        </Button>
                    )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {!loading && milestones.length === 0 && <p className="text-center text-muted">No milestones found.</p>}

      {/* Create Milestone Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Create Milestone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Select Project</Form.Label>
                    <Form.Select 
                        value={formData.projectId} 
                        onChange={(e) => setFormData({...formData, projectId: e.target.value})} 
                        required
                    >
                        <option value="">-- Select Project --</option>
                        {projects.map(p => (
                            <option key={p.id} value={p.id}>{p.title}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Milestone Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        required
                        value={formData.title} 
                        onChange={(e) => setFormData({...formData, title: e.target.value})} 
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={2} 
                        value={formData.description} 
                        onChange={(e) => setFormData({...formData, description: e.target.value})} 
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control 
                        type="date" 
                        required
                        value={formData.dueDate} 
                        onChange={(e) => setFormData({...formData, dueDate: e.target.value})} 
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">Save Milestone</Button>
            </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Milestones;