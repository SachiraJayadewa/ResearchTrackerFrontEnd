import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

interface Project {
  id: string;
  title: string;
  summary: string;
  status: string;
  startDate: string;
  endDate: string;
}

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchProjects();
    }
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects", {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

      setProjects(res.data);
    } catch (err) {
      setError("Failed to load projects");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Projects Dashboard</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.status}</td>
                <td>{p.startDate}</td>
                <td>{p.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
