import type { Project } from "@/data/projectsData";
import gowharaMain from "@/assets/home/the-gowhara.jpg";
import mouradMain from "@/assets/home/mourad-elgendy.jpg";
import hassenMain from "@/assets/home/hassen-mo-hassen.jpg";
import tamerMain from "@/assets/home/mr-tamer-apartment.jpg";
import shawkeyMain from "@/assets/home/ahmad-shawkey-bedrooms.jpg";
import osamaTahaMain from "@/assets/home/osama-taha-clinic.jpg";

const project = (
  id: string,
  slug: string,
  title: string,
  category: string,
  summary: string,
  image: string,
): Project => ({
  id,
  slug,
  title,
  categories: [category],
  location: "Cairo, Egypt",
  client: "Private client",
  status: "Completed",
  summary,
  description: summary,
  features: [],
  images: [image],
  specifications: { area: "" },
});

export const featuredHomeProjects = [
  project(
    "proj-26",
    "the-gowhara",
    "The Gowhara",
    "residential",
    "A contemporary residential building defined by crisp balconies, warm textures, and a generous landscaped approach.",
    gowharaMain,
  ),
  project(
    "proj-1",
    "dr-mourad-elgendy-building",
    "Dr. Mourad Elgendy Building",
    "residential",
    "An elegant Cairo residence shaped by contemporary detailing, efficient planning, and a calm modern character.",
    mouradMain,
  ),
  project(
    "proj-2",
    "eng-hassen-mo-hassen",
    "Eng. Hassen Mo. Hassen",
    "residential",
    "A premium residential project balancing functional planning, comfort, and refined architectural detail.",
    hassenMain,
  ),
];

export const homeInteriorReelImages = {
  tamer: tamerMain,
  shawkey: shawkeyMain,
  osamaTaha: osamaTahaMain,
};
