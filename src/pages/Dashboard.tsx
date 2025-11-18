import React, { useEffect, useState, useContext } from "react";
import { getAllProjects } from "../services/projectService";
import { AuthContext } from "../context/AuthContext";
import CreateProjectForm from "../components/CreateProjectForm";
import { useNavigate } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  summary?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  pi?: any;
  piId?: string;
}

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const decodeToken = (token: string): any => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };

  const loadProjects = () => {
    if (!token) return;
    const decoded = decodeToken(token);
    getAllProjects(token)
      .then((data: Project[]) => {
        if (decoded && decoded.role === "PI") {
          const sub = decoded.sub || decoded.userId || decoded.username;
          const filtered = data.filter((p: Project) => {
            // flexible comparisons to account for different shapes returned by backend
            if (!p) return false;
            const piId = (p as any).piId || (p as any).pi?.id || (p as any).pi;
            const piUsername = p.pi?.username;
            return piId === sub || piUsername === sub || sub === (p as any).pi;
          });
          setProjects(filtered);
        } else {
          setProjects(data);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load projects");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>

      {/* Only admins can create projects */}
      {role === "ADMIN" && <CreateProjectForm onProjectCreated={loadProjects} />}

      <div className="row">
        {projects.map((p) => (
          <div key={p.id} className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                <h5>{p.title}</h5>
                <p>{p.summary || p.description}</p>
                <div className="text-muted small">{p.startDate} → {p.endDate}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
