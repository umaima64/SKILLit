import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  STORAGE_KEYS,
  getData,
  initializeDemoData,
  saveData,
} from "../utils/storage";

function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  initializeDemoData();
  const currentUser = getData(STORAGE_KEYS.currentUser, null);
  const service = useMemo(
    () => getData(STORAGE_KEYS.services, []).find((item) => item.id === id),
    [id],
  );

  if (!service) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">
          Selected service is not available.
        </div>
      </div>
    );
  }

  function handleCheckout() {
    const notifications = getData(STORAGE_KEYS.notifications, []);
    const paymentRef = `TEST-${Date.now().toString().slice(-6)}`;

    notifications.unshift({
      id: `notif-${Date.now()}`,
      userId: currentUser?.id || "guest",
      title: "Test mode payment successful",
      message: `Your payment for ${service.title} was processed successfully in test mode. Reference: ${paymentRef}`,
      read: false,
    });

    saveData(STORAGE_KEYS.notifications, notifications);
    window.alert(
      `Test mode payment successful!\n\nOrder: ${service.title}\nAmount: ₹${service.price}\nReference: ${paymentRef}\n\nA confirmation has been saved to your notifications.`,
    );
    navigate("/dashboard");
  }

  return (
    <div className="container py-5 checkout-page">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="panel-card">
            <p className="eyebrow">Checkout</p>
            <h2 className="page-title">Confirm your order</h2>

            <div className="panel-card mt-4">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div>
                  <h4>{service.title}</h4>
                  <p className="mb-0 text-muted">{service.provider}</p>
                </div>
                <span className="match-badge">₹{service.price}</span>
              </div>
            </div>

            <div className="row g-3 mt-2">
              <div className="col-md-6">
                <label className="form-label">Name</label>
                <input
                  className="form-control"
                  value={currentUser?.fullName || "Demo User"}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Payment method</label>
                <select className="form-select" defaultValue="upi">
                  <option value="upi">UPI</option>
                  <option value="card">Card</option>
                  <option value="wallet">Wallet</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
              <div>
                <p className="muted-label mb-1">Total</p>
                <h3 className="stat-value">₹{service.price}</h3>
              </div>

              <div className="d-flex gap-2">
                <Link
                  className="btn btn-outline-primary"
                  to={`/services/${service.id}`}
                >
                  Back
                </Link>
                <button className="btn btn-primary" onClick={handleCheckout}>
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
