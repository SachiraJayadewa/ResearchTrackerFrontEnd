import React, { useState } from 'react';
import { Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { projectService } from '../services/projectService';
import { ProjectStatus } from '../types';
import { useNavigate } from 'react-router-dom';

const CreateProjectForm: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        status: ProjectStatus.PLANNING, // Default status
        tags: '',
        startDate: '',
        endDate: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // The backend expects "tags" as a string (e.g. "AI, Environment")
            await projectService.createProject(formData);
            alert("Project created successfully!");
            // Redirect back to the project list
            navigate('/projects');
        } catch (err) {
            console.error(err);
            setError("Failed to create project. Ensure you are an ADMIN and the backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">Create New Project</Card.Header>
            <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Project Title</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="title" 
                            required 
                            value={formData.title} 
                            onChange={handleChange} 
                            placeholder="Enter project title" 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Summary</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            name="summary" 
                            required 
                            value={formData.summary} 
                            onChange={handleChange} 
                            placeholder="Brief description of the project" 
                        />
                    </Form.Group>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    name="startDate" 
                                    required 
                                    value={formData.startDate} 
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>End Date</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    name="endDate" 
                                    required 
                                    value={formData.endDate} 
                                    onChange={handleChange} 
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Select name="status" value={formData.status} onChange={handleChange}>
                                    {Object.values(ProjectStatus).map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Tags</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="tags" 
                                    value={formData.tags} 
                                    onChange={handleChange} 
                                    placeholder="e.g. AI, Biology, Java" 
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <div className="d-grid gap-2">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? 'Creating...' : 'Create Project'}
                        </Button>
                        <Button variant="secondary" onClick={() => navigate('/projects')}>
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default CreateProjectForm;