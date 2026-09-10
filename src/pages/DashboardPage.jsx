import { useMemo } from "react";
import { STORAGE_KEYS, getData, initializeDemoData } from "../utils/storage";

const recommendedMatches = [
  { title: "Bakery Website Project", match: 94, type: "Project" },
  { title: "Graphic Design Exchange", match: 92, type: "Exchange" },
  { title: "College Event Collaboration", match: 88, type: "Collaboration" },
];

const quickStats = [
  { label: "Profile Completion", value: "80%" },
  { label: "Pending Requests", value: "2" },
  { label: "Active Projects", value: "3" },
  { label: "Rating", value: "4.8 ⭐" },
];

function DashboardPage() {
  initializeDemoData();

  const currentUser = useMemo(() => {
    const savedUser = getData(STORAGE_KEYS.currentUser, null);
    if (savedUser) {
      return savedUser;
    }

    const users = getData(STORAGE_KEYS.users, []);
    return users[0] || null;
  }, []);

  if (!currentUser) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">
          No user is logged in yet. Please log in or create an account.
        </div>
      </div>
    );
  }

  const profileCompletion = Math.min(
    100,
    45 +
      Number(Boolean(currentUser.location)) * 10 +
      Number(Boolean(currentUser.bio)) * 15 +
      Number(currentUser.skillsOffered?.length) * 10 +
      Number(currentUser.skillsNeeded?.length) * 10 +
      Number(Boolean(currentUser.availability)) * 10,
  );

  return (
    <div className="container py-5 dashboard-page">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <p className="eyebrow mb-2">Dashboard</p>
          <h2 className="page-title">
            Good morning, {currentUser.fullName.split(" ")[0]} 👋
          </h2>
        </div>
        <div className="profile-chip">{currentUser.userType}</div>
      </div>

      <div className="row g-4 mb-4">
        {quickStats.map((item) => (
          <div key={item.label} className="col-sm-6 col-xl-3">
            <div className="info-card h-100">
              <p className="muted-label">{item.label}</p>
              <h3 className="stat-value">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-xl-8">
          <div className="panel-card">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>Profile Completion</h3>
              <span className="completion-tag">
                {Math.round(profileCompletion)}%
              </span>
            </div>

            <div className="progress" style={{ height: "12px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${profileCompletion}%` }}
                aria-valuenow={profileCompletion}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>

          <div className="panel-card mt-4">
            <h3>Recommended For You</h3>
            <div className="match-list mt-3">
              {recommendedMatches.map((match) => (
                <div key={match.title} className="match-item">
                  <div>
                    <span className="match-badge">{match.match}% Match</span>
                    <h4>{match.title}</h4>
                  </div>
                  <span className="muted-label">{match.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="panel-card">
            <h3>Notifications</h3>
            <div className="notification-list mt-3">
              <div className="notification-item">
                <strong>🔔 New Exchange Request</strong>
                <p>Aisha wants to exchange skills with you.</p>
              </div>
              <div className="notification-item">
                <strong>🔔 Payment Successful</strong>
                <p>Your demo payment of ₹2,000 was successful.</p>
              </div>
              <div className="notification-item">
                <strong>🔔 Project Update</strong>
                <p>Bakery Website has a new milestone ready.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
