import { useMemo } from "react";
import { STORAGE_KEYS, getData, initializeDemoData } from "../utils/storage";

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

  const notifications = getData(STORAGE_KEYS.notifications, []).filter(
    (item) => item.userId === currentUser.id || !item.userId,
  );
  const requests = getData("requests", []).filter(
    (request) =>
      request.senderId === currentUser.id ||
      request.receiverId === currentUser.id,
  );
  const allProjects = getData(STORAGE_KEYS.projects, []);
  const allServices = getData(STORAGE_KEYS.services, []);

  const myServices = allServices.filter(
    (service) =>
      service.providerId === currentUser.id ||
      service.userId === currentUser.id ||
      service.provider === currentUser.fullName,
  );

  const myProjects = allProjects.filter(
    (project) =>
      project.ownerId === currentUser.id ||
      project.userId === currentUser.id ||
      project.owner === currentUser.fullName ||
      (Array.isArray(project.teamMembers) &&
        project.teamMembers.includes(currentUser.id)),
  );

  const myExchanges = requests.filter((request) => request.type === "exchange");
  const myCollaborations = myProjects.filter(
    (project) =>
      project.category === "Collaboration" || project.type === "Collaboration",
  );
  const completedCount =
    myProjects.filter((project) => project.status === "Completed").length +
    requests.filter((request) => request.status === "Completed").length;

  const profileCompletion = Math.min(
    100,
    45 +
      Number(Boolean(currentUser.location)) * 10 +
      Number(Boolean(currentUser.bio)) * 15 +
      Number(currentUser.skillsOffered?.length) * 10 +
      Number(currentUser.skillsNeeded?.length) * 10 +
      Number(Boolean(currentUser.availability)) * 10,
  );

  const recommendedMatches = [
    {
      title:
        currentUser.userType === "Student"
          ? "UI/UX Design Support"
          : currentUser.userType === "Freelancer"
            ? "Branding Sprint"
            : currentUser.userType === "Local Organization"
              ? "Community Website Support"
              : "Growth Strategy Session",
      match: 94,
      type: currentUser.userType === "Student" ? "Exchange" : "Project",
    },
    {
      title:
        currentUser.userType === "Student"
          ? "Portfolio Website Review"
          : currentUser.userType === "Freelancer"
            ? "Web Dev Collaboration"
            : currentUser.userType === "Local Organization"
              ? "Digital Outreach Campaign"
              : "Campaign Planning",
      match: 88,
      type: "Collaboration",
    },
    {
      title:
        currentUser.userType === "Student"
          ? "Campus Event Platform"
          : currentUser.userType === "Freelancer"
            ? "Startup Brand Refresh"
            : currentUser.userType === "Local Organization"
              ? "Local Skills Fair Website"
              : "Business Visibility Boost",
      match: 82,
      type: "Project",
    },
  ];

  const quickStats = [
    { label: "Profile Completion", value: `${Math.round(profileCompletion)}%` },
    {
      label: "Skills",
      value: String(
        (currentUser.skillsOffered?.length || 0) +
          (currentUser.skillsNeeded?.length || 0),
      ),
    },
    {
      label: "Services",
      value: String(myServices.length),
    },
    {
      label: "Projects",
      value: String(myProjects.length),
    },
    {
      label: "Exchanges",
      value: String(myExchanges.length),
    },
    {
      label: "Collaborations",
      value: String(myCollaborations.length),
    },
    {
      label: "Completed",
      value: String(completedCount),
    },
    {
      label: "Rating",
      value: `${Number(currentUser.rating || 4.8).toFixed(1)} ⭐`,
    },
    {
      label: "Pending Requests",
      value: String(
        requests.filter((request) => request.status === "Pending").length,
      ),
    },
  ];

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
              {notifications.slice(0, 3).map((item) => (
                <div key={item.id} className="notification-item">
                  <strong>🔔 {item.title}</strong>
                  <p>{item.message}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
