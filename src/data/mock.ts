export type SuggestionCategory = "Job Title" | "Category" | "Company" | "Group" | "Skill";

export type Suggestion = {
  id: string;
  type: SuggestionCategory;
  label: string;
  sublabel?: string;
  icon?: string; // e.g., "JS" for JavaScript
  href: string;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  postedAtHoursAgo: number;
  promoted?: boolean;
  easyApply?: boolean;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  recruiter?: { name: string; avatarUrl?: string };
  tags?: string[]; // skills/keywords
  type?: string; // Full-time, Contract
};

export const suggestions: Suggestion[] = [
  { id: "s1", type: "Job Title", label: "Java Full Stack Developer", href: "/search?q=Java%20Full%20Stack%20Developer" },
  { id: "s2", type: "Category", label: "Java in Jobs", href: "/search?q=Java&type=jobs" },
  { id: "s3", type: "Company", label: "Java Developer - NVIDIA - Software Development", sublabel: "NVIDIA", href: "/search?q=Java%20Developer%20NVIDIA&type=jobs" },
  { id: "s4", type: "Group", label: "Java Developer Groups", href: "/search?q=Java%20Developer%20Groups&type=groups" },
  { id: "s5", type: "Skill", label: "JavaScript", icon: "JS", href: "/search?q=JavaScript&type=jobs" },
  { id: "s6", type: "Job Title", label: "Senior Java Developer", href: "/search?q=Senior%20Java%20Developer" },
  { id: "s7", type: "Company", label: "Microsoft", href: "/search?q=Microsoft&type=companies" },
];

export const jobs: Job[] = [
  {
    id: "j1",
    title: "Software Engineer",
    company: "NVIDIA",
    location: "Gurugram, Haryana, India",
    postedAtHoursAgo: 16,
    promoted: false,
    easyApply: true,
    description:
      "Develop, test, and automate software for cutting-edge GPU and AI technologies. Collaborate across teams to deliver scalable features.",
    responsibilities: [
      "Design, implement, and maintain scalable systems",
      "Write clean, testable code",
      "Collaborate with cross-functional teams",
    ],
    qualifications: [
      "BS/MS in Computer Science or related field",
      "3+ years of experience in Java/JavaScript/Python",
      "Familiarity with cloud platforms",
    ],
    recruiter: { name: "Priya Sharma" },
    tags: ["Java", "JavaScript", "Python", "Full-time"],
    type: "Full-time",
  },
  {
    id: "j2",
    title: "Java Backend Developer",
    company: "Microsoft",
    location: "Hyderabad, India",
    postedAtHoursAgo: 40,
    promoted: true,
    easyApply: false,
    description:
      "Build resilient backend services in Java for large-scale distributed systems. Drive performance and reliability improvements.",
    responsibilities: [
      "Develop RESTful services",
      "Optimize database performance",
      "Ensure reliability and fault tolerance",
    ],
    qualifications: [
      "Strong Java and Spring Boot experience",
      "Experience with distributed systems",
      "Knowledge of Azure a plus",
    ],
    recruiter: { name: "Rahul Verma" },
    tags: ["Java", "Spring", "Azure"],
    type: "Full-time",
  },
  {
    id: "j3",
    title: "Full Stack Developer (Java/React)",
    company: "WorldFirst",
    location: "Pune, India",
    postedAtHoursAgo: 4,
    promoted: true,
    easyApply: true,
    description:
      "Work across the stack using Java and React to deliver customer-facing features quickly and safely.",
    responsibilities: ["Implement UI and APIs", "Write automated tests", "Participate in code reviews"],
    qualifications: ["2+ years full-stack experience", "React, Java, SQL"],
    recruiter: { name: "Anita Gupta" },
    tags: ["Java", "React", "SQL", "Easy Apply"],
    type: "Full-time",
  },
];

export const posts = [
  { id: "p1", title: "We're Hiring: Senior Java Developer", author: "TechCo", ago: "1d" },
  { id: "p2", title: "Java 22 features overview", author: "Dev Insights", ago: "3d" },
];

export const people = [
  { id: "pe1", name: "Rohit Kumar", title: "Senior Java Developer at Accenture", connection: "2nd" },
  { id: "pe2", name: "Ananya Singh", title: "Full Stack Engineer (Java/React) at WorldFirst", connection: "3rd" },
];

export const groups = [
  { id: "g1", name: "Java Developer Groups", members: 120000 },
  { id: "g2", name: "Spring Boot Professionals", members: 85000 },
];

export const companies = [
  { id: "c1", name: "NVIDIA", industry: "Semiconductors" },
  { id: "c2", name: "Microsoft", industry: "Software" },
  { id: "c3", name: "WorldFirst", industry: "FinTech" },
];
