import { Link, useParams } from "react-router-dom";
import { STORAGE_KEYS, getData, initializeDemoData } from "../utils/storage";

function ServiceDetailPage() {
  const { id } = useParams();
  initializeDemoData();

  const service = getData(STORAGE_KEYS.services, []).find(
    (item) => item.id === id,
  );

  if (!service) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">Service not found.</div>
      </div>
    );
  }

  return (
    <div className="container py-5 service-detail-page">
      <div className="panel-card">
        <div className="row g-4 align-items-center">
          <div className="col-lg-8">
            <span className="content-tag">{service.category}</span>
            <h2 className="page-title mt-3">{service.title}</h2>
            <p className="text-muted mt-3">
              Crafted by <strong>{service.provider}</strong> with a delivery
              timeline of {service.deliveryTime}.
            </p>
            <div className="d-flex gap-3 align-items-center flex-wrap mb-3">
              <span className="match-badge">⭐ {service.rating}</span>
              <span className="match-badge">{service.deliveryTime}</span>
            </div>
            <p className="mb-3">
              This demo service package offers a polished, responsive outcome
              tailored to your business or personal needs.
            </p>
            <div className="tag-wrap">
              <span className="skill-tag">Responsive UI</span>
              <span className="skill-tag">Fast delivery</span>
              <span className="skill-tag">Custom revisions</span>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="panel-card bg-light-subtle">
              <p className="muted-label">Package price</p>
              <h3 className="stat-value">₹{service.price}</h3>
              <div className="mt-3 d-grid gap-2">
                <Link
                  className="btn btn-primary"
                  to={`/checkout/${service.id}`}
                >
                  Proceed to Checkout
                </Link>
                <Link className="btn btn-outline-primary" to="/services">
                  Back to Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetailPage;
