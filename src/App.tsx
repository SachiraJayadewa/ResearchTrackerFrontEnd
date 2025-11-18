import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"; // 1. Import Register
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Milestones from "./pages/Milestones";
import Documents from "./pages/Documents";
import CreateProjectForm from "./components/CreateProjectForm";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* --- Public Routes (Accessible without login) --- */}
          <Route path="/login" element={<Login />} />
          {/* 2. Add the Register Route here */}
          <Route path="/register" element={<Register />} />

          {/* --- Protected Routes (Requires Login) --- */}
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
            
            <Route path="projects/new" element={<CreateProjectForm />} />
            <Route path="projects" element={<Projects />} />
            
            <Route path="milestones" element={<Milestones />} />
            <Route path="documents" element={<Documents />} />
          </Route>

          {/* Redirect unknown routes to Home (which will redirect to Login if not auth) */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
