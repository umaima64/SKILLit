import { Link, useParams } from "react-router-dom";

const collaborationData = {
  "collab-1": {
    title: "Bakery Website",
    role: "Frontend Designer",
    status: "In Progress",
    progress: 72,
    team: ["Aisha Verma", "Nisha Patel", "Rohan Mehta"],
    milestones: [
      "Landing page wireframe",
      "Content polish",
      "Launch-ready review",
    ],
  },
  "collab-2": {
    title: "College Event Platform",
    role: "Product Strategist",
    status: "Review",
    progress: 58,
    team: ["Arjun Kumar", "Leah Roy", "Riya Shah"],
    milestones: ["Prototype review", "Feedback loop", "Final demo package"],
  },
};

function CollaborationDetailPage() {
  const { id } = useParams();
  const collaboration = collaborationData[id];

  if (!collaboration) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">Collaboration not found.</div>
      </div>
    );
  }

  return (
    <div className="container py-5 collaboration-detail-page">
      <div className="panel-card">
        <div className="row g-4">
          <div className="col-lg-8">
            <span className="content-tag">{collaboration.status}</span>
            <h2 className="page-title mt-3">{collaboration.title}</h2>
            <p className="text-muted mt-3">
              Your role: <strong>{collaboration.role}</strong>
            </p>

            <div className="mt-4">
              <p className="muted-label">Milestones</p>
              <ul className="benefit-list">
                {collaboration.milestones.map((milestone) => (
                  <li key={milestone}>{milestone}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="panel-card bg-light-subtle">
              <p className="muted-label">Progress</p>
              <h3 className="stat-value">{collaboration.progress}%</h3>
              <div className="progress mt-3" style={{ height: "12px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${collaboration.progress}%` }}
                  aria-valuenow={collaboration.progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>

              <div className="mt-4">
                <p className="muted-label">Team</p>
                <div className="tag-wrap">
                  {collaboration.team.map((member) => (
                    <span key={member} className="skill-tag">
                      {member}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 d-grid gap-2">
                <Link className="btn btn-primary" to={`/workspace/${id}`}>
                  Open Workspace
                </Link>
                <Link className="btn btn-outline-primary" to="/collaborations">
                  Back to Collaborations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollaborationDetailPage;
