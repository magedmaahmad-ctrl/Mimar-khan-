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
import mosqueMain from "@/assets/projects/islamic-mosque/main.jpg";
import mosqueGallery1 from "@/assets/projects/islamic-mosque/gallery1.jpg";
import mosqueGallery2 from "@/assets/projects/islamic-mosque/gallery2.jpg";
import mosqueGallery3 from "@/assets/projects/islamic-mosque/gallery3.jpg";
import gowharaMain from "@/assets/projects/the-gowhara/main.jpg";
import gowharaGallery1 from "@/assets/projects/the-gowhara/gallery1.jpg";

type RawProject = typeof rawProjects[number];

export interface ProjectData
  extends Omit<RawProject, "images" | "model" | "summary"> {
  summary: string;
  images: string[];
  model?: string;
}

const OFFICE_CATEGORY_PATTERN = /\b(?:office|hq|headquarter|headquarters)\b/i;

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
  "project-14": mosqueMain,
  "project-15": mosqueGallery1,
  "project-16": mosqueGallery2,
  "project-17": mosqueGallery3,
  "project-18": gowharaMain,
  "project-19": gowharaGallery1,
};
// === END REPLACE PROJECT IMAGES HERE ===

// === REPLACE 3D MODEL FILES HERE ===
const modelLibrary: Record<string, string> = {
  // "golden-courtyard": "/models/golden-courtyard.glb",
};
// === END REPLACE 3D MODEL FILES HERE ===

export const projects: ProjectData[] = rawProjects.map((project) => ({
  ...project,
  category: OFFICE_CATEGORY_PATTERN.test(
    `${project.title} ${project.slug} ${project.summary} ${project.description}`
  )
    ? "administrative"
    : project.category,
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

