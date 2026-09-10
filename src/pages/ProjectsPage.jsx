import { Link } from "react-router-dom";
import { STORAGE_KEYS, getData, initializeDemoData } from "../utils/storage";

function ProjectsPage() {
  initializeDemoData();

  const projects = getData(STORAGE_KEYS.projects, []);

  return (
    <div className="container py-5 projects-page">
      <div className="section-heading mb-4">
        <p className="eyebrow">Projects</p>
        <h3>Find your next collaboration</h3>
      </div>

      <div className="row g-4">
        {projects.map((project) => (
          <div key={project.id} className="col-lg-6">
            <div className="panel-card h-100 project-card">
              <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                <div>
                  <span className="content-tag">{project.category}</span>
                  <h4>{project.title}</h4>
                </div>
                <span className="match-badge">{project.match}% Match</span>
              </div>

              <p className="text-muted mb-3">
                {project.location} • {project.mode}
              </p>

              <div className="detail-grid mb-3">
                <div>
                  <span>Budget</span>
                  <p>{project.budget}</p>
                </div>
                <div>
                  <span>Status</span>
                  <p>{project.status}</p>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mt-3">
                <strong>{project.budget}</strong>
                <Link
                  className="btn btn-primary"
                  to={`/projects/${project.id}`}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
