import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="skillit-footer">
      <div className="container">
        <div className="row gy-4 align-items-center">
          <div className="col-md-6">
            <div className="brand-mark">SKILLit</div>
            <p className="footer-copy">Swap your skill, earn your bill.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="footer-links">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/find-skills">Find Skills</NavLink>
              <NavLink to="/projects">Projects</NavLink>
              <NavLink to="/services">Services</NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
