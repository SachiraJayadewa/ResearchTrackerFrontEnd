import React, { useEffect, useState, useContext } from 'react';
import { Container, Table, Button, Form, Modal, Alert, Badge } from 'react-bootstrap';
import { documentService } from '../services/documentService';
import { projectService } from '../services/projectService'; 
import { AuthContext } from '../context/AuthContext';
import { Document, Project } from '../types';

const Documents: React.FC = () => {
  const { role, token } = useContext(AuthContext);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [projects, setProjects] = useState<Project[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [newDoc, setNewDoc] = useState({
    title: '',
    description: '',
    urlOrPath: '',
    projectId: ''
  });

  // 1. Fetch Documents on load
  const fetchData = async () => {
    try {
      const docs = await documentService.getAllDocuments();
      setDocuments(docs);
    } catch (err) {
      console.error(err);
      setError('Failed to load documents.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Fetch Projects only if user opens the "Upload" modal
  const handleOpenModal = async () => {
    setShowModal(true);
    if (projects.length === 0) {
        try {
            const projs = await projectService.getAllProjects();
            setProjects(projs);
        } catch (e) {
            console.error("Could not load projects for dropdown");
        }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 3. Handle Form Submit
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.projectId) {
        alert("Please select a project.");
        return;
    }

    try {
        
        const payload = JSON.parse(atob(token!.split('.')[1])); 
        const userId = payload.id || payload.sub; // Fallback depending on your JwtUtil

        await documentService.uploadDocument(
            { title: newDoc.title, description: newDoc.description, urlOrPath: newDoc.urlOrPath }, 
            newDoc.projectId, 
            userId
        );
        
        alert("Document added successfully!");
        setShowModal(false);
        fetchData(); // Refresh list
        setNewDoc({ title: '', description: '', urlOrPath: '', projectId: '' });
    } catch (err) {
        console.error(err);
        alert("Failed to upload. Ensure you are authorized.");
    }
  };

  // 4. Handle Delete
  const handleDelete = async (id: string) => {
    if(!window.confirm("Are you sure?")) return;
    try {
        await documentService.deleteDocument(id);
        setDocuments(documents.filter(d => d.id !== id));
    } catch (err) {
        alert("Delete failed. Only ADMINs can delete documents.");
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Project Documents</h2>
        {/* Only ADMIN and PI can upload according to your Controller */}
        {(role === 'ADMIN' || role === 'PI') && (
            <Button variant="success" onClick={handleOpenModal}>+ Add Document Link</Button>
        )}
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Project</th>
            <th>Description</th>
            <th>Link</th>
            <th>Uploaded By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.title}</td>
              <td><Badge bg="secondary">{doc.project?.title || 'Unknown'}</Badge></td>
              <td>{doc.description}</td>
              <td>
                <a href={doc.urlOrPath} target="_blank" rel="noreferrer">Open Link</a>
              </td>
              <td>{doc.uploadedBy?.username}</td>
              <td>
                {role === 'ADMIN' && (
                    <Button variant="danger" size="sm" onClick={() => handleDelete(doc.id)}>Delete</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {!loading && documents.length === 0 && <p className="text-center">No documents found.</p>}

      {/* Upload Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Add New Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleUpload}>
                <Form.Group className="mb-3">
                    <Form.Label>Select Project</Form.Label>
                    <Form.Select 
                        value={newDoc.projectId} 
                        onChange={(e) => setNewDoc({...newDoc, projectId: e.target.value})} 
                        required
                    >
                        <option value="">-- Select a Project --</option>
                        {projects.map(p => (
                            <option key={p.id} value={p.id}>{p.title}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Document Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        required 
                        value={newDoc.title}
                        onChange={(e) => setNewDoc({...newDoc, title: e.target.value})}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>File URL / Path</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="e.g. https://google.drive/..." 
                        required 
                        value={newDoc.urlOrPath}
                        onChange={(e) => setNewDoc({...newDoc, urlOrPath: e.target.value})}
                    />
                    <Form.Text className="text-muted">Enter the link to the file (Google Drive, OneDrive, etc)</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={2} 
                        value={newDoc.description}
                        onChange={(e) => setNewDoc({...newDoc, description: e.target.value})}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Save Document</Button>
            </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Documents;