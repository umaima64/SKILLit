import { Link } from "react-router-dom";
import { STORAGE_KEYS, getData, initializeDemoData } from "../utils/storage";

const exchangeHighlights = [
  "Swap skills without cash",
  "Build trust with profile-based matching",
  "Track requests and accepted collaborations",
];

function SkillExchangePage() {
  initializeDemoData();

  const users = getData(STORAGE_KEYS.users, []);
  const requests = getData("requests", []);
  const currentUser = getData(STORAGE_KEYS.currentUser, null) || users[0];

  const opportunities = users
    .filter((user) => user.id !== currentUser?.id)
    .map((user) => ({
      ...user,
      match: Math.min(
        99,
        60 +
          (user.skillsOffered || []).filter((skill) =>
            (currentUser?.skillsNeeded || []).includes(skill),
          ).length *
            12 +
          (user.skillsNeeded || []).filter((skill) =>
            (currentUser?.skillsOffered || []).includes(skill),
          ).length *
            10,
      ),
    }))
    .slice(0, 3);

  const activeRequests = requests.filter(
    (request) =>
      request.status === "Pending" &&
      (request.senderId === currentUser?.id ||
        request.receiverId === currentUser?.id),
  );

  return (
    <div className="container py-5 skill-exchange-page">
      <div className="section-heading mb-4">
        <p className="eyebrow">Skill Exchange</p>
        <h3>Trade expertise, grow together</h3>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="panel-card">
            <p className="muted-label">Why it works</p>
            <div className="tag-wrap mb-3">
              {exchangeHighlights.map((item) => (
                <span key={item} className="skill-tag">
                  {item}
                </span>
              ))}
            </div>
            <p className="mb-0 text-muted">
              Find collaborators with complementary skills, send an exchange
              request, and track the outcome through your request center.
            </p>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="panel-card">
            <p className="muted-label">Open Requests</p>
            <h3 className="stat-value">{activeRequests.length}</h3>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {opportunities.map((user) => (
          <div key={user.id} className="col-lg-4">
            <div className="panel-card h-100">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h4>{user.fullName}</h4>
                  <p className="mb-0 text-muted">{user.userType}</p>
                </div>
                <span className="match-badge">{user.match}%</span>
              </div>

              <p className="mb-3 text-muted">{user.bio}</p>

              <div className="mb-3">
                <span className="muted-label">Offers</span>
                <div className="tag-wrap mt-2">
                  {(user.skillsOffered || []).slice(0, 3).map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <span className="muted-label">Looking for</span>
                <div className="tag-wrap mt-2">
                  {(user.skillsNeeded || []).slice(0, 3).map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <Link className="btn btn-primary w-100" to="/find-skills">
                Explore Match
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillExchangePage;
