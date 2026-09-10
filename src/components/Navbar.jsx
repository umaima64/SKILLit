import { NavLink, useNavigate } from "react-router-dom";
import { STORAGE_KEYS, getData, saveData } from "../utils/storage";

const publicNavItems = [
  { label: "Home", to: "/" },
  { label: "Login", to: "/login" },
  { label: "Register", to: "/register" },
];

const privateNavItems = [
  { label: "Home", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Find Skills", to: "/find-skills" },
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "Requests", to: "/requests" },
  { label: "Notifications", to: "/notifications" },
  { label: "Profile", to: "/profile" },
];

function Navbar() {
  const navigate = useNavigate();
  const currentUser = getData(STORAGE_KEYS.currentUser, null);
  const navItems = currentUser ? privateNavItems : publicNavItems;

  function handleLogout() {
    saveData(STORAGE_KEYS.currentUser, null);
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg skillit-navbar sticky-top">
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

            {currentUser ? (
              <>
                <li className="nav-item">
                  <span className="nav-user-badge">{currentUser.fullName}</span>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-outline-light btn-sm nav-logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink className="btn btn-primary btn-sm ms-lg-2" to="/login">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
