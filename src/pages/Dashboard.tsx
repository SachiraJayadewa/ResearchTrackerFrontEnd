import React, { useEffect, useState } from "react";
import { getAllProjects } from "../services/projectService";
import axios from "axios";

interface Project {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getAllProjects(token)
        .then((data) => {
          setProjects(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load projects");
          setLoading(false);
        });
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Projects</h2>
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
