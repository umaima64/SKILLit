import { Link, useParams } from "react-router-dom";
import { STORAGE_KEYS, getData, initializeDemoData } from "../utils/storage";

function ProjectDetailPage() {
  const { id } = useParams();
  initializeDemoData();

  const project = getData(STORAGE_KEYS.projects, []).find(
    (item) => item.id === id,
  );

  if (!project) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">Project not found.</div>
      </div>
    );
  }

  return (
    <div className="container py-5 project-detail-page">
      <div className="panel-card">
        <div className="row g-4 align-items-start">
          <div className="col-lg-8">
            <span className="content-tag">{project.category}</span>
            <h2 className="page-title mt-3">{project.title}</h2>
            <p className="text-muted mt-3">
              {project.location} • {project.mode} • {project.status}
            </p>

            <div className="tag-wrap my-3">
              <span className="skill-tag">UI/UX</span>
              <span className="skill-tag">Product Strategy</span>
              <span className="skill-tag">Frontend</span>
            </div>

            <p className="mb-3">
              This project needs a collaborative team to build and deliver a
              polished digital experience for a growing business. The ideal
              partner has strong execution skills, communication, and delivery
              focus.
            </p>

            <div className="detail-grid">
              <div>
                <span>Budget</span>
                <p>{project.budget}</p>
              </div>
              <div>
                <span>Match</span>
                <p>{project.match}%</p>
              </div>
              <div>
                <span>Type</span>
                <p>{project.mode}</p>
              </div>
              <div>
                <span>Timeline</span>
                <p>2–4 weeks</p>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="panel-card bg-light-subtle">
              <p className="muted-label">Opportunity</p>
              <h3 className="stat-value">{project.budget}</h3>
              <div className="mt-3 d-grid gap-2">
                <button className="btn btn-primary">Join Collaboration</button>
                <Link className="btn btn-outline-primary" to="/projects">
                  Back to Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
