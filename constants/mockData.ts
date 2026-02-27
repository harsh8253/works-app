export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: "high" | "medium" | "low";
  assignees: { id: string; name: string; avatar: string }[];
  dueDate: string;
  tags: string[];
  comments: Comment[];
  attachments: Attachment[];
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: string;
}

export interface Sprint {
  id: string;
  name: string;
  progress: number;
  totalTasks: number;
  completedTasks: number;
  deadline: string;
  startDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  team: string;
  avatar: string;
}

export const currentUser: User = {
  id: "1",
  name: "Harsh Patel",
  email: "harsh.patel@sprintflow.io",
  role: "Senior Developer",
  team: "Platform Engineering",
  avatar: "HP",
};

export const currentSprint: Sprint = {
  id: "s1",
  name: "Sprint 24 – Q1 Release",
  progress: 0.68,
  totalTasks: 32,
  completedTasks: 22,
  deadline: "2026-03-15",
  startDate: "2026-02-15",
};

export const summaryData = [
  {
    id: "1",
    title: "Total Tasks",
    count: 32,
    icon: "layers-outline",
    color: "#6366F1",
  },
  {
    id: "2",
    title: "In Progress",
    count: 8,
    icon: "time-outline",
    color: "#F59E0B",
  },
  {
    id: "3",
    title: "Completed",
    count: 22,
    icon: "checkmark-circle-outline",
    color: "#22C55E",
  },
  {
    id: "4",
    title: "Overdue",
    count: 2,
    icon: "alert-circle-outline",
    color: "#EF4444",
  },
];

export const tasks: Task[] = [
  {
    id: "t1",
    title: "Implement Authentication Flow",
    description:
      "Build the complete authentication flow including login, registration, and password reset screens. Integrate with the OAuth2 provider and handle token management.",
    status: "in-progress",
    priority: "high",
    assignees: [
      { id: "u1", name: "Harsh Patel", avatar: "HP" },
      { id: "u2", name: "Ananya Sharma", avatar: "AS" },
    ],
    dueDate: "2026-03-01",
    tags: ["frontend", "auth"],
    comments: [
      {
        id: "c1",
        author: "Ananya Sharma",
        avatar: "AS",
        text: "OAuth integration is ready for review. Please check the token refresh logic.",
        timestamp: "2 hours ago",
      },
      {
        id: "c2",
        author: "Harsh Patel",
        avatar: "HP",
        text: "Looks good! I will test the edge cases and merge by EOD.",
        timestamp: "1 hour ago",
      },
    ],
    attachments: [
      { id: "a1", name: "auth-flow-diagram.pdf", type: "pdf", size: "2.4 MB" },
      { id: "a2", name: "api-spec.json", type: "json", size: "340 KB" },
    ],
  },
  {
    id: "t2",
    title: "Design Sprint Board UI",
    description:
      "Create the Kanban-style sprint board with drag-and-drop functionality. Support for multiple columns and card grouping.",
    status: "todo",
    priority: "medium",
    assignees: [{ id: "u3", name: "Dev Joshi", avatar: "DJ" }],
    dueDate: "2026-03-05",
    tags: ["ui", "design"],
    comments: [],
    attachments: [
      { id: "a3", name: "wireframe-v2.fig", type: "fig", size: "12 MB" },
    ],
  },
  {
    id: "t3",
    title: "Setup CI/CD Pipeline",
    description:
      "Configure GitHub Actions for automated testing, building, and deployment. Include staging and production environments.",
    status: "done",
    priority: "high",
    assignees: [
      { id: "u4", name: "Rahul Verma", avatar: "RV" },
      { id: "u1", name: "Harsh Patel", avatar: "HP" },
    ],
    dueDate: "2026-02-20",
    tags: ["devops", "ci-cd"],
    comments: [
      {
        id: "c3",
        author: "Rahul Verma",
        avatar: "RV",
        text: "Pipeline is live and running in production. All checks passed.",
        timestamp: "1 day ago",
      },
    ],
    attachments: [],
  },
  {
    id: "t4",
    title: "API Rate Limiting",
    description:
      "Implement rate limiting middleware for the REST API endpoints. Use Redis-backed sliding window algorithm.",
    status: "in-progress",
    priority: "medium",
    assignees: [{ id: "u5", name: "Priya Nair", avatar: "PN" }],
    dueDate: "2026-03-03",
    tags: ["backend", "security"],
    comments: [],
    attachments: [],
  },
  {
    id: "t5",
    title: "User Dashboard Analytics",
    description:
      "Build the analytics dashboard with charts showing sprint velocity, task completion rate, and team performance metrics.",
    status: "todo",
    priority: "low",
    assignees: [
      { id: "u2", name: "Ananya Sharma", avatar: "AS" },
      { id: "u3", name: "Dev Joshi", avatar: "DJ" },
    ],
    dueDate: "2026-03-10",
    tags: ["frontend", "analytics"],
    comments: [],
    attachments: [],
  },
  {
    id: "t6",
    title: "Database Migration Script",
    description:
      "Write migration scripts for the new schema changes. Ensure backward compatibility and data integrity.",
    status: "done",
    priority: "high",
    assignees: [{ id: "u4", name: "Rahul Verma", avatar: "RV" }],
    dueDate: "2026-02-18",
    tags: ["backend", "database"],
    comments: [],
    attachments: [],
  },
  {
    id: "t7",
    title: "Mobile Responsive Fixes",
    description:
      "Fix layout issues on mobile devices for the task list and sprint board views.",
    status: "todo",
    priority: "medium",
    assignees: [{ id: "u1", name: "Harsh Patel", avatar: "HP" }],
    dueDate: "2026-03-07",
    tags: ["frontend", "mobile"],
    comments: [],
    attachments: [],
  },
  {
    id: "t8",
    title: "Unit Test Coverage",
    description:
      "Increase unit test coverage to 80% for core modules. Focus on authentication and task management services.",
    status: "in-progress",
    priority: "low",
    assignees: [
      { id: "u5", name: "Priya Nair", avatar: "PN" },
      { id: "u2", name: "Ananya Sharma", avatar: "AS" },
    ],
    dueDate: "2026-03-08",
    tags: ["testing", "qa"],
    comments: [],
    attachments: [],
  },
];

export const notifications = [
  {
    id: "n1",
    title: "PR merged",
    message: "Your PR #234 has been merged",
    time: "5m ago",
    read: false,
  },
  {
    id: "n2",
    title: "New comment",
    message: "Ananya commented on Auth Flow",
    time: "1h ago",
    read: false,
  },
  {
    id: "n3",
    title: "Sprint ending",
    message: "Sprint 24 ends in 3 days",
    time: "3h ago",
    read: true,
  },
];
