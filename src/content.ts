export const profile = {
  name: "Allen Roldan",
  title: "CRM & Operations Virtual Assistant | AI Automation Specialist",
  upworkUrl: "",
  photo: "./profile.png", // Replace this asset to update the portrait.
};
export function approvedUpworkUrl(value: string): string | null {
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      (url.hostname === "www.upwork.com" || url.hostname === "upwork.com") &&
      url.pathname.startsWith("/freelancers/")
      ? url.href
      : null;
  } catch {
    return null;
  }
}
export type ProjectStatus =
  | "Concept Demonstration"
  | "Personal Project"
  | "Verified Implementation"
  | "Client Project";
export type Project = {
  id: "crm" | "workflow" | "data";
  title: string;
  shortDescription: string;
  category: string;
  status: ProjectStatus;
  technologies: string[];
  cover: string;
  problem: string;
  solution: string;
  implementationDetails: string;
  demoComponent: "crm" | "workflow" | "data";
  evidenceAssets: string[];
  outcomes: string[];
  externalLinks: { label: string; url: string }[];
  useCase: string;
  simulation: string;
};
export const projects: Project[] = [
  {
    id: "crm",
    title: "Every lead. A clear next step.",
    shortDescription:
      "A structured pipeline that turns scattered contacts into an organized follow-up process.",
    category: "CRM & LEAD MANAGEMENT",
    status: "Concept Demonstration",
    technologies: ["CRM principles", "React", "TypeScript"],
    cover: "pipeline",
    problem:
      "When contacts and follow-ups live in different places, the next action can become difficult to track.",
    solution:
      "A single pipeline with visible stages, lead details, and appointment states.",
    implementationDetails:
      "Local React state powers filters, stage changes, and sample appointment scheduling. No CRM account is connected.",
    demoComponent: "crm",
    evidenceAssets: [],
    outcomes: [],
    externalLinks: [],
    useCase:
      "A small service business organizing incoming inquiries and follow-ups.",
    simulation:
      "All contacts, deal values, and appointments are fictional. Changes reset when the demo closes.",
  },
  {
    id: "workflow",
    title: "Less repetition. More momentum.",
    shortDescription:
      "Follow an inquiry from first submission to a ready-to-action follow-up queue.",
    category: "AI-ASSISTED WORKFLOW",
    status: "Concept Demonstration",
    technologies: ["Make.com concepts", "Workflow design", "Local simulation"],
    cover: "workflow",
    problem:
      "Copying an inquiry between tools adds repetitive steps and makes handoffs harder to follow.",
    solution:
      "A transparent, six-step workflow that validates an inquiry, categorizes it, and prepares a follow-up.",
    implementationDetails:
      "A local timer simulates execution. Categorization is a fixed illustrative result, not an AI model call. Notifications are only simulated.",
    demoComponent: "workflow",
    evidenceAssets: [],
    outcomes: [],
    externalLinks: [],
    useCase:
      "A team standardizing inquiry intake before implementing a production automation.",
    simulation:
      "No AI model, external API, message, CRM write, or paid service is used.",
  },
  {
    id: "data",
    title: "Clean data. Clearer decisions.",
    shortDescription:
      "Turn an inconsistent sample dataset into a tidy, useful operations snapshot.",
    category: "DATA MANAGEMENT & REPORTING",
    status: "Concept Demonstration",
    technologies: ["Spreadsheet concepts", "Data validation", "CSV export"],
    cover: "report",
    problem:
      "Duplicate records and inconsistent formatting make routine reporting less dependable.",
    solution:
      "Normalize sample records, remove duplicate emails, and inspect the before-and-after result.",
    implementationDetails:
      "Client-side cleanup trims names, normalizes email addresses, and deduplicates by email. The exported CSV contains only fictional demo records.",
    demoComponent: "data",
    evidenceAssets: [],
    outcomes: [],
    externalLinks: [],
    useCase:
      "Preparing a contact spreadsheet for a CRM import or recurring operations report.",
    simulation:
      "The dataset and all displayed metrics are fictional. No files are uploaded.",
  },
];
