import { useMemo, useState } from "react";
import {
  STORAGE_KEYS,
  getData,
  initializeDemoData,
  saveData,
} from "../utils/storage";

function RequestsPage() {
  const [activeTab, setActiveTab] = useState("all");

  initializeDemoData();

  const currentUser =
    getData(STORAGE_KEYS.currentUser, null) ||
    getData(STORAGE_KEYS.users, [])[0];
  const allUsers = getData(STORAGE_KEYS.users, []);
  const rawRequests = getData("requests", []);

  const requests = useMemo(() => {
    if (!currentUser) {
      return [];
    }

    return rawRequests
      .filter(
        (request) =>
          request.senderId === currentUser.id ||
          request.receiverId === currentUser.id,
      )
      .map((request) => {
        const sender = allUsers.find((user) => user.id === request.senderId);
        const receiver = allUsers.find(
          (user) => user.id === request.receiverId,
        );

        return {
          ...request,
          sender,
          receiver,
          direction: request.senderId === currentUser.id ? "Sent" : "Received",
        };
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt || b.createdAt || 0).getTime() -
          new Date(a.createdAt || a.createdAt || 0).getTime(),
      );
  }, [allUsers, currentUser, rawRequests]);

  const filteredRequests = useMemo(() => {
    if (activeTab === "all") return requests;
    return requests.filter((request) => request.status === activeTab);
  }, [activeTab, requests]);

  function handleStatusChange(requestId, nextStatus) {
    const updated = rawRequests.map((request) =>
      request.id === requestId ? { ...request, status: nextStatus } : request,
    );
    saveData("requests", updated);
    setActiveTab((previous) => previous);
    window.location.reload();
  }

  const stats = {
    total: requests.length,
    pending: requests.filter((request) => request.status === "Pending").length,
    accepted: requests.filter((request) => request.status === "Accepted")
      .length,
    rejected: requests.filter((request) => request.status === "Rejected")
      .length,
    cancelled: requests.filter((request) => request.status === "Cancelled")
      .length,
    completed: requests.filter((request) => request.status === "Completed")
      .length,
  };

  if (!currentUser) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">
          Please log in to manage skill exchange requests.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 requests-page">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <p className="eyebrow">Requests</p>
          <h2 className="page-title">Skill exchange activity</h2>
        </div>
        <div className="profile-chip">{currentUser.fullName}</div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="panel-card">
            <p className="muted-label">Total</p>
            <h3 className="stat-value">{stats.total}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="panel-card">
            <p className="muted-label">Pending</p>
            <h3 className="stat-value">{stats.pending}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="panel-card">
            <p className="muted-label">Accepted</p>
            <h3 className="stat-value">{stats.accepted}</h3>
          </div>
        </div>
      </div>

      <div className="panel-card mb-4">
        <div className="d-flex flex-wrap gap-2">
          {[
            { label: "All", value: "all" },
            { label: "Pending", value: "Pending" },
            { label: "Accepted", value: "Accepted" },
            { label: "Rejected", value: "Rejected" },
            { label: "Cancelled", value: "Cancelled" },
            { label: "Completed", value: "Completed" },
          ].map((tab) => (
            <button
              key={tab.value}
              className={`btn btn-sm ${activeTab === tab.value ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="request-list">
        {filteredRequests.length ? (
          filteredRequests.map((request) => {
            const counterparty =
              request.direction === "Sent" ? request.receiver : request.sender;

            return (
              <div key={request.id} className="panel-card request-item">
                <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="match-badge">{request.direction}</span>
                      <span className="match-badge">{request.type}</span>
                    </div>
                    <h4>{request.relatedSkill || "Skill exchange"}</h4>
                    <p className="mb-2 text-muted">
                      {request.direction === "Sent"
                        ? `Sent to ${counterparty?.fullName || "someone"}`
                        : `From ${counterparty?.fullName || "someone"}`}
                    </p>
                    <p className="mb-0">{request.message}</p>
                  </div>

                  <div className="request-status-wrap text-end">
                    <span
                      className={`status-pill status-${request.status.toLowerCase()}`}
                    >
                      {request.status}
                    </span>
                  </div>
                </div>

                {request.direction === "Received" &&
                  request.status === "Pending" && (
                    <div className="mt-3 d-flex gap-2">
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          handleStatusChange(request.id, "Accepted")
                        }
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() =>
                          handleStatusChange(request.id, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    </div>
                  )}

                {request.direction === "Sent" &&
                  request.status === "Pending" && (
                    <div className="mt-3 d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() =>
                          handleStatusChange(request.id, "Cancelled")
                        }
                      >
                        Cancel Request
                      </button>
                    </div>
                  )}
              </div>
            );
          })
        ) : (
          <div className="panel-card empty-state">
            <h4>No requests yet</h4>
            <p>Start matching with collaborators from the Find Skills page.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestsPage;
