import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Milestones from "./pages/Milestones";
import Documents from "./pages/Documents";
// 1. Import the CreateProjectForm component
import CreateProjectForm from "./components/CreateProjectForm";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* 2. Add the Create Project Route here */}
            {/* Note: Placing it before or near 'projects' is good practice */}
            <Route path="projects/new" element={<CreateProjectForm />} />
            <Route path="projects" element={<Projects />} />
            
            <Route path="milestones" element={<Milestones />} />
            <Route path="documents" element={<Documents />} />
          </Route>

          {/* Redirect unknown */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
