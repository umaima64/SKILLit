import { Link } from "react-router-dom";
import { STORAGE_KEYS, getData, initializeDemoData } from "../utils/storage";

function CollaborationsPage() {
  initializeDemoData();

  const collaborations = [
    {
      id: "collab-1",
      title: "Bakery Website",
      role: "Frontend Designer",
      status: "In Progress",
      progress: 72,
      nextMilestone: "Landing page polish",
    },
    {
      id: "collab-2",
      title: "College Event Platform",
      role: "Product Strategist",
      status: "Review",
      progress: 58,
      nextMilestone: "Stakeholder feedback",
    },
  ];

  return (
    <div className="container py-5 collaborations-page">
      <div className="section-heading mb-4">
        <p className="eyebrow">Collaborations</p>
        <h3>Track your active team work</h3>
      </div>

      <div className="row g-4">
        {collaborations.map((item) => (
          <div key={item.id} className="col-lg-6">
            <div className="panel-card h-100">
              <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                <div>
                  <span className="content-tag">{item.status}</span>
                  <h4>{item.title}</h4>
                </div>
                <Link
                  className="btn btn-sm btn-outline-primary"
                  to={`/collaborations/${item.id}`}
                >
                  Open
                </Link>
              </div>

              <p className="mb-2 text-muted">
                Your role: <strong>{item.role}</strong>
              </p>
              <p className="mb-3 text-muted">
                Next milestone: {item.nextMilestone}
              </p>

              <div className="progress" style={{ height: "12px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${item.progress}%` }}
                  aria-valuenow={item.progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
              <p className="mt-2 mb-0 text-end fw-semibold">
                {item.progress}% complete
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CollaborationsPage;
