import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  STORAGE_KEYS,
  generateId,
  getData,
  initializeDemoData,
  saveData,
} from "../utils/storage";

const initialForm = {
  fullName: "",
  email: "",
  password: "",
  userType: "Student",
  location: "",
  bio: "",
  skillsOffered: "",
  skillsNeeded: "",
  availability: "",
  experience: "",
};

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  initializeDemoData();

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const required = Object.values(form).every(Boolean);

    if (!required) {
      setMessage("Please fill in all fields before creating your account.");
      return;
    }

    const users = getData(STORAGE_KEYS.users, []);
    const alreadyExists = users.some(
      (user) => user.email.toLowerCase() === form.email.toLowerCase(),
    );

    if (alreadyExists) {
      setMessage("An account with this email already exists.");
      return;
    }

    const newUser = {
      id: generateId("user"),
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      userType: form.userType,
      location: form.location,
      bio: form.bio,
      skillsOffered: form.skillsOffered
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      skillsNeeded: form.skillsNeeded
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      availability: form.availability,
      experience: form.experience,
      rating: 4.7,
      completedProjects: 0,
      portfolio: [],
      createdAt: new Date().toISOString(),
    };

    const nextUsers = [...users, newUser];
    saveData(STORAGE_KEYS.users, nextUsers);
    saveData(STORAGE_KEYS.currentUser, newUser);
    setMessage("Registration successful. Redirecting to the dashboard...");

    setTimeout(() => {
      navigate("/dashboard");
    }, 600);
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 rounded-4 p-4 auth-card">
            <h2 className="mb-3">Register</h2>
            <p className="text-muted">
              Demo registration saves data in LocalStorage and is not production
              security.
            </p>

            <form onSubmit={handleSubmit} className="row g-3 mt-2">
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  value={form.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">User Type</label>
                <select
                  name="userType"
                  className="form-select"
                  value={form.userType}
                  onChange={handleChange}
                >
                  <option>Student</option>
                  <option>Freelancer</option>
                  <option>MSME</option>
                  <option>Organization</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  value={form.location}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Availability</label>
                <input
                  type="text"
                  name="availability"
                  className="form-control"
                  value={form.availability}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Bio</label>
                <textarea
                  name="bio"
                  className="form-control"
                  rows="3"
                  value={form.bio}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Skills Offered</label>
                <input
                  type="text"
                  name="skillsOffered"
                  className="form-control"
                  value={form.skillsOffered}
                  onChange={handleChange}
                  placeholder="Web Development, UI/UX"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Skills Needed</label>
                <input
                  type="text"
                  name="skillsNeeded"
                  className="form-control"
                  value={form.skillsNeeded}
                  onChange={handleChange}
                  placeholder="Graphic Design, Copywriting"
                />
              </div>

              <div className="col-12">
                <label className="form-label">Experience</label>
                <input
                  type="text"
                  name="experience"
                  className="form-control"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="2 years"
                />
              </div>

              {message && (
                <div className="col-12">
                  <div className="alert alert-info mb-0">{message}</div>
                </div>
              )}

              <div className="col-12 d-grid gap-3 mt-2">
                <button type="submit" className="btn btn-primary">
                  Create Account
                </button>
                <Link to="/login" className="btn btn-outline-secondary">
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
