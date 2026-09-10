import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Find Skills", to: "/find-skills" },
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Requests", to: "/requests" },
  { label: "Notifications", to: "/notifications" },
];

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark skillit-navbar sticky-top">
      <div className="container">
        <NavLink className="navbar-brand brand-mark" to="/">
          SKILLit
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#skillitNav"
          aria-controls="skillitNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="skillitNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            {navItems.map((item) => (
              <li className="nav-item" key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="nav-item">
              <NavLink className="btn btn-primary btn-sm ms-lg-3" to="/login">
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
