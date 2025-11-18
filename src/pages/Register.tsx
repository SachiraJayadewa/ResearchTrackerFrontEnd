import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
// Note: We import 'api' from your axios configuration to handle the connection
import api from '../api/axiosConfig'; 

const Register: React.FC = () => {
    const navigate = useNavigate();
    
    // State for the form data
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Update state when user types
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle Form Submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Connection: POST /api/auth/signup
            // We send 'formData' which matches your 'User' entity structure
            await api.post('/auth/signup', formData);
            
            // On success
            alert("Registration Successful! You can now login.");
            navigate('/login');
            
        } catch (err: any) {
            console.error(err);
            // If backend returns a string message (like "Username taken"), show it
            if (err.response && err.response.data) {
                setError(typeof err.response.data === 'string' 
                    ? err.response.data 
                    : "Registration failed. Try a different username.");
            } else {
                setError("Server not responding. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
            <Card style={{ width: '400px' }} className="shadow">
                <Card.Body>
                    <h2 className="text-center mb-4">Create Account</h2>
                    
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="fullName" 
                                placeholder="John Doe"
                                required 
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="username" 
                                placeholder="johndoe123"
                                required 
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="password" 
                                placeholder="******"
                                required 
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button className="w-100" type="submit" disabled={loading}>
                            {loading ? 'Registering...' : 'Sign Up'}
                        </Button>
                    </Form>

                    <div className="w-100 text-center mt-3">
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Register;