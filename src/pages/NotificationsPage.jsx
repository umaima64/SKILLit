import { useMemo, useState } from "react";
import {
  STORAGE_KEYS,
  getData,
  initializeDemoData,
  saveData,
} from "../utils/storage";

function NotificationsPage() {
  const [view, setView] = useState("all");

  initializeDemoData();

  const notifications = useMemo(
    () => getData(STORAGE_KEYS.notifications, []),
    [],
  );

  const visibleNotifications =
    view === "all"
      ? notifications
      : notifications.filter((item) => item.read === (view === "read"));

  function markAsRead(id) {
    const updated = notifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification,
    );
    saveData(STORAGE_KEYS.notifications, updated);
    window.location.reload();
  }

  function markAllAsRead() {
    const updated = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));
    saveData(STORAGE_KEYS.notifications, updated);
    window.location.reload();
  }

  return (
    <div className="container py-5 notifications-page">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <p className="eyebrow">Notifications</p>
          <h2 className="page-title">Your activity feed</h2>
        </div>
        <button className="btn btn-primary" onClick={markAllAsRead}>
          Mark all as read
        </button>
      </div>

      <div className="panel-card mb-4">
        <div className="d-flex flex-wrap gap-2">
          {[
            { label: "All", value: "all" },
            { label: "Unread", value: "unread" },
            { label: "Read", value: "read" },
          ].map((tab) => (
            <button
              key={tab.value}
              className={`btn btn-sm ${view === tab.value ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setView(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="notification-list">
        {visibleNotifications.length ? (
          visibleNotifications.map((item) => (
            <div key={item.id} className="panel-card notification-item">
              <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.message}</p>
                </div>
                {!item.read && (
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => markAsRead(item.id)}
                  >
                    Mark read
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="panel-card empty-state">
            <h4>No notifications in this view</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationsPage;
