import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API = "http://localhost:3000";

const authHeader = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const login = async () => {
    const res = await axios.post(`${API}/login`, form);
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="p-4">
      <h2>Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} />
      <br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <br />
      <button onClick={login}>Login</button>
      <p>
        <Link to="/signup">Don't have an account? Signup</Link>
      </p>
    </div>
  );
};

const Signup = ({ setToken }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", country: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const signup = async () => {
    await axios.post(`${API}/signup`, form);
    const res = await axios.post(`${API}/login`, { email: form.email, password: form.password });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    navigate("/dashboard");
  };

  return (
    <div className="p-4">
      <h2>Signup</h2>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <br />
      <input name="country" placeholder="Country" onChange={handleChange} />
      <br />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <br />
      <button onClick={signup}>Signup</button>
      <p>
        <Link to="/login">Already have an account? Login</Link>
      </p>
    </div>
  );
};

const Dashboard = ({ token }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newProject, setNewProject] = useState("");
  const [newTask, setNewTask] = useState({ title: "", description: "", projectId: "", status: "pending" });

  const loadProjects = async () => {
    const res = await axios.get(`${API}/projects`, authHeader(token));
    setProjects(res.data);
  };

  const loadTasks = async () => {
    const res = await axios.get(`${API}/tasks`, authHeader(token));
    setTasks(res.data);
  };

  const createProject = async () => {
    await axios.post(`${API}/projects`, { name: newProject }, authHeader(token));
    setNewProject("");
    loadProjects();
  };

  const createTask = async () => {
    await axios.post(`${API}/tasks`, newTask, authHeader(token));
    setNewTask({ title: "", description: "", projectId: "", status: "pending" });
    loadTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`, authHeader(token));
    loadTasks();
  };

  const updateTaskStatus = async (id, status) => {
    await axios.put(`${API}/tasks/${id}`, { status }, authHeader(token));
    loadTasks();
  };

  useEffect(() => {
    if (token) {
      loadProjects();
      loadTasks();
    } else {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="p-6">
      <h2>Dashboard</h2>
      <h3>Projects</h3>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
      <input value={newProject} onChange={(e) => setNewProject(e.target.value)} placeholder="New Project Name" />
      <button onClick={createProject}>Create Project</button>

      <h3>Tasks</h3>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <strong>{t.title}</strong>: {t.description} [{t.status}]
            <select value={t.status} onChange={(e) => updateTaskStatus(t.id, e.target.value)}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <input placeholder="Title" onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} />
      <br />
      <input placeholder="Description" onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
      <br />
      <select onChange={(e) => setNewTask({ ...newTask, projectId: e.target.value })}>
        <option value="">Select Project</option>
        {projects.map((p) => (
          <option value={p.id} key={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <br />
      <select onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <br />
      <button onClick={createTask}>Create Task</button>
    </div>
  );
};

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        <Route path="/dashboard" element={<Dashboard token={token} />} />
        <Route path="*" element={<Login setToken={setToken} />} />
      </Routes>
    </Router>
  );
};

export default App;
