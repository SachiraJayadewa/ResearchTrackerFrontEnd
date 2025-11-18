import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import Layout from "./components/Layout"; 

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails"; // 1. Import the new page
import Milestones from "./pages/Milestones";
import Documents from "./pages/Documents";
import CreateProjectForm from "./components/CreateProjectForm";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Wrap EVERYTHING in Layout so Navbar is always visible */}
          <Route element={<Layout />}>
            
            {/* --- PUBLIC ROUTES --- */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* --- PROTECTED ROUTES --- */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            
            {/* Project Routes */}
            <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
            {/* IMPORTANT: 'new' must be defined BEFORE ':id' */}
            <Route path="/projects/new" element={<ProtectedRoute><CreateProjectForm /></ProtectedRoute>} />
            {/* 2. Add the Details Route */}
            <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
            
            <Route path="/milestones" element={<ProtectedRoute><Milestones /></ProtectedRoute>} />
            <Route path="/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
