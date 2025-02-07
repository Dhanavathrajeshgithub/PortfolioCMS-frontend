import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProjects = async () => {
      if (token) {
        // Prevent API call if token is null
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/projects`,
          {
            headers: { Authorization: token },
          }
        );
        setProjects(res.data);
      }
    };
    fetchProjects();
  }, [token]); // Add token to dependencies

  const [newProject, setNewProject] = useState({ title: "", description: "" });

  const addProject = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/projects", newProject, {
      headers: { Authorization: token },
    });
    window.location.reload(); // Refresh after adding project
  };
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={() => localStorage.removeItem("token")}>Logout</button>

      <h3>Projects</h3>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>{project.title}</li>
        ))}
      </ul>
      <h3>Add Project</h3>
      <form onSubmit={addProject}>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) =>
            setNewProject({ ...newProject, title: e.target.value })
          }
        />
        <textarea
          placeholder="Description"
          onChange={(e) =>
            setNewProject({ ...newProject, description: e.target.value })
          }
        ></textarea>
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default Dashboard;
