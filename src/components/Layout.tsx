import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from './Navbar'; 
import { Container } from 'react-bootstrap';

const Layout: React.FC = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }} className="bg-light">
            {/* Top Navigation */}
            <NavigationBar />

            {/* Main Content Area */}
            <Container className="flex-grow-1">
                <Outlet />
            </Container>

            {/* Optional Footer */}
            <footer className="bg-dark text-white text-center py-3 mt-auto">
                <small>&copy; 2025 Research Institute Tracker. All rights reserved.</small>
            </footer>
        </div>
    );
};

export default Layout;
