import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavigationBar: React.FC = () => {
    const { user, logout, isAuthenticated } = useContext(AuthContext) as any;
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold text-uppercase">
                    Research<span className="text-primary">Tracker</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home" active={location.pathname === '/home'}>Home</Nav.Link>
                        
                        {/* Only show these links if logged in */}
                        {isAuthenticated && (
                            <>
                                <Nav.Link as={Link} to="/dashboard" active={location.pathname === '/dashboard'}>Dashboard</Nav.Link>
                                <Nav.Link as={Link} to="/projects" active={location.pathname.includes('/projects')}>Projects</Nav.Link>
                                <Nav.Link as={Link} to="/milestones" active={location.pathname.includes('/milestones')}>Milestones</Nav.Link>
                                <Nav.Link as={Link} to="/documents" active={location.pathname.includes('/documents')}>Documents</Nav.Link>
                            </>
                        )}
                    </Nav>
                    
                    <Nav>
                        {isAuthenticated ? (
                            <div className="d-flex align-items-center gap-3">
                                {/* Show User Role Badge */}
                                {user?.role && <Badge bg="info">{user.role}</Badge>}
                                <span className="text-white">Hello, {user?.sub || "User"}</span>
                                <Button variant="outline-danger" size="sm" onClick={handleLogout}>Logout</Button>
                            </div>
                        ) : (
                            <div className="d-flex gap-2">
                                <Link to="/login">
                                    <Button variant="outline-light" size="sm">Login</Button>
                                </Link>
                                {/* This is the Register button you were missing */}
                                <Link to="/register">
                                    <Button variant="primary" size="sm">Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
