import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import {
  STORAGE_KEYS,
  getData,
  initializeDemoData,
  saveData,
} from "../utils/storage";

const USER_TYPES = ["Student", "Freelancer", "MSME", "Local Organization"];

function calculateMatchScore(currentUser, targetUser) {
  if (!currentUser || !targetUser) return 0;

  const skillOverlap =
    currentUser.skillsOffered?.filter((skill) =>
      targetUser.skillsNeeded?.includes(skill),
    ).length || 0;
  const targetSkillOverlap =
    targetUser.skillsOffered?.filter((skill) =>
      currentUser.skillsNeeded?.includes(skill),
    ).length || 0;

  const skillPoints = Math.max(skillOverlap, targetSkillOverlap) * 10;
  const projectFit = Math.min(25, (targetUser.skillsNeeded?.length || 0) * 5);
  const availabilityScore =
    currentUser.availability === targetUser.availability ? 15 : 8;
  const locationScore = currentUser.location === targetUser.location ? 10 : 8;
  const experienceScore =
    Number.parseInt(currentUser.experience, 10) >=
    Number.parseInt(targetUser.experience, 10)
      ? 10
      : 8;

  const total = Math.min(
    100,
    Math.round(
      skillPoints * 0.4 +
        projectFit * 0.25 +
        availabilityScore * 0.15 +
        locationScore * 0.1 +
        experienceScore * 0.1,
    ),
  );

  return total;
}

function FindSkillsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    skill: "",
    location: "",
    availability: "",
    userType: "",
    experience: "",
  });

  initializeDemoData();

  const currentUser =
    getData(STORAGE_KEYS.currentUser, null) ||
    getData(STORAGE_KEYS.users, [])[0];
  const allUsers = getData(STORAGE_KEYS.users, []).filter(
    (user) => user.id !== currentUser?.id,
  );

  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) => {
      const matchesSearch =
        !search ||
        `${user.fullName} ${user.bio} ${user.skillsOffered.join(" ")}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesSkill =
        !filters.skill ||
        (user.skillsOffered || []).some((skill) =>
          skill.toLowerCase().includes(filters.skill.toLowerCase()),
        ) ||
        (user.skillsNeeded || []).some((skill) =>
          skill.toLowerCase().includes(filters.skill.toLowerCase()),
        );

      const matchesLocation =
        !filters.location || user.location === filters.location;
      const matchesAvailability =
        !filters.availability || user.availability === filters.availability;
      const matchesType =
        !filters.userType || user.userType === filters.userType;
      const matchesExperience =
        !filters.experience || user.experience === filters.experience;

      return (
        matchesSearch &&
        matchesSkill &&
        matchesLocation &&
        matchesAvailability &&
        matchesType &&
        matchesExperience
      );
    });
  }, [allUsers, filters, search]);

  const matchList = useMemo(() => {
    return filteredUsers
      .map((user) => ({
        user,
        score: calculateMatchScore(currentUser, user),
      }))
      .sort((a, b) => b.score - a.score);
  }, [currentUser, filteredUsers]);

  const locationOptions = [
    ...new Set(allUsers.map((user) => user.location).filter(Boolean)),
  ];
  const availabilityOptions = [
    ...new Set(allUsers.map((user) => user.availability).filter(Boolean)),
  ];
  const experienceOptions = [
    ...new Set(allUsers.map((user) => user.experience).filter(Boolean)),
  ];

  function handleFilterChange(event) {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  function handleViewProfile(id) {
    navigate(`/users/${id}`);
  }

  function handleSendRequest(id) {
    const current =
      getData(STORAGE_KEYS.currentUser, null) ||
      getData(STORAGE_KEYS.users, [])[0];
    const targetUser = allUsers.find((user) => user.id === id);

    if (!current || !targetUser) {
      return;
    }

    const requests = getData("requests", []);
    const alreadyExists = requests.some(
      (request) =>
        request.senderId === current.id &&
        request.receiverId === targetUser.id &&
        request.type === "exchange",
    );

    if (!alreadyExists) {
      requests.push({
        id: `request-${Date.now()}`,
        senderId: current.id,
        receiverId: targetUser.id,
        type: "exchange",
        relatedSkill: current.skillsOffered[0] || "Skill exchange",
        message: `Hi ${targetUser.fullName}, I would like to exchange skills with you.`,
        status: "Pending",
        createdAt: new Date().toISOString(),
      });
      saveData("requests", requests);
    }

    navigate("/requests");
  }

  return (
    <div className="container py-5 find-skills-page">
      <div className="section-heading mb-4">
        <p className="eyebrow">Find Skills</p>
        <h3>Discover the right collaborator</h3>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="panel-card filter-panel">
            <h3>Filters</h3>

            <div className="mb-3 mt-3">
              <label className="form-label">Skill</label>
              <input
                type="text"
                className="form-control"
                name="skill"
                value={filters.skill}
                onChange={handleFilterChange}
                placeholder="Web Development"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Location</label>
              <select
                className="form-select"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
              >
                <option value="">Any</option>
                {locationOptions.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Availability</label>
              <select
                className="form-select"
                name="availability"
                value={filters.availability}
                onChange={handleFilterChange}
              >
                <option value="">Any</option>
                {availabilityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">User Type</label>
              <select
                className="form-select"
                name="userType"
                value={filters.userType}
                onChange={handleFilterChange}
              >
                <option value="">Any</option>
                {USER_TYPES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Experience</label>
              <select
                className="form-select"
                name="experience"
                value={filters.experience}
                onChange={handleFilterChange}
              >
                <option value="">Any</option>
                {experienceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="panel-card mb-3 search-panel">
            <label className="form-label">Search by name or skill</label>
            <input
              type="text"
              className="form-control"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search people, skills, or keywords"
            />
          </div>

          <div className="user-list">
            {matchList.length ? (
              matchList.map(({ user, score }) => (
                <UserCard
                  key={user.id}
                  user={user}
                  matchScore={score}
                  onViewProfile={handleViewProfile}
                  onSendRequest={handleSendRequest}
                />
              ))
            ) : (
              <div className="panel-card empty-state">
                <h4>No users found</h4>
                <p>
                  Try adjusting your search or filters to match more skills or
                  profiles.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindSkillsPage;
