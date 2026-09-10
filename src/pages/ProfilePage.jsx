import { useEffect, useState } from "react";
import {
  STORAGE_KEYS,
  getData,
  initializeDemoData,
  saveData,
} from "../utils/storage";

const defaultProfile = {
  fullName: "",
  userType: "Student",
  location: "",
  bio: "",
  skillsOffered: "",
  skillsNeeded: "",
  availability: "",
  experience: "",
};

function ProfilePage() {
  const [profile, setProfile] = useState(defaultProfile);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    initializeDemoData();

    const savedUser = getData(STORAGE_KEYS.currentUser, null);
    const fallbackUser = getData(STORAGE_KEYS.users, [])[0] || savedUser;
    const activeUser = savedUser || fallbackUser;

    if (!activeUser) {
      return;
    }

    setProfile({
      fullName: activeUser.fullName || "",
      userType: activeUser.userType || "Student",
      location: activeUser.location || "",
      bio: activeUser.bio || "",
      skillsOffered: (activeUser.skillsOffered || []).join(", "),
      skillsNeeded: (activeUser.skillsNeeded || []).join(", "),
      availability: activeUser.availability || "",
      experience: activeUser.experience || "",
    });
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    const users = getData(STORAGE_KEYS.users, []);
    const currentUser = getData(STORAGE_KEYS.currentUser, null);
    const activeUserId = currentUser?.id || users[0]?.id;

    const updatedUser = {
      ...(currentUser || users[0] || {}),
      fullName: profile.fullName,
      userType: profile.userType,
      location: profile.location,
      bio: profile.bio,
      skillsOffered: profile.skillsOffered
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      skillsNeeded: profile.skillsNeeded
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      availability: profile.availability,
      experience: profile.experience,
    };

    const updatedUsers = users.map((user) =>
      user.id === activeUserId ? updatedUser : user,
    );

    saveData(STORAGE_KEYS.users, updatedUsers);
    saveData(STORAGE_KEYS.currentUser, updatedUser);
    setIsEditing(false);
  }

  const currentUser =
    getData(STORAGE_KEYS.currentUser, null) ||
    getData(STORAGE_KEYS.users, [])[0];

  if (!currentUser) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">
          No profile is available because no user is logged in.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 profile-page">
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="panel-card profile-summary">
            <div className="avatar">
              {currentUser.fullName?.charAt(0) || "U"}
            </div>
            <h2>{profile.fullName || currentUser.fullName}</h2>
            <p>{profile.userType || currentUser.userType}</p>
            <p className="text-muted">
              {profile.location || currentUser.location}
            </p>
            <div className="rating-line">{currentUser.rating || 4.8} ⭐</div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="panel-card">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>Profile</h3>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setIsEditing((prev) => !prev)}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {!isEditing ? (
              <div className="profile-details">
                <div className="detail-grid">
                  <div>
                    <span>Bio</span>
                    <p>{profile.bio || currentUser.bio}</p>
                  </div>
                  <div>
                    <span>Availability</span>
                    <p>{profile.availability || currentUser.availability}</p>
                  </div>
                  <div>
                    <span>Experience</span>
                    <p>{profile.experience || currentUser.experience}</p>
                  </div>
                  <div>
                    <span>Completed Projects</span>
                    <p>{currentUser.completedProjects || 0}</p>
                  </div>
                </div>

                <div className="tag-wrap mt-3">
                  <span className="skill-tag">
                    Skills Offered:{" "}
                    {profile.skillsOffered ||
                      (currentUser.skillsOffered || []).join(", ")}
                  </span>
                  <span className="skill-tag">
                    Skills Needed:{" "}
                    {profile.skillsNeeded ||
                      (currentUser.skillsNeeded || []).join(", ")}
                  </span>
                </div>
              </div>
            ) : (
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name</label>
                  <input
                    className="form-control"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">User Type</label>
                  <select
                    className="form-select"
                    name="userType"
                    value={profile.userType}
                    onChange={handleChange}
                  >
                    <option>Student</option>
                    <option>Freelancer</option>
                    <option>MSME</option>
                    <option>Organization</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Location</label>
                  <input
                    className="form-control"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Availability</label>
                  <input
                    className="form-control"
                    name="availability"
                    value={profile.availability}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Bio</label>
                  <textarea
                    className="form-control"
                    name="bio"
                    rows="3"
                    value={profile.bio}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Skills Offered</label>
                  <input
                    className="form-control"
                    name="skillsOffered"
                    value={profile.skillsOffered}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Skills Needed</label>
                  <input
                    className="form-control"
                    name="skillsNeeded"
                    value={profile.skillsNeeded}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Experience</label>
                  <input
                    className="form-control"
                    name="experience"
                    value={profile.experience}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 d-flex justify-content-end">
                  <button className="btn btn-primary" onClick={handleSave}>
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
