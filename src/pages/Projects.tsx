import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Projects: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [projects, setProjects] = useState<any[]>([]);
  useEffect(() => {
    if (!token) return;
    axios.get("http://localhost:8080/api/projects", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, [token]);

  return (
    <div>
      <h2>Projects</h2>
      <table className="table">
        <thead><tr><th>Title</th><th>Summary</th><th>Status</th></tr></thead>
        <tbody>
          {projects.map(p => (
            <tr key={p.id}><td>{p.title}</td><td>{p.summary || p.description}</td><td>{p.status}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Projects;
