import React, { useState } from "react";
import axios from "axios";

interface Props {
  onProjectCreated: () => void;
}

const CreateProjectForm: React.FC<Props> = ({ onProjectCreated }) => {
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
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("✅ Project created successfully!");
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      onProjectCreated();
    } catch (err: any) {
      console.error(err);
      setMessage("❌ Failed to create project.");
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
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <textarea
            className="form-control"
            placeholder="Description"
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
        <button className="btn btn-primary mt-3">Create</button>
      </form>
      {message && <div className="mt-2">{message}</div>}
    </div>
  );
};

export default CreateProjectForm;
