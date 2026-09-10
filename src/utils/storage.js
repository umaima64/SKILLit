export const STORAGE_KEYS = {
  users: "users",
  currentUser: "currentUser",
  projects: "projects",
  services: "services",
  notifications: "notifications",
  reviews: "reviews",
};

export function getData(key, fallback = []) {
  try {
    const value = localStorage.getItem(key);

    if (value === null) {
      return fallback;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error(`Failed to parse localStorage key: ${key}`, error);
    return fallback;
  }
}

export function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}

export function updateData(key, updater) {
  const previous = getData(key, []);
  const nextValue = typeof updater === "function" ? updater(previous) : updater;
  saveData(key, nextValue);
  return nextValue;
}

export function deleteData(key) {
  localStorage.removeItem(key);
}

export function generateId(prefix = "item") {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function createDemoProjects() {
  return [
    {
      id: "project-demo-1",
      title: "Bakery Website",
      category: "Web Development",
      match: 94,
      budget: "₹12,000",
      location: "Bengaluru",
      mode: "Remote",
      status: "In Progress",
    },
    {
      id: "project-demo-2",
      title: "College Event Platform",
      category: "Collaboration",
      match: 88,
      budget: "₹5,000",
      location: "Pune",
      mode: "Remote",
      status: "Pending",
    },
  ];
}

function createDemoServices() {
  return [
    {
      id: "service-demo-1",
      title: "Website Development",
      category: "Development",
      price: 2000,
      rating: 4.8,
      provider: "Arjun Kumar",
      deliveryTime: "5 days",
    },
    {
      id: "service-demo-2",
      title: "Logo Design",
      category: "Design",
      price: 1200,
      rating: 4.9,
      provider: "Riya Shah",
      deliveryTime: "3 days",
    },
  ];
}

export function initializeDemoData() {
  const users = getData(STORAGE_KEYS.users, []);

  if (!users.length) {
    const demoUsers = [
      {
        id: "user-demo-1",
        fullName: "Aisha Verma",
        email: "demo@skillit.com",
        password: "demo123",
        userType: "Student",
        location: "Bengaluru",
        bio: "Final-year computer science student focused on frontend design and product prototyping.",
        skillsOffered: ["Web Development", "UI/UX"],
        skillsNeeded: ["Graphic Design"],
        availability: "Weekends",
        experience: "2 years",
        rating: 4.8,
        completedProjects: 5,
        portfolio: ["Portfolio Website", "Campus Event App"],
        createdAt: new Date().toISOString(),
      },
      {
        id: "user-demo-2",
        fullName: "Rohan Mehta",
        email: "rohan@skillit.com",
        password: "demo123",
        userType: "Freelancer",
        location: "Mumbai",
        bio: "Brand designer and frontend builder for emerging startups and local businesses.",
        skillsOffered: ["Graphic Design", "Branding"],
        skillsNeeded: ["Web Development"],
        availability: "Flexible",
        experience: "4 years",
        rating: 4.9,
        completedProjects: 12,
        portfolio: ["Startup Branding Kit", "E-commerce Landing Page"],
        createdAt: new Date().toISOString(),
      },
      {
        id: "user-demo-3",
        fullName: "Nisha Patel",
        email: "nisha@skillit.com",
        password: "demo123",
        userType: "MSME",
        location: "Ahmedabad",
        bio: "Operations lead helping local businesses improve digital presence and client acquisition.",
        skillsOffered: ["Business Strategy", "Marketing"],
        skillsNeeded: ["Web Development"],
        availability: "Weekdays",
        experience: "6 years",
        rating: 4.7,
        completedProjects: 8,
        portfolio: ["Retail Growth Strategy", "Local Brand Audit"],
        createdAt: new Date().toISOString(),
      },
    ];

    saveData(STORAGE_KEYS.users, demoUsers);
  }

  if (!getData(STORAGE_KEYS.currentUser, null)) {
    saveData(STORAGE_KEYS.currentUser, null);
  }

  if (!getData(STORAGE_KEYS.projects, null)) {
    saveData(STORAGE_KEYS.projects, createDemoProjects());
  }

  if (!getData(STORAGE_KEYS.services, null)) {
    saveData(STORAGE_KEYS.services, createDemoServices());
  }

  if (!getData(STORAGE_KEYS.notifications, null)) {
    saveData(STORAGE_KEYS.notifications, [
      {
        id: "notif-1",
        title: "New Exchange Request",
        message: "Aisha wants to exchange skills with you.",
        read: false,
      },
      {
        id: "notif-2",
        title: "Project Update",
        message: "Bakery Website has a new milestone ready for review.",
        read: true,
      },
    ]);
  }

  if (!getData(STORAGE_KEYS.reviews, null)) {
    saveData(STORAGE_KEYS.reviews, [
      {
        id: "review-1",
        author: "Aisha Verma",
        rating: 5,
        project: "Bakery Website",
        comment:
          "Excellent communication and thoughtful design direction throughout the project.",
        createdAt: new Date().toISOString(),
      },
      {
        id: "review-2",
        author: "Rohan Mehta",
        rating: 4,
        project: "Branding Sprint",
        comment:
          "Very collaborative and fast with revisions. Great teammate to work with.",
        createdAt: new Date().toISOString(),
      },
    ]);
  }
}
