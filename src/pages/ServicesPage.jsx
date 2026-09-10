import { useMemo } from "react";
import { Link } from "react-router-dom";
import { STORAGE_KEYS, getData, initializeDemoData } from "../utils/storage";

function ServicesPage() {
  initializeDemoData();

  const services = useMemo(() => getData(STORAGE_KEYS.services, []), []);

  return (
    <div className="container py-5 services-page">
      <div className="section-heading mb-4">
        <p className="eyebrow">Services</p>
        <h3>Hire expertise for your next task</h3>
      </div>

      <div className="row g-4">
        {services.map((service) => (
          <div key={service.id} className="col-lg-6">
            <div className="panel-card h-100">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <span className="content-tag">{service.category}</span>
                  <h4>{service.title}</h4>
                </div>
                <span className="match-badge">⭐ {service.rating}</span>
              </div>

              <p className="mb-3 text-muted">
                Delivered by <strong>{service.provider}</strong> in about{" "}
                {service.deliveryTime}
              </p>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <p className="muted-label mb-1">Starting at</p>
                  <h3 className="stat-value">₹{service.price}</h3>
                </div>
                <Link
                  className="btn btn-primary"
                  to={`/services/${service.id}`}
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

export default ServicesPage;
