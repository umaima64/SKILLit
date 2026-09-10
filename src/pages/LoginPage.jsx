import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  STORAGE_KEYS,
  getData,
  initializeDemoData,
  saveData,
} from "../utils/storage";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "demo@skillit.com",
    password: "demo123",
  });
  const [error, setError] = useState("");

  initializeDemoData();

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const users = getData(STORAGE_KEYS.users, []);
    const match = users.find(
      (user) =>
        user.email.toLowerCase() === form.email.toLowerCase() &&
        user.password === form.password,
    );

    if (!match) {
      setError("Invalid email or password. Try the demo account details.");
      return;
    }

    saveData(STORAGE_KEYS.currentUser, match);
    setError("");
    navigate("/dashboard");
  }

  function handleDemoLogin() {
    const users = getData(STORAGE_KEYS.users, []);
    const demoUser = users.find(
      (user) => user.email === "demo@skillit.com",
    ) || {
      id: "user-demo-1",
      fullName: "Aisha Verma",
      email: "demo@skillit.com",
      userType: "Student",
      skillsOffered: ["Web Development", "UI/UX"],
      skillsNeeded: ["Graphic Design"],
      location: "Bengaluru",
      availability: "Weekends",
      experience: "2 years",
    };

    saveData(STORAGE_KEYS.currentUser, demoUser);
    navigate("/dashboard");
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 rounded-4 p-4 auth-card">
            <h2 className="mb-3">Login</h2>
            <p className="text-muted">
              Demo authentication is enabled for hackathon use only.
            </p>

            <form onSubmit={handleSubmit} className="mt-4">
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <div className="d-grid gap-3 mt-4">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-primary-outline"
                  onClick={handleDemoLogin}
                >
                  Try Demo Account
                </button>
              </div>
            </form>

            <p className="mt-4 mb-0 text-center">
              New here? <Link to="/register">Create account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
