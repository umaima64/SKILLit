export const STORAGE_KEYS = {
  users: "users",
  currentUser: "currentUser",
  projects: "projects",
  services: "services",
  notifications: "notifications",
  reviews: "reviews",
};

export const USER_TYPES = [
  "Student",
  "Freelancer",
  "MSME",
  "Local Organization",
];

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

function createDemoUsers() {
  return [
    {
      id: "user-demo-1",
      fullName: "Aisha Verma",
      email: "aisha@skillit.com",
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
    {
      id: "user-demo-4",
      fullName: "City Connect Foundation",
      email: "org@skillit.com",
      password: "demo123",
      userType: "Local Organization",
      location: "Pune",
      bio: "Community organization supporting local youth programs, access to digital opportunities, and neighborhood engagement.",
      skillsOffered: ["Community Outreach", "Event Management"],
      skillsNeeded: ["Web Development", "Graphic Design"],
      availability: "Weekdays",
      experience: "5 years",
      rating: 4.8,
      completedProjects: 9,
      portfolio: ["Youth Digital Drive", "Local Skills Fair"],
      createdAt: new Date().toISOString(),
    },
  ];
}

function createDemoRequests() {
  return [
    {
      id: "request-aisha-rohan-pending",
      senderId: "user-demo-1",
      receiverId: "user-demo-2",
      type: "exchange",
      relatedSkill: "UI/UX Design",
      message:
        "Hi Rohan, I want to exchange UI/UX mockups for branding strategy support.",
      status: "Pending",
      createdAt: new Date().toISOString(),
    },
    {
      id: "request-rohan-aisha-accepted",
      senderId: "user-demo-2",
      receiverId: "user-demo-1",
      type: "exchange",
      relatedSkill: "Branding Strategy",
      message:
        "Hi Aisha, I can help with branding while you support my frontend work.",
      status: "Accepted",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "request-nisha-aisha-rejected",
      senderId: "user-demo-3",
      receiverId: "user-demo-1",
      type: "exchange",
      relatedSkill: "Web Development",
      message:
        "Hi Aisha, I want to discuss a web build collaboration with you.",
      status: "Rejected",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: "request-rohan-nisha-pending",
      senderId: "user-demo-2",
      receiverId: "user-demo-3",
      type: "exchange",
      relatedSkill: "Brand Identity",
      message:
        "Hi Nisha, I can design a stronger brand identity for your growth campaign.",
      status: "Pending",
      createdAt: new Date(Date.now() - 259200000).toISOString(),
    },
  ];
}

function createDemoNotifications() {
  return [
    {
      id: "notif-aisha-1",
      userId: "user-demo-1",
      title: "New request update",
      message: "Rohan replied to your design collaboration request.",
      read: false,
    },
    {
      id: "notif-aisha-2",
      userId: "user-demo-1",
      title: "Test payment successful",
      message:
        "Demo payment for the landing page package was processed in test mode.",
      read: true,
    },
    {
      id: "notif-rohan-1",
      userId: "user-demo-2",
      title: "Accepted collaboration",
      message: "Aisha accepted your UI/UX exchange proposal.",
      read: false,
    },
    {
      id: "notif-rohan-2",
      userId: "user-demo-2",
      title: "Pending follow-up",
      message: "Nisha is waiting on your brand consultation plan.",
      read: true,
    },
    {
      id: "notif-nisha-1",
      userId: "user-demo-3",
      title: "MSME update",
      message: "Your digital growth sprint is ready for review.",
      read: false,
    },
    {
      id: "notif-nisha-2",
      userId: "user-demo-3",
      title: "Test payment successful",
      message: "Your demo campaign invoice was marked as paid in test mode.",
      read: true,
    },
    {
      id: "notif-org-1",
      userId: "user-demo-4",
      title: "Skill request received",
      message: "Aisha requested to support your local youth digital project.",
      read: false,
    },
    {
      id: "notif-org-2",
      userId: "user-demo-4",
      title: "Project review update",
      message: "Your community website requirements are ready for review.",
      read: true,
    },
  ];
}

export function initializeDemoData() {
  const users = getData(STORAGE_KEYS.users, []);

  if (!users.length) {
    saveData(STORAGE_KEYS.users, createDemoUsers());
  } else {
    const requiredIds = [
      "user-demo-1",
      "user-demo-2",
      "user-demo-3",
      "user-demo-4",
    ];
    const hasMissingRequiredUser = requiredIds.some(
      (id) => !users.some((user) => user.id === id),
    );

    if (hasMissingRequiredUser) {
      const mergedUsers = [...users];
      const existingIds = new Set(mergedUsers.map((user) => user.id));

      createDemoUsers().forEach((user) => {
        if (!existingIds.has(user.id)) {
          mergedUsers.push(user);
          existingIds.add(user.id);
        }
      });

      saveData(STORAGE_KEYS.users, mergedUsers);
    }
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

  if (!getData("requests", null)) {
    saveData("requests", createDemoRequests());
  }

  if (!getData(STORAGE_KEYS.notifications, null)) {
    saveData(STORAGE_KEYS.notifications, createDemoNotifications());
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
