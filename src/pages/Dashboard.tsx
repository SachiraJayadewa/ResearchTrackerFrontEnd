import React, { useEffect, useState } from "react";
import { getAllProjects } from "../services/projectService";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  piId?: string;
}

const CreateProjectForm: React.FC<{ onProjectCreated: () => void }> = ({ onProjectCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:8080/api/projects",
        { title, description, startDate, endDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Project created successfully!");
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      onProjectCreated();
    } catch (err: any) {
      console.error(err);
      setMessage("❌ You are not authorized to create a project.");
    }
  };

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h5>Create New Project</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <textarea
            className="form-control"
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="row">
          <div className="col">
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Create Project
        </button>
      </form>
      {message && <div className="mt-2">{message}</div>}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [role, setRole] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const navigate = useNavigate();

  const decodeToken = (token: string): any => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };

  const loadProjects = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);

      if (decoded) {
        setRole(decoded.role);
        setUserId(decoded.userId);
      }

      getAllProjects(token)
        .then((data) => {
          if (decoded.role === "PI") {
            setProjects(data.filter((p: Project) => p.piId === decoded.userId));
          } else {
            setProjects(data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load projects");
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {role === "ADMIN" && (
        <CreateProjectForm onProjectCreated={loadProjects} />
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.description}</td>
              <td>{p.startDate}</td>
              <td>{p.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
