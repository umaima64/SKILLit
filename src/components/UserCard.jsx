function UserCard({ user, matchScore, onViewProfile, onSendRequest }) {
  const skillString = (user.skillsOffered || []).join(", ") || "Not specified";
  const needString = (user.skillsNeeded || []).join(", ") || "Not specified";

  return (
    <div className="user-card">
      <div className="user-card-header">
        <div>
          <h4>{user.fullName}</h4>
          <span>{user.userType}</span>
        </div>
        <div className="match-pill">{matchScore}% Match</div>
      </div>

      <p className="user-location">📍 {user.location}</p>
      <div className="user-meta-grid">
        <div>
          <span>Skills</span>
          <p>{skillString}</p>
        </div>
        <div>
          <span>Needs</span>
          <p>{needString}</p>
        </div>
        <div>
          <span>Availability</span>
          <p>{user.availability}</p>
        </div>
        <div>
          <span>Experience</span>
          <p>{user.experience}</p>
        </div>
      </div>

      <div className="user-card-footer">
        <span>⭐ {user.rating || 4.7}</span>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => onViewProfile(user.id)}
          >
            View Profile
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onSendRequest(user.id)}
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
