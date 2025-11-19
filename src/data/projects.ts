// === REPLACE PROJECT NAMES & DESCRIPTIONS IN projects.json ===
import rawProjects from "./projects.json";

import project1 from "@/assets/project (1).jpeg";
import project2 from "@/assets/project (2).jpg";
import project3 from "@/assets/project (3).jpg";
import project4 from "@/assets/project (4).jpg";
import project5 from "@/assets/project (5).JPG";
import project6 from "@/assets/project (6).jpg";
import project7 from "@/assets/project (7).jpg";
import project8 from "@/assets/project (8).jpg";
import project9 from "@/assets/project (9).jpg";
import project10 from "@/assets/project (10).jpg";
import project11 from "@/assets/project (11).jpg";
import project12 from "@/assets/project (12).jpg";
import project13 from "@/assets/project (13).jpg";

type RawProject = typeof rawProjects[number];

export interface ProjectData
  extends Omit<RawProject, "images" | "model" | "summary"> {
  summary: string;
  images: string[];
  model?: string;
}

// === REPLACE PROJECT IMAGES HERE ===
const imageLibrary: Record<string, string> = {
  "project-1": project1,
  "project-2": project2,
  "project-3": project3,
  "project-4": project4,
  "project-5": project5,
  "project-6": project6,
  "project-7": project7,
  "project-8": project8,
  "project-9": project9,
  "project-10": project10,
  "project-11": project11,
  "project-12": project12,
  "project-13": project13,
};
// === END REPLACE PROJECT IMAGES HERE ===

// === REPLACE 3D MODEL FILES HERE ===
const modelLibrary: Record<string, string> = {
  // "golden-courtyard": "/models/golden-courtyard.glb",
};
// === END REPLACE 3D MODEL FILES HERE ===

export const projects: ProjectData[] = rawProjects.map((project) => ({
  ...project,
  summary: project.summary.trim(),
  description: project.description.trim(),
  images: project.images.map((key) => imageLibrary[key] ?? key),
  model: project.model
    ? modelLibrary[project.model] ?? project.model
    : undefined,
}));

export const projectMapBySlug = new Map(
  projects.map((project) => [project.slug, project])
);

export const projectMapById = new Map(
  projects.map((project) => [project.id, project])
);

