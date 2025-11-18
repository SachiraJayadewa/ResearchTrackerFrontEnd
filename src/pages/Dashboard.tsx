import React, { useEffect, useState, useContext } from "react";
// FIX 1: Import the service object, not the function directly
import { projectService } from "../services/projectService"; 
import { AuthContext } from "../context/AuthContext";
// import CreateProjectForm from "../components/CreateProjectForm"; // Keep this commented until we create it
import { useNavigate } from "react-router-dom";
import { Project } from "../types"; // Import the Type to fix "any" errors

const Dashboard: React.FC = () => {
  const { role, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // FIX 2: Use projectService.getAllProjects()
    projectService.getAllProjects()
      .then((data) => {
        setProjects(data);
      })
      .catch((err: any) => { // FIX 3: Added ': any' to handle the error type
        console.error(err);
        setError("Failed to load projects");
      });
  }, []);

  return (
    <div className="container mt-4">
      <h1>Dashboard</h1>
      <button className="btn btn-danger mb-3" onClick={logout}>Logout</button>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="row">
        {projects.map((project) => (
          <div key={project.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <p className="card-text">{project.summary}</p>
                <span className="badge bg-primary">{project.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
